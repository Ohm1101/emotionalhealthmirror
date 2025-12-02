"use client";

import { useRouter } from "next/navigation";
import { authClient, useSession } from "@/lib/auth-client";
import { toast } from "sonner";

export default function ScienceOfBreathingPage() {
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-cyan-50 to-teal-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-white/80 border-b border-white/20 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => router.push("/")}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 rounded-2xl p-3 transform group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
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
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-cyan-400/20 to-teal-400/20 breathe-animation"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full font-bold mb-6 animate-bounce-soft">
            🫁 Techniques
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent leading-tight">
            The Science of Breathing
          </h1>
          <p className="text-2xl text-gray-700 mb-8">
            How controlled breathing transforms your emotional state and mental wellbeing
          </p>
          <div className="flex items-center justify-center gap-6 text-gray-600">
            <span className="flex items-center gap-2">
              <span className="text-2xl">📚</span>
              <span>12 min read</span>
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
          <div className="bg-white/95 backdrop-blur-xl rounded-[3rem] p-12 shadow-2xl mb-12 border-4 border-blue-200">
            <p className="text-xl text-gray-700 leading-relaxed">
              Breathing has a profound scientific connection to emotions and plays a key role in emotional regulation. Controlled breathing exercises can directly influence the brain systems that generate and regulate emotions, helping to reduce stress, anxiety, and negative feelings while enhancing mood and relaxation.
            </p>
          </div>

          {/* The Biological Link */}
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-3xl p-10 shadow-xl mb-12 transform hover:scale-[1.02] transition-all">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">🧬</span>
              <h2 className="text-4xl font-bold text-gray-800">The Biological Link Between Breathing and Emotion</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Breathing rhythms engage brain areas beyond just oxygen supply, impacting emotional and cognitive states. The <strong>amygdala and limbic system</strong>, which generate emotions, are closely connected to respiratory control centers in the brainstem.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-cyan-600 mb-3">🧘 Parasympathetic Activation</h3>
                <p className="text-gray-700">
                  Slow, deep breaths activate the parasympathetic nervous system via stimulation of the <strong>Vagus nerve</strong>, promoting calmness and relaxation.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-blue-600 mb-3">⚡ Sympathetic Response</h3>
                <p className="text-gray-700">
                  Rapid or shallow breathing activates the sympathetic nervous system, which is linked to stress and anxiety responses - the "fight or flight" mode.
                </p>
              </div>
            </div>
          </div>

          {/* Research Findings */}
          <div className="bg-gradient-to-br from-teal-50 to-green-50 rounded-3xl p-10 shadow-xl mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">🔬</span>
              <h2 className="text-4xl font-bold text-gray-800">What Research Shows</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Studies show that intentional breath control—such as <strong>cyclic sighing</strong> or <strong>slow diaphragmatic breathing</strong>—can significantly reduce respiratory rate and heart rate, leading to lower physiological arousal and better mood.
            </p>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-teal-600 mb-4">🎯 Key Research Findings:</h3>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-2xl mt-1">✅</span>
                  <span>Voluntary breath modulation helps lower sympathetic tone (responsible for "fight or flight") and increases positive emotional states</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl mt-1">✅</span>
                  <span>Controlled breathing is <strong>more effective</strong> than mindfulness meditation alone for immediate mood improvement</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl mt-1">✅</span>
                  <span>Breathing techniques recruit brain regions responsible for emotional regulation, including prefrontal cortical areas</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl mt-1">✅</span>
                  <span>These techniques help inhibit excessive emotional reactions and promote mental clarity</span>
                </li>
              </ul>
            </div>
          </div>

          {/* How Breathing Influences Wellbeing */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-10 shadow-xl mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">💫</span>
              <h2 className="text-4xl font-bold text-gray-800">How Breathing Practices Influence Emotional Well-being</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-purple-500">
                <h3 className="text-2xl font-bold text-purple-600 mb-3">😌 Stress Reduction</h3>
                <p className="text-gray-700">
                  Deep, slow breathing calms the nervous system, reducing feelings of fear, tension, and anxiety by decreasing stress hormone release and lowering blood pressure.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-pink-500">
                <h3 className="text-2xl font-bold text-pink-600 mb-3">😊 Mood Enhancement</h3>
                <p className="text-gray-700">
                  Breathwork techniques promote the release of neurotransmitters and hormones that improve mood and emotional resilience.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-blue-500">
                <h3 className="text-2xl font-bold text-blue-600 mb-3">🎯 Emotional Clarity</h3>
                <p className="text-gray-700">
                  Calm and regulated breathing helps clear distraction and mental noise, allowing better insight into emotional states.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-cyan-500">
                <h3 className="text-2xl font-bold text-cyan-600 mb-3">🌊 Flow State Facilitation</h3>
                <p className="text-gray-700">
                  Focused breathing can ease the passage into a flow state, where concentration and emotional balance are heightened.
                </p>
              </div>
            </div>
          </div>

          {/* Breathing Techniques */}
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-10 shadow-xl mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">🎯</span>
              <h2 className="text-4xl font-bold text-gray-800">Different Breathing Techniques</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              From diaphragmatic breathing (breathing deeply into the belly) to cyclic sighing (special long exhales) or breath retention, different techniques can be used strategically to shift emotions from agitation to calm or from sadness to uplift.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-orange-600 mb-3">🫁 Diaphragmatic Breathing</h3>
                <p className="text-gray-700 mb-3">
                  Deep belly breathing that engages the diaphragm fully for maximum oxygen exchange and relaxation.
                </p>
                <div className="bg-orange-50 rounded-xl p-4">
                  <p className="text-sm text-gray-700"><strong>Best for:</strong> General stress relief, anxiety management</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-amber-600 mb-3">😮‍💨 Cyclic Sighing</h3>
                <p className="text-gray-700 mb-3">
                  Long inhale followed by an extended exhale, repeated for several minutes to downregulate stress responses.
                </p>
                <div className="bg-amber-50 rounded-xl p-4">
                  <p className="text-sm text-gray-700"><strong>Best for:</strong> Acute stress, rapid mood improvement</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-yellow-600 mb-3">🧘 Mindful Breathing</h3>
                <p className="text-gray-700 mb-3">
                  Focus attention entirely on your breath without changing it, cultivating awareness of emotional and bodily states.
                </p>
                <div className="bg-yellow-50 rounded-xl p-4">
                  <p className="text-sm text-gray-700"><strong>Best for:</strong> Building awareness, meditation practice</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-red-600 mb-3">⏸️ Breath Retention</h3>
                <p className="text-gray-700 mb-3">
                  Safely holding breath after inhalation or exhalation can reset autonomic nervous system balance and reduce anxiety.
                </p>
                <div className="bg-red-50 rounded-xl p-4">
                  <p className="text-sm text-gray-700"><strong>Best for:</strong> Advanced practice, ANS regulation</p>
                </div>
              </div>
            </div>
          </div>

          {/* Practical Takeaways */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-10 shadow-xl mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">✨</span>
              <h2 className="text-4xl font-bold text-gray-800">Practical Takeaways for Emotional Health</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              To harness the power of breathing for emotional regulation, try these practices:
            </p>
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-green-600 mb-4 flex items-center gap-3">
                  <span>🌬️</span> Slow, Deep Breaths
                </h3>
                <p className="text-gray-700 mb-4">
                  Inhale deeply through your nose to fill your diaphragm, then exhale slowly through your mouth. <strong>Aim for 5-6 breaths per minute</strong> for calming effects.
                </p>
                <div className="bg-green-50 rounded-xl p-4">
                  <p className="text-sm text-gray-700">⏱️ <strong>Practice:</strong> 5 minutes, 2-3 times daily</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-emerald-600 mb-4 flex items-center gap-3">
                  <span>💨</span> Cyclic Sighing
                </h3>
                <p className="text-gray-700 mb-4">
                  Take a long inhale followed by an extended exhale, repeating for a few minutes to downregulate stress responses.
                </p>
                <div className="bg-emerald-50 rounded-xl p-4">
                  <p className="text-sm text-gray-700">⏱️ <strong>Practice:</strong> 3-5 minutes when feeling stressed</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-teal-600 mb-4 flex items-center gap-3">
                  <span>🧘</span> Mindful Breathing
                </h3>
                <p className="text-gray-700 mb-4">
                  Focus attention entirely on your breath without changing it, cultivating awareness of emotional and bodily states.
                </p>
                <div className="bg-teal-50 rounded-xl p-4">
                  <p className="text-sm text-gray-700">⏱️ <strong>Practice:</strong> 10-20 minutes daily for awareness</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-cyan-600 mb-4 flex items-center gap-3">
                  <span>⏸️</span> Breath Retention
                </h3>
                <p className="text-gray-700 mb-4">
                  Safely holding breath after inhalation or exhalation can reset autonomic nervous system balance and reduce anxiety.
                </p>
                <div className="bg-cyan-50 rounded-xl p-4">
                  <p className="text-sm text-gray-700">⏱️ <strong>Practice:</strong> Advanced - work with an instructor</p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Insight */}
          <div className="bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 rounded-3xl p-12 shadow-2xl text-white mb-12">
            <div className="text-center">
              <div className="text-7xl mb-6">💡</div>
              <h2 className="text-4xl font-bold mb-6">The Power of Your Breath</h2>
              <p className="text-2xl leading-relaxed opacity-90">
                By consciously controlling breath, people can "hack" their physiological state and emotional responses, turning a simple automatic process into a powerful tool for emotional well-being. Your breath is always with you - use it wisely!
              </p>
            </div>
          </div>

          {/* Try It Now CTA */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-12 shadow-xl text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Ready to Experience the Benefits?</h2>
            <p className="text-xl text-gray-700 mb-8">
              Start with our guided breathing exercises and feel the difference in minutes
            </p>
            <button 
              onClick={() => router.push("/")}
              className="px-10 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105"
            >
              Try Breathing Exercises Now →
            </button>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-blue-50">
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
                title: "Building Emotional Resilience",
                emoji: "💪",
                gradient: "from-green-400 to-emerald-400",
                link: "/blog/emotional-resilience"
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
