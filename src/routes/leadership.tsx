import { createFileRoute } from "@tanstack/react-router";
import PageShell from "@/components/PageShell";
import LeadershipSection from "@/components/LeadershipSection";

export const Route = createFileRoute("/leadership")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Leadership | Pleasant Springs Chapel" },
      {
        name: "description",
        content:
          "Meet the pastors and leaders of Pleasant Springs Chapel in Accra, Ghana — shepherds after God's own heart.",
      },
      { property: "og:title", content: "Leadership | Pleasant Springs Chapel" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: () => (
    <PageShell>
      <LeadershipSection />
    </PageShell>
  ),
});
