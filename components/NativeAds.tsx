"use client";

import Script from "next/script";

export default function NativeAds() {
  return (
    <div id="native-banner-wrapper">
      <div id="native-banner-container">

        {/* SCRIPT IKLAN */}
        <Script
          src="https://signingunwilling.com/98524bcd6ddbc8467674f5d221bc066a/invoke.js"
          strategy="afterInteractive"
        />

        <div id="container-98524bcd6ddbc8467674f5d221bc066a"></div>

        <button
          id="close-native-banner"
          onClick={() => {
            const el = document.getElementById("native-banner-wrapper");
            if (el) el.style.display = "none";
          }}
        >
          Closed
        </button>

      </div>
    </div>
  );
}
