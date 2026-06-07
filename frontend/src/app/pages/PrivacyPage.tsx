import { Link } from "react-router-dom";
import { Shield, Sparkles, ArrowLeft } from "lucide-react";

export function PrivacyPage() {
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
            <Shield className="w-8 h-8 text-purple-400" />
            <h1 className="text-4xl font-bold text-white light:text-slate-900">Privacy Policy</h1>
          </div>
          <p className="text-slate-400 light:text-slate-600">Last updated: June 6, 2026</p>
        </div>

        <div className="rounded-xl bg-slate-900/50 light:bg-white backdrop-blur border border-slate-800/50 light:border-slate-200 p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-white light:text-slate-900 mb-4">Introduction</h2>
            <p className="text-slate-300 light:text-slate-700 leading-relaxed">
              AI Code Review Assistant ("we", "our", or "us") is committed to protecting your privacy. This Privacy
              Policy explains how we collect, use, disclose, and safeguard your information when you use our code
              review service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white light:text-slate-900 mb-4">Information We Collect</h2>
            <div className="space-y-4 text-slate-300 light:text-slate-700 leading-relaxed">
              <div>
                <h3 className="text-lg font-semibold text-white light:text-slate-900 mb-2">
                  Personal Information
                </h3>
                <p>When you create an account, we collect:</p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>Name and email address</li>
                  <li>Authentication credentials</li>
                  <li>Profile information</li>
                  <li>Payment information (processed securely through third-party providers)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white light:text-slate-900 mb-2">Code Data</h3>
                <p>When you submit code for review:</p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>Source code you submit for analysis</li>
                  <li>Programming language and file metadata</li>
                  <li>Review results and feedback</li>
                  <li>Review history (subject to your storage preferences)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white light:text-slate-900 mb-2">Usage Data</h3>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>IP address and device information</li>
                  <li>Browser type and version</li>
                  <li>Pages visited and features used</li>
                  <li>Time and date of visits</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white light:text-slate-900 mb-4">How We Use Your Information</h2>
            <div className="space-y-2 text-slate-300 light:text-slate-700">
              <p>We use collected information to:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Provide and maintain our code review service</li>
                <li>Process and analyze your code submissions</li>
                <li>Improve our AI models and detection accuracy</li>
                <li>Send you service updates and notifications</li>
                <li>Process payments and prevent fraud</li>
                <li>Respond to your support requests</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white light:text-slate-900 mb-4">Code Storage and Retention</h2>
            <div className="space-y-4 text-slate-300 light:text-slate-700 leading-relaxed">
              <p>You have full control over how your code is stored:</p>
              <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <h3 className="font-semibold text-white light:text-slate-900 mb-2">
                  Do Not Store Code (Default for Free users)
                </h3>
                <p className="text-sm">
                  Code is analyzed in memory and immediately discarded. Only review statistics are retained.
                </p>
              </div>
              <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                <h3 className="font-semibold text-white light:text-slate-900 mb-2">Store Feedback Summary</h3>
                <p className="text-sm">
                  We store review results and issue summaries, but not the original code.
                </p>
              </div>
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <h3 className="font-semibold text-white light:text-slate-900 mb-2">Store Code and Feedback</h3>
                <p className="text-sm">
                  Full code and review history retained for your reference. You can delete this anytime from
                  Settings.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white light:text-slate-900 mb-4">Data Security</h2>
            <p className="text-slate-300 light:text-slate-700 leading-relaxed">
              We implement industry-standard security measures including:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-slate-300 light:text-slate-700">
              <li>End-to-end encryption for data transmission</li>
              <li>Encrypted storage for all sensitive data</li>
              <li>Regular security audits and penetration testing</li>
              <li>Access controls and authentication requirements</li>
              <li>Secure third-party payment processing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white light:text-slate-900 mb-4">Third-Party Services</h2>
            <p className="text-slate-300 light:text-slate-700 leading-relaxed">
              We may share data with trusted third parties who assist in operating our service:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-slate-300 light:text-slate-700">
              <li>Authentication providers (Google OAuth)</li>
              <li>Payment processors (Stripe)</li>
              <li>Cloud infrastructure providers (AWS, Google Cloud)</li>
              <li>Analytics services (with anonymized data)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white light:text-slate-900 mb-4">Your Rights</h2>
            <div className="space-y-2 text-slate-300 light:text-slate-700">
              <p>You have the right to:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Export your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white light:text-slate-900 mb-4">Cookies</h2>
            <p className="text-slate-300 light:text-slate-700 leading-relaxed">
              We use cookies and similar technologies to maintain your session, remember preferences, and analyze
              usage. You can control cookie settings through your browser preferences.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white light:text-slate-900 mb-4">
              Changes to This Privacy Policy
            </h2>
            <p className="text-slate-300 light:text-slate-700 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the
              new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white light:text-slate-900 mb-4">Contact Us</h2>
            <p className="text-slate-300 light:text-slate-700 leading-relaxed">
              If you have questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-slate-800/50 light:bg-slate-100 rounded-lg">
              <p className="text-slate-300 light:text-slate-700">
                Email:{" "}
                <a
                  href="mailto:privacy@aicodereviewer.com"
                  className="text-purple-400 hover:text-purple-300"
                >
                  privacy@aicodereviewer.com
                </a>
              </p>
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-slate-800/50 light:border-slate-200 bg-slate-900/30 light:bg-white/80 backdrop-blur-xl mt-12">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center justify-center gap-6 text-sm text-slate-400 light:text-slate-600">
            <Link to="/documentation" className="hover:text-white light:hover:text-slate-900 transition-colors">
              Documentation
            </Link>
            <Link to="/terms" className="hover:text-white light:hover:text-slate-900 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
