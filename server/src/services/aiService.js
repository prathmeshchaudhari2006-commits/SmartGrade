import fetch from 'node-fetch'; // Need to install if not present, but Node 18+ has global fetch
// However, since we are in Node environment, ensuring we have access or using library.

export const gradeWithGemini = async ({ subject, question, studentAnswer, base64Image, mimeType }) => {
  const API_KEY = process.env.AI_API_KEY || 'AIzaSyBwM_RzTKPhJm_lyqlZdLBzdRZBoPmjrA4';
  // Use Gemini 1.5 Flash for reliable Vision + JSON support
  const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

  const prompt = `
    You are an expert academic grader for Indian schools.
    Subject: ${subject}
    Assignment Question: ${question}
    Student's Typed Answer (if any): ${studentAnswer}

    Instructions:
    1. Carefully analyze the provided image (if any) and the typed answer.
    2. If the text in the image is completely unreadable or illegible, set "error": "ILLEGIBLE_HANDWRITING" and omit scores.
    3. Grade the student's work based on accuracy, completeness, and clarity.
    4. Return a JSON object EXACTLY in this format:
    {
      "score": number (0-100),
      "grade": string (A+, A, B, C, D, or F),
      "percentage": number,
      "strengths": string[],
      "weaknesses": string[],
      "feedback": string (detailed explanation),
      "tips": string[] (3-4 improvement tips),
      "topics": string[] (related topics to study),
      "encouragement": string (motivational closing),
      "error": null or "ILLEGIBLE_HANDWRITING"
    }
  `;

  const contents = [{
    parts: [
      { text: prompt }
    ]
  }];

  if (base64Image && mimeType) {
    contents[0].parts.push({
      inline_data: {
        mime_type: mimeType,
        data: base64Image
      }
    });
  }

  const response = await fetch(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents,
      generationConfig: { response_mime_type: "application/json" }
    })
  });

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.statusText}`);
  }

  const data = await response.json();
  const resultText = data.candidates[0].content.parts[0].text;
  return JSON.parse(resultText);
};
