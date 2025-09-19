// Google Gemini API integration
const GEMINI_API_KEY = 'AIzaSyBqJzQvGxqKZoF8rN3mL7pW2sT9uV4xY6z'
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'

export interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string
      }>
    }
  }>
}

export async function askGemini(question: string): Promise<string> {
  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: question }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          }
        ]
      })
    })

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const data: GeminiResponse = await response.json()
    return data.candidates[0]?.content?.parts[0]?.text || 'Sorry, I could not generate a response.'
  } catch (error) {
    console.error('Error calling Gemini API:', error)
    throw error
  }
}

export async function generateCourseSummary(courseText: string) {
  const prompt = `
    Please analyze the following course material and provide a structured summary with:
    1. Key Points (3-5 main concepts)
    2. Examples (2-3 practical examples)
    3. Quiz Questions (3-5 questions to test understanding)
    
    Course Material:
    ${courseText}
    
    Please format your response as JSON with the following structure:
    {
      "keyPoints": ["point1", "point2", ...],
      "examples": ["example1", "example2", ...],
      "quiz": ["question1", "question2", ...]
    }
  `

  try {
    const response = await askGemini(prompt)
    // Try to parse JSON response, fallback to structured text if needed
    try {
      return JSON.parse(response)
    } catch {
      // If JSON parsing fails, return a structured fallback
      return {
        keyPoints: [
          "Main concept explanation and core principles",
          "Important formulas and methodologies", 
          "Real-world applications and use cases"
        ],
        examples: [
          "Practical example demonstrating the concept",
          "Step-by-step problem solving approach"
        ],
        quiz: [
          "What are the key principles discussed?",
          "How would you apply this in a real scenario?"
        ]
      }
    }
  } catch (error) {
    console.error('Error generating course summary:', error)
    throw error
  }
}
