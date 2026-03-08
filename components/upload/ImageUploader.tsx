'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useRef, useState } from 'react';

type DiagnosisResult = {
  disease: string;
  confidence: number;
  treatment: string;
  prevention: string;
  cropType: string;
};

type UploadState =
  | 'idle'
  | 'dragging'
  | 'preview'
  | 'loading'
  | 'result'
  | 'error';

export default function ImageUploader() {
  const [state, setState] = useState<UploadState>('idle');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please upload an image file.');
      setState('error');
      return;
    }
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
      setState('preview');
    };
    reader.readAsDataURL(file);
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, []);

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setState('dragging');
  };
  const onDragLeave = () => setState(imagePreview ? 'preview' : 'idle');
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const reset = () => {
    setState('idle');
    setImageFile(null);
    setImagePreview(null);
    setResult(null);
    setErrorMsg('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const analyze = async () => {
    if (!imageFile) return;
    setState('loading');
    const formData = new FormData();
    formData.append('image', imageFile);
    try {
      const res = await fetch('/api/detect', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Detection failed');
      setResult(await res.json());
      setState('result');
    } catch {
      setErrorMsg('Something went wrong. Please try again.');
      setState('error');
    }
  };

  const confidenceColor = (conf: number) =>
    conf >= 0.8 ? '#4ade80' : conf >= 0.5 ? '#facc15' : '#f87171';

  return (
    <main className="flex flex-col items-center pt-32 pb-16 px-8 gap-8 max-w-[720px] mx-auto w-full min-h-screen">
      {/* Headline */}
      <div className="text-center">
        <h1 className="font-playfair text-fluid-h1 font-light leading-tight tracking-tighter text-ink">
          Detect crop diseases <em className="italic text-sage">early.</em>
        </h1>
        <p className="mt-3 font-mono text-[0.8rem] tracking-[0.05em] text-muted">
          Upload a leaf image — get an AI diagnosis in seconds
        </p>
      </div>

      {/* IDLE / DRAGGING */}
      {(state === 'idle' || state === 'dragging') && (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          className={`w-full min-h-80 border-[1.5px] border-dashed rounded-xl flex flex-col items-center justify-center gap-4 cursor-pointer transition-all relative overflow-hidden
            ${
              state === 'dragging'
                ? 'border-sage-light bg-sage/4 scale-[1.005]'
                : 'border-sage/40 bg-white/2 hover:border-sage hover:bg-sage/4'
            }`}
        >
          <div className="w-14 h-14 rounded-full bg-sage/12 border border-sage/25 flex items-center justify-center text-2xl transition-transform group-hover:-translate-y-1">
            🌿
          </div>
          <div className="text-center">
            <strong className="block font-playfair text-[1.1rem] font-normal text-sage mb-1">
              Drop your leaf image here
            </strong>
            <span className="font-mono text-[0.72rem] tracking-[0.08em] text-sage-light">
              JPG, PNG, WEBP — max 10MB
            </span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
            className="font-mono text-[0.72rem] text-sage-light bg-sage/12 border border-sage/30 px-5 py-2 rounded-md tracking-[0.08em] uppercase hover:bg-sage/20 transition-colors cursor-pointer"
          >
            Browse files
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onFileChange}
          />
        </div>
      )}

      {/* PREVIEW */}
      {state === 'preview' && imagePreview && (
        <div className="w-full rounded-xl overflow-hidden border border-sage/25 bg-ink-light">
          <div className="relative">
            <Image
              src={imagePreview}
              alt="Leaf preview"
              className="w-full max-h-[360px] object-cover block"
            />
            <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-ink/70 to-transparent flex justify-between items-start">
              <span className="font-mono text-[0.65rem] tracking-widest uppercase bg-sage/20 border border-sage/30 px-2.5 py-1 rounded text-sage-light">
                Ready to analyze
              </span>
              <button
                onClick={reset}
                className="w-7 h-7 rounded-full bg-ink/60 border border-parchment/20 text-parchment flex items-center justify-center text-sm hover:bg-rust/30 hover:border-rust transition-all"
              >
                ✕
              </button>
            </div>
          </div>
          <div className="px-5 py-4 flex items-center justify-between border-t border-sage/15">
            <span className="font-mono text-[0.7rem] text-parchment/50">
              {imageFile?.name} · {((imageFile?.size ?? 0) / 1024).toFixed(0)}{' '}
              KB
            </span>
            <button
              onClick={analyze}
              className="font-mono text-[0.8rem] tracking-[0.08em] uppercase bg-sage text-cream px-8 py-3 rounded-lg hover:bg-sage-light hover:-translate-y-px transition-all"
            >
              Analyze →
            </button>
          </div>
        </div>
      )}

      {/* LOADING */}
      {state === 'loading' && (
        <div className="w-full min-h-[200px] flex flex-col items-center justify-center gap-6 border border-sage/20 rounded-xl bg-white/[0.015]">
          <div className="w-12 h-12 border-2 border-sage/15 border-t-sage rounded-full animate-spin-slow" />
          <div className="font-mono text-[0.72rem] tracking-[0.12em] uppercase text-parchment/50">
            Analyzing leaf
          </div>
          <div className="flex flex-col gap-1.5 font-mono text-[0.65rem] text-parchment/30 tracking-[0.05em] text-center">
            <span>→ Running disease detection model</span>
            <span>→ Generating treatment plan with Gemini</span>
            <span>→ Logging diagnosis</span>
          </div>
        </div>
      )}

      {/* RESULT */}
      {state === 'result' && result && (
        <div className="w-full border border-sage/25 rounded-xl overflow-hidden animate-slide-up">
          <div className="px-6 py-5 bg-sage/[0.08] border-b border-sage/15 flex items-start justify-between gap-4">
            <div>
              <div className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-sage-light/70 mb-1.5">
                Detected Disease
              </div>
              <div className="font-playfair text-[1.6rem] font-normal text-cream tracking-tight leading-tight">
                {result.disease}
              </div>
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0">
              <span className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-parchment/40">
                Confidence
              </span>
              <span
                className="font-playfair text-[1.4rem] font-light"
                style={{ color: confidenceColor(result.confidence) }}
              >
                {Math.round(result.confidence * 100)}%
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 max-sm:grid-cols-1">
            <div className="px-6 py-5 border-r border-sage/10 max-sm:border-r-0 max-sm:border-b">
              <div className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-sage-light/70 mb-2">
                Treatment
              </div>
              <p className="font-spectral text-[0.78rem] leading-relaxed text-cream/75 font-light">
                {result.treatment}
              </p>
            </div>
            <div className="px-6 py-5">
              <div className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-sage-light/70 mb-2">
                Prevention
              </div>
              <p className="font-spectral text-[0.78rem] leading-relaxed text-cream/75 font-light">
                {result.prevention}
              </p>
            </div>
          </div>
          <div className="px-6 py-4 border-t border-sage/10 flex gap-3 bg-black/15">
            <button
              onClick={reset}
              className="font-mono text-[0.68rem] tracking-[0.08em] uppercase bg-sage/20 border border-sage/35 text-sage-light px-4 py-2 rounded-md hover:bg-sage/30 transition-colors"
            >
              ＋ New diagnosis
            </button>
            <Link
              href="/dashboard"
              className="font-mono text-[0.68rem] tracking-[0.08em] uppercase border border-parchment/15 text-parchment/50 px-4 py-2 rounded-md hover:border-parchment/30 hover:text-parchment/80 transition-colors no-underline"
            >
              View history →
            </Link>
          </div>
        </div>
      )}

      {/* ERROR */}
      {state === 'error' && (
        <div className="w-full p-8 border border-rust/35 rounded-xl bg-rust/[0.08] text-center">
          <p className="font-mono text-[0.8rem] text-red-400 mb-4">
            {errorMsg}
          </p>
          <button
            onClick={reset}
            className="font-mono text-[0.8rem] tracking-[0.08em] uppercase bg-sage text-cream px-8 py-3 rounded-lg hover:bg-sage-light transition-colors"
          >
            Try again
          </button>
        </div>
      )}
    </main>
  );
}
