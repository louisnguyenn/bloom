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
  "severity": "low | medium | high"
}`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 512,
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

  // Strip markdown code fences if Gemini wraps in ```json
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
  } catch {
    throw new Error('Failed to parse Gemini response as JSON');
  }
}
