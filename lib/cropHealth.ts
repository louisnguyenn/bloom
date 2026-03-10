export type CropHealthResult = {
  disease: string;
  confidence: number;
  scientificName: string;
  cropType: string;
};

export async function detectDisease(
  imageBase64: string
): Promise<CropHealthResult> {
  const apiKey = process.env.CROP_HEALTH_API_KEY;
  if (!apiKey) throw new Error('CROP_HEALTH_API_KEY is not set');

  const response = await fetch(
    'https://crop.kindwise.com/api/v1/identification',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': apiKey,
      },
      body: JSON.stringify({
        images: [imageBase64],
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`crop.health API error: ${response.status} — ${error}`);
  }

  const data = await response.json();

  console.log('crop.health raw response:', JSON.stringify(data, null, 2));

  const topSuggestion = data.result?.disease?.suggestions?.[0];

  if (!topSuggestion) {
    throw new Error('No disease detected in image');
  }

  return {
    disease: topSuggestion.name ?? 'Unknown disease',
    confidence: topSuggestion.probability ?? 0,
    scientificName: topSuggestion.scientific_name ?? '',
    cropType: data.result?.crop?.suggestions?.[0]?.name ?? 'Unknown crop',
  };
}
