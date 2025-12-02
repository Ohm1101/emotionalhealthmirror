"use client";

import { useRouter } from "next/navigation";
import { authClient, useSession } from "@/lib/auth-client";
import { toast } from "sonner";

export default function DisclaimerPage() {
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500">
        <div className="max-w-5xl mx-auto text-center text-white">
          <div className="text-7xl mb-6">⚠️</div>
          <h1 className="text-6xl font-bold mb-6">
            Important Disclaimer
          </h1>
          <p className="text-xl opacity-90">
            Please read this carefully before using Emotional Mirror
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/95 backdrop-blur-xl rounded-[3rem] p-12 shadow-2xl space-y-10">
            
            {/* Medical Disclaimer */}
            <div className="bg-gradient-to-r from-red-100 to-rose-100 rounded-2xl p-8 border-4 border-red-400">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-6xl">🏥</span>
                <h2 className="text-4xl font-bold text-gray-800">Medical Disclaimer</h2>
              </div>
              <div className="space-y-4 text-lg text-gray-800">
                <p className="font-bold text-2xl text-red-600">
                  Emotional Mirror is NOT a substitute for professional medical advice, diagnosis, or treatment.
                </p>
                <p className="leading-relaxed">
                  We are a wellness and mood tracking tool designed to support your mental health journey, 
                  <strong> but we are NOT:</strong>
                </p>
                <ul className="space-y-2 ml-6">
                  <li>❌ A licensed medical or mental health provider</li>
                  <li>❌ A replacement for therapy or counseling</li>
                  <li>❌ A diagnostic tool for mental health conditions</li>
                  <li>❌ A prescription or treatment service</li>
                  <li>❌ An emergency crisis intervention service</li>
                </ul>
                <p className="font-bold text-red-600 text-xl mt-6">
                  🆘 IF YOU'RE IN CRISIS: Call 988 (US National Suicide Prevention Lifeline) or your 
                  local emergency services immediately. Do not rely on Emotional Mirror for emergency support.
                </p>
              </div>
            </div>

            {/* Professional Advice */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Always Consult Professionals</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                You should always seek the advice of qualified healthcare professionals for:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-3">🩺 Medical Concerns</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Mental health diagnoses</li>
                    <li>• Medication management</li>
                    <li>• Severe symptoms</li>
                    <li>• Physical health issues</li>
                  </ul>
                </div>
                <div className="bg-purple-50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-3">🧠 Therapeutic Support</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Trauma processing</li>
                    <li>• Complex emotional issues</li>
                    <li>• Relationship problems</li>
                    <li>• Behavioral changes</li>
                  </ul>
                </div>
              </div>
              <p className="text-gray-700 mt-6 leading-relaxed">
                Never disregard professional medical advice or delay seeking it because of something 
                you read on Emotional Mirror. Our content is educational and supportive, not therapeutic.
              </p>
            </div>

            {/* Information Accuracy */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Information Accuracy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                While we strive to provide accurate and up-to-date information:
              </p>
              <div className="bg-yellow-50 rounded-2xl p-6 border-2 border-yellow-300">
                <ul className="space-y-3 text-gray-700">
                  <li>• Content is for general information purposes only</li>
                  <li>• Information may not be comprehensive or current</li>
                  <li>• We are not responsible for third-party content or resources</li>
                  <li>• Mental health information evolves; consult current sources</li>
                  <li>• Individual experiences vary; what works for others may not work for you</li>
                </ul>
              </div>
            </div>

            {/* User Responsibility */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Responsibility</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                By using Emotional Mirror, you acknowledge that:
              </p>
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6">
                <ul className="space-y-3 text-gray-700">
                  <li>✅ You are using the platform at your own risk</li>
                  <li>✅ You will seek professional help for serious mental health concerns</li>
                  <li>✅ You understand we provide wellness tools, not medical treatment</li>
                  <li>✅ You are responsible for your own health decisions</li>
                  <li>✅ You will not rely solely on our platform for mental health care</li>
                </ul>
              </div>
            </div>

            {/* No Warranties */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">No Warranties</h2>
              <p className="text-gray-700 leading-relaxed">
                Emotional Mirror is provided "as is" without warranties of any kind, either express or implied. 
                We do not guarantee that:
              </p>
              <ul className="space-y-2 text-gray-700 ml-6 mt-4">
                <li>• The service will meet your specific needs</li>
                <li>• It will be uninterrupted, secure, or error-free</li>
                <li>• Results or outcomes will be achieved</li>
                <li>• Information is complete or accurate</li>
                <li>• Defects will be corrected immediately</li>
              </ul>
            </div>

            {/* Limitation of Liability */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                To the fullest extent permitted by law, Emotional Mirror, its creators, employees, 
                and affiliates shall not be liable for:
              </p>
              <ul className="space-y-2 text-gray-700 ml-6 mt-4">
                <li>• Any direct, indirect, incidental, or consequential damages</li>
                <li>• Loss of data, profits, or business opportunities</li>
                <li>• Personal injury or emotional distress</li>
                <li>• Decisions made based on platform content</li>
                <li>• Actions or inactions related to your mental health</li>
              </ul>
            </div>

            {/* External Links */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">External Resources</h2>
              <p className="text-gray-700 leading-relaxed">
                Emotional Mirror may contain links to third-party websites and resources. These are 
                provided for convenience only. We do not:
              </p>
              <ul className="space-y-2 text-gray-700 ml-6 mt-4">
                <li>• Endorse or verify third-party content</li>
                <li>• Control external website content or practices</li>
                <li>• Accept responsibility for third-party services</li>
                <li>• Guarantee the accuracy of external information</li>
              </ul>
              <p className="text-gray-700 mt-4 leading-relaxed">
                Your use of third-party resources is at your own risk.
              </p>
            </div>

            {/* User-Generated Content */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Community Content</h2>
              <p className="text-gray-700 leading-relaxed">
                Our community features may contain user-generated content. Please remember:
              </p>
              <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-2xl p-6 mt-4">
                <ul className="space-y-2 text-gray-700">
                  <li>• Users share personal experiences, not professional advice</li>
                  <li>• Community posts do not represent our official views</li>
                  <li>• We cannot verify the accuracy of user content</li>
                  <li>• Do not make medical decisions based on community posts</li>
                  <li>• Report concerning content to our moderation team</li>
                </ul>
              </div>
            </div>

            {/* Age Restrictions */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Age Restrictions</h2>
              <p className="text-gray-700 leading-relaxed">
                Emotional Mirror is intended for users aged 13 and older. If you're under 18, 
                please use our platform with parental guidance. Parents and guardians should 
                monitor minors' use and ensure they receive appropriate professional support when needed.
              </p>
            </div>

            {/* Updates */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Changes to This Disclaimer</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this disclaimer periodically. Your continued use of Emotional Mirror 
                after changes constitutes acceptance of the updated disclaimer.
              </p>
            </div>

            {/* Contact */}
            <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-2xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-4">Questions or Concerns?</h2>
              <p className="text-lg mb-6">
                If you have questions about this disclaimer or need clarification, please reach out.
              </p>
              <a
                href="/contact"
                className="inline-block px-10 py-4 bg-white text-purple-600 rounded-2xl font-bold hover:shadow-xl transition-all transform hover:scale-105"
              >
                Contact Us
              </a>
            </div>

            {/* Final Notice */}
            <div className="bg-gradient-to-r from-red-100 to-rose-100 rounded-2xl p-8 border-4 border-red-400 text-center">
              <p className="text-2xl font-bold text-red-600 mb-4">
                🆘 CRISIS? GET HELP NOW
              </p>
              <p className="text-lg text-gray-800 mb-6">
                If you're having thoughts of self-harm or suicide:
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="tel:988"
                  className="px-8 py-4 bg-red-600 text-white rounded-2xl font-bold hover:shadow-xl transition-all transform hover:scale-105"
                >
                  Call 112 Now
                </a>
                <a
                  href="sms:741741?body=HOME"
                  className="px-8 py-4 bg-red-600 text-white rounded-2xl font-bold hover:shadow-xl transition-all transform hover:scale-105"
                >
                  Text HOME to 741741
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}