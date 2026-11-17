import { ArrowUpRight, Clock3, GraduationCap, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { church } from "@/lib/church";

export default function VisitSection() {
  return (
    <section id="visit" className="visit reveal" data-reveal="fade-up">
      <div className="container">
        <div>
          <div className="section-number reveal" data-reveal="slide-left" data-delay="100">
            03 / YOU’RE INVITED
          </div>
          <h2 className="reveal" data-reveal="slide-left" data-delay="250">
            Your Sunday.
            <br />
            <em>A new beginning.</em>
          </h2>
          <p className="body-copy reveal" data-reveal="fade-up" data-delay="400">
            Come worship, connect, and grow with us.
            <br />
            We look forward to welcoming you.
          </p>
          <Button variant="chapel" asChild className="magnetic reveal" data-reveal="zoom" data-delay="500">
            <a href={church.directions} target="_blank" rel="noreferrer">
              Get directions <ArrowUpRight />
            </a>
          </Button>
        </div>
        <div className="visit-details">
          <div className="visit-row reveal lift-card" data-reveal="fade-up" data-delay="100">
            <Clock3 />
            <div>
              <h3>Sunday worship</h3>
              <p>
                Every Sunday at {church.sundayService}
                <br />
                Accra, Ghana · GMT
              </p>
            </div>
          </div>
          <div className="visit-row reveal lift-card" data-reveal="fade-up" data-delay="200">
            <MapPin />
            <div>
              <h3>Achimota Mile 7</h3>
              <p>
                {church.venue}
                <br />
                Accra, Ghana
              </p>
            </div>
          </div>
          <div className="visit-row reveal lift-card" data-reveal="fade-up" data-delay="300">
            <GraduationCap />
            <div>
              <h3>A place to grow</h3>
              <p>Home of The Father’s Heart School of Ministry</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
