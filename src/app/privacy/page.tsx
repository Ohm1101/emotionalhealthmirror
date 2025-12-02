"use client";

import { useRouter } from "next/navigation";

export default function PrivacyPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-2xl bg-white/80 border-b border-purple-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity group"
            >
              <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl p-3 transform group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                  Emotional Mirror
                </h1>
                <p className="text-xs text-gray-600">Your Mental Wellness Companion</p>
              </div>
            </button>
            
            <button
              onClick={() => router.push("/")}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold hover:shadow-xl transition-all transform hover:scale-105"
            >
              🏠 Home
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Title Section */}
        <div className="text-center mb-16 fade-in-up">
          <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-xl rounded-full px-8 py-4 shadow-xl border-2 border-purple-200 mb-6">
            <span className="text-5xl">🔒</span>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
          </div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Your privacy and data security are our top priorities. Learn how we protect your personal information.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Last Updated: January 2025
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border-2 border-purple-200">
          {/* Introduction */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">📋</span>
              <h2 className="text-3xl font-bold text-gray-800">Introduction</h2>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                Welcome to Emotional Mirror. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you use our mental wellness platform. By accessing or using Emotional Mirror, you consent to the practices described in this policy.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We understand that your mental health data is deeply personal and sensitive. We treat it with the utmost care and respect, implementing industry-leading security measures to keep your information safe and confidential.
              </p>
            </div>
          </section>

          {/* Information We Collect */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">📊</span>
              <h2 className="text-3xl font-bold text-gray-800">Information We Collect</h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <div className="bg-purple-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-2">Account Information</h3>
                <p>Name, email address, password (encrypted), and profile preferences.</p>
              </div>
              <div className="bg-pink-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-2">Mood & Wellness Data</h3>
                <p>Mood entries, journal notes, wellness scores, exercise completions, and mental health tracking information you voluntarily provide.</p>
              </div>
              <div className="bg-blue-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-2">Usage Information</h3>
                <p>Device information, IP address, browser type, pages visited, and interaction data to improve our services.</p>
              </div>
              <div className="bg-green-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-2">Community Activity</h3>
                <p>Posts, comments, and interactions in our community features (if you choose to participate).</p>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">🎯</span>
              <h2 className="text-3xl font-bold text-gray-800">How We Use Your Information</h2>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <span>Provide personalized mood tracking and mental health insights</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <span>Generate analytics and progress reports for your wellness journey</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <span>Recommend exercises and resources based on your needs</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <span>Improve and optimize our platform features</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <span>Send important updates and wellness reminders (with your consent)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <span>Ensure security and prevent fraudulent activity</span>
              </li>
            </ul>
          </section>

          {/* Data Protection */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">🛡️</span>
              <h2 className="text-3xl font-bold text-gray-800">How We Protect Your Data</h2>
            </div>
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🔒</span>
                  <span><strong>Encryption:</strong> All sensitive data is encrypted in transit (SSL/TLS) and at rest</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🛡️</span>
                  <span><strong>Secure Storage:</strong> Data stored on secure, industry-standard servers</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">👤</span>
                  <span><strong>Access Controls:</strong> Limited employee access with strict confidentiality agreements</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🔐</span>
                  <span><strong>Authentication:</strong> Secure password requirements and optional two-factor authentication</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🔍</span>
                  <span><strong>Regular Audits:</strong> Ongoing security assessments and vulnerability testing</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Data Sharing */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">🚫</span>
              <h2 className="text-3xl font-bold text-gray-800">We Never Sell Your Data</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <strong>Period.</strong> We will never sell, rent, or trade your personal information to third parties. 
              Your mental health data is sacred, and we treat it as such.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We only share information when:
            </p>
            <ul className="space-y-2 text-gray-700 mt-4 ml-6">
              <li>• You explicitly give us permission</li>
              <li>• Required by law (e.g., court orders, subpoenas)</li>
              <li>• To protect safety in emergencies</li>
              <li>• With trusted service providers (e.g., hosting, analytics) under strict confidentiality agreements</li>
            </ul>
          </section>

          {/* Your Rights */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">🔑</span>
              <h2 className="text-3xl font-bold text-gray-800">Your Privacy Rights</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-2">Access</h3>
                <p className="text-gray-700">Request a copy of all your data</p>
              </div>
              <div className="bg-green-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-2">Correction</h3>
                <p className="text-gray-700">Update or correct your information</p>
              </div>
              <div className="bg-yellow-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-2">Deletion</h3>
                <p className="text-gray-700">Request account and data deletion</p>
              </div>
              <div className="bg-purple-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-2">Export</h3>
                <p className="text-gray-700">Download your data in portable format</p>
              </div>
            </div>
          </section>

          {/* Cookies */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">🍪</span>
              <h2 className="text-3xl font-bold text-gray-800">Cookies & Tracking</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use cookies and similar technologies to enhance your experience, remember preferences, 
              and analyze usage patterns. You can control cookie preferences through your browser settings.
            </p>
            <p className="text-gray-700">
              <strong>Types of cookies we use:</strong> Session cookies, preference cookies, analytics cookies (anonymized)
            </p>
          </section>

          {/* Children's Privacy */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">🧒</span>
              <h2 className="text-3xl font-bold text-gray-800">Children's Privacy</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Emotional Mirror is not intended for children under 13. We do not knowingly collect 
              information from children. If you believe a child has provided us with personal information, 
              please contact us immediately.
            </p>
          </section>

          {/* Changes to Policy */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">🔄</span>
              <h2 className="text-3xl font-bold text-gray-800">Changes to This Policy</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy periodically. We'll notify you of significant changes 
              via email or in-app notification. Continued use of Emotional Mirror after changes 
              constitutes acceptance of the updated policy.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">📧</span>
              <h2 className="text-3xl font-bold text-gray-800">Contact Us</h2>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
              <p className="text-gray-700 leading-relaxed mb-6">
                If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">✉️</span>
                  <div>
                    <p className="font-semibold text-gray-800">Email</p>
                    <a href="mailto:emotionalhealthmirror@gmail.com" className="text-blue-600 hover:underline text-lg">
                      emotionalhealthmirror@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🌐</span>
                  <div>
                    <p className="font-semibold text-gray-800">Website</p>
                    <button onClick={() => router.push("/")} className="text-blue-600 hover:underline text-lg">
                      emotionalmirror.com
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-blue-200">
                <p className="text-sm text-gray-600 italic">
                  We are committed to resolving privacy concerns promptly and transparently. Your trust is important to us.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Related Links */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <button
            onClick={() => router.push("/terms")}
            className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border-2 border-purple-200 hover:scale-105 transition-transform text-left"
          >
            <span className="text-4xl block mb-3">📜</span>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Terms of Service</h3>
            <p className="text-gray-600">Read our usage terms and conditions</p>
          </button>
          
          <button
            onClick={() => router.push("/cookies")}
            className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border-2 border-purple-200 hover:scale-105 transition-transform text-left"
          >
            <span className="text-4xl block mb-3">🍪</span>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Cookie Policy</h3>
            <p className="text-gray-600">Learn about cookies we use</p>
          </button>
          
          <button
            onClick={() => router.push("/disclaimer")}
            className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border-2 border-purple-200 hover:scale-105 transition-transform text-left"
          >
            <span className="text-4xl block mb-3">⚠️</span>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Disclaimer</h3>
            <p className="text-gray-600">Important usage disclaimers</p>
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white/90 to-purple-50/90 backdrop-blur-xl border-t-2 border-purple-200 mt-16">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-600 mb-4">
            © 2025 Emotional Mirror. Your privacy and wellbeing matter to us.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <button onClick={() => router.push("/")} className="hover:text-purple-600 transition-colors">Home</button>
            <button onClick={() => router.push("/about")} className="hover:text-purple-600 transition-colors">About</button>
            <button onClick={() => router.push("/contact")} className="hover:text-purple-600 transition-colors">Contact</button>
            <button onClick={() => router.push("/support")} className="hover:text-purple-600 transition-colors">Support</button>
          </div>
        </div>
      </footer>
    </div>
  );
}