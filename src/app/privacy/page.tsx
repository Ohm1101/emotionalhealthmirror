"use client";

import { useRouter } from "next/navigation";
import { authClient, useSession } from "@/lib/auth-client";
import { toast } from "sonner";

export default function PrivacyPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();
    if (error?.code) {
      toast.error("Failed to sign out");
    } else {
      localStorage.removeItem("bearer_token");
      toast.success("Signed out successfully!");
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-white/60 border-b border-white/20 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => router.push("/")}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl p-3 transform group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                  Emotional Mirror
                </h1>
                <p className="text-xs text-gray-600">Your Mental Wellness Companion</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {!isPending && (
                <>
                  {session?.user ? (
                    <>
                      <div className="text-sm font-medium text-gray-700 hidden md:block">
                        Welcome, <span className="text-purple-600 font-bold">{session.user.name}!</span>
                      </div>
                      <button 
                        onClick={handleSignOut}
                        className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full font-semibold hover:shadow-2xl transition-all transform hover:scale-105"
                      >
                        🚪 Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={() => router.push("/login")}
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full font-semibold hover:shadow-2xl transition-all transform hover:scale-105"
                      >
                        🔐 Login
                      </button>
                      <button 
                        onClick={() => router.push("/register")}
                        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold hover:shadow-2xl transition-all transform hover:scale-105"
                      >
                        ✨ Sign Up
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">
        <div className="max-w-5xl mx-auto text-center text-white">
          <div className="text-7xl mb-6">🔐</div>
          <h1 className="text-6xl font-bold mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl opacity-90">
            Last updated: November 4, 2025
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/95 backdrop-blur-xl rounded-[3rem] p-12 shadow-2xl space-y-10">
            
            {/* Introduction */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Commitment to Your Privacy</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                At Emotional Mirror, we understand that your mental health data is deeply personal. 
                We are committed to protecting your privacy and being transparent about how we collect, 
                use, and safeguard your information. This Privacy Policy explains our practices in detail.
              </p>
            </div>

            {/* Information We Collect */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Information We Collect</h2>
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
            </div>

            {/* How We Use Your Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">How We Use Your Information</h2>
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
            </div>

            {/* Data Protection */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">How We Protect Your Data</h2>
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
            </div>

            {/* Data Sharing */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">We Never Sell Your Data</h2>
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
            </div>

            {/* Your Rights */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Privacy Rights</h2>
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
            </div>

            {/* Cookies */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Cookies & Tracking</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use cookies and similar technologies to enhance your experience, remember preferences, 
                and analyze usage patterns. You can control cookie preferences through your browser settings.
              </p>
              <p className="text-gray-700">
                <strong>Types of cookies we use:</strong> Session cookies, preference cookies, analytics cookies (anonymized)
              </p>
            </div>

            {/* Children's Privacy */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Children's Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                Emotional Mirror is not intended for children under 13. We do not knowingly collect 
                information from children. If you believe a child has provided us with personal information, 
                please contact us immediately.
              </p>
            </div>

            {/* Changes to Policy */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Changes to This Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy periodically. We'll notify you of significant changes 
                via email or in-app notification. Continued use of Emotional Mirror after changes 
                constitutes acceptance of the updated policy.
              </p>
            </div>

            {/* Contact */}
            <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-2xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-4">Questions About Your Privacy?</h2>
              <p className="text-lg mb-6">
                We're here to help. Contact our privacy team anytime.
              </p>
              <a
                href="/contact"
                className="inline-block px-10 py-4 bg-white text-purple-600 rounded-2xl font-bold hover:shadow-xl transition-all transform hover:scale-105"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}