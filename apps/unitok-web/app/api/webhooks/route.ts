// import { verifyWebhook } from '@clerk/nextjs/webhooks'
// import { NextRequest } from 'next/server'

// export async function POST(req: NextRequest) {
//   try {
//     const evt = await verifyWebhook(req)

//     // Do something with payload
//     // For this guide, log payload to console
//     const { id } = evt.data
//     const eventType = evt.type
//     console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
//     console.log('Webhook payload:', evt.data)

//     return new Response('Webhook received', { status: 200 })
//   } catch (err) {
//     console.error('Error verifying webhook:', err)
//     return new Response('Error verifying webhook', { status: 400 })
//   }
// }

import { prisma } from '@/lib/prisma'
import { ClerkUserCreated, ClerkUserDeleted } from '@/lib/types/clerks'


export async function handleUserCreated(user: ClerkUserCreated) {
  const email = user.email_addresses[0]?.email_address
  if (!email) return

  const name =
    `${user.first_name ?? ''} ${user.last_name ?? ''}`.trim() || null

  await prisma.user.create({
    data: {
      clerkId: user.id,
      email,
      name,
    },
  })
}

export async function handleUserDeleted(user: ClerkUserDeleted) {
  await prisma.user.deleteMany({
    where: {
      clerkId: user.id,
    },
  })
}
