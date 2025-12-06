import { Header } from './Header';
import { Footer } from './Footer';
import { Page } from '../types';

interface PrivacyPolicyProps {
    onNavigate: (page: Page) => void;
    onBack?: () => void;
}

export function PrivacyPolicy({ onNavigate, onBack }: PrivacyPolicyProps) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header onNavigate={onNavigate} currentPage="privacy-policy" onBack={onBack} />

            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
                <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy & Terms of Use</h1>

                    <div className="prose prose-blue max-w-none text-gray-600 space-y-6">
                        <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Introduction & Acceptance of Terms</h2>
                            <p>
                                Welcome to HiddenGems Colleges. By accessing or using our website, you agree to be bound by these Terms of Use and our Privacy Policy.
                                If you do not agree to these terms, please do not use our services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Role of HiddenGems Colleges</h2>
                            <p>
                                HiddenGems Colleges acts solely as an intermediary platform connecting students with educational institutions. We are an aggregator of information
                                provided by colleges and do not own, operate, or control any of the institutions listed on our platform.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Limitation of Liability</h2>
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm">
                                <p className="font-bold mb-2">IMPORTANT NOTICE:</p>
                                <p>
                                    TO THE FULLEST EXTENT PERMITTED BY LAW, HIDDENGEMS COLLEGES SHALL NOT BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL,
                                    OR EXEMPLARY DAMAGES, INCLUDING BUT NOT LIMITED TO DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
                                </p>
                                <ul className="list-disc pl-5 mt-2 space-y-1">
                                    <li>YOUR USE OR INABILITY TO USE THE SERVICE;</li>
                                    <li>ANY DISPUTE BETWEEN YOU AND ANY COLLEGE OR EDUCATIONAL INSTITUTION;</li>
                                    <li>THE QUALITY, ACCURACY, OR RELIABILITY OF ANY INFORMATION PROVIDED BY COLLEGES;</li>
                                    <li>ANY ADMISSION DECISIONS, FEE DISPUTES, OR EDUCATIONAL OUTCOMES.</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. No Endorsement or Guarantee</h2>
                            <p>
                                The inclusion of any college on our platform does not constitute an endorsement or recommendation. We do not guarantee admission,
                                job placements, or specific educational outcomes. Students are strictly advised to verify all information, including accreditation,
                                fees, and facilities, directly with the college authorities before taking admission.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Data Collection & Usage</h2>
                            <p>
                                We collect personal information (Name, Phone, Email, City) to facilitate your college search and application process. By using our service,
                                you explicitly consent to us sharing this information with the colleges you express interest in or apply to.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Dispute Resolution</h2>
                            <p>
                                Any dispute arising between a student and a college is a matter strictly between those two parties. HiddenGems Colleges is not a party to
                                any such dispute and has no obligation to mediate or resolve it. You hereby release HiddenGems Colleges from any claims, demands, and damages
                                arising out of or in any way connected with such disputes.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Contact Us</h2>
                            <p>
                                For any legal or privacy-related queries, please contact us at:
                            </p>
                            <p className="mt-2">
                                <strong>Email:</strong> hiddengemscollege@gmail.com<br />
                                <strong>Phone:</strong> +91 95307 89815
                            </p>
                        </section>
                    </div>
                </div>
            </main>

            <Footer onNavigate={onNavigate} />
        </div>
    );
}
