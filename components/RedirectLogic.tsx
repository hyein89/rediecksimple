"use client";

import { useEffect, useState } from "react";

const TIMEOUT = 10000;

export default function RedirectLogic() {
  const [urls, setUrls] = useState<string[]>([]);
  const [targetFound, setTargetFound] = useState(false);
  const [mode, setMode] = useState<
    "loading" | "redirect" | "create" | "error"
  >("loading");
  const [resultUrl, setResultUrl] = useState("");

  // Parse URL query
  useEffect(() => {
    const query = window.location.search.replace("?", "");
    if (!query) {
      setMode("create");
      return;
    }

    const list = query
      .split(",")
      .map((u) => u.trim())
      .filter(Boolean);

    if (list.length === 0) {
      setMode("create");
      return;
    }

    setUrls(list);
    setMode("redirect");
  }, []);

  // Attempt redirect
  useEffect(() => {
    if (mode !== "redirect" || urls.length === 0) return;

    let finished = false;

    async function attempt(url: string) {
      try {
        await fetch(url, { method: "HEAD", mode: "no-cors" });
      } catch {
        return;
      }

      if (finished) return;
      finished = true;
      setTargetFound(true);

      setTimeout(() => {
        window.location.href = url;
      }, 1000);
    }

    Promise.all(urls.map(attempt)).then(() => {
      if (!finished) {
        setMode("error");
      }
    });

    const timer = setTimeout(() => {
      if (!finished) {
        finished = true;
        setMode("error");
      }
    }, TIMEOUT);

    return () => clearTimeout(timer);
  }, [mode, urls]);

  // CREATE MODE (multi URL)
  function onInputChange(values: string[]) {
    const filtered = values.filter(Boolean);
    const url =
      window.location.origin +
      "?" +
      filtered.join(",");
    setResultUrl(url);
  }

  // ================== UI ==================

  if (mode === "loading") {
    return <p>Loading, check JavaScript is enabled...</p>;
  }

  if (mode === "redirect") {
    return (
      <div id="redirect">
        {!targetFound && (
          <p id="redirect-testing">
            Testing provided URLs...
          </p>
        )}
        {targetFound && (
          <p id="redirect-found">
            Redirecting you...
          </p>
        )}
      </div>
    );
  }

  if (mode === "error") {
    return (
      <div id="redirect">
        <p id="redirect-none">
          None of the provided URLs work!
        </p>
      </div>
    );
  }

  return (
    <div id="new">
      <h2>Create a URL for me</h2>

      <MultiInput onChange={onInputChange} />

      <div className="result-box">
        <a id="create-result">{resultUrl}</a>
        <span
          className="copy-hint"
          onClick={() => {
            if (resultUrl)
              navigator.clipboard.writeText(resultUrl);
          }}
        >
          Copy
        </span>
      </div>
    </div>
  );
}

// ================== HELPER ==================

function MultiInput({
  onChange
}: {
  onChange: (values: string[]) => void;
}) {
  const [inputs, setInputs] = useState<string[]>([""]);

  function update(index: number, value: string) {
    const next = [...inputs];
    next[index] = value;

    // add new empty input
    if (
      value !== "" &&
      next.every((v) => v !== "")
    ) {
      next.push("");
    }

    // remove extra empty inputs
    const lastEmpty = next.lastIndexOf("");
    const cleaned = next.filter(
      (v, i) => v !== "" || i === lastEmpty
    );

    setInputs(cleaned);
    onChange(cleaned);
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      {inputs.map((v, i) => (
        <p key={i}>
          <input
            className="url-input"
            value={v}
            onChange={(e) =>
              update(i, e.target.value)
            }
          />
        </p>
      ))}
    </form>
  );
}
