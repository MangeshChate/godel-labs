import React from "react";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import Link from "next/link";

export default function PrivacyPolicy() {
    const emailClass = "text-primary underline decoration-2 underline-offset-4 font-bold";

    return (
        <main className="min-h-screen bg-white text-black font-sans">
            <Navbar />

            <div className="max-w-6xl mx-auto pt-40 pb-24 px-6">
                <h1 className="text-4xl md:text-6xl font-black uppercase mb-16 tracking-tight text-center text-primary">
                    Privacy Policy
                </h1>

                <div className="space-y-8 text-[17px] leading-relaxed text-neutral-900">
                    <p>
                        This is the privacy policy (“Privacy Policy”) that governs how we, <span className="font-bold text-black uppercase tracking-tight">Gödel Labs, Inc.</span> (“Gödel Labs”, “we”, “our” or “us”), use Personal Information (defined below) that we collect, receive and store about individuals in connection with (i) the use of the website <Link href="/" className="text-primary underline decoration-2 underline-offset-4 font-bold">godel-labs.ai</Link>, and (ii) the Gödel Labs software platform (the “Platform”). The Site and the Platform are individually and collectively referred to herein as the “Services”.
                    </p>

                    <p>
                        We do not ourselves host the Services – all hosting is done by third party service providers that we engage. This means that data you provide us or that we collect from you (including any Personal Information, as defined below) – as further described in this Privacy Policy – is hosted with such third party service providers on servers that they own or control. Regardless of where such third party service providers are located (and some are located in the US), their servers may be located anywhere in the world (including the US).
                    </p>

                    <p>
                        <span className="font-bold text-black">1. Introduction.</span> We have implemented this Privacy Policy because your privacy, and the privacy of other users, is important to us. This Privacy Policy explains our online information practices and the choices you can make about the way your Personal Information is collected and used in connection with the Services. “Personal Information” means any information that may be used, either alone or in combination with other information, to personally identify an individual, including, but not limited to, a first and last name, a personal profile, an email address, a home or other physical address, or other contact information.
                    </p>

                    <p>
                        <span className="font-bold text-black">2. Terms of Use.</span> This Privacy Policy forms part of our <Link href="/terms-of-service" className="text-primary underline decoration-2 underline-offset-4 font-bold">Terms of Use</Link>. Any capitalized but undefined term in this Privacy Policy shall have the meaning given to it in the Terms.
                    </p>

                    <p>
                        <span className="font-bold text-black">3. Consent and Modification.</span> You are not legally obligated to provide us Personal Information, and you hereby confirm that providing us Personal Information is at your own free will. By using the Services, you consent to the terms of this Privacy Policy and to our collection, processing and sharing of Personal Information for the purposes set forth herein. If you do not agree to this Privacy Policy, please do not accessor otherwise use the Services. We reserve the right, at our discretion, to change this Privacy Policy at any time. Such change will be effective ten (10) days following posting of the revised Privacy Policy on the Services, and your continued use of the Services thereafter means that you accept those changes.
                    </p>

                    <div className="space-y-4">
                        <p>
                            <span className="font-bold text-black">4. What Personal Information We Collect and How We Collect It.</span> We do not currently require you to provide Personal Information in order to have access to general information available on the Services. But, we do receive and/or collect Personal Information from you in the following ways:
                        </p>
                        <p className="pl-4">
                            <span className="font-bold text-black">4.1. Account.</span> In order to use certain services that we offer via the Services, you may be required to create an account (“Account”). If you create an Account you will be required to provide us with certain information, such as your name, email address, phone number, your organization name, your position and title, as well as a password that you will use for your Account (“Account Information”).
                        </p>
                        <p className="pl-4">
                            <span className="font-bold text-black">4.2. Requesting a Demo.</span> The Site may include the option to request a demo of our products. If you request to receive a demo of our products, you must provide us certain information such as your full name, business email address, company name, job title, phone number, country and any other information that you decide to provide us.
                        </p>
                        <p className="pl-4">
                            <span className="font-bold text-black">4.3. Log Files.</span> We may make use of log files. The information inside the log files includes internet protocol (IP) addresses, type of browser, Internet Service Provider (ISP), date/time stamp, referring/exit pages, clicked pages and any other information your browser may send to us.
                        </p>
                        <p className="pl-4">
                            <span className="font-bold text-black">4.4. Cookies and Other Tracking Technologies.</span> Our Services may utilize “cookies”, anonymous identifiers and other tracking technologies in order to for us to provide our Services and present you with information that is customized for you.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <p>
                            <span className="font-bold text-black">5. The Way We Use Personal Information.</span>
                        </p>
                        <p className="pl-4">
                            <span className="font-bold text-black">5.1.</span> We will use your Personal Information to provide and improve our Services, to send you marketing/advertisement communications that we believe may be of interest to you, to contact you in connection with the Services and to identify and authenticate your access.
                        </p>
                        <p className="pl-4">
                            <span className="font-bold text-black">5.2.</span> We may transfer your Personal Information to our local or foreign subsidiaries or affiliated companies for the purpose of storing or processing such information on our behalf.
                        </p>
                        <p className="pl-4">
                            <span className="font-bold text-black">5.3.</span> We may share your Personal Information with our third party service providers and partners, but only to assist us with our business operations and to provide our Services to you and other users.
                        </p>
                        <p className="pl-4">
                            <span className="font-bold text-black">5.4.</span> We may disclose your Personal Information or any information you submitted via the Services if we have a good faith belief that disclosure is necessary to comply with any applicable law or legal process.
                        </p>
                    </div>

                    <p>
                        <span className="font-bold text-black">6. Use of Anonymous Information.</span> We may use Anonymous Information or disclose it to third party service providers in order to improve our Services and enhance your experience.
                    </p>

                    <p>
                        <span className="font-bold text-black">7. Opting Out.</span> You may choose not to receive future promotional, advertising, or other Site-related emails from us by selecting an unsubscribe link at the bottom of each email that we send.
                    </p>

                    <p>
                        <span className="font-bold text-black">8. Choice.</span> At all times, you may choose whether or not to provide or disclose Personal Information. If you choose not to provide mandatory Personal Information, you may still visit parts of the Services.
                    </p>

                    <p>
                        <span className="font-bold text-black">9. Access/Accuracy.</span> To the extent that you do provide us with Personal Information, we wish to maintain accurate Personal Information. If you would like to delete or correct any of your other Personal Information, you may submit an access request by sending an email to <a href="mailto:privacy@godel-labs.ai" className={emailClass}>privacy@godel-labs.ai</a>.
                    </p>

                    <p>
                        <span className="font-bold text-black">10. Links to and Interaction with Third Party Products.</span> The Services may enable you to interact with or contain links to your Third Party Account and other third party websites, mobile software applications and Services.
                    </p>

                    <p>
                        <span className="font-bold text-black">11. Children’s Privacy.</span> The Services are not structured to attract children under the age of 13 years. If you believe that we might have any such information, please contact us at <a href="mailto:privacy@godel-labs.ai" className={emailClass}>privacy@godel-labs.ai</a>.
                    </p>

                    <p>
                        <span className="font-bold text-black">12. Security.</span> The security of Personal Information is important to us. We follow generally accepted industry standards to protect the Personal Information submitted to us. If you have any questions about security on the Service, you can contact us at <a href="mailto:security@godel-labs.ai" className={emailClass}>security@godel-labs.ai</a>.
                    </p>

                    <p>
                        <span className="font-bold text-black">13. Merger, Sale or Bankruptcy.</span> In the event that we are acquired by or merged with a third party entity, we reserve the right to transfer or assign Personal Information.
                    </p>

                    <p>
                        <span className="font-bold text-black">14. California Privacy Rights.</span> To make such a request, please send an email to <a href="mailto:privacy@godel-labs.ai" className={emailClass}>privacy@godel-labs.ai</a>.
                    </p>

                    <p>
                        <span className="font-bold text-black">15. Our California Do Not Track Notice.</span> We do not track consumers over time and across third party websites and therefore do not respond to Do Not Track signals.
                    </p>

                    <p>
                        <span className="font-bold text-black">16. Deletion of Content from California Residents.</span> If you are a California resident under the age of 18 and a registered user, you may remove content or Personal Information you have publicly posted.
                    </p>

                    <p>
                        <span className="font-bold text-black">17. Commitment.</span> We are committed to protecting your privacy. If you have any comments or questions regarding our Privacy Policy, please contact us at <a href="mailto:privacy@godel-labs.ai" className={emailClass}>privacy@godel-labs.ai</a>.
                    </p>
                </div>
            </div>

            <Footer />
        </main>
    );
}
