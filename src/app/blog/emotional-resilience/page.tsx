"use client";

import { useRouter } from "next/navigation";
import { authClient, useSession } from "@/lib/auth-client";
import { toast } from "sonner";

export default function EmotionalResiliencePage() {
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
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-emerald-50 to-teal-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-white/80 border-b border-white/20 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => router.push("/")}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-2xl p-3 transform group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Emotional Mirror
                </h1>
                <p className="text-xs text-gray-600">Your Mental Wellness Companion</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => router.push("/blog")}
                className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-full font-semibold hover:shadow-2xl transition-all transform hover:scale-105"
              >
                ← Back to Blog
              </button>
              {!isPending && session?.user && (
                <button 
                  onClick={handleSignOut}
                  className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full font-semibold hover:shadow-2xl transition-all transform hover:scale-105"
                >
                  🚪 Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Article Hero */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-emerald-400/20 to-teal-400/20 animate-pulse"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full font-bold mb-6 animate-bounce-soft">
            💪 Growth
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent leading-tight">
            Building Emotional Resilience
          </h1>
          <p className="text-2xl text-gray-700 mb-8">
            Develop the strength to adapt, cope, and thrive through life's challenges
          </p>
          <div className="flex items-center justify-center gap-6 text-gray-600">
            <span className="flex items-center gap-2">
              <span className="text-2xl">📚</span>
              <span>14 min read</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="text-2xl">📅</span>
              <span>December 1, 2025</span>
            </span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="bg-white/95 backdrop-blur-xl rounded-[3rem] p-12 shadow-2xl mb-12 border-4 border-green-200">
            <p className="text-xl text-gray-700 leading-relaxed">
              Building emotional resilience is the process of developing the ability to adapt to and cope with life's challenges, stress, and adversity in a way that promotes emotional strength and well-being. It enables individuals to maintain emotional balance and stability, even in the face of setbacks, by fostering positive thinking, effective emotional regulation, and problem-solving skills.
            </p>
          </div>

          {/* Importance and Benefits */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-10 shadow-xl mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">🌟</span>
              <h2 className="text-4xl font-bold text-gray-800">Importance and Benefits of Emotional Resilience</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-green-500">
                <h3 className="text-2xl font-bold text-green-600 mb-3">🛡️ Protection from Stress</h3>
                <p className="text-gray-700">
                  Emotional resilience acts as a buffer against being overwhelmed by stress and anxiety. It helps people face difficulties with confidence and optimism rather than despair, reducing the risk of burnout and depressive symptoms.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-emerald-500">
                <h3 className="text-2xl font-bold text-emerald-600 mb-3">🎯 Improved Emotional Regulation</h3>
                <p className="text-gray-700">
                  Resilience enhances the ability to recognize, tolerate, and manage emotions effectively, limiting the intensity and duration of negative emotional episodes.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-teal-500">
                <h3 className="text-2xl font-bold text-teal-600 mb-3">💎 Boosted Self-Esteem</h3>
                <p className="text-gray-700">
                  Building resilience fosters a strong sense of self-efficacy, the belief in one's ability to overcome challenges, which increases self-worth and personal competence.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-cyan-500">
                <h3 className="text-2xl font-bold text-cyan-600 mb-3">🧩 Enhanced Problem-Solving</h3>
                <p className="text-gray-700">
                  Resilient individuals approach problems with a solution-focused mindset, which helps them handle immediate crises and prepares them for future challenges.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-blue-500">
                <h3 className="text-2xl font-bold text-blue-600 mb-3">❤️ Stronger Relationships</h3>
                <p className="text-gray-700">
                  Resilience supports better communication, empathy, and perspective-taking, which form the foundation for healthier and more meaningful interpersonal relationships.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-purple-500">
                <h3 className="text-2xl font-bold text-purple-600 mb-3">✨ Promotes Hope</h3>
                <p className="text-gray-700">
                  It offers emotional stability during crises and inspires others by serving as a source of support and hope.
                </p>
              </div>
            </div>
          </div>

          {/* Core Components */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-10 shadow-xl mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">🧩</span>
              <h2 className="text-4xl font-bold text-gray-800">Core Components of Emotional Resilience</h2>
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-blue-600 mb-4 flex items-center gap-3">
                  <span>🧠</span> Cognitive Flexibility
                </h3>
                <p className="text-gray-700">
                  The capacity to consider various perspectives and adapt thinking in response to new information, preventing rigid or catastrophic thinking.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-cyan-600 mb-4 flex items-center gap-3">
                  <span>👁️</span> Mindful Emotional Awareness
                </h3>
                <p className="text-gray-700">
                  Being aware of emotions as they arise, acknowledging them without judgment, and understanding their impact on behavior.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-teal-600 mb-4 flex items-center gap-3">
                  <span>🤝</span> Social Support
                </h3>
                <p className="text-gray-700">
                  Maintaining strong, supportive relationships that provide emotional reassurance and a sense of belonging.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-green-600 mb-4 flex items-center gap-3">
                  <span>🎯</span> Purpose and Meaning
                </h3>
                <p className="text-gray-700">
                  Holding a sense of purpose beyond oneself helps in seeing adversity as an opportunity for growth rather than just a setback.
                </p>
              </div>
            </div>
          </div>

          {/* Strategies to Build Resilience */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-10 shadow-xl mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">🛠️</span>
              <h2 className="text-4xl font-bold text-gray-800">Strategies to Build Emotional Resilience</h2>
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-8 shadow-lg transform hover:scale-[1.02] transition-all">
                <h3 className="text-2xl font-bold text-purple-600 mb-4 flex items-center gap-3">
                  <span>😊</span> Practice Positive Thinking
                </h3>
                <p className="text-gray-700 mb-4">
                  Cultivate optimism by reframing challenges as opportunities for learning and growth.
                </p>
                <div className="bg-purple-50 rounded-xl p-4">
                  <p className="text-sm text-gray-700">
                    <strong>Try this:</strong> When facing a setback, ask yourself "What can I learn from this?" instead of "Why is this happening to me?"
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg transform hover:scale-[1.02] transition-all">
                <h3 className="text-2xl font-bold text-pink-600 mb-4 flex items-center gap-3">
                  <span>🧘</span> Develop Healthy Coping Mechanisms
                </h3>
                <p className="text-gray-700 mb-4">
                  Use mindfulness, meditation, physical exercise, hobbies, and social support to manage stress effectively.
                </p>
                <div className="bg-pink-50 rounded-xl p-4">
                  <p className="text-sm text-gray-700">
                    <strong>Action steps:</strong> Schedule 10 minutes daily for mindfulness practice, engage in regular physical activity, and maintain meaningful hobbies.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg transform hover:scale-[1.02] transition-all">
                <h3 className="text-2xl font-bold text-blue-600 mb-4 flex items-center gap-3">
                  <span>🎯</span> Enhance Emotional Regulation Skills
                </h3>
                <p className="text-gray-700 mb-4">
                  Learn to pause and reflect before reacting, practice deep breathing, and employ cognitive reappraisal to shift emotional responses.
                </p>
                <div className="bg-blue-50 rounded-xl p-4">
                  <p className="text-sm text-gray-700">
                    <strong>Technique:</strong> Use the "STOP" method - Stop, Take a breath, Observe your emotions, Proceed mindfully.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg transform hover:scale-[1.02] transition-all">
                <h3 className="text-2xl font-bold text-green-600 mb-4 flex items-center gap-3">
                  <span>👥</span> Strengthen Social Connections
                </h3>
                <p className="text-gray-700 mb-4">
                  Engage with supportive friends, family, or communities for emotional encouragement.
                </p>
                <div className="bg-green-50 rounded-xl p-4">
                  <p className="text-sm text-gray-700">
                    <strong>Remember:</strong> Strong relationships are one of the most powerful resilience factors. Reach out regularly, even when things are going well.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg transform hover:scale-[1.02] transition-all">
                <h3 className="text-2xl font-bold text-teal-600 mb-4 flex items-center gap-3">
                  <span>⚖️</span> Maintain a Balanced Lifestyle
                </h3>
                <p className="text-gray-700 mb-4">
                  Prioritize sleep, nutrition, and physical activity as foundational elements to support mental and emotional health.
                </p>
                <div className="bg-teal-50 rounded-xl p-4">
                  <p className="text-sm text-gray-700">
                    <strong>Foundation:</strong> Aim for 7-9 hours of sleep, balanced nutrition, and at least 30 minutes of physical activity daily.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Growth Mindset */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl p-10 shadow-xl mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">🌱</span>
              <h2 className="text-4xl font-bold text-gray-800">Resilience is Not Fixed—It Can Be Cultivated</h2>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                Emotional resilience is not fixed—it can be cultivated and strengthened with intentional practice, reflection, and support. By developing resilience, individuals not only improve their emotional well-being but also contribute positively to their communities, creating a ripple effect of stability and hope in their interpersonal circles.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-yellow-50 rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2">🎯</div>
                  <p className="font-bold text-gray-800">Intentional Practice</p>
                </div>
                <div className="bg-orange-50 rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2">🔍</div>
                  <p className="font-bold text-gray-800">Self-Reflection</p>
                </div>
                <div className="bg-amber-50 rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2">🤝</div>
                  <p className="font-bold text-gray-800">Seek Support</p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Takeaway */}
          <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-3xl p-12 shadow-2xl text-white mb-12">
            <div className="text-center">
              <div className="text-7xl mb-6">💪</div>
              <h2 className="text-4xl font-bold mb-6">Your Resilience Journey</h2>
              <p className="text-2xl leading-relaxed opacity-90 mb-6">
                Building emotional resilience is a journey, not a destination. Every small step you take towards managing stress, cultivating positive relationships, and caring for yourself strengthens your ability to face life's challenges with grace and courage.
              </p>
              <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6">
                <p className="text-lg italic">
                  "The oak fought the wind and was broken, the willow bent when it must and survived." - Robert Jordan
                </p>
              </div>
            </div>
          </div>

          {/* Start Building CTA */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-12 shadow-xl text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Start Building Your Resilience Today</h2>
            <p className="text-xl text-gray-700 mb-8">
              Track your emotional patterns, practice coping strategies, and strengthen your mental wellness
            </p>
            <button 
              onClick={() => router.push("/")}
              className="px-10 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105"
            >
              Begin Your Journey →
            </button>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-green-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Continue Reading</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Understanding Your Emotions",
                emoji: "🧠",
                gradient: "from-purple-400 to-pink-400",
                link: "/blog/understanding-emotions"
              },
              {
                title: "The Science of Breathing",
                emoji: "🫁",
                gradient: "from-blue-400 to-cyan-400",
                link: "/blog/science-of-breathing"
              },
              {
                title: "Mindfulness for Beginners",
                emoji: "🧘",
                gradient: "from-yellow-400 to-orange-400",
                link: "/blog/mindfulness-beginners"
              }
            ].map((article, idx) => (
              <div
                key={idx}
                onClick={() => router.push(article.link)}
                className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 cursor-pointer"
              >
                <div className="text-6xl mb-4">{article.emoji}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{article.title}</h3>
                <button className={`w-full py-3 bg-gradient-to-r ${article.gradient} text-white rounded-2xl font-bold hover:shadow-xl transition-all`}>
                  Read Article →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
