import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY
    const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent"

    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        {
          error: "Gemini API key is not configured. Please add GEMINI_API_KEY to your environment variables.",
        },
        { status: 500 },
      )
    }

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `${message}\n\nPlease provide a helpful educational response and suggest relevant learning resources.`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Gemini API error: ${response.status} - ${errorText}`)

      if (response.status === 404) {
        return NextResponse.json(
          {
            error: "Model not available. The API is using the latest Gemini 2.5 Flash model.",
          },
          { status: 404 },
        )
      } else if (response.status === 400) {
        return NextResponse.json(
          {
            error: "Invalid API key. Please check your GEMINI_API_KEY environment variable.",
          },
          { status: 400 },
        )
      } else if (response.status === 403) {
        return NextResponse.json(
          {
            error: "API access denied. Please check your API key permissions and billing status.",
          },
          { status: 403 },
        )
      } else if (response.status === 429) {
        return NextResponse.json(
          {
            error: "Rate limit exceeded. Please wait a moment before trying again.",
          },
          { status: 429 },
        )
      }

      return NextResponse.json(
        {
          error: `Gemini API error: ${response.status}`,
        },
        { status: response.status },
      )
    }

    const data = await response.json()

    if (!data.candidates || !Array.isArray(data.candidates) || data.candidates.length === 0) {
      console.error("Invalid response structure:", data)
      return NextResponse.json(
        {
          error: "Invalid response from Gemini API - no candidates found",
        },
        { status: 500 },
      )
    }

    const candidate = data.candidates[0]

    if (!candidate) {
      console.error("No candidate found in response:", data)
      return NextResponse.json(
        {
          error: "No response generated from Gemini API",
        },
        { status: 500 },
      )
    }

    // Handle MAX_TOKENS finish reason with empty content
    if (candidate.finishReason === "MAX_TOKENS") {
      return NextResponse.json({
        text: "I apologize, but my response was cut off due to length limits. Please try asking a more specific question or break your request into smaller parts.",
        resources: [
          {
            type: "youtube" as const,
            title: `Tutorial: ${message.slice(0, 30)}...`,
            url: `https://youtube.com/results?search_query=${encodeURIComponent(message)}`,
            description: "Video explanations and tutorials",
          },
          {
            type: "khan" as const,
            title: "Khan Academy Resources",
            url: `https://khanacademy.org/search?page_search_query=${encodeURIComponent(message)}`,
            description: "Interactive lessons and practice",
          },
        ],
      })
    }

    // Check for content structure
    if (!candidate.content) {
      console.error("No content in candidate:", candidate)
      return NextResponse.json(
        {
          error: "Invalid response structure from Gemini API - no content",
        },
        { status: 500 },
      )
    }

    // Handle different content structures
    let aiText = "Sorry, I could not generate a response."

    if (candidate.content.parts && Array.isArray(candidate.content.parts) && candidate.content.parts.length > 0) {
      // Standard structure with parts array
      aiText = candidate.content.parts[0]?.text || aiText
    } else if (candidate.content.text) {
      // Alternative structure with direct text
      aiText = candidate.content.text
    } else if (typeof candidate.content === "string") {
      // Direct string content
      aiText = candidate.content
    } else {
      console.error("Unexpected content structure:", candidate.content)
      return NextResponse.json(
        {
          error: "Unexpected response format from Gemini API",
        },
        { status: 500 },
      )
    }

    // Generate relevant resources based on the question topic
    const resources = [
      {
        type: "youtube" as const,
        title: `Tutorial: ${message.slice(0, 30)}...`,
        url: `https://youtube.com/results?search_query=${encodeURIComponent(message)}`,
        description: "Video explanations and tutorials",
      },
      {
        type: "khan" as const,
        title: "Khan Academy Resources",
        url: `https://khanacademy.org/search?page_search_query=${encodeURIComponent(message)}`,
        description: "Interactive lessons and practice",
      },
    ]

    return NextResponse.json({
      text: aiText,
      resources,
    })
  } catch (error) {
    console.error("Error in chat API:", error)
    return NextResponse.json(
      {
        error: "Internal server error. Please try again later.",
      },
      { status: 500 },
    )
  }
}
