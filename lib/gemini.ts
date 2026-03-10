export type TreatmentAdvice = {
  treatment: string;
  prevention: string;
  severity: 'low' | 'medium' | 'high';
};

export async function getTreatmentAdvice(
  disease: string,
  cropType: string,
  scientificName: string
): Promise<TreatmentAdvice> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY is not set');

  const prompt = `You are an expert agronomist. A farmer has a crop disease diagnosis and needs practical advice.

Disease: ${disease}${scientificName ? ` (${scientificName})` : ''}
Affected crop: ${cropType}

Respond in JSON only with this exact structure, no markdown, no explanation:
{
  "treatment": "2-3 sentences of specific, actionable treatment steps the farmer should take immediately",
  "prevention": "2-3 sentences of prevention measures to stop this disease from recurring or spreading",
  "severity": "low or medium or high"
}`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 512,
          responseMimeType: 'application/json',
        },
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Gemini API error: ${response.status} — ${error}`);
  }

  const data = await response.json();
  const raw = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';

  console.log('Gemini raw response:', raw);

  // Strip markdown code fences just in case
  const cleaned = raw.replace(/```json|```/g, '').trim();

  try {
    const parsed = JSON.parse(cleaned);
    return {
      treatment:
        parsed.treatment ??
        'Apply appropriate fungicide and remove infected plant material.',
      prevention:
        parsed.prevention ??
        'Ensure good air circulation and avoid overhead watering.',
      severity: parsed.severity ?? 'medium',
    };
  } catch (e) {
    console.error('JSON parse failed. Raw was:', raw);
    console.error(e);
    // Rather than crashing, return fallback advice so the user still gets a result
    return {
      treatment:
        'Consult a local agronomist for treatment options specific to your region and crop variety.',
      prevention:
        'Practice crop rotation, ensure proper drainage, and monitor plants regularly for early signs of disease.',
      severity: 'medium',
    };
  }
}
