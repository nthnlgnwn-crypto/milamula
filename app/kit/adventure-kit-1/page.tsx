import Image from "next/image";
import Link from "next/link";
import { firstKit, kitFormats } from "@/lib/content";

export default function KitPage() {
  return (
    <main>
      <section className="kit-hero">
        <div>
          <p className="eyebrow">First MVP offer</p>
          <h1>{firstKit.title}</h1>
          <p className="lead">{firstKit.tagline}</p>
          <p className="small-meta">{firstKit.ageRange}</p>
          <Link className="button primary" href="/#interest">
            Register preorder interest
          </Link>
        </div>
        <Image src="/assets/sami-cover.jpg" alt="Sami story kit preview" width={620} height={620} priority />
      </section>

      <section className="section split">
        <div>
          <p className="eyebrow">Learning objective</p>
          <h2>{firstKit.learningGoal}</h2>
          <p>
            The kit should feel playful and parent-friendly while giving adults one
            simple value to reinforce during the activity.
          </p>
        </div>
        <div className="note-box">
          <h3>Activity preview</h3>
          <ul>
            <li>Read a short story together.</li>
            <li>Color or complete one simple activity page.</li>
            <li>Use parent prompts to talk about the value.</li>
            <li>Optionally use a supervised 3D story object.</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">What is included</p>
          <h2>Small enough to try, complete enough to sell.</h2>
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
          <h2>Three ways to validate demand.</h2>
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
          <h2>Careful language before physical product claims.</h2>
        </div>
        <p>{firstKit.supervisionNote}</p>
      </section>
    </main>
  );
}
