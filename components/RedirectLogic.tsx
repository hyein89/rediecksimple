"use client";

import { useEffect } from "react";

export default function RedirectLogic() {
  useEffect(() => {
    const TIMEOUT = 10000;

    let urls: string[] = [];
    let query = window.location.search;

    if (query.startsWith("?")) query = query.substring(1);
    if (query.length > 0) {
      urls = query.split(",").filter(Boolean);
    }

    let targetFound = false;

    async function attempt(url: string) {
      try {
        const response = await fetch(url, { method: "HEAD", mode: "no-cors" });
        if (targetFound) return;
        targetFound = true;

        document.getElementById("redirect-testing")!.style.display = "none";
        document.getElementById("redirect-found")!.style.display = "";
        const link = document.querySelector("#redirect-found a")!;
        link.setAttribute("href", url);
        link.textContent = url;

        setTimeout(() => (window.location.href = url), 1000);
      } catch {}
    }

    if (urls.length > 0) {
      document.getElementById("placeholder")!.style.display = "none";
      document.getElementById("redirect")!.style.display = "";

      Promise.all(urls.map(attempt));
      setTimeout(() => {
        if (!targetFound) {
          document.getElementById("redirect-testing")!.style.display = "none";
          document.getElementById("redirect-none")!.style.display = "";
        }
      }, TIMEOUT);
    }
  }, []);

  return (
    <>
      <div id="placeholder">Loading...</div>

      <div id="redirect" style={{ display: "none" }}>
        <p id="redirect-testing">Testing provided URLs...</p>
        <p id="redirect-found" style={{ display: "none" }}>
          Redirecting to <a href="#"></a>
        </p>
        <p id="redirect-none" style={{ display: "none" }}>
          None of the provided URLs work!
        </p>
      </div>
    </>
  );
}

