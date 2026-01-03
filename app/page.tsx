"use client";

import { useState } from "react";
import NativeAds from "@/components/NativeAds";

export default function Page() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    if (!url) return;
    setResult(`${window.location.origin}/G0LUHWRR6R?${url}`);
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <>
      {/* ===== CREATE URL AREA ===== */}
      <div className="container">
        <h2>Create a URL for me</h2>

        <input
          className="url-input"
          placeholder="https://www.google.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button className="generate-btn" onClick={handleGenerate}>
          Generate
        </button>

        {result && (
          <div className="result-box">
            <a id="create-result" href={result}>
              {result}
            </a>

            <button
              className={`copy-hint ${copied ? "copied" : ""}`}
              onClick={handleCopy}
            >
              {copied ? "Copied ✓" : "Copy"}
            </button>
          </div>
        )}
      </div>

      {/* ===== ADS AREA (WAJIB DI SINI) ===== */}
      <NativeAds />
    </>
  );
}

