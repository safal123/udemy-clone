import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/backend'
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST (req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error (
      'Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local'
    )
  }

  // Get headers
  const headerPayload = headers ()
  const svix_id = headerPayload.get ('svix-id')
  const svix_timestamp = headerPayload.get ('svix-timestamp')
  const svix_signature = headerPayload.get ('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response ('Error occurred -- no svix headers', {
      status: 400
    })
  }

  const payload = await req.json ()
  const body = JSON.stringify (payload)

  const wh = new Webhook (WEBHOOK_SECRET)

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify (body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature
    }) as WebhookEvent
  } catch (err) {
    console.error ('Error verifying webhook:', err)
    return new Response ('Error occurred', {
      status: 400
    })
  }

  // Get the ID and type
  const {id} = evt.data
  const eventType = evt.type

  // User created
  if (eventType === 'user.created' || eventType === 'user.updated') {
    const {id, email_addresses, image_url, first_name, last_name} = evt.data

    const user = {
      userId: id,
      email: email_addresses[0].email_address,
      imageUri: image_url,
      firstName: first_name,
      lastName: last_name,
      stripeCustomerId: ''
    }

    // Save user to database
    await db.user.upsert ({
      where: {userId: id},
      update: user,
      create: user
    })
  }

  if (eventType === 'user.deleted') {
    const {id} = evt.data

    // Delete user from database
    await db.user.delete ({
      where: {userId: id}
    })
  }

  return new NextResponse ('Success', {status: 200})
}
