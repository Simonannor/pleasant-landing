import { church } from "@/lib/church";

// The church's theme of the year, declared as a gold editorial band.
export default function ThemeBand() {
  const [head, tail] = church.theme.split(/ of (.+)$/);

  return (
    <section className="theme-band reveal" aria-label={`Our ${church.themeYear} theme`}>
      <div className="container theme-inner">
        <div className="theme-eyebrow">{church.themeYear} · Our theme</div>
        <p className="theme-text">
          {tail ? `A ${head} of ` : ""}
          <em>{tail ?? head}</em>
        </p>
        <p className="theme-sub">This is the word of the Lord over {church.name} for the year.</p>
      </div>
    </section>
  );
}
