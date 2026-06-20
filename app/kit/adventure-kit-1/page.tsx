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
            Join the first adventure list
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
          <p className="eyebrow">Parent benefit</p>
          <h2>{firstKit.learningGoal}</h2>
          <p>
            TaleMori is made for parents who want something calmer than a screen
            but easier than preparing a craft or lesson from scratch.
          </p>
        </div>
        <div className="note-box">
          <h3>How the first mission feels</h3>
          <ul>
            <li>Read Mori&apos;s short illustrated story together.</li>
            <li>Help Mori find a missing little light.</li>
            <li>Complete one printable moonlight mission.</li>
            <li>Use simple parent prompts for what to say and do next.</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">What is included</p>
          <h2>The first kit is planned to include:</h2>
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
          <p className="eyebrow">Possible formats</p>
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
          <p className="eyebrow">Early list</p>
          <h2>No payment is charged today.</h2>
        </div>
        <p>
          Join the interest list to hear when the pilot kit is ready. TaleMori
          will share the details, price, and format before you decide.
        </p>
      </section>
    </main>
  );
}
