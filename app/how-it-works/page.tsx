import Link from "next/link";

const steps = [
  {
    title: "Read the story",
    copy: "Meet Mori and follow a short illustrated adventure with your child."
  },
  {
    title: "Make the activity",
    copy: "Use a printable mission page to turn the story into a hands-on moment."
  },
  {
    title: "Play the mission",
    copy: "Retell the adventure, choose the next little step, and name a feeling."
  },
  {
    title: "Keep the little light",
    copy: "Use the parent guide to connect Mori's mission to everyday brave beginnings."
  }
];

export default function HowItWorksPage() {
  return (
    <main>
      <section className="simple-hero">
        <p className="eyebrow">Parent guide</p>
        <h1>How TaleMori works</h1>
        <p className="lead">
          TaleMori is designed for short, warm parent-child activity sessions.
          The first kit keeps everything simple: one Mori story, one printable
          mission, and one little light to carry forward.
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
          <h2>Help shape TaleMori&apos;s first small release.</h2>
          <p>
            Early interest helps TaleMori understand whether families prefer
            printable pages, printed packs, or future parent-supervised
            collectible story objects.
          </p>
        </div>
        <Link className="button primary" href="/#interest">
          Join the first adventure
        </Link>
      </section>
    </main>
  );
}
