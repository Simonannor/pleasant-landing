import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import GalleryGrid from "@/components/GalleryGrid";

export const Route = createFileRoute("/gallery")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Gallery | Pleasant Springs Chapel" },
      {
        name: "description",
        content:
          "Moments from Pleasant Springs Chapel — Sunday worship, community life, and celebrations in Accra, Ghana.",
      },
      { property: "og:title", content: "Gallery | Pleasant Springs Chapel" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <div className="page page-ready">
      <SiteNav />
      <main>
        <section className="gallery" aria-labelledby="gallery-page-title">
          <div className="container">
            <div className="gallery-head">
              <div>
                <div className="eyebrow">Church life</div>
                <h2 id="gallery-page-title">
                  Moments that
                  <br />
                  <em>make us family.</em>
                </h2>
              </div>
              <a className="text-link" href="/">
                Back to home <ArrowUpRight size={15} />
              </a>
            </div>
            <GalleryGrid />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
