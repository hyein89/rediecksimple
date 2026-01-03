"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // COPY BUTTON — KODE ASLI LO
    const copyBtn = document.querySelector(".copy-hint");
    const resultLink = document.getElementById("create-result");

    if (!copyBtn || !resultLink) return;

    copyBtn.addEventListener("click", () => {
      const text = resultLink.textContent?.trim();
      if (!text) return;

      navigator.clipboard.writeText(text);
    });
  }, []);

  return (
    <>
      <div id="placeholder">
        <p>Loading, check JavaScript is enabled...</p>
      </div>

      <div id="new">
        <h2>Create a URL for me</h2>

        <input
          id="url1"
          className="url-input"
          onInput={(e) => {
            const val = (e.target as HTMLInputElement).value;
            const result = document.getElementById("create-result");
            if (result)
              result.textContent = `${location.origin}/abc123?${val}`;
          }}
        />

        <div className="result-box">
          <a id="create-result"></a>
          <span className="copy-hint">Copy</span>
        </div>
      </div>
    </>
  );
}

