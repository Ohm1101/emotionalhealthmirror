"use client";

import { useRouter } from "next/navigation";
import { authClient, useSession } from "@/lib/auth-client";
import { toast } from "sonner";

export default function AboutPage() {
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
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            About Emotional Mirror
          </h1>
          <p className="text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Your trusted companion on the journey to emotional wellness and mental health clarity 💜
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/90 backdrop-blur-xl rounded-[3rem] p-12 shadow-2xl">
            <div className="text-center mb-12">
              <div className="text-7xl mb-6">🎯</div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Mission</h2>
            </div>
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              At Emotional Mirror, we believe that understanding and caring for your mental health 
              should be accessible, interactive, and empowering. We're dedicated to creating a safe, 
              judgment-free space where you can explore your emotions, track your mental wellness journey, 
              and discover personalized tools for inner peace.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed">
              Our mission is to make mental health care as natural and approachable as looking in a mirror – 
              reflecting your true emotional state and helping you understand yourself better.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-12 text-gray-800">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "💚",
                title: "Empathy First",
                description: "We approach mental health with compassion, understanding that every emotion is valid and every journey is unique."
              },
              {
                icon: "🔐",
                title: "Privacy & Safety",
                description: "Your emotional data is sacred. We prioritize your privacy and create a safe space for authentic self-expression."
              },
              {
                icon: "🌟",
                title: "Evidence-Based",
                description: "Our tools and resources are grounded in psychological research and proven mental health practices."
              },
              {
                icon: "🎨",
                title: "Accessible Design",
                description: "Beautiful, intuitive interfaces that reduce stress rather than add to it. Mental health care should be easy."
              },
              {
                icon: "🤝",
                title: "Community Support",
                description: "You're not alone. We foster a supportive community where people can share and connect safely."
              },
              {
                icon: "📈",
                title: "Personal Growth",
                description: "We celebrate progress, not perfection. Every small step toward wellness matters."
              }
            ].map((value, index) => (
              <div
                key={index}
                className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
              >
                <div className="text-6xl mb-4">{value.icon}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-[3rem] p-12 shadow-2xl">
            <div className="text-center mb-8">
              <div className="text-7xl mb-6">🪞</div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Story</h2>
            </div>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Emotional Mirror was born from a simple observation: despite the growing awareness 
                around mental health, many people still struggle to understand and articulate their emotions. 
                Traditional journaling felt too formal, therapy seemed out of reach, and existing apps 
                felt cold and clinical.
              </p>
              <p>
                We imagined a different approach – what if checking in with your mental health could be 
                as natural and visual as looking in a mirror? What if the interface itself could be calming, 
                the interactions healing, and the insights genuinely helpful?
              </p>
              <p>
                Today, Emotional Mirror serves thousands of users worldwide, helping them build emotional 
                awareness, track patterns, and find peace. Every feature is designed with care, every 
                color chosen for comfort, every animation crafted to soothe.
              </p>
              <p className="font-bold text-purple-700">
                We're not just building an app – we're creating a movement toward better emotional health for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-12 text-gray-800">Built With Love</h2>
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-12 shadow-2xl text-center">
            <div className="text-8xl mb-6">❤️</div>
            <p className="text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Emotional Mirror is crafted by a dedicated team of designers, developers, 
              mental health advocates, and wellness coaches who are passionate about making 
              mental health care accessible and beautiful.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Join Our Wellness Community
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Start your journey to better emotional health today
          </p>
          <div className="flex flex-wrap gap-6 justify-center">
            <a
              href="/register"
              className="px-12 py-5 bg-white text-purple-600 rounded-full font-bold text-xl hover:shadow-2xl transition-all transform hover:scale-110"
            >
              Get Started Free ✨
            </a>
            <a
              href="/contact"
              className="px-12 py-5 bg-white/20 backdrop-blur-xl text-white rounded-full font-bold text-xl hover:bg-white/30 transition-all transform hover:scale-110 border-2 border-white/30"
            >
              Contact Us 💌
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}