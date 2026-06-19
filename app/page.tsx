import Image from "next/image";
import Link from "next/link";
import { PreorderForm } from "@/app/components/PreorderForm";
import { faqs, firstKit, kitFormats } from "@/lib/content";

const promises = [
  {
    title: "Story first",
    copy: "Start with a gentle read-aloud moment before moving into coloring, making, or pretend play."
  },
  {
    title: "Parent guided",
    copy: "Each kit is designed for adult-child time, with simple prompts instead of complicated lessons."
  },
  {
    title: "Screen-light",
    copy: "Printable pages and optional story objects help children use their hands, words, and imagination."
  }
];

const kitHighlights = [
  "a short read-aloud story",
  "printable activity pages",
  "a parent guide with simple prompts",
  "a coloring or making page",
  "optional parent-supervised story objects"
];

const howItWorks = [
  {
    title: "Read together",
    copy: "Use the story to introduce one gentle value in a calm, concrete way."
  },
  {
    title: "Make or color",
    copy: "Turn the story into a hands-on page children can draw, color, sort, or retell."
  },
  {
    title: "Share interest",
    copy: "Join the early list so Milamula can plan the first small release. No payment is charged."
  }
];

export default function Home() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-hero-copy">
          <p className="eyebrow">Printable story kits for little hands</p>
          <h1>Milamula</h1>
          <p className="lead">
            Warm story-and-activity kits for parents who want a simple,
            screen-light way to read, make, and imagine with young children.
          </p>
          <div className="button-row">
            <Link className="button primary" href="/kit/adventure-kit-1">
              See Adventure Kit #1
            </Link>
            <Link className="button secondary" href="/how-it-works">
              How it works
            </Link>
            <Link className="text-link" href="#interest">
              Join preorder list
            </Link>
          </div>
          <dl className="hero-facts" aria-label="Milamula kit summary">
            <div>
              <dt>Age</dt>
              <dd>3-8 with guidance</dd>
            </div>
            <div>
              <dt>Format</dt>
              <dd>Printable first</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>Early interest list</dd>
            </div>
          </dl>
        </div>
        <div className="hero-art" aria-label="Milamula story previews">
          <figure className="image-card image-card-large">
            <Image src="/assets/sami-cover.jpg" alt="Sami story kit preview" width={620} height={620} priority />
            <figcaption>Adventure Kit #1 preview</figcaption>
          </figure>
          <div className="image-card-stack">
            <figure className="image-card image-card-small">
              <Image src="/assets/milo-cover.jpg" alt="Milo story preview" width={420} height={420} priority />
            </figure>
            <figure className="image-card image-card-small">
              <Image src="/assets/nia-cover.jpg" alt="Nia story preview" width={420} height={420} priority />
            </figure>
          </div>
        </div>
      </section>

      <section className="section promise-section">
        <div className="section-heading centered">
          <p className="eyebrow">What Milamula is</p>
          <h2>A small story-led kit for real family time.</h2>
          <p>
            Milamula keeps the activity simple enough for a normal day: one story,
            a few printable pages, and prompts that help children talk, make, and retell.
          </p>
        </div>
        <div className="editorial-grid">
          {promises.map((promise) => (
            <article className="editorial-card" key={promise.title}>
              <span className="dot" />
              <h3>{promise.title}</h3>
              <p>{promise.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section kit-preview-section">
        <div className="kit-preview">
          <div className="kit-preview-media">
            <Image src="/assets/sami-cover.jpg" alt="Milamula Adventure Kit #1 preview" width={620} height={620} />
          </div>
          <div className="kit-preview-copy">
            <p className="eyebrow">First adventure kit</p>
            <h2>{firstKit.title}</h2>
            <p>{firstKit.tagline}</p>
            <ul className="check-list">
              {kitHighlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="soft-note">
              This is an early interest list, not a payment or confirmed order.
            </p>
            <Link className="button primary" href="#interest">
              Join preorder list
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading centered">
          <p className="eyebrow">How it works</p>
          <h2>Read, make, then decide if the first kit fits your family.</h2>
        </div>
        <div className="step-list">
          {howItWorks.map((step, index) => (
            <article className="step-card" key={step.title}>
              <span>{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="expectation-band">
        <div className="expectation-inner">
          <div>
            <p className="eyebrow">What to expect</p>
            <h2>Clear, careful, and still early.</h2>
          </div>
          <div className="expectation-grid">
            {kitFormats.map((format) => (
              <article key={format.name}>
                <h3>{format.name}</h3>
                <p>{format.detail}</p>
              </article>
            ))}
            <article>
              <h3>Supervised physical objects</h3>
              <p>
                Any 3D-printed add-ons are parent-supervised activity objects.
                Materials, finish, sizing, and age suitability must be verified before sale.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section preorder-section" id="interest">
        <div className="preorder-copy">
          <p className="eyebrow">Early interest list</p>
          <h2>Tell us if Milamula should make a first small release.</h2>
          <p className="lead-small">
            Leave your details if you want to hear when {firstKit.title} is ready
            to preview. Milamula will follow up by WhatsApp or email.
          </p>
          <ul className="plain-list">
            <li>No payment is charged here.</li>
            <li>No subscription is started.</li>
            <li>Use fake or test details only when checking the form.</li>
          </ul>
        </div>
        <div className="form-panel">
          <PreorderForm />
        </div>
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
