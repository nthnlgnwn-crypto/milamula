import Image from "next/image";
import Link from "next/link";
import { PreorderForm } from "@/app/components/PreorderForm";
import { faqs, firstKit, kitFormats } from "@/lib/content";

const promises = [
  {
    title: "Story-led play",
    copy: "The activity begins with a character and a reason to care."
  },
  {
    title: "Ready-to-use missions",
    copy: "Print, read, and play without planning a lesson."
  },
  {
    title: "Parent-friendly guide",
    copy: "Simple prompts help you know what to say and do next."
  },
  {
    title: "A growing character world",
    copy: "Mori can return in future stories, kits, and collectibles."
  }
];

const kitHighlights = [
  "A short illustrated story",
  "A printable activity mission",
  "A parent guide with simple prompts",
  "A creative task children can complete",
  "Optional Mori collectible later"
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
          <h1 className="hero-title">
            <span className="hero-title-sprout">
              <span className="hero-title-leaf hero-title-leaf-left" aria-hidden="true" />
              Stories
              <span className="hero-title-leaf hero-title-leaf-right" aria-hidden="true" />
            </span>{" "}
            that grow into play.
          </h1>
          <p className="lead">
            TaleMori is a ready-to-use story adventure kit for ages 4-7, made
            for parents who want simple, screen-light creative time with their child.
          </p>
          <div className="button-row">
            <Link className="button primary" href="#interest">
              Join the first adventure list
            </Link>
            <Link className="button secondary" href="#first-adventure">
              See what&apos;s inside
            </Link>
          </div>
        </div>
      </section>

      <section className="section split">
        <div>
          <p className="eyebrow">For busy parents</p>
          <h2>Meaningful play should not need a full lesson plan.</h2>
        </div>
        <p className="lead-small">
          Some days, you want something calmer than a screen but easier than
          preparing a craft from scratch. TaleMori turns one gentle story into a
          simple play mission you can do together.
        </p>
      </section>

      <section className="section promise-section">
        <div className="section-heading centered">
          <p className="eyebrow">Ready-to-use story adventures</p>
          <h2>Screen-light play, without starting from a blank page.</h2>
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

      <section className="section first-adventure-section" id="first-adventure">
        <div className="first-adventure">
          <div className="kit-preview-copy">
            <p className="eyebrow">First adventure kit</p>
            <h2>First adventure: {firstKit.title}</h2>
            <p>
              Mori is the Little Lantern Keeper of the story forest. In the
              first TaleMori adventure, children help Mori find a missing little
              light through a story, a printable mission, and a simple creative
              activity.
            </p>
            <p className="soft-note">The first kit is planned to include:</p>
            <ul className="check-list">
              {kitHighlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="soft-note">
              No payment is charged today. You&apos;ll be contacted first when
              the pilot kit is ready, with details, price, and format before you decide.
            </p>
            <Link className="button primary" href="#interest">
              Join the first adventure list
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
              child begins a brave story mission and helps Mori take the next
              small step.
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
          <h2>One story becomes one small mission.</h2>
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
            <h2>Simple setup. Clear next step. No payment today.</h2>
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
                You&apos;ll be contacted first with the pilot kit details, price,
                and format before you decide.
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
            to preview. TaleMori will follow up by WhatsApp or email with the
            pilot kit details before you decide.
          </p>
          <ul className="plain-list">
            <li>No payment is charged today.</li>
            <li>No subscription is started.</li>
            <li>You&apos;ll see the format and price before choosing.</li>
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
