import Stripe from 'stripe'
import { headers} from 'next/headers'
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { db } from '@/lib/db'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get('Stripe-Signature') as string
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET as string)
  } catch (err) {
    console.error('Invalid signature', err)
    return new NextResponse("Invalid signature", {status: 400})
  }

  const session = event.data.object as Stripe.Checkout.Session
  const userId = session?.metadata?.userId
  const courseId = session?.metadata?.courseId

  try {
    if (event.type === 'checkout.session.completed') {
      if (!userId || !courseId) {
        console.error("Invalid session")
        return new NextResponse("Invalid session", {status: 400})
      }
      await db.purchase.create({
        data: {
          userId,
          courseId,
        }
      })
    }
  } catch (err) {
    console.error("Error creating purchase", err)
    return new NextResponse("Error", {status: 200})
  }

  return new NextResponse("Success", {status: 200})
}
