"use client";

import { useRouter } from "next/navigation";
import { authClient, useSession } from "@/lib/auth-client";
import { toast } from "sonner";

export default function SleepMentalHealthPage() {
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
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-purple-50 to-violet-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-white/80 border-b border-white/20 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => router.push("/")}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 rounded-2xl p-3 transform group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent">
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
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 via-purple-400/20 to-violet-400/20 breathe-animation"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full font-bold mb-6 animate-bounce-soft">
            😴 Wellness
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent leading-tight">
            Sleep and Mental Health
          </h1>
          <p className="text-2xl text-gray-700 mb-8">
            The vital connection between rest and emotional wellness
          </p>
          <div className="flex items-center justify-center gap-6 text-gray-600">
            <span className="flex items-center gap-2">
              <span className="text-2xl">📚</span>
              <span>18 min read</span>
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
          <div className="bg-white/95 backdrop-blur-xl rounded-[3rem] p-12 shadow-2xl mb-12 border-4 border-indigo-200">
            <p className="text-xl text-gray-700 leading-relaxed">
              Sleep is a cornerstone of mental health, serving as both a protector and a reflector of our psychological well-being. Poor sleep disrupts emotional regulation, cognitive function, and mood stability, while quality rest enhances resilience, focus, and overall mental vitality. This bidirectional relationship means addressing sleep issues can alleviate mental health challenges, and vice versa, making it essential for anyone seeking balanced emotional health.
            </p>
          </div>

          {/* The Science of Sleep */}
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-3xl p-10 shadow-xl mb-12 transform hover:scale-[1.02] transition-all">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">🧬</span>
              <h2 className="text-4xl font-bold text-gray-800">The Science of Sleep and Its Impact on the Brain</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Sleep occurs in cycles of <strong>non-REM</strong> and <strong>REM</strong> stages, each critical for mental processes. Non-REM deep sleep consolidates memories and clears brain toxins via the glymphatic system, while REM sleep processes emotions and supports learning.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-purple-600 mb-3">🧠 Prefrontal Cortex</h3>
                <p className="text-gray-700">
                  Chronic sleep deprivation impairs the <strong>prefrontal cortex</strong>, reducing impulse control and decision-making abilities.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-violet-600 mb-3">😰 Amygdala</h3>
                <p className="text-gray-700">
                  Sleep loss heightens <strong>amygdala activity</strong>, amplifying fear and anxiety responses.
                </p>
              </div>
            </div>
          </div>

          {/* Research Findings */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-10 shadow-xl mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">📊</span>
              <h2 className="text-4xl font-bold text-gray-800">What Research Shows</h2>
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Research shows insomnia increases <strong>depression risk by 10 times</strong> and <strong>anxiety by 17 times</strong> compared to good sleepers. Sleep apnea triples these risks through oxygen deprivation and fragmented rest.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Meta-analyses confirm that improving sleep quality via interventions like cognitive behavioral therapy for insomnia (CBTi) leads to significant mental health gains, with a dose-response effect: better sleep yields proportionally better outcomes in anxiety, depression, and stress.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-blue-600 mb-4">📈 Key Findings</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-2xl mt-1">✅</span>
                    <span>In adolescents and young adults, short sleep duration correlates with higher mental distress and poor emotional regulation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl mt-1">✅</span>
                    <span>Daily assessments reveal sleep quality predicts next-day mood more strongly than the reverse</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl mt-1">✅</span>
                    <span>This underscores sleep's causal role in emotional well-being</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* How Poor Sleep Harms Mental Health */}
          <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-3xl p-10 shadow-xl mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">⚠️</span>
              <h2 className="text-4xl font-bold text-gray-800">How Poor Sleep Harms Mental Health</h2>
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-red-600 mb-4">😰 Anxiety and Stress Amplification</h3>
                <p className="text-gray-700">
                  Insufficient sleep heightens hyperarousal, making minor stressors feel overwhelming. It elevates cortisol levels, perpetuating a cycle where anxiety disrupts sleep further. Studies link sleep loss to reduced emotional control, increasing panic attacks and generalized anxiety.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-rose-600 mb-4">😔 Depression and Mood Disorders</h3>
                <p className="text-gray-700">
                  Sleep problems often precede depressive episodes, with 75% of depressed individuals experiencing insomnia. Disrupted REM sleep impairs serotonin regulation, mimicking antidepressant reversal. Frequent mental distress rises with inadequate sleep, per CDC data.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-pink-600 mb-4">🧠 Cognitive and Psychotic Effects</h3>
                <p className="text-gray-700">
                  Sleep deprivation mimics psychosis symptoms like hallucinations and paranoia after prolonged periods. It slows processing speed, impairs attention, and weakens problem-solving, exacerbating conditions like ADHD or bipolar disorder.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-orange-600 mb-4">🔄 Bidirectional Cycle</h3>
                <p className="text-gray-700">
                  In youth, poor sleep predicts mental health declines; in adults, psychiatric disorders like PTSD fragment sleep via nightmares. This loop sustains issues unless interrupted.
                </p>
              </div>
            </div>
          </div>

          {/* Mental Health Disorders That Disrupt Sleep */}
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-3xl p-10 shadow-xl mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">🔄</span>
              <h2 className="text-4xl font-bold text-gray-800">Mental Health Disorders That Disrupt Sleep</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-yellow-600 mb-3">😔 Depression</h3>
                <p className="text-gray-700">
                  Causes early awakenings and non-restorative sleep, reducing slow-wave sleep needed for recovery.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-amber-600 mb-3">😰 Anxiety Disorders</h3>
                <p className="text-gray-700">
                  Racing thoughts delay sleep onset; hypervigilance causes frequent arousals.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-orange-600 mb-3">🎭 Bipolar Disorder</h3>
                <p className="text-gray-700">
                  Mania shortens sleep needs, triggering episodes; depression prolongs it.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-red-600 mb-3">🌀 Schizophrenia</h3>
                <p className="text-gray-700">
                  Irregular circadian rhythms and medications fragment sleep.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-purple-600 mb-3">💭 PTSD</h3>
                <p className="text-gray-700">
                  Nightmares and avoidance behaviors lead to insomnia.
                </p>
              </div>
            </div>
          </div>

          {/* Strategies to Improve Sleep */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-10 shadow-xl mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">💚</span>
              <h2 className="text-4xl font-bold text-gray-800">Strategies to Improve Sleep for Better Mental Health</h2>
            </div>
            
            <div className="space-y-8">
              {/* Sleep Hygiene */}
              <div>
                <h3 className="text-3xl font-bold text-green-600 mb-6">🛏️ Sleep Hygiene Essentials</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h4 className="text-lg font-bold text-green-600 mb-3">⏰ Consistent Schedule</h4>
                    <p className="text-gray-700">
                      Maintain consistent bed/wake times, even weekends, to stabilize circadian rhythms.
                    </p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h4 className="text-lg font-bold text-emerald-600 mb-3">🌡️ Cool Environment</h4>
                    <p className="text-gray-700">
                      Create a cool, dark, quiet sleep environment; use blackout curtains and white noise.
                    </p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h4 className="text-lg font-bold text-teal-600 mb-3">📱 Screen Limits</h4>
                    <p className="text-gray-700">
                      Limit screens 1 hour before bed—blue light suppresses melatonin.
                    </p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h4 className="text-lg font-bold text-cyan-600 mb-3">☕ Caffeine Cutoff</h4>
                    <p className="text-gray-700">
                      Avoid caffeine after noon and heavy meals near bedtime.
                    </p>
                  </div>
                </div>
              </div>

              {/* Behavioral Techniques */}
              <div>
                <h3 className="text-3xl font-bold text-blue-600 mb-6">🎯 Behavioral Techniques</h3>
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                    <h4 className="text-2xl font-bold text-blue-600 mb-4">🧠 CBTi (Cognitive Behavioral Therapy for Insomnia)</h4>
                    <p className="text-gray-700 mb-4">
                      Proven gold standard; involves:
                    </p>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-3">
                        <span className="text-xl mt-1">•</span>
                        <span><strong>Stimulus control</strong>: Bed for sleep/sex only</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-xl mt-1">•</span>
                        <span><strong>Sleep restriction</strong>: Limiting time in bed to build efficiency</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-xl mt-1">•</span>
                        <span><strong>Cognitive restructuring</strong>: Challenge sleep myths</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                    <h4 className="text-2xl font-bold text-cyan-600 mb-4">🧘 Relaxation Practices</h4>
                    <p className="text-gray-700">
                      Progressive muscle relaxation or guided imagery reduces pre-sleep arousal.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                    <h4 className="text-2xl font-bold text-teal-600 mb-4">📝 Journaling</h4>
                    <p className="text-gray-700">
                      Dump worries 2 hours before bed to offload racing thoughts.
                    </p>
                  </div>
                </div>
              </div>

              {/* Lifestyle Adjustments */}
              <div>
                <h3 className="text-3xl font-bold text-purple-600 mb-6">🏃 Lifestyle Adjustments</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h4 className="text-lg font-bold text-purple-600 mb-3">💪 Exercise Regularly</h4>
                    <p className="text-gray-700">
                      Exercise regularly (not within 3 hours of bed) to deepen sleep stages.
                    </p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h4 className="text-lg font-bold text-violet-600 mb-3">☀️ Morning Sunlight</h4>
                    <p className="text-gray-700">
                      Get morning sunlight exposure to anchor circadian clock.
                    </p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h4 className="text-lg font-bold text-pink-600 mb-3">😴 Smart Napping</h4>
                    <p className="text-gray-700">
                      Limit naps to 20-30 minutes early afternoon.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sleep Improvement Table */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-10 shadow-xl mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">📋</span>
              <h2 className="text-4xl font-bold text-gray-800">Sleep Improvement Strategy Summary</h2>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-indigo-200">
                    <th className="text-left p-4 font-bold text-indigo-600">Strategy</th>
                    <th className="text-left p-4 font-bold text-purple-600">Mental Health Benefit</th>
                    <th className="text-left p-4 font-bold text-violet-600">Evidence Level</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b border-gray-200">
                    <td className="p-4 font-semibold">Consistent Schedule</td>
                    <td className="p-4">Stabilizes mood, reduces depression risk</td>
                    <td className="p-4 text-green-600 font-bold">High</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-4 font-semibold">CBTi</td>
                    <td className="p-4">Lowers anxiety/depression symptoms</td>
                    <td className="p-4 text-green-600 font-bold">Meta-analysis proven</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-4 font-semibold">No Screens Pre-Bed</td>
                    <td className="p-4">Improves REM, emotional processing</td>
                    <td className="p-4 text-green-600 font-bold">Strong</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">Exercise</td>
                    <td className="p-4">Boosts serotonin, resilience</td>
                    <td className="p-4 text-yellow-600 font-bold">Moderate-high</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Integrating Sleep with Emotional Practices */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-10 shadow-xl mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">🔗</span>
              <h2 className="text-4xl font-bold text-gray-800">Integrating Sleep with Emotional Practices</h2>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Link to prior topics: Use <strong>mindful breathing</strong> (4-7-8 technique: inhale 4s, hold 7s, exhale 8s) for sleep onset, <strong>gratitude journaling</strong> to foster positive pre-sleep mindset, and <strong>resilience-building reframing</strong> to view restless nights as temporary.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                These amplify sleep's mental health benefits by creating a holistic approach to emotional wellness.
              </p>
            </div>
          </div>

          {/* Role of Diet, Exercise, and Environment */}
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-3xl p-10 shadow-xl mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">🥗</span>
              <h2 className="text-4xl font-bold text-gray-800">Role of Diet, Exercise, and Environment</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-teal-600 mb-3">🍎 Diet</h3>
                <p className="text-gray-700">
                  Nutrient-rich diets with magnesium (nuts, greens) and omega-3s support sleep architecture.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-cyan-600 mb-3">🏃 Exercise</h3>
                <p className="text-gray-700">
                  30 minutes daily aerobic exercise enhances deep sleep stages.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-blue-600 mb-3">🛏️ Environment</h3>
                <p className="text-gray-700">
                  Optimize bedroom temperature (60-67°F) and humidity for comfort.
                </p>
              </div>
            </div>
          </div>

          {/* When to Seek Help */}
          <div className="bg-gradient-to-br from-rose-50 to-red-50 rounded-3xl p-10 shadow-xl mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">🆘</span>
              <h2 className="text-4xl font-bold text-gray-800">When to Seek Professional Help</h2>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Consult a doctor if:
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-2xl mt-1">⚠️</span>
                  <span>Insomnia persists >3 weeks</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl mt-1">⚠️</span>
                  <span>Daytime impairment occurs</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl mt-1">⚠️</span>
                  <span>Sleep apnea symptoms appear (snoring, gasping)</span>
                </li>
              </ul>
              <p className="text-lg text-gray-700 leading-relaxed mt-6">
                Therapies like light therapy for seasonal affective disorder or medications as short-term bridges can help, but prioritize non-pharmaceutical fixes.
              </p>
            </div>
          </div>

          {/* Long-Term Outcomes */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-10 shadow-xl mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">📈</span>
              <h2 className="text-4xl font-bold text-gray-800">Long-Term Outcomes and Prevention</h2>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Longitudinal studies show good sleepers have <strong>20-30% lower lifetime mental health disorder risk</strong>. Early interventions in youth prevent escalation.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Track sleep with apps or wearables, aiming for:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-xl p-6">
                  <p className="text-gray-700"><strong>Adults:</strong> 7-9 hours</p>
                </div>
                <div className="bg-emerald-50 rounded-xl p-6">
                  <p className="text-gray-700"><strong>Youth:</strong> 9-11 hours</p>
                </div>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mt-6">
                In workplaces/schools, promote sleep education to cut absenteeism and boost productivity. Public health campaigns emphasizing sleep's mental health role could reduce societal burden.
              </p>
            </div>
          </div>

          {/* Key Insight */}
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-500 rounded-3xl p-12 shadow-2xl text-white mb-12">
            <div className="text-center">
              <div className="text-7xl mb-6">😴</div>
              <h2 className="text-4xl font-bold mb-6">The Feedback Loop of Sleep and Mental Health</h2>
              <p className="text-2xl leading-relaxed opacity-90 mb-6">
                Sleep and mental health form a feedback loop where optimizing one elevates the other. Prioritizing restorative sleep through hygiene, CBTi, and holistic habits yields profound emotional stability, cognitive sharpness, and life satisfaction.
              </p>
              <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6">
                <p className="text-lg italic">
                  "Start tonight: dim lights, breathe deeply, and reclaim your rest for a resilient mind."
                </p>
              </div>
            </div>
          </div>

          {/* Start Improving CTA */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-12 shadow-xl text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Ready to Improve Your Sleep?</h2>
            <p className="text-xl text-gray-700 mb-8">
              Start tracking your sleep patterns and build better sleep habits tonight
            </p>
            <button 
              onClick={() => router.push("/")}
              className="px-10 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105"
            >
              Track Your Sleep & Mood →
            </button>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-indigo-50">
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
