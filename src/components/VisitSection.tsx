import { ArrowUpRight, Clock3, GraduationCap, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { church } from "@/lib/church";

export default function VisitSection() {
  return (
    <section id="visit" className="visit reveal">
      <div>
        <div className="section-number">03 / YOU’RE INVITED</div>
        <h2>
          Your Sunday.
          <br />
          <em>A new beginning.</em>
        </h2>
        <p className="body-copy">
          Come worship, connect, and grow with us.
          <br />
          We look forward to welcoming you.
        </p>
        <Button variant="chapel" asChild>
          <a href={church.directions} target="_blank" rel="noreferrer">
            Get directions <ArrowUpRight />
          </a>
        </Button>
      </div>
      <div className="visit-details">
        <div className="visit-row reveal" data-delay="0">
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
        <div className="visit-row reveal" data-delay="100">
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
        <div className="visit-row reveal" data-delay="200">
          <GraduationCap />
          <div>
            <h3>A place to grow</h3>
            <p>Home of The Father’s Heart School of Ministry</p>
          </div>
        </div>
      </div>
    </section>
  );
}
