import { leaders } from "@/lib/church";
import shield from "@/assets/chapel-shield.png";

export default function LeadershipSection() {
  return (
    <section id="leadership" className="leadership" aria-labelledby="leadership-title">
      <div className="container">
        <div className="leadership-head reveal">
          <div className="eyebrow">Servant leadership</div>
          <h2 id="leadership-title">
            Meet our
            <br />
            <em>pastors.</em>
          </h2>
          <p className="leadership-copy">
            Shepherds after God’s own heart — leading Pleasant Springs Chapel with humility, prayer,
            and a love for family.
          </p>
        </div>
        <div className="leadership-grid">
          {leaders.map((leader, i) => (
            <article className="leader-card reveal" data-delay={String(i * 90)} key={leader.role}>
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
              <p className="leader-bio">
                {leader.bio || "Serving the house with a heart for God, family, and people."}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
