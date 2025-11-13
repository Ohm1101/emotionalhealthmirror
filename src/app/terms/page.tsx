"use client";

import { useRouter } from "next/navigation";
import { authClient, useSession } from "@/lib/auth-client";
import { toast } from "sonner";

export default function TermsPage() {
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
          <div className="text-7xl mb-6">📜</div>
          <h1 className="text-6xl font-bold mb-6">
            Terms of Service
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
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Agreement to Terms</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Welcome to Emotional Mirror. By accessing or using our platform, you agree to be bound 
                by these Terms of Service. Please read them carefully. If you disagree with any part of 
                these terms, you may not use our services.
              </p>
            </div>

            {/* Use of Service */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Use of Our Service</h2>
              <div className="bg-purple-50 rounded-2xl p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold mb-2">✅ You May:</h3>
                  <ul className="space-y-2 text-gray-700 ml-6">
                    <li>• Use Emotional Mirror for personal mental health tracking and wellness</li>
                    <li>• Create and maintain one account per person</li>
                    <li>• Share your experiences in our community respectfully</li>
                    <li>• Download your personal data at any time</li>
                    <li>• Access our resources and educational content</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">❌ You May Not:</h3>
                  <ul className="space-y-2 text-gray-700 ml-6">
                    <li>• Use the service for any illegal or unauthorized purpose</li>
                    <li>• Impersonate others or provide false information</li>
                    <li>• Attempt to hack, breach security, or interfere with the platform</li>
                    <li>• Harass, abuse, or harm other users</li>
                    <li>• Scrape, copy, or redistribute content without permission</li>
                    <li>• Use automated bots or scripts</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Medical Disclaimer */}
            <div className="bg-gradient-to-r from-red-100 to-rose-100 rounded-2xl p-8 border-4 border-red-300">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-5xl">⚠️</span>
                <h2 className="text-3xl font-bold text-gray-800">Important Medical Disclaimer</h2>
              </div>
              <div className="space-y-4 text-gray-700 text-lg">
                <p className="font-bold">
                  Emotional Mirror is NOT a substitute for professional medical advice, diagnosis, or treatment.
                </p>
                <ul className="space-y-2 ml-6">
                  <li>• We are a wellness and mood tracking tool, not a licensed medical provider</li>
                  <li>• Always seek advice from qualified healthcare professionals for medical concerns</li>
                  <li>• If you're experiencing a mental health crisis, contact emergency services immediately</li>
                  <li>• Our resources are educational and supportive, not therapeutic interventions</li>
                  <li>• We do not diagnose conditions or prescribe treatments</li>
                </ul>
                <p className="font-bold text-red-600">
                  🆘 Crisis? Call 988 (US) or your local emergency services immediately.
                </p>
              </div>
            </div>

            {/* User Accounts */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">User Accounts</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You are responsible for:
              </p>
              <ul className="space-y-2 text-gray-700 ml-6">
                <li>• Maintaining the confidentiality of your password</li>
                <li>• All activities that occur under your account</li>
                <li>• Notifying us immediately of unauthorized access</li>
                <li>• Providing accurate and current information</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                We reserve the right to suspend or terminate accounts that violate these terms.
              </p>
            </div>

            {/* Content Rights */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Intellectual Property</h2>
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-2">Your Content</h3>
                  <p className="text-gray-700">
                    You retain all rights to your personal data, mood entries, and journal notes. 
                    By using our service, you grant us a limited license to store and process this 
                    data to provide our services.
                  </p>
                </div>
                <div className="bg-purple-50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-2">Our Content</h3>
                  <p className="text-gray-700">
                    All Emotional Mirror content (design, text, graphics, logos, exercises, resources) 
                    is protected by copyright and trademark laws. You may not reproduce, distribute, 
                    or create derivative works without permission.
                  </p>
                </div>
              </div>
            </div>

            {/* Community Guidelines */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Community Guidelines</h2>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6">
                <p className="text-gray-700 mb-4">
                  Our community is built on respect, empathy, and support. When participating:
                </p>
                <ul className="space-y-2 text-gray-700 ml-6">
                  <li>• Be kind and respectful to all members</li>
                  <li>• Protect others' privacy and confidentiality</li>
                  <li>• No hate speech, harassment, or bullying</li>
                  <li>• No spam, advertising, or promotional content</li>
                  <li>• Report concerning content to our team</li>
                  <li>• Remember: we're all on a wellness journey together</li>
                </ul>
              </div>
            </div>

            {/* Privacy */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Privacy & Data</h2>
              <p className="text-gray-700 leading-relaxed">
                Your privacy is paramount. Our collection, use, and protection of your data is 
                governed by our Privacy Policy. By using Emotional Mirror, you consent to our 
                privacy practices as described in that policy.
              </p>
              <a
                href="/privacy"
                className="inline-block mt-4 text-purple-600 font-bold hover:text-purple-700"
              >
                Read Full Privacy Policy →
              </a>
            </div>

            {/* Limitation of Liability */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                Emotional Mirror is provided "as is" without warranties of any kind. We do not guarantee 
                that the service will be uninterrupted, secure, or error-free. To the fullest extent 
                permitted by law, we are not liable for any indirect, incidental, special, or consequential 
                damages arising from your use of the platform.
              </p>
            </div>

            {/* Termination */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Termination</h2>
              <p className="text-gray-700 leading-relaxed">
                You may terminate your account at any time through your settings. We may suspend or 
                terminate your access if you violate these terms. Upon termination, your right to use 
                the service ceases immediately.
              </p>
            </div>

            {/* Changes to Terms */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We may modify these Terms of Service at any time. We'll notify you of significant 
                changes via email or in-app notification. Continued use after changes constitutes 
                acceptance of the modified terms.
              </p>
            </div>

            {/* Governing Law */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Governing Law</h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms are governed by the laws of the United States. Any disputes will be 
                resolved in the courts of [Jurisdiction], excluding conflict of law provisions.
              </p>
            </div>

            {/* Contact */}
            <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-2xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-4">Questions About These Terms?</h2>
              <p className="text-lg mb-6">
                Our team is happy to clarify any aspect of our Terms of Service.
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