import Image from "next/image";
import Link from "next/link";
import { PreorderForm } from "@/app/components/PreorderForm";
import { faqs, firstKit, kitFormats } from "@/lib/content";

const promises = [
  {
    title: "Simple setup",
    copy: "Start with a short story and one printable mission instead of a complicated craft plan."
  },
  {
    title: "Printable-first",
    copy: "Use the kit at home with paper, crayons, and a few parent prompts before any physical bundle exists."
  },
  {
    title: "Early preorder list",
    copy: "Share interest now so TaleMori can plan the first small release. No payment is charged here."
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

export default function Home() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-hero-copy">
          <p className="eyebrow">Meet Mori, the Little Lantern Keeper</p>
          <h1>TaleMori</h1>
          <p className="lead">
            Stories that grow into play. Follow Mori into screen-light story
            missions made for parents and children ages 4-7.
          </p>
          <div className="button-row">
            <Link className="button primary" href="#interest">
              Join the first adventure
            </Link>
            <Link className="button secondary" href="#mori">
              Meet Mori
            </Link>
            <Link className="text-link" href="/kit/adventure-kit-1">
              See the kit
            </Link>
          </div>
          <dl className="hero-facts" aria-label="TaleMori kit summary">
            <div>
              <dt>Age</dt>
              <dd>4-7 with guidance</dd>
            </div>
            <div>
              <dt>First kit</dt>
              <dd>{firstKit.title}</dd>
            </div>
            <div>
              <dt>Phrase</dt>
              <dd>A little light for every brave beginning.</dd>
            </div>
          </dl>
        </div>
        <div className="hero-art hero-art-featured" aria-label="Mori character concept">
          <figure className="image-card image-card-wide">
            <Image
              src="/assets/characters/mori-concept-final.png"
              alt="Mori the Little Lantern Keeper character concept"
              width={1536}
              height={1024}
              priority
            />
            <figcaption>Mori carries the Lantern of Little Lights.</figcaption>
          </figure>
        </div>
      </section>

      <section className="section kit-preview-section" id="mori">
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

      <section className="section promise-section">
        <div className="section-heading centered">
          <p className="eyebrow">What TaleMori is</p>
          <h2>A story-led activity kit for screen-light creative time.</h2>
          <p>
            Mori helps little hearts find courage, name feelings, and complete
            small story missions through reading, making, and pretend play.
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
          <div className="kit-preview-media character-portrait">
            <Image
              src="/assets/characters/mori-concept-final.png"
              alt="TaleMori first adventure kit preview with Mori"
              width={1536}
              height={1024}
            />
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
              Join the first adventure
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
