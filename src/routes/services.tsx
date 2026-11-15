import { createFileRoute } from "@tanstack/react-router";
import PageShell from "@/components/PageShell";
import ServicesSection from "@/components/ServicesSection";

export const Route = createFileRoute("/services")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Services & Weekly Schedule | Pleasant Springs Chapel" },
      {
        name: "description",
        content:
          "Join Pleasant Springs Chapel — Sunday worship at 8:30 AM at Achimota Mile 7, Accra, plus mid-week and prayer gatherings.",
      },
      { property: "og:title", content: "Services & Weekly Schedule | Pleasant Springs Chapel" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: () => (
    <PageShell>
      <ServicesSection />
    </PageShell>
  ),
});
