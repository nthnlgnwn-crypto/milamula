import Link from "next/link";

export default function ThankYouPage() {
  return (
    <main>
      <section className="simple-hero thank-you">
        <p className="eyebrow">Thank you</p>
        <h1>Thank you for joining TaleMori&apos;s first adventure list.</h1>
        <p className="lead">
          Your preorder interest has been received. TaleMori will follow up by
          WhatsApp or email when Mori and the Lost Moonlight is ready to preview.
          No payment has been charged.
        </p>
        <Link className="button primary" href="/">
          Back to TaleMori
        </Link>
      </section>
    </main>
  );
}
