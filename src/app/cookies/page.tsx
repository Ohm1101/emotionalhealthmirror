"use client";

import { useRouter } from "next/navigation";
import { authClient, useSession } from "@/lib/auth-client";
import { toast } from "sonner";

export default function CookiesPage() {
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
          <div className="text-7xl mb-6">🍪</div>
          <h1 className="text-6xl font-bold mb-6">
            Cookie Policy
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
              <h2 className="text-3xl font-bold text-gray-800 mb-4">What Are Cookies?</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Cookies are small text files stored on your device when you visit websites. They help 
                us remember your preferences, keep you logged in, and improve your experience on 
                Emotional Mirror. This policy explains how we use cookies and similar technologies.
              </p>
            </div>

            {/* Types of Cookies */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Types of Cookies We Use</h2>
              <div className="space-y-6">
                
                {/* Essential Cookies */}
                <div className="bg-purple-50 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">🔐</span>
                    <h3 className="text-2xl font-bold text-gray-800">Essential Cookies</h3>
                  </div>
                  <p className="text-gray-700 mb-3">
                    <strong>Required for basic functionality.</strong> Cannot be disabled.
                  </p>
                  <ul className="space-y-2 text-gray-700 ml-6">
                    <li>• <strong>Authentication:</strong> Keep you logged in securely</li>
                    <li>• <strong>Security:</strong> Protect against fraud and unauthorized access</li>
                    <li>• <strong>Session:</strong> Maintain your session across pages</li>
                    <li>• <strong>Load Balancing:</strong> Distribute server traffic efficiently</li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-3 italic">
                    Duration: Session cookies (expire when you close browser) or up to 30 days
                  </p>
                </div>

                {/* Functional Cookies */}
                <div className="bg-blue-50 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">⚙️</span>
                    <h3 className="text-2xl font-bold text-gray-800">Functional Cookies</h3>
                  </div>
                  <p className="text-gray-700 mb-3">
                    <strong>Enhance your experience.</strong> Can be controlled in settings.
                  </p>
                  <ul className="space-y-2 text-gray-700 ml-6">
                    <li>• <strong>Preferences:</strong> Remember your settings and choices</li>
                    <li>• <strong>Language:</strong> Display content in your preferred language</li>
                    <li>• <strong>Theme:</strong> Save dark mode or color preferences</li>
                    <li>• <strong>Accessibility:</strong> Remember accessibility settings</li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-3 italic">
                    Duration: Up to 1 year
                  </p>
                </div>

                {/* Analytics Cookies */}
                <div className="bg-green-50 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">📊</span>
                    <h3 className="text-2xl font-bold text-gray-800">Analytics Cookies</h3>
                  </div>
                  <p className="text-gray-700 mb-3">
                    <strong>Help us improve.</strong> Anonymized usage data.
                  </p>
                  <ul className="space-y-2 text-gray-700 ml-6">
                    <li>• <strong>Usage Patterns:</strong> Understand how users interact with features</li>
                    <li>• <strong>Performance:</strong> Identify and fix technical issues</li>
                    <li>• <strong>Popular Features:</strong> See what's most helpful</li>
                    <li>• <strong>Optimization:</strong> Improve load times and responsiveness</li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-3 italic">
                    Duration: Up to 2 years • Your personal data is NOT identifiable in analytics
                  </p>
                </div>

                {/* Advertising Cookies */}
                <div className="bg-yellow-50 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">🎯</span>
                    <h3 className="text-2xl font-bold text-gray-800">Marketing Cookies</h3>
                  </div>
                  <p className="text-gray-700 mb-3">
                    <strong>Currently, we DO NOT use advertising or tracking cookies.</strong>
                  </p>
                  <p className="text-gray-700">
                    We do not serve third-party ads or sell your data to advertisers. If this changes 
                    in the future, we'll update this policy and notify you.
                  </p>
                </div>
              </div>
            </div>

            {/* Third-Party Cookies */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Third-Party Services</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use a limited number of trusted third-party services that may set their own cookies:
              </p>
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">📈</span>
                    <div>
                      <strong>Analytics Provider:</strong> Anonymized usage statistics to improve our platform
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">🔐</span>
                    <div>
                      <strong>Authentication Service:</strong> Secure login and session management
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">☁️</span>
                    <div>
                      <strong>Cloud Hosting:</strong> Reliable and secure infrastructure
                    </div>
                  </li>
                </ul>
                <p className="text-sm text-gray-600 mt-4 italic">
                  These services operate under their own privacy policies and cookie practices.
                </p>
              </div>
            </div>

            {/* Managing Cookies */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">How to Control Cookies</h2>
              <div className="space-y-6">
                
                {/* Browser Settings */}
                <div className="bg-blue-50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-3">🌐 Browser Settings</h3>
                  <p className="text-gray-700 mb-3">
                    Most browsers allow you to control cookies through their settings:
                  </p>
                  <ul className="space-y-2 text-gray-700 ml-6">
                    <li>• <strong>Chrome:</strong> Settings → Privacy and security → Cookies</li>
                    <li>• <strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
                    <li>• <strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                    <li>• <strong>Edge:</strong> Settings → Cookies and site permissions</li>
                  </ul>
                </div>

                {/* App Settings */}
                <div className="bg-purple-50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-3">⚙️ Emotional Mirror Settings</h3>
                  <p className="text-gray-700">
                    You can manage your cookie preferences directly in your account settings. 
                    Go to Settings → Privacy → Cookie Preferences to customize your choices.
                  </p>
                </div>

                {/* Impact of Blocking */}
                <div className="bg-yellow-50 rounded-2xl p-6 border-2 border-yellow-300">
                  <h3 className="text-xl font-bold mb-3">⚠️ Impact of Blocking Cookies</h3>
                  <p className="text-gray-700">
                    Blocking all cookies may impact your experience:
                  </p>
                  <ul className="space-y-2 text-gray-700 ml-6 mt-2">
                    <li>• You may be logged out repeatedly</li>
                    <li>• Your preferences won't be saved</li>
                    <li>• Some features may not work properly</li>
                    <li>• Pages may load more slowly</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Data Retention */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Cookie Lifespan</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-2">Session Cookies</h3>
                  <p className="text-gray-700">Automatically deleted when you close your browser</p>
                </div>
                <div className="bg-blue-50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-2">Persistent Cookies</h3>
                  <p className="text-gray-700">Remain for a set period (up to 2 years max)</p>
                </div>
              </div>
              <p className="text-gray-700 mt-4">
                You can clear all cookies at any time through your browser settings.
              </p>
            </div>

            {/* Updates */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Updates to This Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Cookie Policy to reflect changes in our practices or legal requirements. 
                We'll notify you of significant changes. The "Last updated" date at the top shows when 
                the policy was last revised.
              </p>
            </div>

            {/* Contact */}
            <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-2xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-4">Questions About Cookies?</h2>
              <p className="text-lg mb-6">
                We're happy to explain our cookie practices in more detail.
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