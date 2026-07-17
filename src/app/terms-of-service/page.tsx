/* eslint-disable react/no-unescaped-entities -- Legal copy is maintained verbatim. */
import React from "react";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import Link from "next/link";

export default function TermsOfService() {
    return (
        <main className="min-h-screen bg-white text-black font-sans">
            <Navbar />

            <div className="max-w-6xl mx-auto pt-40 pb-24 px-6">
                <h1 className="text-4xl md:text-6xl text-center font-black uppercase mb-16 tracking-tight text-primary">
                    Terms of Use
                </h1>

                <div className="space-y-8 text-[17px] leading-relaxed text-neutral-900">
                    <p>
                        Welcome to Gödel Labs, Inc. (together with its subdomains, Content, Marks and services, the “Site”). Please read the following Terms of Use carefully before using this Site so that you are aware of your legal rights and obligations with respect to Gödel Labs, Inc. ("Gödel Labs", "we", "our" or "us"). By accessing or using the Site, you expressly acknowledge and agree that you are entering a legal agreement with us and have understood and agree to comply with, and be legally bound by, these Terms of Use, together with the Privacy Policy (the "Terms"). You hereby waive any applicable rights to require an original (non-electronic) signature or delivery or retention of non- electronic records, to the extent not prohibited under applicable law. If you do not agree to be bound by these Terms please do not access or use the Site.
                    </p>

                    <p>
                        <span className="font-bold text-black">1. Background.</span> The Site is intended to provide general information regarding Gödel Labs, its products and services.
                    </p>

                    <p>
                        <span className="font-bold text-black">2. Modification.</span> We reserve the right, at our discretion, to change these Terms at any time. Such change will be effective ten (10) days following posting of the revised Terms on the Site, and your continued use of the Site thereafter means that you accept those changes.
                    </p>

                    <p>
                        <span className="font-bold text-black">3. Ability to Accept Terms.</span> The Site is only intended for individuals aged thirteen (13) years or older. If you are under 13 years please do not visit or use the Site. If you are between 13 and 18 years of age, then you must review these Terms with you parent or guardian before visiting or using the Site to make sure that you and your parent or guardian understand these Terms and agree to them.
                    </p>

                    <p>
                        <span className="font-bold text-black">4. Site Access.</span> For such time as these Terms are in effect, we hereby grant you permission to visit and use the Site provided that you comply with these Terms and applicable law.
                    </p>

                    <p>
                        <span className="font-bold text-black">5. Restrictions.</span> You shall not: (i) copy, distribute or modify any part of the Site without our prior written authorization; (ii) use, modify, create derivative works of, transfer (by sale, resale, license, sublicense, download or otherwise), reproduce, distribute, display or disclose Content (defined below), except as expressly authorized herein; (iii) disrupt servers or networks connected to the Site; (iv) use or launch any automated system (including without limitation, "robots" and "spiders") to access the Site; and/or (v) circumvent, disable or otherwise interfere with security-related features of the Site or features that prevent or restrict use or copying of any Content or that enforce limitations on use of the Site.
                    </p>

                    <p>
                        <span className="font-bold text-black">6. Payments to Gödel Labs.</span> Except as expressly set forth in the Terms, your general right to access and use the Site is currently for free, but we may in the future charge a fee for certain access or usage. You will not be charged for any such access or use of the Site unless you first agree to such charges, but please be aware that any failure to pay applicable charges may result in you not having access to some or all of the Site.
                    </p>

                    <div className="space-y-4">
                        <p>
                            <span className="font-bold text-black">7. Intellectual Property Rights.</span>
                        </p>
                        <p className="pl-4">
                            <span className="font-bold text-black">7.1. Content and Marks.</span> The (i) content on the Site, including without limitation, the text, documents, articles, brochures, descriptions, products, software, graphics, photos, sounds, videos, interactive features, and services (collectively, the "Materials" or "Content"), and (ii) the trademarks, service marks and logos contained therein ("Marks"), are the property of Gödel Labs and/or its licensors and may be protected by applicable copyright or other intellectual property laws and treaties. “Gödel Labs”, Gödel Labs logo, and other marks are Marks of Gödel Labs or its affiliates. All other trademarks, service marks, and logos used on the Site are the trademarks, service marks, or logos of their respective owners. We reserve all rights not expressly granted in and to the Site and the Content.
                        </p>
                        <p className="pl-4">
                            <span className="font-bold text-black">7.2. Use of Content.</span> Content on the Site is provided to you for your information and personal use only and may not be used, modified, copied, distributed, transmitted, broadcast, displayed, sold, licensed, de-compiled, or otherwise exploited for any other purposes whatsoever without our prior written consent. If you download or print a copy of the Content you must retain all copyright and other proprietary notices contained therein.
                        </p>
                    </div>

                    <p>
                        <span className="font-bold text-black">8. Information Description.</span> We attempt to be as accurate as possible. However, we cannot and do not warrant that the Content available on the Site is accurate, complete, reliable, current, or error-free. We reserve the right to make changes in or to the Content, or any part thereof, in our sole judgment, without the requirement of giving any notice prior to or after making such changes to the Content. Your use of the Content, or any part thereof, is made solely at your own risk and responsibility.
                    </p>

                    <div className="space-y-4">
                        <p>
                            <span className="font-bold text-black">9. Links.</span>
                        </p>
                        <p className="pl-4">
                            <span className="font-bold text-black">9.1.</span> The Site may contain links, and may enable you to post content, to third party websites that are not owned or controlled by Gödel Labs. We are not affiliated with, have no control over, and assume no responsibility for the content, privacy policies, or practices of, any third party websites. You: (i) are solely responsible and liable for your use of and linking to third party websites and any content that you may send or post to a third party website; and (ii) expressly release Gödel Labs from any and all liability arising from your use of any third party website. Accordingly, we encourage you to read the terms and conditions and privacy policy of each third party website that you may choose to visit.
                        </p>
                        <p className="pl-4">
                            <span className="font-bold text-black">9.2.</span> Gödel Labs permits you to link to the Site provided that: (i) you link to but do not replicate any page on this Site; (ii) the hyperlink text shall accurately describe the Content as it appears on the Site; (iii) you shall not misrepresent your relationship with Gödel Labs or present any false information about Gödel Labs and shall not imply in any way that we are endorsing any services or products, unless we have given you our express prior consent; (iv) you shall not link from a website ("Third Party Website") which prohibited linking to third parties; (v) such Third party Website does not contain content that (a) is offensive or controversial (both at our discretion), or (b) infringes any intellectual property, privacy rights, or other rights of any person or entity; and/or (vi) you, and your website, comply with these Terms and applicable law.
                        </p>
                    </div>

                    <p>
                        <span className="font-bold text-black">10. Privacy.</span> We will use any personal information that we may collect or obtain in connection with the Site in accordance with our <Link href="/privacy-policy" className="text-primary underline decoration-2 underline-offset-4 font-bold">Privacy Policy</Link>. You agree that we may use personal information that you provide or make available to us in accordance with the Privacy Policy.
                    </p>

                    <div className="space-y-4">
                        <p>
                            <span className="font-bold text-black">11. Warranty Disclaimers.</span>
                        </p>
                        <p className="pl-4">
                            <span className="font-bold text-black">11.1.</span> This section applies whether or not the services provided under the Site are for payment. Applicable law may not allow the exclusion of certain warranties, so to that extent certain exclusions set forth herein may not apply.
                        </p>
                        <p className="pl-4 uppercase">
                            <span className="font-bold">11.2.</span> THE SITE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, AND WITHOUT WARRANTIES OF ANY KIND EITHER EXPRESS OR IMPLIED. GÖDEL LABS HEREBY DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, TITLE, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, AND THOSE ARISING BY STATUTE OR FROM A COURSE OF DEALING OR USAGE OF TRADE. GÖDEL LABS DOES NOT GUARANTEE THAT THE SITE WILL BE FREE OF BUGS, SECURITY BREACHES, OR VIRUS ATTACKS. THE SITE MAY OCCASIONALLY BE UNAVAILABLE FOR ROUTINE MAINTENANCE, UPGRADING, OR OTHER REASONS. YOU AGREE THAT GÖDEL LABS WILL NOT BE HELD RESPONSIBLE FOR ANY CONSEQUENCES TO YOU OR ANY THIRD PARTY THAT MAY RESULT FROM TECHNICAL PROBLEMS OF THE INTERNET, SLOW CONNECTIONS, TRAFFIC CONGESTION OR OVERLOAD OF OUR OR OTHER SERVERS. WE DO NOT WARRANT, ENDORSE OR GUARANTEE ANY CONTENT, PRODUCT, OR SERVICE THAT IS FEATURED OR ADVERTISED ON THE SITE BY A THIRD PARTY.
                        </p>
                        <p className="pl-4 uppercase">
                            <span className="font-bold">11.3.</span> EXCEPT AS EXPRESSLY STATED IN OUR PRIVACY POLICY, GÖDEL LABS DOES NOT MAKE ANY REPRESENTATIONS, WARRANTIES OR CONDITIONS OF ANY KIND, EXPRESS OR IMPLIED, AS TO THE SECURITY OF ANY INFORMATION YOU MAY PROVIDE OR ACTIVITIES YOU ENGAGE IN DURING THE COURSE OF YOUR USE OF THE SITE.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <p>
                            <span className="font-bold text-black">12. Limitation of Liability.</span>
                        </p>
                        <p className="pl-4 uppercase">
                            <span className="font-bold">12.1.</span> TO THE FULLEST EXTENT PERMISSIBLE BY LAW, GÖDEL LABS SHALL NOT BE LIABLE FOR ANY DIRECT, INDIRECT, EXEMPLARY, SPECIAL, CONSEQUENTIAL, OR INCIDENTAL DAMAGES OF ANY KIND, OR FOR ANY LOSS OF DATA, REVENUE, PROFITS OR REPUTATION, ARISING UNDER THESE TERMS OR OUT OF YOUR USE OF, OR INABILITY TO USE, THE SITE, EVEN IF GÖDEL LABS HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES OR LOSSES. Some jurisdictions do not allow the limitation or exclusion of liability for incidental or consequential damages, so the above limitations may not apply to you.
                        </p>
                        <p className="pl-4 uppercase">
                            <span className="font-bold">12.2.</span> IN NO EVENT SHALL THE AGGREGATE LIABILITY OF GÖDEL LABS FOR ANY DAMAGES ARISING UNDER THESE TERMS OR OUT OF YOUR USE OF, OR INABILITY TO USE, THE SITE EXCEED THE TOTAL AMOUNT OF FEES, IF ANY, PAID BY YOU TO GÖDEL LABS FOR USING THE SITE DURING THE THREE (3) MONTHS PRIOR TO BRINGING THE CLAIM.
                        </p>
                    </div>

                    <p>
                        <span className="font-bold text-black">13. Indemnity.</span> You agree to defend, indemnify and hold harmless Gödel Labs and our affiliates, and our respective officers, directors, employees and agents, from and against any and all claims, damages, obligations, losses, liabilities, costs and expenses (including but not limited to attorney's fees) arising from: (i) your use of, or inability to use, the Site; or (ii) your violation of these Terms.
                    </p>

                    <p>
                        <span className="font-bold text-black">14. Term and Termination.</span> These Terms are effective until terminated by Gödel Labs or you. Gödel Labs, in its sole discretion, has the right to terminate these Terms and/or your access to the Site, or any part thereof, immediately at any time and with or without cause (including, without any limitation, for a breach of these Terms). Gödel Labs shall not be liable to you or any third party for termination of the Site, or any part thereof. If you object to any term or condition of these Terms, or any subsequent modifications thereto, or become dissatisfied with the Site in any way, your only recourse is to immediately discontinue use of the Site. Upon termination of these Terms, you shall cease all use of the Site. This Section 14 and Sections 7 (Intellectual Property Rights), 10 (Privacy), 11 (Warranty Disclaimers), 12 (Limitation of Liability), 13 (Indemnity), and 15 (Independent Contractors) to 17 (General) shall survive termination of these Terms.
                    </p>

                    <p>
                        <span className="font-bold text-black">15. Independent Contractors.</span> You and Gödel Labs are independent contractors. Nothing in these Terms creates a partnership, joint venture, agency, or employment relationship between you and Gödel Labs. You must not under any circumstances make, or undertake, any warranties, representations, commitments or obligations on behalf of Gödel Labs.
                    </p>

                    <p>
                        <span className="font-bold text-black">16. Assignment.</span> These Terms, and any rights and licenses granted hereunder, may not be transferred or assigned by you but may be assigned by Gödel Labs without restriction or notification to you.
                    </p>

                    <p>
                        <span className="font-bold text-black">17. General.</span> Gödel Labs reserves the right to discontinue or modify any aspect of the Site at any time. These Terms and the relationship between you and Gödel Labs shall be governed by and construed in accordance with the laws of the State of Israel, without regard to its principles of conflict of laws. You agree to submit to the personal and exclusive jurisdiction of the courts located in Tel-Aviv, Israel and waive any jurisdictional, venue, or inconvenient forum objections to such courts, provided that Gödel Labs may seek injunctive relief in any court of competent jurisdiction. These Terms shall constitute the entire agreement between you and Gödel Labs concerning the Site. If any provision of these Terms is deemed invalid by a court of competent jurisdiction, the invalidity of such provision shall not affect the validity of the remaining provisions of these Terms, which shall remain in full force and effect. No waiver of any term of these Terms shall be deemed a further or continuing waiver of such term or any other term, and a party's failure to assert any right or provision under these Terms shall not constitute a waiver of such right or provision. <span className="uppercase font-bold">YOU AGREE THAT ANY CAUSE OF ACTION THAT YOU MAY HAVE ARISING OUT OF OR RELATED TO THE SITE MUST COMMENCE WITHIN ONE (1) YEAR AFTER THE CAUSE OF ACTION ACCRUES. OTHERWISE, SUCH CAUSE OF ACTION IS PERMANENTLY BARRED.</span>
                    </p>
                </div>
            </div>

            <Footer />
        </main>
    );
}
