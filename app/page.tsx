"use client";

import { useEffect, useState } from "react";

const TIMEOUT = 10000;

export default function RedirectLogic() {
  const [urls, setUrls] = useState<string[]>([]);
  const [status, setStatus] = useState<
    "loading" | "redirect" | "create" | "error"
  >("loading");
  const [resultUrl, setResultUrl] = useState("");

  // 🔹 PARSE QUERY
  useEffect(() => {
    const q = window.location.search.replace("?", "");
    if (!q) {
      setStatus("create");
      return;
    }

    const list = q.split(",").filter(Boolean);
    if (list.length === 0) {
      setStatus("create");
      return;
    }

    setUrls(list);
    setStatus("redirect");
  }, []);

  // 🔹 ATTEMPT REDIRECT
  useEffect(() => {
    if (status !== "redirect" || urls.length === 0) return;

    let done = false;

    async function attempt(url: string) {
      try {
        await fetch(url, { method: "HEAD", mode: "no-cors" });
      } catch {
        return;
      }

      if (done) return;
      done = true;

      setTimeout(() => {
        window.location.href = url;
      }, 1000);
    }

    Promise.all(urls.map(attempt)).then(() => {
      if (!done) setStatus("error");
    });

    const timer = setTimeout(() => {
      if (!done) setStatus("error");
    }, TIMEOUT);

    return () => clearTimeout(timer);
  }, [status, urls]);

  // 🔹 CREATE MODE
  function updateResult(values: string[]) {
    const filtered = values.filter(Boolean);
    const url =
      window.location.origin + "?" + filtered.join(",");
    setResultUrl(url);
  }

  // ================= UI =================

  if (status === "loading") {
    return <p id="placeholder">Loading...</p>;
  }

  if (status === "redirect") {
    return (
      <div id="redirect">
        <p id="redirect-testing">
          Testing provided URLs...
        </p>
      </div>
    );
  }

  if (status === "error") {
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

      <MultiInput onChange={updateResult} />

      <div className="result-box">
        <a id="create-result">{resultUrl}</a>
        <span
          className="copy-hint"
          onClick={() =>
            resultUrl &&
            navigator.clipboard.writeText(resultUrl)
          }
        >
          Copy
        </span>
      </div>
    </div>
  );
}

// 🔹 MULTI INPUT
function MultiInput({
  onChange
}: {
  onChange: (values: string[]) => void;
}) {
  const [inputs, setInputs] = useState([""]);

  function update(i: number, value: string) {
    const next = [...inputs];
    next[i] = value;

    if (value !== "" && next.every((v) => v !== ""))
      next.push("");

    const lastEmpty = next.lastIndexOf("");
    setInputs(
      next.filter(
        (v, idx) => v !== "" || idx === lastEmpty
      )
    );

    onChange(next);
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

