import { createFileRoute } from "@tanstack/react-router";
import PageShell from "@/components/PageShell";
import MinistrySection from "@/components/MinistrySection";

export const Route = createFileRoute("/ministry")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "School of Ministry | Pleasant Springs Chapel" },
      {
        name: "description",
        content:
          "The Father's Heart School of Ministry — a community committed to spiritual growth and a life of service.",
      },
      { property: "og:title", content: "School of Ministry | Pleasant Springs Chapel" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: () => (
    <PageShell>
      <MinistrySection />
    </PageShell>
  ),
});
