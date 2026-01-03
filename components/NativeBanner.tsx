"use client";

import { useEffect } from "react";

export default function NativeBanner() {
  useEffect(() => {
    const s = document.createElement("script");
    s.src =
      "https://signingunwilling.com/98524bcd6ddbc8467674f5d221bc066a/invoke.js";
    s.async = true;
    document.body.appendChild(s);
  }, []);

  return (
    <div id="native-banner-wrapper">
      <div id="native-banner-container">
        <div id="container-98524bcd6ddbc8467674f5d221bc066a"></div>
        <button
          onClick={() => {
            const el = document.getElementById(
              "native-banner-wrapper"
            );
            if (el) el.style.display = "none";
          }}
        >
          Closed
        </button>
      </div>
    </div>
  );
}
