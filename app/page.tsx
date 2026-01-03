"use client";

import { useEffect, useState } from "react";
import RedirectLogic from "@/components/RedirectLogic";

export default function Page() {
  return <RedirectLogic />;
}

export default function HomePage() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    const copyBtn = document.querySelector(".copy-hint");
    if (!copyBtn) return;

    copyBtn.addEventListener("click", () => {
      if (!result) return;
      navigator.clipboard.writeText(result);
    });
  }, [result]);

  return (
    <>
      <div id="new">
        <h2>Create a URL for me</h2>

        <input
          className="url-input"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button
          onClick={() =>
            setResult(
              `${window.location.origin}/abc123?${url}`
            )
          }
        >
          Generate
        </button>

        <div className="result-box">
          <a id="create-result">{result}</a>
          <span className="copy-hint">Copy</span>
        </div>
      </div>
    </>
  );
}
