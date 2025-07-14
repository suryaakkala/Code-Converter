"use server"

import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"

export async function convertCode(sourceCode: string, sourceLanguage: string, targetLanguage: string): Promise<string> {
  try {
    const prompt = `You are an expert programmer. Convert this ${sourceLanguage.toUpperCase()} code to ${targetLanguage.toUpperCase()}.

IMPORTANT: Return ONLY the converted code. No explanations, no comments about the conversion process, no markdown formatting.

${sourceLanguage.toUpperCase()} code:
${sourceCode}

${targetLanguage.toUpperCase()} code:`

    const { text } = await generateText({
      model: groq("llama-3.1-8b-instant"),
      prompt,
      maxTokens: 1000, // Reduced from 2000
    })

    // Remove markdown code block formatting if present
    let cleanedText = text.trim()
    if (cleanedText.startsWith("```")) {
      // Remove opening code block
      cleanedText = cleanedText.replace(/^```\w*\n?/, "")
    }
    if (cleanedText.endsWith("```")) {
      // Remove closing code block
      cleanedText = cleanedText.replace(/\n?```$/, "")
    }

    return cleanedText.trim()
  } catch (error) {
    console.error("Code conversion error:", error)
    throw new Error("Failed to convert code")
  }
}
