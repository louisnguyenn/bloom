import { detectDisease } from '@/lib/cropHealth';
import { getTreatmentAdvice } from '@/lib/gemini';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Parse the uploaded image from form data
    const formData = await req.formData();
    const imageFile = formData.get('image') as File | null;

    if (!imageFile) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    // Validate file type
    if (!imageFile.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      );
    }

    // Validate file size (10MB max)
    if (imageFile.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Image must be under 10MB' },
        { status: 400 }
      );
    }

    // Convert image to base64 for crop.health
    const arrayBuffer = await imageFile.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    const imageBase64 = `data:${imageFile.type};base64,${base64}`;

    // Step 1: Detect disease via crop.health
    const detection = await detectDisease(imageBase64);

    // Step 2: Get treatment advice from Gemini
    const advice = await getTreatmentAdvice(
      detection.disease,
      detection.cropType,
      detection.scientificName
    );

    // Return combined result to frontend
    return NextResponse.json({
      disease: detection.disease,
      confidence: detection.confidence,
      cropType: detection.cropType,
      scientificName: detection.scientificName,
      treatment: advice.treatment,
      prevention: advice.prevention,
      severity: advice.severity,
    });
  } catch (error) {
    console.error('Detection error:', error);

    const message = error instanceof Error ? error.message : 'Unknown error';

    // Return a user-friendly error
    return NextResponse.json(
      { error: 'Detection failed', detail: message },
      { status: 500 }
    );
  }
}
