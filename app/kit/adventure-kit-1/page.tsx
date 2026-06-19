import Image from "next/image";
import Link from "next/link";
import { firstKit, kitFormats } from "@/lib/content";

export default function KitPage() {
  return (
    <main>
      <section className="kit-hero">
        <div>
          <p className="eyebrow">First adventure kit</p>
          <h1>{firstKit.title}</h1>
          <p className="lead">{firstKit.tagline}</p>
          <p className="small-meta">{firstKit.ageRange}</p>
          <Link className="button primary" href="/#interest">
            Join the first adventure
          </Link>
        </div>
        <Image
          src="/assets/characters/mori-concept-final.png"
          alt="Mori the Little Lantern Keeper concept for the first TaleMori kit"
          width={1536}
          height={1024}
          priority
        />
      </section>

      <section className="section split">
        <div>
          <p className="eyebrow">Learning objective</p>
          <h2>{firstKit.learningGoal}</h2>
          <p>
            The kit is designed to feel playful and parent-friendly while giving
            adults one simple mission to explore during the activity.
          </p>
        </div>
        <div className="note-box">
          <h3>Activity preview</h3>
          <ul>
            <li>Read Mori&apos;s short illustrated story together.</li>
            <li>Complete one printable moonlight mission.</li>
            <li>Use parent prompts to name feelings and choices.</li>
            <li>Optionally add a supervised collectible later.</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">What is included</p>
          <h2>A complete little kit without a big setup.</h2>
        </div>
        <div className="feature-grid">
          {firstKit.includes.map((item) => (
            <article className="feature-card" key={item}>
              <span className="dot" />
              <h3>{item}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Product formats</p>
          <h2>Start printable-first, then grow carefully.</h2>
        </div>
        <div className="format-list">
          {kitFormats.map((format) => (
            <article className="format-card" key={format.name}>
              <h3>{format.name}</h3>
              <p>{format.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="band">
        <div>
          <p className="eyebrow">Safety and supervision</p>
          <h2>Safety and supervision come first.</h2>
        </div>
        <p>{firstKit.supervisionNote}</p>
      </section>
    </main>
  );
}
