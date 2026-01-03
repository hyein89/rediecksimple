
import links from "@/data/links.json";
import { notFound } from "next/navigation";
import RedirectLogic from "@/components/RedirectLogic";

export default function Page({
  params,
}: {
  params: { id: string };
}) {
  const valid = links.find((x) => x.id === params.id);

  if (!valid) notFound();

  return <RedirectLogic />;
}
