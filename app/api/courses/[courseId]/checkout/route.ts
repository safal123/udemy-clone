import { auth, currentUser } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'

export async function POST (req: Request, { params }: { params: { courseId: string } }) {
  try {
    const { userId } = auth ()
    const user = await currentUser ()
    if (!userId) {
      return new NextResponse ('Unauthorized', { status: 401 })
    }

    const course = await db.course.findFirst ({
      where: {
        id: params.courseId,
        isPublished: true
      }
    })

    if (!course) {
      return new NextResponse ('Not found', { status: 404 })
    }

    const purchase = await db.purchase.findUnique ({
      where: {
        userId_courseId: {
          courseId: params.courseId,
          userId
        }
      }
    })

    console.log('purchase', purchase)

    if (purchase) {
      return NextResponse.json ('Already purchased', { status: 400 })
    }

    if (!course) {
      return new NextResponse ('Not found', { status: 404 })
    }

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        quantity: 1,
        price_data: {
          currency: 'aud',
          product_data: {
            name: course.title!,
            description: course.description!
          },
          unit_amount: Math.round (course.price! * 100)
        }
      }
    ]

    let stripeCustomer = await db.user.findUnique ({
      where: {
        userId
      }
    })


    if (!stripeCustomer || !stripeCustomer.stripeCustomerId) {
      const customer = await stripe.customers.create ({
        email: user?.emailAddresses[0].emailAddress
      })

      stripeCustomer = await db.user.update ({
        where: {
          userId
        },
        data: {
          stripeCustomerId: customer.id
        }
      })
    }

    const session = await stripe.checkout.sessions.create ({
      customer: stripeCustomer.stripeCustomerId,
      line_items: lineItems,
      mode: 'payment',
      success_url: `${ process.env.NEXT_PUBLIC_SITE_URL }/courses/${ course.id }?success=true`,
      cancel_url: `${ process.env.NEXT_PUBLIC_SITE_URL }/courses/${ course.id }?canceled=true`,
      metadata: {
        courseId: course.id,
        userId
      }
    })

    return NextResponse.json ({ url: session.url })
  } catch (error) {
    console.log ('[REORDER]', error)
    return new NextResponse ('Internal Error', { status: 500 })
  }
}
