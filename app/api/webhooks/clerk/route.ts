import { NextResponse } from 'next/server'

export async function POST(req: Request) {

  return new NextResponse("Success", {status: 200})
}
