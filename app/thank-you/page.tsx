import Link from "next/link";

export default function ThankYouPage() {
  return (
    <main>
      <section className="simple-hero thank-you">
        <p className="eyebrow">Thank you</p>
        <h1>Your interest was noted locally.</h1>
        <p className="lead">
          This MVP form is currently a placeholder and does not store submissions yet.
          Connect Supabase, Airtable, Google Forms, or another backend before using it
          with real customers.
        </p>
        <Link className="button primary" href="/">
          Back to Milamula
        </Link>
      </section>
    </main>
  );
}
