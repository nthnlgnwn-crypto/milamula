import Link from "next/link";

const steps = [
  {
    title: "Read the story",
    copy: "Meet Mori and begin one short illustrated adventure with your child."
  },
  {
    title: "Make the activity",
    copy: "Use a printable mission page with simple home materials."
  },
  {
    title: "Play the mission",
    copy: "Help Mori complete a small story task through calm, screen-light play."
  },
  {
    title: "Keep the little light",
    copy: "Use the parent guide for prompts if you want to keep the story going."
  }
];

export default function HowItWorksPage() {
  return (
    <main>
      <section className="simple-hero">
        <p className="eyebrow">Parent guide</p>
        <h1>How TaleMori works</h1>
        <p className="lead">
          TaleMori turns one gentle story into a ready-to-use parent-child play
          mission. The first kit keeps everything simple: one Mori story, one
          printable mission, and one clear activity to do together.
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
          <p className="eyebrow">Early list</p>
          <h2>Hear first when Mori and the Lost Moonlight is ready.</h2>
          <p>
            Joining the list does not charge payment or start a subscription.
            TaleMori will contact you with the pilot kit details, price, and
            format before you decide.
          </p>
        </div>
        <Link className="button primary" href="/#interest">
          Join the first adventure list
        </Link>
      </section>
    </main>
  );
}
