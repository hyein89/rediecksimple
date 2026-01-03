"use client";

import links from "../../data/links.json";
import { notFound } from "next/navigation";
import { useEffect } from "react";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string };
};

export default function RedirectPage({
  params,
  searchParams
}: Props) {
  const data = links.find((x) => x.id === params.id);

  // 🔴 ID tidak ada → 404
  if (!data) notFound();

  const targetUrl = Object.keys(searchParams)[0];

  useEffect(() => {
    if (targetUrl) {
      setTimeout(() => {
        window.location.href = targetUrl;
      }, 2000);
    }
  }, [targetUrl]);

  return (
    <div id="redirect">
      <p id="redirect-testing">
        Testing provided URLs...
      </p>

      {targetUrl && (
        <p id="redirect-found">
          Redirecting you to{" "}
          <a href={targetUrl}>{targetUrl}</a>
        </p>
      )}

      {!targetUrl && (
        <p id="redirect-none">
          None of the provided URLs work!
        </p>
      )}
    </div>
  );
}
