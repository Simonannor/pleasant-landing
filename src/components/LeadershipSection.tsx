import { church, leaders } from "@/lib/church";
import shield from "@/assets/chapel-shield.webp";

export default function LeadershipSection() {
  return (
    <section id="leadership" className="leadership reveal" data-reveal="fade-up" aria-labelledby="leadership-title">
      <div className="container">
        <div className="leadership-head reveal" data-reveal="slide-left" data-delay="100">
          <div className="eyebrow">Servant leadership</div>
          <h2 id="leadership-title">
            Meet our
            <br />
            <em>pastors.</em>
          </h2>
          <p className="leadership-copy reveal" data-reveal="fade-up" data-delay="250">
            Shepherds after God’s own heart — leading {church.name} with humility, prayer, and a
            love for family. In this {church.theme.toLowerCase()}, they labor to see every member
            fruitful in faith, family, and purpose.
          </p>
        </div>
        <div className="leadership-grid">
          {leaders.map((leader, i) => (
            <article
              className="leader-card reveal lift-card"
              data-reveal="zoom"
              data-parallax="0.2"
              data-delay={String(i * 120)}
              key={leader.role}
            >
              <div className="leader-photo">
                {leader.photo ? (
                  <img
                    src={leader.photo}
                    alt={`Portrait of ${leader.name || leader.role}`}
                    loading="lazy"
                  />
                ) : (
                  <div className="leader-soon" aria-hidden="true">
                    <img src={shield} alt="" width={96} height={96} />
                    <span>Portrait coming soon</span>
                  </div>
                )}
              </div>
              <h3 className="leader-name">{leader.name || "To be announced"}</h3>
              <div className="leader-role">{leader.role}</div>
              <p className="leader-bio">{leader.bio || "A faithful servant of God’s house."}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
