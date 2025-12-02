"use client";

import { useRouter } from "next/navigation";
import { authClient, useSession } from "@/lib/auth-client";
import { toast } from "sonner";

export default function PowerOfGratitudePage() {
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
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-rose-50 to-red-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-white/80 border-b border-white/20 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => router.push("/")}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 rounded-2xl p-3 transform group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 bg-clip-text text-transparent">
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
        <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 via-rose-400/20 to-red-400/20 animate-pulse"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-bold mb-6 animate-bounce-soft">
            🙏 Habits
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 bg-clip-text text-transparent leading-tight">
            The Power of Gratitude
          </h1>
          <p className="text-2xl text-gray-700 mb-8">
            Transforming your life through appreciation and thankfulness
          </p>
          <div className="flex items-center justify-center gap-6 text-gray-600">
            <span className="flex items-center gap-2">
              <span className="text-2xl">📚</span>
              <span>13 min read</span>
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
          <div className="bg-white/95 backdrop-blur-xl rounded-[3rem] p-12 shadow-2xl mb-12 border-4 border-pink-200">
            <p className="text-xl text-gray-700 leading-relaxed">
              Gratitude is more than a simple thank-you or polite attitude—it is a profound psychological and physiological force that can transform our lives. Rooted in the recognition and appreciation of positive aspects in our lives, gratitude fosters well-being, strengthens relationships, and builds resilience against life's challenges. This article explores the power of gratitude, backed by scientific research, and offers practical ways to cultivate it for greater happiness and health.
            </p>
          </div>

          {/* Understanding Gratitude */}
          <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl p-10 shadow-xl mb-12 transform hover:scale-[1.02] transition-all">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">💖</span>
              <h2 className="text-4xl font-bold text-gray-800">Understanding Gratitude</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Gratitude involves appreciating what is valuable and meaningful from the past or present, acknowledging receipt of good things, whether tangible or intangible. It shifts the focus from scarcity and lack to abundance and generosity.
            </p>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <p className="text-lg text-gray-700 leading-relaxed">
                <strong className="text-pink-600">Important:</strong> Far from naive optimism, gratitude is a skill and mindset that rewires the brain to notice and savor positive experiences, counteracting negativity bias.
              </p>
            </div>
          </div>

          {/* Scientific Foundations */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-10 shadow-xl mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">🔬</span>
              <h2 className="text-4xl font-bold text-gray-800">Scientific Foundations of Gratitude</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Research has demonstrated that practicing gratitude triggers the release of "feel-good" neurotransmitters like <strong>dopamine</strong> and <strong>serotonin</strong>.
            </p>
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-purple-600 mb-4">🧠 Brain Imaging Studies</h3>
                <p className="text-gray-700">
                  Studies using brain imaging found that people regularly expressing gratitude show increased activity in the <strong>prefrontal cortex</strong>, an area linked with emotional regulation and decision-making, and lasting neuroplastic changes that strengthen positive thought pathways.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-pink-600 mb-4">📊 Research Findings</h3>
                <p className="text-gray-700">
                  This rewiring helps reduce the intensity of negative emotions and promotes greater emotional control. Meta-analyses of dozens of randomized trials reveal that gratitude interventions consistently improve mental health by increasing life satisfaction, optimism, and positive mood, while decreasing symptoms of anxiety, depression, and psychological pain.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-rose-600 mb-4">❤️ Physical Benefits</h3>
                <p className="text-gray-700">
                  Physiologically, gratitude reduces cortisol, the hormone associated with stress, thereby lowering inflammation and improving heart health. It also enhances sleep quality and immune function, contributing to overall well-being.
                </p>
              </div>
            </div>
          </div>

          {/* Benefits of Practicing Gratitude */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-10 shadow-xl mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">✨</span>
              <h2 className="text-4xl font-bold text-gray-800">Benefits of Practicing Gratitude</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-blue-500">
                <h3 className="text-xl font-bold text-blue-600 mb-3">😊 Enhanced Emotional Well-being</h3>
                <p className="text-gray-700">
                  Gratitude fosters positive emotions such as joy, hope, and contentment, helping to counterbalance stress and negative feelings.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-cyan-500">
                <h3 className="text-xl font-bold text-cyan-600 mb-3">💪 Improved Physical Health</h3>
                <p className="text-gray-700">
                  Lower stress hormones and better cardiovascular indicators are linked to gratitude, leading to increased energy and resilience.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-teal-500">
                <h3 className="text-xl font-bold text-teal-600 mb-3">🤝 Stronger Social Bonds</h3>
                <p className="text-gray-700">
                  Expressing gratitude enhances empathy, trust, and prosocial behavior, strengthening personal relationships and social support networks.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-green-500">
                <h3 className="text-xl font-bold text-green-600 mb-3">🛡️ Increased Resilience</h3>
                <p className="text-gray-700">
                  Grateful individuals exhibit greater emotional resilience, enabling better coping with adversity and setbacks.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-purple-500">
                <h3 className="text-xl font-bold text-purple-600 mb-3">🧘 Heightened Mindfulness</h3>
                <p className="text-gray-700">
                  Gratitude increases awareness of moment-to-moment experiences, deepening appreciation for life's small joys.
                </p>
              </div>
            </div>
          </div>

          {/* How to Cultivate Gratitude */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-10 shadow-xl mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">🌱</span>
              <h2 className="text-4xl font-bold text-gray-800">How to Cultivate Gratitude in Daily Life</h2>
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-8 shadow-lg transform hover:scale-[1.02] transition-all">
                <h3 className="text-2xl font-bold text-green-600 mb-4 flex items-center gap-3">
                  <span>📔</span> Gratitude Journaling
                </h3>
                <p className="text-gray-700 mb-4">
                  Regularly write down things you are thankful for, from major achievements to simple pleasures. Aim for three to five items daily or weekly to build a gratitude habit.
                </p>
                <div className="bg-green-50 rounded-xl p-4">
                  <p className="text-sm text-gray-700">
                    <strong>Pro tip:</strong> Be specific! Instead of "I'm grateful for my family," try "I'm grateful my sister called to check on me today."
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg transform hover:scale-[1.02] transition-all">
                <h3 className="text-2xl font-bold text-emerald-600 mb-4 flex items-center gap-3">
                  <span>💬</span> Express Appreciation
                </h3>
                <p className="text-gray-700 mb-4">
                  Verbally thank people in your life—friends, family, colleagues. Sincere expressions of appreciation deepen connections and boost well-being for both giver and receiver.
                </p>
                <div className="bg-emerald-50 rounded-xl p-4">
                  <p className="text-sm text-gray-700">
                    <strong>Action step:</strong> Send one thank-you message per day to someone who made a difference in your life.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg transform hover:scale-[1.02] transition-all">
                <h3 className="text-2xl font-bold text-teal-600 mb-4 flex items-center gap-3">
                  <span>✉️</span> Gratitude Letters
                </h3>
                <p className="text-gray-700 mb-4">
                  Write a detailed letter to someone who has positively impacted you, explaining how they influenced your life. Consider delivering it in person or reading it aloud.
                </p>
                <div className="bg-teal-50 rounded-xl p-4">
                  <p className="text-sm text-gray-700">
                    <strong>Impact:</strong> Studies show gratitude letters can increase happiness for up to a month!
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg transform hover:scale-[1.02] transition-all">
                <h3 className="text-2xl font-bold text-cyan-600 mb-4 flex items-center gap-3">
                  <span>🧘</span> Mindful Gratitude Meditation
                </h3>
                <p className="text-gray-700 mb-4">
                  Take time to focus on the things you appreciate, breathing deeply and savoring feelings of thankfulness.
                </p>
                <div className="bg-cyan-50 rounded-xl p-4">
                  <p className="text-sm text-gray-700">
                    <strong>Practice:</strong> Spend 5-10 minutes daily in gratitude meditation, focusing on three specific things.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg transform hover:scale-[1.02] transition-all">
                <h3 className="text-2xl font-bold text-blue-600 mb-4 flex items-center gap-3">
                  <span>🔄</span> Reframe Challenges
                </h3>
                <p className="text-gray-700 mb-4">
                  Look for lessons or small blessings in difficult situations, cultivating a mindset that finds meaning and growth in adversity.
                </p>
                <div className="bg-blue-50 rounded-xl p-4">
                  <p className="text-sm text-gray-700">
                    <strong>Example:</strong> "I'm grateful this challenge taught me patience and problem-solving skills."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Incorporating into Emotional Health */}
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl p-10 shadow-xl mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">🎯</span>
              <h2 className="text-4xl font-bold text-gray-800">Incorporating Gratitude into Emotional Health Practices</h2>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Gratitude synergizes powerfully with mindfulness and emotional resilience practices. When combined with mindful breathing, gratitude helps shift focus from stress to calm presence.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                It reinforces cognitive reframing techniques that transform setbacks into learning experiences. Over time, these practices reshape emotional responses and reduce automatic negative reactions.
              </p>
            </div>
          </div>

          {/* Overcoming Barriers */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-10 shadow-xl mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">⚠️</span>
              <h2 className="text-4xl font-bold text-gray-800">Overcoming Barriers to Gratitude</h2>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Some people may find gratitude challenging due to hardship, depression, or ingrained negativity. Starting small, such as noticing one positive thing per day, and pairing gratitude with therapy or other support, fosters gradual change.
              </p>
              <div className="bg-orange-50 rounded-xl p-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  <strong className="text-orange-600">Remember:</strong> Authenticity matters—gratitude need not be forced or superficial to be effective. Start where you are, with what you have.
                </p>
              </div>
            </div>
          </div>

          {/* The Ripple Effect */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-10 shadow-xl mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">🌊</span>
              <h2 className="text-4xl font-bold text-gray-800">The Ripple Effect: Gratitude in Communities and Society</h2>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                On a collective level, widespread gratitude promotes kindness, cooperation, and social cohesion. Grateful communities experience lower conflict and increased well-being.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Teaching gratitude from a young age builds healthier future generations with stronger emotional skills. Your gratitude practice doesn't just transform you—it ripples out to everyone around you.
              </p>
            </div>
          </div>

          {/* Key Insight */}
          <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 rounded-3xl p-12 shadow-2xl text-white mb-12">
            <div className="text-center">
              <div className="text-7xl mb-6">🙏</div>
              <h2 className="text-4xl font-bold mb-6">The Transformative Power of Gratitude</h2>
              <p className="text-2xl leading-relaxed opacity-90 mb-6">
                Gratitude is not just a feeling—it's a practice that rewires your brain, heals your body, and transforms your relationships. When you make gratitude a daily habit, you shift from focusing on what's missing to celebrating what's present, from scarcity to abundance, from stress to peace.
              </p>
              <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6">
                <p className="text-lg italic">
                  "Gratitude turns what we have into enough, and more. It turns denial into acceptance, chaos into order, confusion into clarity...it makes sense of our past, brings peace for today, and creates a vision for tomorrow." - Melody Beattie
                </p>
              </div>
            </div>
          </div>

          {/* Start Practicing CTA */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-12 shadow-xl text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Start Your Gratitude Practice Today</h2>
            <p className="text-xl text-gray-700 mb-8">
              Begin journaling, expressing appreciation, and transforming your perspective
            </p>
            <button 
              onClick={() => router.push("/")}
              className="px-10 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105"
            >
              Start Gratitude Journal →
            </button>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-pink-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Continue Reading</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Mindfulness for Beginners",
                emoji: "🧘",
                gradient: "from-yellow-400 to-orange-400",
                link: "/blog/mindfulness-beginners"
              },
              {
                title: "Building Emotional Resilience",
                emoji: "💪",
                gradient: "from-green-400 to-emerald-400",
                link: "/blog/emotional-resilience"
              },
              {
                title: "Sleep and Mental Health",
                emoji: "😴",
                gradient: "from-indigo-400 to-purple-400",
                link: "/blog/sleep-mental-health"
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
