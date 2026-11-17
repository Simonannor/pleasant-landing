import { Cross, Heart, Users } from "lucide-react";
import { church } from "@/lib/church";

export default function WelcomeSection() {
  return (
    <section id="our-story" className="welcome reveal" data-reveal="fade-up">
      <div>
        <div className="section-number reveal" data-reveal="slide-left" data-delay="100">
          02 / OUR HEART
        </div>
        <h2 className="reveal" data-reveal="slide-left" data-delay="250">
          More than a church.
          <br />
          <em>A family in Christ.</em>
        </h2>
        <div className="vision-mission reveal" data-reveal="fade-up" data-delay="400">
          <div className="vision-mission-card">
            <div className="vm-label">Our Vision</div>
            <p className="vm-text">{church.vision}</p>
          </div>
          <div className="vision-mission-card">
            <div className="vm-label">Our Mission</div>
            <p className="vm-text">{church.mission}</p>
          </div>
        </div>
      </div>
      <div className="welcome-right">
        <p className="body-copy reveal" data-reveal="fade-up" data-delay="550">
          At Pleasant Springs Chapel, faith is something we live together. We are a vibrant
          Christian community in the heart of Accra, united by a simple calling: to please God and
          serve our generation.
        </p>
        <p className="body-copy mt-4 reveal" data-reveal="fade-up" data-delay="650">
          Whether you are taking your first step in faith or looking for a place to call home, there
          is a place for you here.
        </p>
        <div className="values reveal" data-reveal="zoom" data-delay="750">
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
