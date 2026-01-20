import { prisma } from '@/lib/prisma'
import { ClerkUserCreated, ClerkUserDeleted } from '../types/clerks'


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
