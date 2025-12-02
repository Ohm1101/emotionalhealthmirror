"use client";

import { useRouter } from "next/navigation";

export default function RoleOfExercisePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-white/60 border-b border-white/20 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <button 
              onClick={() => router.push("/")}
              className="flex items-center space-x-3 group cursor-pointer"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 rounded-2xl p-3 transform group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
                  Emotional Mirror
                </h1>
                <p className="text-xs text-gray-600">Your Mental Wellness Companion</p>
              </div>
            </button>
            <button 
              onClick={() => router.push("/blog")}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-semibold hover:shadow-2xl transition-all transform hover:scale-105"
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
            <span className="px-6 py-2 bg-gradient-to-r from-orange-400 to-red-400 text-white rounded-full text-sm font-bold">
              Wellness
            </span>
            <span className="text-gray-600">• 5 min read</span>
            <span className="text-gray-600">• Oct 20, 2025</span>
          </div>
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent leading-tight">
            🏃 The Role of Exercise in Mental Health
          </h1>
          <p className="text-2xl text-gray-700 leading-relaxed">
            Discover how physical activity can boost your mood and reduce symptoms of depression and anxiety through science-backed evidence.
          </p>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Introduction */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-10 shadow-xl">
            <p className="text-lg text-gray-700 leading-relaxed">
              Exercise is widely acknowledged for its physical health benefits, but its powerful positive effects on mental health are equally significant and supported by substantial scientific evidence. Engaging in regular physical activity promotes emotional well-being, reduces symptoms of depression and anxiety, enhances cognitive function, and builds resilience against stress.
            </p>
          </div>

          {/* Mental Health Benefits */}
          <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-3xl p-10 border-4 border-orange-200">
            <h2 className="text-4xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <span className="text-5xl">💪</span>
              Mental Health Benefits of Exercise
            </h2>
            <div className="space-y-6">
              <div className="bg-white/90 rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-orange-600 mb-3 flex items-center gap-2">
                  <span>😊</span> Reduction in Depression and Anxiety
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Exercise rivals traditional treatments such as psychotherapy and medication in alleviating mild to moderate depression and anxiety disorders. Aerobic activities like walking, jogging, and yoga, along with resistance training, show moderate to large improvements in mood and anxiety levels.
                </p>
              </div>

              <div className="bg-white/90 rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-orange-600 mb-3 flex items-center gap-2">
                  <span>🎭</span> Enhanced Mood and Emotional Regulation
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Exercise triggers the release of endorphins, dopamine, and serotonin—neurochemicals that improve mood and create a sense of well-being. This biochemical boost helps counteract negative emotions and stress.
                </p>
              </div>

              <div className="bg-white/90 rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-orange-600 mb-3 flex items-center gap-2">
                  <span>🧠</span> Improved Cognitive Function
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Physical activity stimulates neurogenesis (growth of new neurons), particularly in the hippocampus, which is vital for learning and memory. Exercise also enhances executive functions such as focus, planning, and decision-making skills.
                </p>
              </div>

              <div className="bg-white/90 rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-orange-600 mb-3 flex items-center gap-2">
                  <span>🛡️</span> Increased Resilience to Stress
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Exercise lowers cortisol levels and helps modulate the autonomic nervous system, fostering a better response to stressors and reducing harmful physiological impacts of chronic stress.
                </p>
              </div>

              <div className="bg-white/90 rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-orange-600 mb-3 flex items-center gap-2">
                  <span>😴</span> Better Sleep Quality
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Regular physical activity leads to deeper, more restorative sleep, which itself supports mental health.
                </p>
              </div>

              <div className="bg-white/90 rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-orange-600 mb-3 flex items-center gap-2">
                  <span>👥</span> Social Benefits
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Group exercise or team sports promote social interaction, improving feelings of connection, support, and self-esteem.
                </p>
              </div>
            </div>
          </div>

          {/* Biological Mechanisms */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-10 shadow-xl">
            <h2 className="text-4xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <span className="text-5xl">🔬</span>
              Biological Mechanisms
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Several pathways explain how exercise improves mental health:
            </p>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 border-l-4 border-red-400">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Endorphin Hypothesis</h3>
                <p className="text-gray-700">Exercise induces the release of endogenous opioids (endorphins), which elevate mood and decrease pain perception.</p>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-6 border-l-4 border-orange-400">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Neurogenesis and Neuroplasticity</h3>
                <p className="text-gray-700">Exercise increases brain-derived neurotrophic factor (BDNF), a protein involved in neuron survival and growth, enhancing cognitive flexibility and emotional regulation.</p>
              </div>
              <div className="bg-gradient-to-r from-yellow-50 to-red-50 rounded-2xl p-6 border-l-4 border-yellow-400">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Reduction in Inflammation</h3>
                <p className="text-gray-700">Chronic inflammation is linked to depression; exercise reduces inflammatory markers and improves immune function.</p>
              </div>
              <div className="bg-gradient-to-r from-pink-50 to-red-50 rounded-2xl p-6 border-l-4 border-pink-400">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Stress Hormone Regulation</h3>
                <p className="text-gray-700">Exercise decreases levels of cortisol and adrenaline, hormones involved in the stress response.</p>
              </div>
            </div>
          </div>

          {/* Exercise Modalities */}
          <div className="bg-gradient-to-br from-pink-100 to-red-100 rounded-3xl p-10 border-4 border-pink-200">
            <h2 className="text-4xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <span className="text-5xl">🎯</span>
              Exercise Modalities and Mental Health
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/90 rounded-2xl p-8 shadow-lg">
                <div className="text-4xl mb-4">🏃‍♀️</div>
                <h3 className="text-2xl font-bold text-pink-600 mb-3">Aerobic Exercise</h3>
                <p className="text-gray-700 leading-relaxed">
                  Activities like walking, running, swimming, and cycling are most studied and show consistent benefits at moderate intensity, with sessions lasting 30-60 minutes, 3-5 times per week.
                </p>
              </div>

              <div className="bg-white/90 rounded-2xl p-8 shadow-lg">
                <div className="text-4xl mb-4">🏋️</div>
                <h3 className="text-2xl font-bold text-pink-600 mb-3">Resistance Training</h3>
                <p className="text-gray-700 leading-relaxed">
                  Weightlifting and body-weight exercises improve mood, self-esteem, and reduce anxiety, possibly by building physical confidence and strength.
                </p>
              </div>

              <div className="bg-white/90 rounded-2xl p-8 shadow-lg">
                <div className="text-4xl mb-4">🧘‍♀️</div>
                <h3 className="text-2xl font-bold text-pink-600 mb-3">Yoga & Mind-Body</h3>
                <p className="text-gray-700 leading-relaxed">
                  These combine physical movement with mindfulness, reducing stress and improving mood through relaxation and breath control.
                </p>
              </div>

              <div className="bg-white/90 rounded-2xl p-8 shadow-lg">
                <div className="text-4xl mb-4">💃</div>
                <h3 className="text-2xl font-bold text-pink-600 mb-3">Recreational Activities</h3>
                <p className="text-gray-700 leading-relaxed">
                  Dancing, gardening, or team sports provide mental health benefits, often enhancing social engagement alongside movement.
                </p>
              </div>
            </div>
          </div>

          {/* Practical Recommendations */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-10 shadow-xl">
            <h2 className="text-4xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <span className="text-5xl">📋</span>
              Practical Recommendations
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6">
                <span className="text-3xl">1️⃣</span>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Start Gradually</h3>
                  <p className="text-gray-700">For beginners or those with mental health challenges, start with low intensity and short duration, progressively increasing as tolerated.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-6">
                <span className="text-3xl">2️⃣</span>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Consistency is Key</h3>
                  <p className="text-gray-700">Aim for at least 150 minutes of moderate aerobic activity per week, plus two sessions of resistance training.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-gradient-to-r from-pink-50 to-orange-50 rounded-2xl p-6">
                <span className="text-3xl">3️⃣</span>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Choose Enjoyable Activities</h3>
                  <p className="text-gray-700">Preference improves adherence and enhances psychological benefits.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-6">
                <span className="text-3xl">4️⃣</span>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Combine with Mindfulness</h3>
                  <p className="text-gray-700">Practices like yoga or mindful walking enhance both physical and mental health connections.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-gradient-to-r from-yellow-50 to-red-50 rounded-2xl p-6">
                <span className="text-3xl">5️⃣</span>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Set Realistic Goals</h3>
                  <p className="text-gray-700">Small, incremental goals foster a sense of achievement and sustained motivation.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-6">
                <span className="text-3xl">6️⃣</span>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Seek Social Support</h3>
                  <p className="text-gray-700">Exercising with others boosts motivation, accountability, and social well-being.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Overcoming Barriers */}
          <div className="bg-gradient-to-r from-red-100 to-orange-100 rounded-3xl p-10 border-4 border-red-200">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
              <span className="text-4xl">🚧</span>
              Overcoming Barriers to Exercise
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Common barriers include lack of motivation, fear of injury, time constraints, or fluctuating mental health symptoms.
            </p>
            <div className="bg-white/80 rounded-2xl p-6">
              <p className="text-gray-700 leading-relaxed">
                <strong className="text-red-600">Strategies:</strong> Schedule workouts, use apps or trackers, find group programs, and integrate movement into daily activities (e.g., walking during breaks).
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-3xl p-12 text-white text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Get Moving?</h2>
            <p className="text-xl mb-8 opacity-90">
              Start your journey to better mental health through exercise today
            </p>
            <button 
              onClick={() => router.push("/exercises")}
              className="px-10 py-4 bg-white text-orange-600 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105"
            >
              Explore Exercises →
            </button>
          </div>

          {/* Related Articles */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-10 shadow-xl">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Related Articles</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <button
                onClick={() => router.push("/blog/dealing-with-anxiety")}
                className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 text-left hover:shadow-xl transition-all transform hover:scale-105"
              >
                <div className="text-4xl mb-3">🌊</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Dealing with Anxiety</h3>
                <p className="text-gray-600">Practical coping strategies for managing anxiety</p>
              </button>
              <button
                onClick={() => router.push("/blog/sleep-mental-health")}
                className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 text-left hover:shadow-xl transition-all transform hover:scale-105"
              >
                <div className="text-4xl mb-3">😴</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Sleep and Mental Health</h3>
                <p className="text-gray-600">The crucial connection between rest and wellness</p>
              </button>
            </div>
          </div>

        </div>
      </article>
    </div>
  );
}
