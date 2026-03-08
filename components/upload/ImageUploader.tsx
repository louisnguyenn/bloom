'use client';

import Link from 'next/link';
import { useCallback, useRef, useState } from 'react';
import styles from './ImageUploader.module.css';

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

  const onDragLeave = () => {
    setState(imagePreview ? 'preview' : 'idle');
  };

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
      const data = await res.json();
      setResult(data);
      setState('result');
    } catch {
      setErrorMsg('Something went wrong. Please try again.');
      setState('error');
    }
  };

  const confidenceColor = (conf: number) => {
    if (conf >= 0.8) return '#4ade80';
    if (conf >= 0.5) return '#facc15';
    return '#f87171';
  };

  return (
    <main className={styles.main}>
      <div className={styles.headline}>
        <h1>
          Detect crop diseases <em>early.</em>
        </h1>
        <p>Upload a leaf image — get an AI diagnosis in seconds</p>
      </div>

      {/* IDLE / DRAGGING */}
      {(state === 'idle' || state === 'dragging') && (
        <div
          className={`${styles.dropzone} ${state === 'dragging' ? styles.dragging : ''}`}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className={styles.uploadIcon}>🌿</div>
          <div className={styles.dropzoneText}>
            <strong>Drop your leaf image here</strong>
            <span>JPG, PNG, WEBP — max 10MB</span>
          </div>
          <button
            className={styles.browseBtn}
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
          >
            Browse files
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={onFileChange}
          />
        </div>
      )}

      {/* PREVIEW */}
      {state === 'preview' && imagePreview && (
        <div className={styles.previewContainer}>
          <img
            src={imagePreview}
            alt="Leaf preview"
            className={styles.previewImg}
          />
          <div className={styles.previewOverlay}>
            <span className={styles.fileBadge}>Ready to analyze</span>
            <button className={styles.resetBtn} onClick={reset}>
              ✕
            </button>
          </div>
          <div className={styles.previewActions}>
            <span className={styles.fileInfo}>
              {imageFile?.name} · {((imageFile?.size ?? 0) / 1024).toFixed(0)}{' '}
              KB
            </span>
            <button className={styles.analyzeBtn} onClick={analyze}>
              Analyze →
            </button>
          </div>
        </div>
      )}

      {/* LOADING */}
      {state === 'loading' && (
        <div className={styles.loadingState}>
          <div className={styles.loadingRing} />
          <div className={styles.loadingText}>Analyzing leaf</div>
          <div className={styles.loadingSteps}>
            <span>→ Running disease detection model</span>
            <span>→ Generating treatment plan with Gemini</span>
            <span>→ Logging diagnosis</span>
          </div>
        </div>
      )}

      {/* RESULT */}
      {state === 'result' && result && (
        <div className={styles.resultCard}>
          <div className={styles.resultHeader}>
            <div>
              <div className={styles.sectionLabel}>Detected Disease</div>
              <div className={styles.diseaseName}>{result.disease}</div>
            </div>
            <div className={styles.confidencePill}>
              <span className={styles.confidenceLabel}>Confidence</span>
              <span
                className={styles.confidenceValue}
                style={{ color: confidenceColor(result.confidence) }}
              >
                {Math.round(result.confidence * 100)}%
              </span>
            </div>
          </div>
          <div className={styles.resultSections}>
            <div className={styles.resultSection}>
              <div className={styles.sectionLabel}>Treatment</div>
              <p className={styles.sectionText}>{result.treatment}</p>
            </div>
            <div className={styles.resultSection}>
              <div className={styles.sectionLabel}>Prevention</div>
              <p className={styles.sectionText}>{result.prevention}</p>
            </div>
          </div>
          <div className={styles.resultFooter}>
            <button
              className={`${styles.actionBtn} ${styles.actionBtnPrimary}`}
              onClick={reset}
            >
              ＋ New diagnosis
            </button>
            <Link
              href="/dashboard"
              className={`${styles.actionBtn} ${styles.actionBtnGhost}`}
            >
              View history →
            </Link>
          </div>
        </div>
      )}

      {/* ERROR */}
      {state === 'error' && (
        <div className={styles.errorState}>
          <p>{errorMsg}</p>
          <button className={styles.analyzeBtn} onClick={reset}>
            Try again
          </button>
        </div>
      )}
    </main>
  );
}
