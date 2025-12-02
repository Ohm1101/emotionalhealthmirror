"use client";

import { useRouter } from "next/navigation";

export default function DealingWithAnxietyPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-white/60 border-b border-white/20 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <button 
              onClick={() => router.push("/")}
              className="flex items-center space-x-3 group cursor-pointer"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 rounded-2xl p-3 transform group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  Emotional Mirror
                </h1>
                <p className="text-xs text-gray-600">Your Mental Wellness Companion</p>
              </div>
            </button>
            <button 
              onClick={() => router.push("/blog")}
              className="px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-full font-semibold hover:shadow-2xl transition-all transform hover:scale-105"
            >
              ← Back to Blog
            </button>
          </div>
        </div>
      </nav>

      {/* Article Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-6 py-2 bg-gradient-to-r from-teal-400 to-cyan-400 text-white rounded-full text-sm font-bold">
              Techniques
            </span>
            <span className="text-gray-600">• 6 min read</span>
            <span className="text-gray-600">• Oct 22, 2025</span>
          </div>
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent leading-tight">
            🌊 Dealing with Anxiety: Practical Coping Strategies
          </h1>
          <p className="text-2xl text-gray-700 leading-relaxed">
            Evidence-based techniques to manage anxiety in your daily life and regain control over your emotional wellbeing.
          </p>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Introduction */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-10 shadow-xl">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Anxiety is a common emotional response characterized by excessive worry, fear, or unease that can interfere with daily life, often manifesting as physical symptoms like rapid heartbeat, sweating, or tension. Effective coping strategies, grounded in evidence-based practices, empower individuals to manage these symptoms, reduce their intensity, and prevent escalation into disorders like generalized anxiety or panic attacks. This article outlines practical, actionable techniques drawn from cognitive-behavioral therapy (CBT), mindfulness, and lifestyle interventions to help regain control.
            </p>
          </div>

          {/* Understanding Anxiety */}
          <div className="bg-gradient-to-br from-teal-100 to-cyan-100 rounded-3xl p-10 border-4 border-teal-200">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-5xl">🧠</span>
              <h2 className="text-4xl font-bold text-gray-800">Understanding Anxiety and Its Triggers</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Anxiety arises from the brain's amygdala detecting perceived threats, triggering the fight-or-flight response even without real danger. Common triggers include stress, uncertainty, trauma, or caffeine overload. Recognizing early signs—racing thoughts, restlessness, or muscle tightness—allows timely intervention.
            </p>
            <div className="bg-white/80 rounded-2xl p-6">
              <p className="text-gray-700 leading-relaxed">
                <strong className="text-teal-600">📊 Did you know?</strong> Unlike normal worry, clinical anxiety persists and disrupts functioning, affecting 18% of adults annually. Building awareness through journaling triggers fosters proactive coping.
              </p>
            </div>
          </div>

          {/* Immediate Coping Techniques */}
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-gray-800 text-center mb-8">
              ⚡ Immediate Coping Techniques for Acute Anxiety
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed text-center mb-8">
              When anxiety surges, quick grounding methods activate the parasympathetic nervous system to counteract fight-or-flight.
            </p>

            {/* Deep Breathing */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-10 border-l-8 border-blue-400">
              <h3 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <span className="text-4xl">🫁</span>
                Deep Breathing Exercises
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Controlled breathing reduces cortisol and heart rate variability within minutes. Try the 4-7-8 technique:
              </p>
              <div className="space-y-4">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl font-bold text-blue-500">1</span>
                    <p className="text-gray-700 text-lg">Exhale completely through your mouth.</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl font-bold text-blue-500">2</span>
                    <p className="text-gray-700 text-lg">Inhale quietly through your nose for 4 counts.</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl font-bold text-blue-500">3</span>
                    <p className="text-gray-700 text-lg">Hold for 7 counts.</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl font-bold text-blue-500">4</span>
                    <p className="text-gray-700 text-lg">Exhale forcefully through your mouth for 8 counts.</p>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 mt-6 italic">Repeat 4 cycles. Studies in Frontiers in Psychology confirm this lowers anxiety symptoms rapidly.</p>
            </div>

            {/* 5-4-3-2-1 Grounding */}
            <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-3xl p-10 border-l-8 border-cyan-400">
              <h3 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <span className="text-4xl">🌟</span>
                5-4-3-2-1 Grounding Technique
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                This sensory exercise anchors you in the present and interrupts panic loops effectively:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <p className="text-2xl font-bold text-cyan-600 mb-2">5 👀</p>
                  <p className="text-gray-700">Name 5 things you see</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <p className="text-2xl font-bold text-cyan-600 mb-2">4 ✋</p>
                  <p className="text-gray-700">4 things you touch</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <p className="text-2xl font-bold text-cyan-600 mb-2">3 👂</p>
                  <p className="text-gray-700">3 things you hear</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <p className="text-2xl font-bold text-cyan-600 mb-2">2 👃</p>
                  <p className="text-gray-700">2 things you smell</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg col-span-2">
                  <p className="text-2xl font-bold text-cyan-600 mb-2">1 👅</p>
                  <p className="text-gray-700">1 thing you taste</p>
                </div>
              </div>
            </div>

            {/* Progressive Muscle Relaxation */}
            <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-3xl p-10 border-l-8 border-teal-400">
              <h3 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <span className="text-4xl">💪</span>
                Progressive Muscle Relaxation (PMR)
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Tense and release muscle groups sequentially—from toes to head—for 5-10 seconds each. Research shows PMR rivals medication for short-term relief by discharging physical tension.
              </p>
            </div>
          </div>

          {/* Cognitive Strategies */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-10 shadow-xl">
            <h2 className="text-4xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <span className="text-5xl">🧩</span>
              Cognitive Strategies: Rewiring Anxious Thoughts
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              CBT, the gold standard per Mayo Clinic and NIMH, targets distorted thinking patterns fueling anxiety.
            </p>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border-l-4 border-purple-400">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Challenge Negative Thoughts</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Identify catastrophizing ("Everything will fail") and reframe with evidence: "What's the realistic outcome? Past successes?"
                </p>
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <p className="font-bold text-purple-600 mb-3">Example Thought Record:</p>
                  <div className="space-y-2 text-sm">
                    <p><strong>Situation:</strong> Job Interview</p>
                    <p><strong>Anxious Thought:</strong> I'll blank out and embarrass myself</p>
                    <p><strong>Evidence For:</strong> Felt nervous before</p>
                    <p><strong>Evidence Against:</strong> Prepared well; succeeded last time</p>
                    <p className="text-green-600 font-semibold"><strong>Balanced Thought:</strong> Nerves are normal; I can handle it</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 border-l-4 border-blue-400">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Positive Affirmations and Mantras</h3>
                <p className="text-gray-700 leading-relaxed">
                  Repeat phrases like "This feeling will pass" or "I am safe now." Pair with breathing for amplified effect. Practice daily for 10 minutes to build neural pathways reducing automatic negativity.
                </p>
              </div>
            </div>
          </div>

          {/* Lifestyle Changes */}
          <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl p-10 border-4 border-green-200">
            <h2 className="text-4xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <span className="text-5xl">🌱</span>
              Lifestyle Changes for Long-Term Anxiety Management
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Sustainable habits prevent anxiety buildup and support overall mental health.
            </p>

            <div className="space-y-6">
              <div className="bg-white/90 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-green-600 mb-3 flex items-center gap-2">
                  <span>🏃</span> Regular Exercise
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Aerobic activity like walking or HIIT releases endorphins, cutting symptoms by 20-30%. Yoga combines movement with breath, reducing anxiety up to 50% per Journal of Clinical Medicine. Aim for 30 minutes, 5 days weekly; start gradual if panic-prone.
                </p>
              </div>

              <div className="bg-white/90 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-green-600 mb-3 flex items-center gap-2">
                  <span>🥗</span> Nutrition and Substance Limits
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Balanced diets with omega-3s (fish, nuts) and magnesium stabilize mood. Avoid caffeine/alcohol, which aggravate symptoms. NIMH-endorsed: well-timed meals prevent blood sugar crashes mimicking anxiety.
                </p>
              </div>

              <div className="bg-white/90 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-green-600 mb-3 flex items-center gap-2">
                  <span>📅</span> Consistent Routines
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Fixed sleep/wake times and daily structure reduce uncertainty. Prioritize 7-9 hours sleep, linking to prior sleep-mental health insights.
                </p>
              </div>
            </div>
          </div>

          {/* When to Seek Help */}
          <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-3xl p-10 border-4 border-red-200">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
              <span className="text-4xl">🆘</span>
              When to Seek Professional Help
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Self-strategies suffice for mild anxiety; severe cases (panic attacks, avoidance) warrant therapy. CBT outperforms meds long-term; consider if symptoms persist &gt;2 weeks or impair work/life. Therapists tailor plans, possibly adding SSRIs short-term.
            </p>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 rounded-3xl p-12 text-white text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl mb-8 opacity-90">
              Track your anxiety patterns and practice coping techniques with our interactive tools
            </p>
            <button 
              onClick={() => router.push("/dashboard")}
              className="px-10 py-4 bg-white text-teal-600 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105"
            >
              Try Mood Tracker →
            </button>
          </div>

          {/* Related Articles */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-10 shadow-xl">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Related Articles</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <button
                onClick={() => router.push("/blog/science-of-breathing")}
                className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 text-left hover:shadow-xl transition-all transform hover:scale-105"
              >
                <div className="text-4xl mb-3">🫁</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">The Science Behind Breathing Exercises</h3>
                <p className="text-gray-600">Learn why controlled breathing is so powerful</p>
              </button>
              <button
                onClick={() => router.push("/blog/mindfulness-beginners")}
                className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 text-left hover:shadow-xl transition-all transform hover:scale-105"
              >
                <div className="text-4xl mb-3">🧘</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Mindfulness for Beginners</h3>
                <p className="text-gray-600">Simple practices to stay present and calm</p>
              </button>
            </div>
          </div>

        </div>
      </article>
    </div>
  );
}
