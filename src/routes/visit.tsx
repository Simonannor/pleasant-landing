import { createFileRoute } from "@tanstack/react-router";
import PageShell from "@/components/PageShell";
import VisitSection from "@/components/VisitSection";

export const Route = createFileRoute("/visit")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Plan Your Visit | Pleasant Springs Chapel" },
      {
        name: "description",
        content:
          "Join us this Sunday at 8:30 AM at Achimota Mile 7, Accra — on the premises of Kaspong Ltd. We look forward to welcoming you.",
      },
      { property: "og:title", content: "Plan Your Visit | Pleasant Springs Chapel" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: () => (
    <PageShell>
      <div className="container">
        <VisitSection />
      </div>
    </PageShell>
  ),
});
