import Image from "next/image";
import Link from "next/link";
import { PreorderForm } from "@/app/components/PreorderForm";
import { faqs, firstKit, kitFormats } from "@/lib/content";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Story-led activity kits for little hands</p>
          <h1>Milamula</h1>
          <p className="lead">
            Warm, printable story-and-activity kits for parents who want meaningful,
            creative, screen-light time with young children.
          </p>
          <div className="hero-actions">
            <Link className="button primary" href="/kit/adventure-kit-1">
              See Adventure Kit #1
            </Link>
            <Link className="button secondary" href="#interest">
              Join preorder list
            </Link>
          </div>
        </div>
        <div className="hero-gallery" aria-label="Milamula story previews">
          <Image src="/assets/milo-cover.jpg" alt="Milo story preview" width={420} height={420} priority />
          <Image src="/assets/nia-cover.jpg" alt="Nia story preview" width={420} height={420} priority />
          <Image src="/assets/sami-cover.jpg" alt="Sami story preview" width={420} height={420} priority />
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">First adventure kit</p>
          <h2>{firstKit.title}</h2>
          <p>{firstKit.tagline}</p>
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

      <section className="band">
        <div>
          <p className="eyebrow">Why parents might care</p>
          <h2>One story. A few pages. A shared little adventure.</h2>
        </div>
        <p>
          Milamula is designed for parent-child activity time: read a short story,
          talk about one clear idea, then make, color, imagine, or act it out together.
        </p>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Ways to join</p>
          <h2>Simple options for different family rhythms.</h2>
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

      <section className="section split">
        <div>
          <p className="eyebrow">Optional 3D bundle</p>
          <h2>Story objects for supervised hands-on play.</h2>
          <p>
            Selected characters or activity objects may later be offered as 3D-printed
            add-ons. They should be treated as parent-supervised activity objects, not
            baby toys or unsupervised play items.
          </p>
        </div>
        <div className="note-box">
          <h3>Supervision note</h3>
          <p>{firstKit.supervisionNote}</p>
        </div>
      </section>

      <section className="section" id="interest">
        <div className="section-heading">
          <p className="eyebrow">Early interest list</p>
          <h2>Help shape the first Milamula kit.</h2>
          <p>
            Join the early interest list for {firstKit.title}. This is not a payment
            or confirmed order yet, just a gentle way to plan the first small release.
          </p>
        </div>
        <PreorderForm />
      </section>

      <section className="section faq">
        <div className="section-heading">
          <p className="eyebrow">FAQ</p>
          <h2>Clear before clever.</h2>
        </div>
        {faqs.map((faq) => (
          <details key={faq.question}>
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </section>
    </main>
  );
}
