import Image from "next/image";
import Link from "next/link";
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
          <p className="eyebrow">First validation product</p>
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
          <p className="eyebrow">MVP formats</p>
          <h2>Start simple, learn what parents actually want.</h2>
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
          <p className="eyebrow">Preorder interest</p>
          <h2>Help shape the first Milamula kit.</h2>
          <p>This placeholder form routes to a thank-you page. Connect a backend before collecting real orders.</p>
        </div>
        <InterestForm />
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

function InterestForm() {
  return (
    <form className="interest-form" action="/thank-you" method="get">
      <label>
        Parent name
        <input name="parentName" type="text" placeholder="Your name" />
      </label>
      <label>
        Phone / WhatsApp
        <input name="phone" type="tel" placeholder="+62..." />
      </label>
      <label>
        Email optional
        <input name="email" type="email" placeholder="you@example.com" />
      </label>
      <label>
        Child age range
        <select name="childAge">
          <option>3-4</option>
          <option>5-6</option>
          <option>7-8</option>
          <option>Mixed ages</option>
        </select>
      </label>
      <label>
        Preferred kit format
        <select name="format">
          <option>PDF only</option>
          <option>Printed worksheet pack</option>
          <option>Printed pack + 3D bundle</option>
        </select>
      </label>
      <label>
        Preferred theme
        <select name="theme">
          <option>Gentle courage</option>
          <option>Kindness and care</option>
          <option>Patience and trying again</option>
          <option>Creative problem-solving</option>
        </select>
      </label>
      <label>
        Willingness to preorder
        <select name="preorder">
          <option>Yes, if the preview looks good</option>
          <option>Maybe, I want price details first</option>
          <option>Not yet, just interested</option>
        </select>
      </label>
      <label className="full">
        Notes
        <textarea name="notes" placeholder="What would make this useful for your family?" />
      </label>
      <label className="checkbox full">
        <input name="consent" type="checkbox" value="yes" />
        I agree to be contacted about Milamula preorder interest.
      </label>
      <button className="button primary full-button" type="submit">
        Send interest
      </button>
    </form>
  );
}
