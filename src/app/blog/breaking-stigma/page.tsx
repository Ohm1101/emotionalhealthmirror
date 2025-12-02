"use client";

import { useRouter } from "next/navigation";

export default function BreakingStigmaPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-white/60 border-b border-white/20 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <button 
              onClick={() => router.push("/")}
              className="flex items-center space-x-3 group cursor-pointer"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-2xl p-3 transform group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
                  Emotional Mirror
                </h1>
                <p className="text-xs text-gray-600">Your Mental Wellness Companion</p>
              </div>
            </button>
            <button 
              onClick={() => router.push("/blog")}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full font-semibold hover:shadow-2xl transition-all transform hover:scale-105"
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
            <span className="px-6 py-2 bg-gradient-to-r from-purple-400 to-indigo-400 text-white rounded-full text-sm font-bold">
              Advocacy
            </span>
            <span className="text-gray-600">• 7 min read</span>
            <span className="text-gray-600">• Oct 18, 2025</span>
          </div>
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent leading-tight">
            💬 Breaking the Stigma: Talking About Mental Health
          </h1>
          <p className="text-2xl text-gray-700 leading-relaxed">
            Why open conversations about mental health matter and how to start them in your personal life, workplace, and community.
          </p>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Introduction */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-10 shadow-xl">
            <p className="text-lg text-gray-700 leading-relaxed">
              Mental health stigma remains a pervasive barrier to seeking help, fostering silence, shame, and isolation among those affected. Over 1 billion people worldwide live with mental health conditions, yet more than half avoid treatment due to fears of discrimination, judgment, or social exclusion. Breaking this stigma requires open conversations that normalize mental health discussions, challenge stereotypes, and promote empathy, ultimately improving access to care and outcomes.
            </p>
          </div>

          {/* Understanding Stigma */}
          <div className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-3xl p-10 border-4 border-purple-200">
            <h2 className="text-4xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <span className="text-5xl">🔍</span>
              Understanding Mental Health Stigma
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Stigma manifests as negative stereotypes, prejudice, and discrimination against individuals with mental illnesses:
            </p>
            <div className="space-y-4">
              <div className="bg-white/90 rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-purple-600 mb-2">Public Stigma</h3>
                <p className="text-gray-700">Societal attitudes labeling people as "weak," "dangerous," or "unpredictable."</p>
              </div>
              <div className="bg-white/90 rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-purple-600 mb-2">Self-Stigma</h3>
                <p className="text-gray-700">When individuals internalize these views, leading to shame, reduced self-esteem, and hopelessness.</p>
              </div>
              <div className="bg-white/90 rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-purple-600 mb-2">Structural Stigma</h3>
                <p className="text-gray-700">Appears in policies, like underfunding mental health services or employment discrimination, limiting opportunities.</p>
              </div>
            </div>
            <div className="bg-indigo-50 rounded-2xl p-6 mt-6">
              <p className="text-gray-700 leading-relaxed">
                <strong className="text-indigo-600">📊 Research shows:</strong> A 2025 WHO report highlights that stigma delays diagnosis and treatment, exacerbating symptoms and increasing suicide risk.
              </p>
            </div>
          </div>

          {/* Consequences */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-10 shadow-xl">
            <h2 className="text-4xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <span className="text-5xl">⚠️</span>
              The Consequences of Stigma
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 border-l-4 border-red-400">
                <h3 className="text-xl font-bold text-gray-800 mb-3">❌ Delayed Treatment</h3>
                <p className="text-gray-700">Fear of judgment leads to 50-75% of people avoiding care, worsening conditions like depression or anxiety.</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-l-4 border-blue-400">
                <h3 className="text-xl font-bold text-gray-800 mb-3">😔 Social Isolation</h3>
                <p className="text-gray-700">Affected individuals withdraw, deepening loneliness and relational strain.</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-l-4 border-purple-400">
                <h3 className="text-xl font-bold text-gray-800 mb-3">🏥 Poorer Health Outcomes</h3>
                <p className="text-gray-700">Untreated mental illness correlates with higher morbidity, substance use, and physical health decline.</p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border-l-4 border-orange-400">
                <h3 className="text-xl font-bold text-gray-800 mb-3">💼 Economic Impact</h3>
                <p className="text-gray-700">Lost productivity costs billions; stigma hinders workplace support.</p>
              </div>
            </div>
          </div>

          {/* Why Talking Matters */}
          <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl p-10 border-4 border-indigo-200">
            <h2 className="text-4xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <span className="text-5xl">💡</span>
              Why Talking About Mental Health Matters
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Open dialogue demystifies mental illness, humanizes experiences, and encourages help-seeking. Sharing stories reduces "othering," fostering empathy.
            </p>
            <div className="bg-white/80 rounded-2xl p-8">
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong className="text-indigo-600">🔬 Research shows:</strong> Personal narratives decrease prejudice more effectively than facts alone. Normalizing conversations in families, workplaces, and media shifts perceptions from "character flaws" to treatable conditions.
              </p>
              <p className="text-gray-700 leading-relaxed">
                In 2025, movements like Bell Let's Talk and WHO campaigns emphasize "it's okay not to be okay," correlating with rising treatment rates in stigma-aware regions.
              </p>
            </div>
          </div>

          {/* Practical Strategies */}
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-gray-800 text-center">
              💬 Practical Strategies for Starting Conversations
            </h2>

            {/* Personal Relationships */}
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl p-10 border-l-8 border-pink-400">
              <h3 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <span className="text-4xl">❤️</span>
                In Personal Relationships
              </h3>
              <div className="space-y-4">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h4 className="font-bold text-pink-600 mb-2">Choose Safe Moments</h4>
                  <p className="text-gray-700">Approach trusted friends/family during calm times: "I've been feeling overwhelmed lately—have you ever?"</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h4 className="font-bold text-pink-600 mb-2">Use "I" Statements</h4>
                  <p className="text-gray-700">"I'm struggling with anxiety and want to talk about it" invites empathy without accusation.</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h4 className="font-bold text-pink-600 mb-2">Share Resources</h4>
                  <p className="text-gray-700">Recommend books/apps like "The Body Keeps the Score" or Headspace to normalize seeking help.</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h4 className="font-bold text-pink-600 mb-2">Listen Actively</h4>
                  <p className="text-gray-700">Validate feelings: "That sounds really tough—thank you for sharing".</p>
                </div>
              </div>
            </div>

            {/* At Work or School */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-10 border-l-8 border-blue-400">
              <h3 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <span className="text-4xl">💼</span>
                At Work or School
              </h3>
              <div className="space-y-4">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h4 className="font-bold text-blue-600 mb-2">Lead by Example</h4>
                  <p className="text-gray-700">Supervisors can say, "Mental health days are valid here—use them."</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h4 className="font-bold text-blue-600 mb-2">Create Safe Spaces</h4>
                  <p className="text-gray-700">Implement anonymous feedback or peer support groups.</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h4 className="font-bold text-blue-600 mb-2">Educate Colleagues</h4>
                  <p className="text-gray-700">Host short sessions on myths (e.g., "Mental illness isn't contagious").</p>
                </div>
              </div>
            </div>

            {/* Online & Communities */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-10 border-l-8 border-purple-400">
              <h3 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <span className="text-4xl">🌐</span>
                Online and in Communities
              </h3>
              <div className="space-y-4">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h4 className="font-bold text-purple-600 mb-2">Social Media Posts</h4>
                  <p className="text-gray-700">Share anonymized stories or infographics: "1 in 5 experience mental health issues—let's talk."</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h4 className="font-bold text-purple-600 mb-2">Community Events</h4>
                  <p className="text-gray-700">Organize walks or panels with survivors speaking.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Success Stories */}
          <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-3xl p-10 border-4 border-green-200">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
              <span className="text-4xl">🌟</span>
              Success Stories and Evidence of Change
            </h2>
            <div className="space-y-4">
              <p className="text-lg text-gray-700 leading-relaxed">
                Post-2020 pandemic awareness surged; U.S. treatment-seeking rose 15%. Australia's Beyond Blue reduced suicide via campaigns. In India, 2025 initiatives cut stigma in rural areas by 25% through village talks.
              </p>
              <div className="bg-white/80 rounded-2xl p-6">
                <p className="text-gray-700">
                  <strong className="text-green-600">💼 In workplaces:</strong> Organizations adopting stigma-free policies see 20% higher employee satisfaction.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 rounded-3xl p-12 text-white text-center">
            <h2 className="text-4xl font-bold mb-6">Join the Conversation</h2>
            <p className="text-xl mb-8 opacity-90">
              Everyone has a role: Speak your truth, listen without judgment, advocate boldly. One conversation breaks chains for many.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => router.push("/community")}
                className="px-10 py-4 bg-white text-purple-600 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105"
              >
                Share Your Story →
              </button>
              <button 
                onClick={() => router.push("/resources")}
                className="px-10 py-4 bg-white/20 backdrop-blur-xl text-white border-2 border-white rounded-2xl font-bold text-lg hover:bg-white/30 transition-all transform hover:scale-105"
              >
                Find Resources
              </button>
            </div>
          </div>

          {/* Related Articles */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-10 shadow-xl">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Related Articles</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <button
                onClick={() => router.push("/blog/understanding-emotions")}
                className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 text-left hover:shadow-xl transition-all transform hover:scale-105"
              >
                <div className="text-4xl mb-3">🧠</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Understanding Your Emotions</h3>
                <p className="text-gray-600">Learn to identify and process your feelings</p>
              </button>
              <button
                onClick={() => router.push("/blog/emotional-resilience")}
                className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 text-left hover:shadow-xl transition-all transform hover:scale-105"
              >
                <div className="text-4xl mb-3">💪</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Building Emotional Resilience</h3>
                <p className="text-gray-600">Strategies to bounce back from challenges</p>
              </button>
            </div>
          </div>

        </div>
      </article>
    </div>
  );
}
