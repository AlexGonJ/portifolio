import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    const scriptUrl = process.env.GOOGLE_SCRIPT_URL
    if (!scriptUrl) {
      return NextResponse.json(
        { error: 'Google Script URL not configured on the server.' },
        { status: 500 }
      )
    }

    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, message }),
    })

    if (!response.ok) {
      throw new Error('Failed to forward request to Google Sheets script.')
    }

    const result = await response.json()
    return NextResponse.json(result)
  } catch (error: any) {
    console.error('Contact API Error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    )
  }
}
