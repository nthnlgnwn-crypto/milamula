import Link from "next/link";

const steps = [
  {
    title: "Read",
    copy: "Start with a short parent-read story that introduces one gentle value."
  },
  {
    title: "Make or color",
    copy: "Use a printable activity page to turn the story into a hands-on moment."
  },
  {
    title: "Talk",
    copy: "Use simple prompts so parents can connect the activity to everyday life."
  },
  {
    title: "Extend",
    copy: "Optionally add parent-supervised 3D-printed story objects after safety and production checks."
  }
];

export default function HowItWorksPage() {
  return (
    <main>
      <section className="simple-hero">
        <p className="eyebrow">Parent guide</p>
        <h1>How Milamula works</h1>
        <p className="lead">
          Milamula is designed for short, warm parent-child activity sessions.
          The first kit keeps everything simple so families can try one story-led
          activity before Milamula grows into more.
        </p>
      </section>

      <section className="section">
        <div className="step-list">
          {steps.map((step, index) => (
            <article className="step-card" key={step.title}>
              <span>{index + 1}</span>
              <h2>{step.title}</h2>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section split">
        <div>
          <p className="eyebrow">Why the early list matters</p>
          <h2>Help choose what Milamula makes first.</h2>
          <p>
            Early interest helps Milamula understand whether families prefer printable
            pages, printed packs, or a parent-supervised 3D story bundle.
          </p>
        </div>
        <Link className="button primary" href="/#interest">
          Share interest
        </Link>
      </section>
    </main>
  );
}
