export default function PrivacyPolicy() {
  return (
    <div className="text-black md:mx-40 mb-10">
      <main className="container mx-auto px-4 py-2 md:py-6">
        <h2 className="text-[40px] mb-6 text-center">Privacy Policy</h2>

        <p className="mb-8">
          This Privacy Policy describes how Mr. Mard (“we”, “us”, or “our”)
          collects, uses, and discloses personal information (“Personal
          Information”) in connection with your use of our website and services
          (collectively, the “Platform”).
        </p>

        <section className="mb-8">
          <h3 className="text-[22px] mb-3">Information We Collect</h3>
          <ul className="list-disc pl-8 mb-3">
            <li>
              Contact Information: Name, email address, phone number, shipping
              address, and billing address.
            </li>
            <li>
              Order Information: Products purchased, order history, payment
              information (excluding full credit card details), and any
              associated communication regarding your orders.
            </li>
            <li>
              Technical Information: Device information, IP address, browsing
              activity on the Platform, and cookies.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="text-[22px] mb-3">How We Use Your Information</h3>
          <ul className="list-disc pl-8 mb-3">
            <li>To fulfill your orders and process payments.</li>
            <li>
              To communicate with you about your orders, including order
              confirmations, shipping updates, and customer service inquiries.
            </li>
            <li>
              To personalize your experience on the Platform by recommending
              products and content that may be of interest to you.
            </li>
            <li>To improve the Platform and our services.</li>
            <li>To comply with legal and regulatory requirements.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="text-[22px] mb-3">Data Sharing and Disclosure</h3>
          <ul className="list-disc pl-8 mb-3">
            <li>
              We will not sell, share, or disclose your Personal Information to
              any third party for marketing purposes.
            </li>
            <li>
              We may share your Personal Information with service providers who
              assist us with order fulfillment, payment processing, and website
              maintenance. These service providers will be contractually
              obligated to protect your Personal Information.
            </li>
            <li>
              We may disclose your information to law enforcement or other
              government agencies as required by law or legal process.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="text-[22px] mb-3">Data Retention</h3>
          <p>
            We will retain your Personal Information for as long as necessary to
            fulfill the purposes described in this Privacy Policy, unless a
            longer retention period is required or permitted by law.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-[22px] mb-3">Your Privacy Choices</h3>
          <ul className="list-disc pl-8 mb-3">
            <li>
              You can access and update your Personal Information through your
              account settings on the Platform.
            </li>
            <li>
              You can opt out of receiving marketing communications from us by
              following the unsubscribe instructions in such communications.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="text-[22px] mb-3">Security</h3>
          <p>
            We take reasonable measures to protect your Personal Information
            from unauthorized access, disclosure, alteration, or destruction.
            However, no internet transmission or electronic storage method is
            100% secure.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-[22px] mb-3">Children’s Privacy</h3>
          <p>
            Our Platform is not intended for children under the age of 13. We do
            not knowingly collect Personal Information from children under 13.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-[22px] mb-3">Changes to this Privacy Policy</h3>
          <p>
            We may update this Privacy Policy from time to time by posting the
            revised version on the Platform. You are advised to review this
            Privacy Policy periodically for any changes.
          </p>
        </section>

        <section className="mb-16">
          <h3 className="text-[22px] mb-3">Contact Us</h3>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at{" "}
            <a href="mailto:contactus@mrmard.com" className="text-blue-600">
              contactus@mrmard.com
            </a>
            .
          </p>
        </section>
      </main>
    </div>
  );
}
