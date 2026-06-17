import Link from "next/link";

export default function ThankYouPage() {
  return (
    <main>
      <section className="simple-hero thank-you">
        <p className="eyebrow">Thank you</p>
        <h1>Thank you for caring about Milamula.</h1>
        <p className="lead">
          Your preorder interest has been received. Milamula will follow up by
          WhatsApp or email when the first kit is ready to preview. No payment has
          been charged.
        </p>
        <Link className="button primary" href="/">
          Back to Milamula
        </Link>
      </section>
    </main>
  );
}
