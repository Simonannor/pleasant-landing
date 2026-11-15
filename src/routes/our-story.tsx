import { createFileRoute } from "@tanstack/react-router";
import PageShell from "@/components/PageShell";
import WelcomeSection from "@/components/WelcomeSection";

export const Route = createFileRoute("/our-story")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Our Story | Pleasant Springs Chapel" },
      {
        name: "description",
        content:
          "More than a church — a family in Christ. Pleasant Springs Chapel is a vibrant Christian community in Accra, Ghana.",
      },
      { property: "og:title", content: "Our Story | Pleasant Springs Chapel" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: () => (
    <PageShell>
      <div className="container">
        <WelcomeSection />
      </div>
    </PageShell>
  ),
});
