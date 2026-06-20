import Image from "next/image";
import Link from "next/link";
import { PreorderForm } from "@/app/components/PreorderForm";
import { faqs, firstKit, kitFormats } from "@/lib/content";

const promises = [
  {
    title: "Story-led play",
    copy: "Every adventure begins with a gentle tale children can enter."
  },
  {
    title: "Hands-on missions",
    copy: "Read, make, and complete small creative prompts together."
  },
  {
    title: "Parent-friendly setup",
    copy: "Designed for simple, screen-light moments without complicated prep."
  },
  {
    title: "A growing character world",
    copy: "Mori and friends can grow into future kits, keepsakes, and collectibles."
  }
];

const kitHighlights = [
  "short illustrated story",
  "printable activity mission",
  "parent guide",
  "creative prompt",
  "optional collectible character later"
];

const howItWorks = [
  {
    title: "Read the story",
    copy: "Meet Mori and follow the lost moonlight through a gentle story mission."
  },
  {
    title: "Make the activity",
    copy: "Use a printable page to color, choose, sequence, or create part of the mission."
  },
  {
    title: "Play the mission",
    copy: "Retell the adventure, name a feeling, and keep one little light for the next brave beginning."
  }
];

const updates = [
  {
    title: "Meet Mori, the Little Lantern Keeper",
    summary: "The first TaleMori guide is a gentle woodland keeper with a lantern for brave beginnings."
  },
  {
    title: "Why we are starting with one adventure",
    summary: "TaleMori begins with one focused kit so families can help shape what comes next."
  },
  {
    title: "The idea behind story-led play",
    summary: "A short story can become a simple activity, a shared ritual, and a little world children remember."
  }
];

export default function Home() {
  return (
    <main className="home-page">
      <section className="home-hero cinematic-hero" aria-label="TaleMori opening story">
        <div className="hero-video-frame" aria-hidden="true">
          <Image
            className="hero-poster"
            src="/assets/characters/mori-concept-final.png"
            alt=""
            width={1536}
            height={1024}
            loading="eager"
            priority
          />
          <video
            className="hero-video"
            poster="/assets/characters/mori-concept-final.png"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src="/assets/hero/talemori-mori-hero.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="hero-overlay" />
        <div className="home-hero-copy">
          <p className="eyebrow">TaleMori</p>
          <h1>Stories that grow into play.</h1>
          <p className="lead">
            Meet Mori, the Little Lantern Keeper, and join TaleMori&apos;s first
            story-led activity adventure for ages 4-7.
          </p>
          <div className="button-row">
            <Link className="button primary" href="#interest">
              Join the first adventure
            </Link>
            <Link className="button secondary" href="#mori">
              Meet Mori
            </Link>
          </div>
        </div>
      </section>

      <section className="section promise-section">
        <div className="section-heading centered">
          <p className="eyebrow">TaleMori method</p>
          <h2>What makes TaleMori different?</h2>
        </div>
        <div className="editorial-grid feature-grid-four">
          {promises.map((promise, index) => (
            <article className="editorial-card" key={promise.title}>
              <span className="card-marker">{index + 1}</span>
              <h3>{promise.title}</h3>
              <p>{promise.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section first-adventure-section" id="mori">
        <div className="first-adventure">
          <div className="kit-preview-copy">
            <p className="eyebrow">First adventure kit</p>
            <h2>{firstKit.title}</h2>
            <p>
              Mori carries the Lantern of Little Lights through a lost moonlit
              path, inviting children to read, make, name a feeling, and complete
              one small creative mission with a parent.
            </p>
            <ul className="check-list">
              {kitHighlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="soft-note">
              This is an early preorder interest list. No payment is charged yet.
            </p>
            <Link className="button primary" href="#interest">
              Join the first adventure
            </Link>
          </div>
          <figure className="image-card image-card-wide">
            <Image
              src="/assets/characters/mori-concept-final.png"
              alt="Mori the Little Lantern Keeper concept sheet"
              width={1536}
              height={1024}
            />
            <figcaption>Mori carries the Lantern of Little Lights.</figcaption>
          </figure>
        </div>
      </section>

      <section className="section kit-preview-section">
        <div className="kit-preview">
          <div className="kit-preview-media character-portrait">
            <Image
              src="/assets/characters/mori-concept-final.png"
              alt="Mori in a moss-green hooded cape holding a glowing lantern"
              width={1536}
              height={1024}
            />
          </div>
          <div className="kit-preview-copy">
            <p className="eyebrow">Flagship character</p>
            <h2>Meet Mori, the Little Lantern Keeper.</h2>
            <p>
              Mori is a gentle woodland guide in a moss-green hooded cape,
              carrying the Lantern of Little Lights. The lantern glows when a
              child begins a brave story mission.
            </p>
            <p className="soft-note">
              Quietly brave, kind, curious, and comforting.
            </p>
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

      <section className="section updates-section" id="updates">
        <div className="section-heading centered">
          <p className="eyebrow">Updates</p>
          <h2>Notes from TaleMori</h2>
          <p>
            Small updates from the story forest as the first adventure takes shape.
          </p>
        </div>
        <div className="updates-grid">
          {updates.map((update) => (
            <article className="update-card" key={update.title}>
              <p className="small-meta">Story note</p>
              <h3>{update.title}</h3>
              <p>{update.summary}</p>
            </article>
          ))}
        </div>
        <div className="center-action">
          <Link className="text-link" href="#updates">
            Read more updates
          </Link>
        </div>
      </section>

      <section className="expectation-band">
        <div className="expectation-inner">
          <div>
            <p className="eyebrow">Parent expectations</p>
            <h2>Simple, printable, and still early.</h2>
          </div>
          <div className="expectation-grid">
            {kitFormats.map((format) => (
              <article key={format.name}>
                <h3>{format.name}</h3>
                <p>{format.detail}</p>
              </article>
            ))}
            <article>
              <h3>No payment charged yet</h3>
              <p>
                The form is only an early preorder interest list. TaleMori will
                follow up before anything is confirmed or charged.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section preorder-section" id="interest">
        <div className="preorder-copy">
          <p className="eyebrow">Early interest list</p>
          <h2>Join the first TaleMori adventure list.</h2>
          <p className="lead-small">
            Leave your details if you want to hear when {firstKit.title} is ready
            to preview. TaleMori will follow up by WhatsApp or email.
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
