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
          The first MVP keeps everything simple so the product can be tested before
          building a larger platform.
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
          <p className="eyebrow">Validation focus</p>
          <h2>Learn what parents will actually buy.</h2>
          <p>
            The website should answer whether parents understand the offer, prefer
            PDF or printed formats, care about the 3D bundle, and might preorder a
            one-off kit before any subscription is built.
          </p>
        </div>
        <Link className="button primary" href="/#interest">
          Share interest
        </Link>
      </section>
    </main>
  );
}
