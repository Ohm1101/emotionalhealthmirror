"use client";

import { useRouter } from "next/navigation";
import { authClient, useSession } from "@/lib/auth-client";
import { toast } from "sonner";

export default function UnderstandingEmotionsPage() {
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
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-blue-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-white/80 border-b border-white/20 shadow-xl">
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
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-blue-400/20 animate-pulse"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-bold mb-6 animate-bounce-soft">
            🧠 Education
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent leading-tight">
            Understanding Your Emotions
          </h1>
          <p className="text-2xl text-gray-700 mb-8">
            A comprehensive guide to recognizing, accepting, and managing your feelings
          </p>
          <div className="flex items-center justify-center gap-6 text-gray-600">
            <span className="flex items-center gap-2">
              <span className="text-2xl">📚</span>
              <span>15 min read</span>
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
          <div className="bg-white/95 backdrop-blur-xl rounded-[3rem] p-12 shadow-2xl mb-12 border-4 border-purple-200">
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              Emotions are a fundamental part of being human. They influence how we perceive the world, make decisions, and interact with others. While often seen as fleeting feelings, emotions are complex psychological and physiological responses that play a crucial role in our mental well-being and overall quality of life. Understanding your emotions is essential for managing stress, building resilience, enhancing relationships, and leading a fulfilling life.
            </p>
          </div>

          {/* What Are Emotions */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-10 shadow-xl mb-12 transform hover:scale-[1.02] transition-all">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">🎭</span>
              <h2 className="text-4xl font-bold text-gray-800">What Are Emotions?</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Emotions are intense feelings that arise in response to stimuli, whether external such as a situation or internal such as a thought. They are accompanied by bodily changes like heart rate fluctuations, changes in breathing, and hormonal shifts, as well as mental changes affecting attention and cognition. Emotions are broadly categorized as positive (joy, love, excitement) or negative (anger, sadness, fear), though the full spectrum is much more nuanced.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Psychologists classify emotions into primary and secondary types. <strong>Primary emotions</strong> are universal and evolved, including happiness, fear, anger, sadness, surprise, and disgust. <strong>Secondary emotions</strong> are more complex and often blends of primary ones, influenced by social and cultural contexts, such as jealousy, pride, or guilt.
            </p>
          </div>

          {/* Why Understanding Emotions is Important */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-10 shadow-xl mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">💡</span>
              <h2 className="text-4xl font-bold text-gray-800">Why Understanding Emotions Is Important</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-2xl font-bold text-purple-600 mb-3">🧠 Mental Health</h3>
                <p className="text-gray-700">
                  Acknowledging and understanding emotions helps in coping with anxiety, depression, and other mental health issues. Suppressing or denying emotions often leads to increased stress and psychological distress.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-2xl font-bold text-blue-600 mb-3">🎯 Decision-Making</h3>
                <p className="text-gray-700">
                  Emotions provide valuable information about our needs and desires, guiding better decisions. For example, feeling uneasy about a choice could signal a need for caution.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-2xl font-bold text-pink-600 mb-3">❤️ Relationships</h3>
                <p className="text-gray-700">
                  Emotional understanding fosters empathy and communication. Recognizing your own emotions and those of others improves conflict resolution and strengthens bonds.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-2xl font-bold text-green-600 mb-3">🌱 Self-Improvement</h3>
                <p className="text-gray-700">
                  Emotional awareness enables personal growth. By identifying patterns in how emotions trigger behaviors, you can develop healthier reactions and habits.
                </p>
              </div>
            </div>
          </div>

          {/* How Emotions Work */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl p-10 shadow-xl mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">🔬</span>
              <h2 className="text-4xl font-bold text-gray-800">How Emotions Work: The Science Behind</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Emotions originate in the brain's <strong>limbic system</strong>, particularly in the <strong>amygdala</strong>, which processes emotional reactions, especially fear and pleasure. The <strong>prefrontal cortex</strong> helps regulate these responses, allowing for thoughtful reflection rather than impulsive action.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Neurotransmitters such as dopamine, serotonin, and oxytocin underpin emotional states and mood regulation. For example, dopamine is often linked with pleasure and reward, while serotonin impacts mood and social behavior.
            </p>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <p className="text-lg text-gray-700 leading-relaxed">
                <strong>💡 Key Insight:</strong> Understanding this biological basis clarifies why emotions can feel so powerful and sometimes overwhelming. They are wired into us for survival, helping us respond quickly to threats or opportunities.
              </p>
            </div>
          </div>

          {/* Developing Emotional Awareness */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-10 shadow-xl mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">👁️</span>
              <h2 className="text-4xl font-bold text-gray-800">Developing Emotional Awareness</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Emotional awareness is the ability to identify and understand your emotions as they occur. It's the first step toward mastery over emotions rather than being controlled by them.
            </p>
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-green-500">
                <h3 className="text-xl font-bold text-gray-800 mb-3">🧘 Mindfulness and Observation</h3>
                <p className="text-gray-700">
                  Regular mindfulness practices like meditation help you tune into your emotional state without judgment. Simply noticing feelings as they arise will improve awareness.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-blue-500">
                <h3 className="text-xl font-bold text-gray-800 mb-3">📝 Journaling</h3>
                <p className="text-gray-700">
                  Writing about your emotions daily can help articulate feelings that may be confusing. It reveals patterns and triggers.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-purple-500">
                <h3 className="text-xl font-bold text-gray-800 mb-3">🏷️ Labeling Emotions</h3>
                <p className="text-gray-700">
                  Putting names to emotions clarifies what you are experiencing. Instead of saying "I feel bad," try to specify: "I feel anxious" or "I feel frustrated."
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-pink-500">
                <h3 className="text-xl font-bold text-gray-800 mb-3">💪 Physical Sensations</h3>
                <p className="text-gray-700">
                  Emotions manifest physically. Awareness of tension, heart rate, or stomach discomfort can signal an emotional state.
                </p>
              </div>
            </div>
          </div>

          {/* Managing Emotions Effectively */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-10 shadow-xl mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">⚡</span>
              <h2 className="text-4xl font-bold text-gray-800">Managing Emotions Effectively</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Once you recognize your emotions, regulation becomes key to coping with them constructively.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-indigo-600 mb-3">✅ Accept Your Emotions</h3>
                <p className="text-gray-700">
                  Avoid judging yourself for feeling certain ways. Acceptance reduces internal conflict and paves the way for healthier management.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-purple-600 mb-3">⏸️ Pause and Reflect</h3>
                <p className="text-gray-700">
                  Before reacting impulsively, pause. Deep breaths and reflective thinking help reduce emotional intensity.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-blue-600 mb-3">🔄 Cognitive Reappraisal</h3>
                <p className="text-gray-700">
                  Change your interpretation of events to alter emotional impact. For instance, seeing criticism as constructive feedback rather than attack shifts emotion from anger to opportunity.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-pink-600 mb-3">💝 Self-Compassion</h3>
                <p className="text-gray-700">
                  Treat yourself kindly during emotional turmoil. Harsh self-judgment exacerbates distress.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-green-600 mb-3">🤝 Seek Support</h3>
                <p className="text-gray-700">
                  Sharing feelings with trusted friends, family, or professionals can provide relief and new perspectives.
                </p>
              </div>
            </div>
          </div>

          {/* Common Emotional Challenges */}
          <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl p-10 shadow-xl mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">⚠️</span>
              <h2 className="text-4xl font-bold text-gray-800">Common Emotional Challenges</h2>
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-rose-600 mb-3">😰 Overwhelming Emotions</h3>
                <p className="text-gray-700">
                  Sometimes emotions can feel too intense to handle. Techniques like <strong>grounding</strong> (focusing on physical sensations or surroundings) can bring you back to the present and reduce overwhelm.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-orange-600 mb-3">🚫 Emotional Suppression</h3>
                <p className="text-gray-700">
                  Trying to push emotions away often causes them to resurface stronger later. Address emotions instead by expressing them safely through talking, writing, or creative outlets.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-yellow-600 mb-3">🌊 Emotional Contagion</h3>
                <p className="text-gray-700">
                  Emotions can spread between people, especially in close relationships or groups. Being mindful of this can help you set boundaries to protect your own emotional state.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-purple-600 mb-3">🎢 Mood Swings</h3>
                <p className="text-gray-700">
                  Rapid emotional changes can be distressing. Keeping a routine, practicing relaxation techniques, and monitoring triggers can help stabilize moods.
                </p>
              </div>
            </div>
          </div>

          {/* Emotions and Communication */}
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-3xl p-10 shadow-xl mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">💬</span>
              <h2 className="text-4xl font-bold text-gray-800">Emotions and Communication</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Expressing emotions clearly and appropriately strengthens communication. Use <strong>"I" statements</strong> to own your feelings, such as "I feel hurt when..." instead of blaming others. Active listening and empathy in conversations validate others' emotions and foster mutual understanding.
            </p>
          </div>

          {/* Emotions and Physical Health */}
          <div className="bg-gradient-to-br from-teal-50 to-green-50 rounded-3xl p-10 shadow-xl mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">🏃</span>
              <h2 className="text-4xl font-bold text-gray-800">Emotions and Physical Health</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Chronic emotional stress affects physical health by increasing inflammation, raising blood pressure, and impairing immune function. Conversely, positive emotions can boost health by reducing stress hormones and encouraging healthy behaviors.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Integrating activities that promote emotional well-being like <strong>exercise, hobbies, social connection, and restful sleep</strong> supports overall health.
            </p>
          </div>

          {/* Emotional Intelligence */}
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl p-10 shadow-xl mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">🎓</span>
              <h2 className="text-4xl font-bold text-gray-800">Cultivating Emotional Intelligence</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Emotional intelligence (EI) involves recognizing one's own and others' emotions, using emotions to guide thinking, understanding emotional meanings, and managing emotions effectively. High EI leads to better leadership, teamwork, and personal happiness.
            </p>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-amber-600 mb-4">Strategies for developing EI:</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🤝</span>
                  <span>Practicing empathy by considering others' perspectives</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🔍</span>
                  <span>Reflecting on emotional reactions in daily interactions</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">⚖️</span>
                  <span>Developing conflict-resolution skills</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">👥</span>
                  <span>Enhancing social skills for better relationships</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-3xl p-12 shadow-2xl text-white text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Start Your Emotional Journey?</h2>
            <p className="text-xl mb-8 opacity-90">
              Track your emotions, understand your patterns, and grow your emotional intelligence with Emotional Mirror
            </p>
            <button 
              onClick={() => router.push("/")}
              className="px-10 py-4 bg-white text-purple-600 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105"
            >
              Start Tracking Your Emotions →
            </button>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-purple-50">
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
                title: "Mindfulness for Beginners",
                emoji: "🧘",
                gradient: "from-purple-400 to-pink-400",
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
