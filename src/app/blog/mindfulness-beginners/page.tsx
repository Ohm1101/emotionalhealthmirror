"use client";

import { useRouter } from "next/navigation";
import { authClient, useSession } from "@/lib/auth-client";
import { toast } from "sonner";

export default function MindfulnessBeginnersPage() {
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
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-orange-50 to-amber-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-white/80 border-b border-white/20 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => router.push("/")}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 via-orange-600 to-amber-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-gradient-to-r from-yellow-600 via-orange-600 to-amber-600 rounded-2xl p-3 transform group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 via-orange-600 to-amber-600 bg-clip-text text-transparent">
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
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-amber-400/20 breathe-animation"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full font-bold mb-6 animate-bounce-soft">
            🧘 Practice
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-600 via-orange-600 to-amber-600 bg-clip-text text-transparent leading-tight">
            Mindfulness for Beginners
          </h1>
          <p className="text-2xl text-gray-700 mb-8">
            A comprehensive guide to starting your mindfulness practice and cultivating present-moment awareness
          </p>
          <div className="flex items-center justify-center gap-6 text-gray-600">
            <span className="flex items-center gap-2">
              <span className="text-2xl">📚</span>
              <span>16 min read</span>
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
          <div className="bg-white/95 backdrop-blur-xl rounded-[3rem] p-12 shadow-2xl mb-12 border-4 border-yellow-200">
            <p className="text-xl text-gray-700 leading-relaxed">
              Mindfulness is the art and practice of being fully present in the moment, aware of your thoughts, feelings, bodily sensations, and surroundings without judgment. For beginners, mindfulness may seem abstract or challenging, but with simple, practical steps, anyone can begin to experience its powerful benefits, including reduced stress, improved focus, emotional balance, and overall mental well-being.
            </p>
          </div>

          {/* What Is Mindfulness */}
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-10 shadow-xl mb-12 transform hover:scale-[1.02] transition-all">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">🎯</span>
              <h2 className="text-4xl font-bold text-gray-800">What Is Mindfulness?</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Mindfulness means intentionally paying attention to the present moment with openness and curiosity. Rather than being lost in worries about the past or future, or distracted by constant mental chatter, mindfulness anchors you in what is happening right now. This calm, non-judgmental awareness offers a deeper connection to yourself and your environment, fostering peace and clarity.
            </p>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <p className="text-lg text-gray-700 leading-relaxed">
                <strong className="text-orange-600">Important:</strong> Mindfulness is not about emptying the mind or achieving a special state. Instead, it is about observing whatever arises—thoughts, emotions, or physical sensations—without repression or attachment. This simple yet profound attitude brings calm to the mind and body, reduces automatic reactivity, and nurtures resilience.
              </p>
            </div>
          </div>

          {/* Why Mindfulness Matters */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl p-10 shadow-xl mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">💎</span>
              <h2 className="text-4xl font-bold text-gray-800">Why Mindfulness Matters for Beginners</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Starting mindfulness offers many benefits that can transform your daily life, including:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-yellow-600 mb-3">😌 Reduced Stress & Anxiety</h3>
                <p className="text-gray-700">
                  Mindfulness helps break the cycle of rumination and worry by grounding attention in the present.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-orange-600 mb-3">🎯 Improved Focus</h3>
                <p className="text-gray-700">
                  Training your mind to return to the moment strengthens concentration and mental clarity.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-amber-600 mb-3">🎭 Better Emotional Regulation</h3>
                <p className="text-gray-700">
                  Awareness of emotions as they arise helps you respond thoughtfully, not react impulsively.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-red-600 mb-3">🔍 Enhanced Self-Awareness</h3>
                <p className="text-gray-700">
                  You become more familiar with your thoughts, feelings, and habitual patterns.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-pink-600 mb-3">❤️ Greater Compassion</h3>
                <p className="text-gray-700">
                  Mindfulness cultivates kindness toward yourself and others, improving relationships.
                </p>
              </div>
            </div>
          </div>

          {/* Getting Started */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-10 shadow-xl mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">🚀</span>
              <h2 className="text-4xl font-bold text-gray-800">Getting Started: Preparing Your Mind and Space</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              You don't need special equipment or a specific location to begin, but creating a supportive environment helps establish a consistent practice:
            </p>
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-purple-500">
                <p className="text-gray-700">✅ Choose a <strong>quiet, comfortable space</strong> where you can sit without distractions</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-pink-500">
                <p className="text-gray-700">✅ Wear <strong>loose, comfortable clothing</strong></p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-blue-500">
                <p className="text-gray-700">✅ Turn off or silence <strong>phones and other devices</strong></p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-green-500">
                <p className="text-gray-700">✅ Aim to practice at the <strong>same time daily</strong> to develop routine (early mornings or before bedtime often work well)</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-orange-500">
                <p className="text-gray-700">✅ Set a gentle timer for <strong>5-10 minutes</strong> to start, increasing as you feel comfortable</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-teal-500">
                <p className="text-gray-700">✅ Sit upright with your <strong>back straight but relaxed</strong>, either on a chair or cushion</p>
              </div>
            </div>
          </div>

          {/* Basic Practice */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-10 shadow-xl mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">🫁</span>
              <h2 className="text-4xl font-bold text-gray-800">Basic Mindfulness Meditation Practice</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              One of the simplest ways to practice mindfulness is through <strong>breath awareness meditation</strong>, focusing your attention on the natural rhythm of your breathing.
            </p>
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl">1️⃣</span>
                  <h3 className="text-2xl font-bold text-blue-600">Find Your Position</h3>
                </div>
                <p className="text-gray-700">
                  Find a comfortable seated position and close your eyes or softly gaze downward.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl">2️⃣</span>
                  <h3 className="text-2xl font-bold text-cyan-600">Settle In</h3>
                </div>
                <p className="text-gray-700">
                  Take a few deep breaths to settle into your body and the present moment.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl">3️⃣</span>
                  <h3 className="text-2xl font-bold text-teal-600">Focus on Breath</h3>
                </div>
                <p className="text-gray-700">
                  Focus your attention on your breath as it flows in and out. Notice the sensation of air passing, the rise and fall of your chest or belly, or the subtle pauses between breaths.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl">4️⃣</span>
                  <h3 className="text-2xl font-bold text-green-600">Label Your Breath</h3>
                </div>
                <p className="text-gray-700">
                  Silently label: As you inhale, think "breath in," and as you exhale, think "breath out."
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl">5️⃣</span>
                  <h3 className="text-2xl font-bold text-purple-600">Notice When Mind Wanders</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Inevitably, your mind will wander to thoughts, feelings, or external noises. When you notice this distraction, gently and kindly bring your focus back to the breath without judgment or frustration.
                </p>
                <div className="bg-purple-50 rounded-xl p-4">
                  <p className="text-sm text-gray-700">
                    <strong>Important:</strong> This is the practice! Each time you notice and return is strengthening your mindfulness muscle.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl">6️⃣</span>
                  <h3 className="text-2xl font-bold text-pink-600">Continue & Extend</h3>
                </div>
                <p className="text-gray-700">
                  Continue for 5-10 minutes, gradually increasing length over time.
                </p>
              </div>
            </div>
          </div>

          {/* Other Techniques */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-10 shadow-xl mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">🎨</span>
              <h2 className="text-4xl font-bold text-gray-800">Other Beginner-Friendly Mindfulness Techniques</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-green-600 mb-3">🧘 Body Scan</h3>
                <p className="text-gray-700">
                  Bring attention progressively to different parts of your body, noticing sensations without trying to change them.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-emerald-600 mb-3">🚶 Mindful Walking</h3>
                <p className="text-gray-700">
                  Focus attention on the sensation of your feet touching the ground and the movement of your body as you walk slowly.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-teal-600 mb-3">👂 Sensory Awareness</h3>
                <p className="text-gray-700">
                  During everyday activities like eating or showering, fully engage your senses and observe tastes, smells, textures, sights, and sounds.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-cyan-600 mb-3">🎧 Mindful Listening</h3>
                <p className="text-gray-700">
                  During conversations or ambient sounds, focus fully on what you hear without planning responses or distractions.
                </p>
              </div>
            </div>
          </div>

          {/* Common Challenges */}
          <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl p-10 shadow-xl mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">⚠️</span>
              <h2 className="text-4xl font-bold text-gray-800">Dealing with Common Challenges</h2>
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-rose-600 mb-3">💭 Mind Wandering is Normal</h3>
                <p className="text-gray-700">
                  The mind naturally drifts. <strong>Each return to the breath strengthens your ability to focus.</strong> This is not failure—it's the practice!
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-pink-600 mb-3">😣 Restlessness or Discomfort</h3>
                <p className="text-gray-700">
                  Adjust your posture or practice shorter sessions until you build tolerance. Physical discomfort is common at first.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-red-600 mb-3">😤 Impatience or Self-Criticism</h3>
                <p className="text-gray-700">
                  Approach your practice kindly—<strong>progress takes time, and there is no "right" way.</strong> Be patient with yourself.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-orange-600 mb-3">⏰ Busy Schedules</h3>
                <p className="text-gray-700">
                  Short sessions—even one or two minutes—are valuable. Carry mindfulness moments into routine tasks.
                </p>
              </div>
            </div>
          </div>

          {/* Daily Integration */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-10 shadow-xl mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">🌟</span>
              <h2 className="text-4xl font-bold text-gray-800">Incorporating Mindfulness into Daily Life</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Formal meditation sittings are just the beginning. Mindfulness thrives when woven into daily activities:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-indigo-600 mb-3">⏸️ Mindful Pauses</h3>
                <p className="text-gray-700">
                  Take mindful pauses before beginning an activity or responding in stressful moments.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-purple-600 mb-3">🔔 Use Reminders</h3>
                <p className="text-gray-700">
                  Use phone alarms or sticky notes to prompt brief mindfulness throughout the day.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-violet-600 mb-3">🫁 Deep Breathing</h3>
                <p className="text-gray-700">
                  Practice deep breathing before meetings, difficult conversations, or when feeling overwhelmed.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-fuchsia-600 mb-3">📝 Daily Reflection</h3>
                <p className="text-gray-700">
                  Journal mindful insights or challenges to track progress and deepen understanding.
                </p>
              </div>
            </div>
          </div>

          {/* Benefits of Sustained Practice */}
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl p-10 shadow-xl mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">🎁</span>
              <h2 className="text-4xl font-bold text-gray-800">Benefits of Sustained Mindfulness Practice</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              With regular practice over weeks and months, mindfulness can:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-amber-500">
                <p className="text-gray-700">✨ Lower cortisol, reducing stress-related health risks</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-yellow-500">
                <p className="text-gray-700">💪 Enhance immune function and sleep quality</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-orange-500">
                <p className="text-gray-700">🧠 Cultivate emotional resilience, making challenging emotions manageable</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-red-500">
                <p className="text-gray-700">🎯 Improve cognitive flexibility and creativity</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-pink-500">
                <p className="text-gray-700">❤️ Foster a balanced, compassionate mindset toward self and others</p>
              </div>
            </div>
          </div>

          {/* Scientific Backing */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-10 shadow-xl mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">🔬</span>
              <h2 className="text-4xl font-bold text-gray-800">Scientific Backing for Mindfulness</h2>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Research shows mindfulness meditation activates brain regions involved in attention, emotional regulation, and self-awareness, such as the <strong>prefrontal cortex</strong>. It reduces activity in the <strong>amygdala</strong>, the brain's fear center, leading to decreased anxiety and improved mood.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Clinical studies affirm mindfulness's effectiveness for stress reduction, depression, chronic pain, and overall well-being.
              </p>
            </div>
          </div>

          {/* Key Insight */}
          <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-amber-500 rounded-3xl p-12 shadow-2xl text-white mb-12">
            <div className="text-center">
              <div className="text-7xl mb-6">🧘</div>
              <h2 className="text-4xl font-bold mb-6">Your Mindfulness Journey Begins Now</h2>
              <p className="text-2xl leading-relaxed opacity-90 mb-6">
                Mindfulness is not about perfection—it's about practice. Every moment you spend being present is a gift to yourself. Start small, be patient, and watch as mindfulness transforms your relationship with your mind, your emotions, and your life.
              </p>
              <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6">
                <p className="text-lg italic">
                  "The present moment is the only time over which we have dominion." - Thích Nhất Hạnh
                </p>
              </div>
            </div>
          </div>

          {/* Start Practicing CTA */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-12 shadow-xl text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Ready to Begin Your Practice?</h2>
            <p className="text-xl text-gray-700 mb-8">
              Start with guided mindfulness exercises and build your daily practice
            </p>
            <button 
              onClick={() => router.push("/")}
              className="px-10 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105"
            >
              Start Mindfulness Practice →
            </button>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-yellow-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Continue Reading</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "The Science of Breathing",
                emoji: "🫁",
                gradient: "from-blue-400 to-cyan-400",
                link: "/blog/science-of-breathing"
              },
              {
                title: "Building Emotional Resilience",
                emoji: "💪",
                gradient: "from-green-400 to-emerald-400",
                link: "/blog/emotional-resilience"
              },
              {
                title: "The Power of Gratitude",
                emoji: "🙏",
                gradient: "from-pink-400 to-rose-400",
                link: "/blog/power-of-gratitude"
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
