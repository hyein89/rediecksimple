"use client";

import { useEffect } from "react";

export default function RedirectLogic() {
  useEffect(() => {
    let urls: string[] = [];

    let query = window.location.search;
    if (query.startsWith("?")) query = query.substring(1);

    if (query.length > 0) {
      for (let q of query.split(",")) {
        if (q) urls.push(q);
      }
    }

    if (!urls.length) return;

    setTimeout(() => {
      window.location.href = urls[0];
    }, 1000);

    // ADS SCRIPT
    const s = document.createElement("script");
    s.src =
      "https://signingunwilling.com/98524bcd6ddbc8467674f5d221bc066a/invoke.js";
    s.async = true;
    document.body.appendChild(s);

    document
      .getElementById("close-native-banner")
      ?.addEventListener("click", () => {
        const el = document.getElementById("native-banner-wrapper");
        if (el) el.style.display = "none";
      });
  }, []);

  return (
    <>
      <div id="redirect">
        <p id="redirect-testing">Testing provided URLs...</p>
      </div>

      <div id="native-banner-wrapper">
        <div id="native-banner-container">
          <div id="container-98524bcd6ddbc8467674f5d221bc066a"></div>
          <button id="close-native-banner">Closed</button>
        </div>
      </div>
    </>
  );
}

