import { Link } from "react-router";
import { FileText, Sparkles, ArrowLeft } from "lucide-react";

export function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 light:from-slate-50 light:via-slate-100 light:to-slate-50">
      <header className="border-b border-slate-800/50 light:border-slate-200 bg-slate-900/30 light:bg-white/80 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white light:text-slate-900">AI Code Review</h1>
            </div>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 text-slate-400 light:text-slate-600 hover:text-white light:hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-8 h-8 text-purple-400" />
            <h1 className="text-4xl font-bold text-white light:text-slate-900">Terms of Service</h1>
          </div>
          <p className="text-slate-400 light:text-slate-600">Last updated: June 6, 2026</p>
        </div>

        <div className="rounded-xl bg-slate-900/50 light:bg-white backdrop-blur border border-slate-800/50 light:border-slate-200 p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-white light:text-slate-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-slate-300 light:text-slate-700 leading-relaxed">
              By accessing and using AI Code Review Assistant ("Service"), you accept and agree to be bound by the
              terms and provision of this agreement. If you do not agree to these Terms of Service, please do not
              use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white light:text-slate-900 mb-4">2. Description of Service</h2>
            <p className="text-slate-300 light:text-slate-700 leading-relaxed">
              AI Code Review Assistant provides automated code analysis and review services using artificial
              intelligence. The Service analyzes code submissions and provides feedback on potential bugs, security
              vulnerabilities, code quality, and best practices.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white light:text-slate-900 mb-4">3. User Accounts</h2>
            <div className="space-y-4 text-slate-300 light:text-slate-700 leading-relaxed">
              <p>When creating an account, you agree to:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain the security of your password and account</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized use</li>
                <li>Not share your account credentials with others</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white light:text-slate-900 mb-4">4. Acceptable Use</h2>
            <div className="space-y-4 text-slate-300 light:text-slate-700 leading-relaxed">
              <p>You agree NOT to:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Submit malicious code designed to harm systems or users</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on intellectual property rights of others</li>
                <li>Attempt to reverse engineer or manipulate the Service</li>
                <li>Use the Service to train competing AI models</li>
                <li>Exceed API rate limits or abuse the Service</li>
                <li>Submit code containing personal, sensitive, or classified information</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white light:text-slate-900 mb-4">
              5. Intellectual Property Rights
            </h2>
            <div className="space-y-4 text-slate-300 light:text-slate-700 leading-relaxed">
              <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <h3 className="font-semibold text-white light:text-slate-900 mb-2">Your Code</h3>
                <p className="text-sm">
                  You retain all ownership rights to the code you submit. We claim no ownership over your code.
                </p>
              </div>
              <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                <h3 className="font-semibold text-white light:text-slate-900 mb-2">Our Service</h3>
                <p className="text-sm">
                  The Service, including all AI models, algorithms, and analysis techniques, is owned by AI Code
                  Review Assistant and protected by intellectual property laws.
                </p>
              </div>
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <h3 className="font-semibold text-white light:text-slate-900 mb-2">Feedback and Suggestions</h3>
                <p className="text-sm">
                  Any feedback or suggestions you provide may be used by us without obligation or compensation to
                  you.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white light:text-slate-900 mb-4">6. Subscription and Payment</h2>
            <div className="space-y-4 text-slate-300 light:text-slate-700 leading-relaxed">
              <p>For paid subscriptions:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Payments are processed through secure third-party providers</li>
                <li>Subscriptions renew automatically unless cancelled</li>
                <li>You can cancel anytime from your account settings</li>
                <li>Refunds are provided within 14 days of initial purchase</li>
                <li>No refunds for partial months after the refund period</li>
                <li>We reserve the right to change pricing with 30 days notice</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white light:text-slate-900 mb-4">7. Disclaimer of Warranties</h2>
            <div className="space-y-4 text-slate-300 light:text-slate-700 leading-relaxed">
              <p className="font-semibold text-white light:text-slate-900">IMPORTANT:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>The Service is provided "AS IS" without warranties of any kind</li>
                <li>We do not guarantee that all bugs or vulnerabilities will be detected</li>
                <li>AI-generated feedback may contain errors or false positives</li>
                <li>You are responsible for final code review and testing</li>
                <li>The Service should not be used as the sole method of security review</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white light:text-slate-900 mb-4">8. Limitation of Liability</h2>
            <p className="text-slate-300 light:text-slate-700 leading-relaxed">
              To the maximum extent permitted by law, AI Code Review Assistant shall not be liable for any
              indirect, incidental, special, consequential, or punitive damages, including loss of profits, data,
              or other intangible losses resulting from:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-slate-300 light:text-slate-700">
              <li>Your use or inability to use the Service</li>
              <li>Bugs or vulnerabilities not detected by the Service</li>
              <li>Unauthorized access to your account or data</li>
              <li>Any conduct or content of third parties using the Service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white light:text-slate-900 mb-4">9. Service Modifications</h2>
            <p className="text-slate-300 light:text-slate-700 leading-relaxed">
              We reserve the right to modify, suspend, or discontinue the Service (or any part thereof) at any time
              with or without notice. We will not be liable to you or any third party for any modification,
              suspension, or discontinuation of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white light:text-slate-900 mb-4">10. Termination</h2>
            <div className="space-y-4 text-slate-300 light:text-slate-700 leading-relaxed">
              <p>We may terminate or suspend your account and access to the Service:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>If you breach these Terms of Service</li>
                <li>If required by law or legal request</li>
                <li>If we cease providing the Service</li>
                <li>At our discretion for any reason with notice</li>
              </ul>
              <p className="mt-4">Upon termination, your right to use the Service will immediately cease.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white light:text-slate-900 mb-4">11. Governing Law</h2>
            <p className="text-slate-300 light:text-slate-700 leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in
              which AI Code Review Assistant operates, without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white light:text-slate-900 mb-4">12. Changes to Terms</h2>
            <p className="text-slate-300 light:text-slate-700 leading-relaxed">
              We reserve the right to modify these Terms at any time. We will notify users of any material changes
              via email or through the Service. Your continued use of the Service after such modifications
              constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white light:text-slate-900 mb-4">13. Contact Information</h2>
            <p className="text-slate-300 light:text-slate-700 leading-relaxed">
              If you have any questions about these Terms, please contact us:
            </p>
            <div className="mt-4 p-4 bg-slate-800/50 light:bg-slate-100 rounded-lg">
              <p className="text-slate-300 light:text-slate-700">
                Email:{" "}
                <a href="mailto:legal@aicodereviewer.com" className="text-purple-400 hover:text-purple-300">
                  legal@aicodereviewer.com
                </a>
              </p>
            </div>
          </section>

          <section className="border-t border-slate-700/50 light:border-slate-300 pt-6">
            <p className="text-sm text-slate-400 light:text-slate-600">
              By using AI Code Review Assistant, you acknowledge that you have read, understood, and agree to be
              bound by these Terms of Service.
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-slate-800/50 light:border-slate-200 bg-slate-900/30 light:bg-white/80 backdrop-blur-xl mt-12">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center justify-center gap-6 text-sm text-slate-400 light:text-slate-600">
            <Link to="/documentation" className="hover:text-white light:hover:text-slate-900 transition-colors">
              Documentation
            </Link>
            <Link to="/privacy" className="hover:text-white light:hover:text-slate-900 transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
