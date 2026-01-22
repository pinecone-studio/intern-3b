import { Webhook } from 'svix';
import { headers } from 'next/headers';
import type { WebhookEvent } from '@clerk/clerk-sdk-node';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request): Promise<Response> {
  try {
    console.log('🔔 Clerk webhook received');

    // --------------------------------------------------
    // 1️⃣ Validate environment variable
    // --------------------------------------------------
    const secret = process.env.CLERK_WEBHOOK_SECRET;
    if (!secret) {
      console.error('❌ CLERK_WEBHOOK_SECRET is missing');
      return new Response('Webhook secret missing', { status: 500 });
    }

    // --------------------------------------------------
    // 2️⃣ Read raw request body (REQUIRED for Svix)
    // --------------------------------------------------
    const payload = await req.text();

    // --------------------------------------------------
    // 3️⃣ Read and validate Svix headers
    // --------------------------------------------------
    const headerList = await headers();

    const svixId = headerList.get('svix-id');
    const svixTimestamp = headerList.get('svix-timestamp');
    const svixSignature = headerList.get('svix-signature');

    if (!svixId || !svixTimestamp || !svixSignature) {
      console.error('❌ Missing Svix headers', {
        svixId,
        svixTimestamp,
        svixSignature,
      });
      return new Response('Missing Svix headers', { status: 400 });
    }

    // --------------------------------------------------
    // 4️⃣ Verify webhook signature
    // --------------------------------------------------
    const webhook = new Webhook(secret);

    let event: WebhookEvent;
    try {
      event = webhook.verify(payload, {
        'svix-id': svixId,
        'svix-timestamp': svixTimestamp,
        'svix-signature': svixSignature,
      }) as WebhookEvent;
    } catch (error) {
      console.error('❌ Invalid webhook signature', error);
      return new Response('Invalid signature', { status: 400 });
    }

    console.log('✅ Webhook verified:', event.type);

    // --------------------------------------------------
    // 5️⃣ Handle events
    // --------------------------------------------------
    if (event.type === 'user.created') {
      const user = event.data;

      const primaryEmailId = user.primary_email_address_id;

      const email = user.email_addresses.find(
        (e) => e.id === primaryEmailId,
      )?.email_address;

      if (!email) {
        console.error('❌ Primary email not available yet', {
          primaryEmailId,
          emailAddresses: user.email_addresses,
        });

        // IMPORTANT: do NOT fail the webhook
        return new Response('Email not ready', { status: 200 });
      }

      const universityId = await getOrCreateDefaultUniversityId();

      await prisma.user.upsert({
        where: { clerkId: user.id },
        update: {},
        create: {
          clerkId: user.id,
          email,
          tickets: 0,
          universityId,
        },
      });

      console.log('✅ User created in DB:', user.id);
    }

    return new Response('OK', { status: 200 });
  } catch (error) {
    console.error('❌ Webhook fatal error:', error);

    return new Response(
      error instanceof Error ? error.message : 'Webhook error',
      { status: 400 },
    );
  }
}

// ------------------------------------------------------
// Helper: Create default University ONCE (idempotent)
// Requires University.name to be @unique
// ------------------------------------------------------
async function getOrCreateDefaultUniversityId(): Promise<string> {
  const university = await prisma.university.upsert({
    where: { name: 'Unknown' },
    update: {},
    create: {
      name: 'Unknown',
      country: 'N/A',
    },
  });

  return university.id;
}
