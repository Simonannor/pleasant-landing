import { Cross, Heart, Users } from "lucide-react";

export default function WelcomeSection() {
  return (
    <section id="our-story" className="welcome reveal">
      <div>
        <div className="section-number">02 / OUR HEART</div>
        <h2>
          More than a church.
          <br />
          <em>A family in Christ.</em>
        </h2>
      </div>
      <div className="welcome-right">
        <p className="body-copy">
          At Pleasant Springs Chapel, faith is something we live together. We are a vibrant
          Christian community in the heart of Accra, united by a simple calling: to please God and
          serve our generation.
        </p>
        <p className="body-copy mt-4">
          Whether you are taking your first step in faith or looking for a place to call home, there
          is a place for you here.
        </p>
        <div className="values">
          <span className="reveal" data-delay="0">
            <Cross /> Rooted in faith
          </span>
          <span className="reveal" data-delay="100">
            <Heart /> United in love
          </span>
          <span className="reveal" data-delay="200">
            <Users /> Called to serve
          </span>
        </div>
      </div>
    </section>
  );
}
