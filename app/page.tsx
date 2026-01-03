
"use client";

import { useState } from "react";

export default function Page() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState("");

  const handleGenerate = () => {
    if (!url) return;
    setResult(`${window.location.origin}/abc123?${url}`);
  };

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    alert("Copied!");
  };

  return (
    <div id="new">
      <h2>Create a URL for me</h2>

      <input
        className="url-input"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://example.com"
      />

      <button onClick={handleGenerate}>Generate</button>

      <div className="result-box">
        <a id="create-result">{result}</a>
        <button className="copy-hint" onClick={handleCopy}>
          Copy
        </button>
      </div>
    </div>
  );
}
