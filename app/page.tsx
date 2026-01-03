
"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    const btn = document.querySelector(".copy-hint");
    if (!btn) return;

    btn.addEventListener("click", () => {
      if (!result) return;
      navigator.clipboard.writeText(result);
    });
  }, [result]);

  return (
    <>
      <h2>Create a URL for me</h2>

      <input
        className="url-input"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button
        onClick={() =>
          setResult(`${window.location.origin}/abc123?${url}`)
        }
      >
        Generate
      </button>

      <div className="result-box">
        <a id="create-result">{result}</a>
        <span className="copy-hint">Copy</span>
      </div>

      {/* ADS NATIVE */}
      <div id="native-banner-wrapper">
        <script async data-cfasync="false" src="https://signingunwilling.com/98524bcd6ddbc8467674f5d221bc066a/invoke.js"></script>
        <div id="container-98524bcd6ddbc8467674f5d221bc066a"></div>
      </div>
    </>
  );
}
