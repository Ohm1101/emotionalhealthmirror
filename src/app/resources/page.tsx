"use client";

import { useRouter } from "next/navigation";
import { authClient, useSession } from "@/lib/auth-client";
import { toast } from "sonner";

export default function ResourcesPage() {
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

  const resources = [
    {
      category: "Crisis Support",
      icon: "🆘",
      color: "from-red-400 to-rose-400",
      items: [
        {
          title: "National Suicide Prevention Lifeline",
          description: "24/7 crisis support",
          contact: "Call or text 112",
          link: "tel:112"
        },
        {
          title: "Crisis Text Line",
          description: "Free 24/7 text support",
          contact: "Text HOME to 741741",
          link: "sms:741741?body=HOME"
        },
        {
          title: "International Association for Suicide Prevention",
          description: "Worldwide crisis resources",
          contact: "findahelpline.com",
          link: "https://findahelpline.com"
        }
      ]
    },
    {
      category: "Professional Help",
      icon: "👨‍⚕️",
      color: "from-blue-400 to-cyan-400",
      items: [
        {
          title: "Psychology Today",
          description: "Find a therapist directory",
          contact: "psychologytoday.com",
          link: "https://www.psychologytoday.com/us/therapists"
        },
        {
          title: "BetterHelp",
          description: "Online therapy platform",
          contact: "betterhelp.com",
          link: "https://www.betterhelp.com"
        },
        {
          title: "Talkspace",
          description: "Text-based therapy",
          contact: "talkspace.com",
          link: "https://www.talkspace.com"
        },
        {
          title: "Open Path Collective",
          description: "Affordable therapy ($30-$80/session)",
          contact: "openpathcollective.org",
          link: "https://openpathcollective.org"
        }
      ]
    },
    {
      category: "Mental Health Organizations",
      icon: "🏥",
      color: "from-green-400 to-emerald-400",
      items: [
        {
          title: "National Alliance on Mental Illness (NAMI)",
          description: "Support, education, and advocacy",
          contact: "nami.org",
          link: "https://www.nami.org"
        },
        {
          title: "Mental Health America",
          description: "Screening tools and resources",
          contact: "mhanational.org",
          link: "https://www.mhanational.org"
        },
        {
          title: "Anxiety and Depression Association of America",
          description: "Evidence-based information",
          contact: "adaa.org",
          link: "https://adaa.org"
        },
        {
          title: "The Trevor Project",
          description: "LGBTQ+ youth crisis support",
          contact: "Call 1-866-488-7386",
          link: "https://www.thetrevorproject.org"
        }
      ]
    },
    {
      category: "Self-Help Resources",
      icon: "📚",
      color: "from-purple-400 to-pink-400",
      items: [
        {
          title: "Headspace",
          description: "Meditation and mindfulness app",
          contact: "headspace.com",
          link: "https://www.headspace.com"
        },
        {
          title: "Calm",
          description: "Sleep and meditation",
          contact: "calm.com",
          link: "https://www.calm.com"
        },
        {
          title: "Sanvello",
          description: "Mood tracking and coping tools",
          contact: "sanvello.com",
          link: "https://www.sanvello.com"
        },
        {
          title: "MindShift CBT",
          description: "Anxiety relief strategies",
          contact: "anxietycanada.com",
          link: "https://www.anxietycanada.com/resources/mindshift-cbt/"
        }
      ]
    },
    {
      category: "Support Communities",
      icon: "👥",
      color: "from-yellow-400 to-orange-400",
      items: [
        {
          title: "7 Cups",
          description: "Free emotional support chat",
          contact: "7cups.com",
          link: "https://www.7cups.com"
        },
        {
          title: "r/mentalhealth",
          description: "Reddit support community",
          contact: "reddit.com/r/mentalhealth",
          link: "https://www.reddit.com/r/mentalhealth"
        },
        {
          title: "Depression and Bipolar Support Alliance",
          description: "Peer-led support groups",
          contact: "dbsalliance.org",
          link: "https://www.dbsalliance.org"
        },
        {
          title: "Meetup Mental Health Groups",
          description: "Local in-person support",
          contact: "meetup.com",
          link: "https://www.meetup.com/topics/mental-health/"
        }
      ]
    },
    {
      category: "Educational Resources",
      icon: "🎓",
      color: "from-indigo-400 to-violet-400",
      items: [
        {
          title: "National Institute of Mental Health",
          description: "Research and education",
          contact: "nimh.nih.gov",
          link: "https://www.nimh.nih.gov"
        },
        {
          title: "Mental Health Foundation",
          description: "Evidence-based information",
          contact: "mentalhealth.org.uk",
          link: "https://www.mentalhealth.org.uk"
        },
        {
          title: "Centre for Addiction and Mental Health",
          description: "Resources and research",
          contact: "camh.ca",
          link: "https://www.camh.ca"
        },
        {
          title: "Mind",
          description: "Mental health information",
          contact: "mind.org.uk",
          link: "https://www.mind.org.uk"
        }
      ]
    }
  ];

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
            Mental Health Resources
          </h1>
          <p className="text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Comprehensive support, professional help, and educational resources for your mental wellness journey 🌟
          </p>
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-red-500 to-rose-500 rounded-3xl p-8 shadow-2xl text-white text-center">
            <div className="text-6xl mb-4">🆘</div>
            <h2 className="text-3xl font-bold mb-4">In Crisis? Get Help Now</h2>
            <p className="text-xl mb-6">If you're experiencing a mental health emergency:</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="tel:988"
                className="px-8 py-4 bg-white text-red-600 rounded-2xl font-bold text-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                Call 988
              </a>
              <a
                href="sms:741741?body=HOME"
                className="px-8 py-4 bg-white/20 backdrop-blur-xl text-white rounded-2xl font-bold text-lg hover:bg-white/30 transition-all border-2 border-white/30"
              >
                Text HOME to 741741
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          {resources.map((category, catIndex) => (
            <div key={catIndex}>
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">{category.icon}</div>
                <h2 className="text-4xl font-bold text-gray-800">{category.category}</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {category.items.map((item, itemIndex) => (
                  <a
                    key={itemIndex}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 border-l-8 bg-gradient-to-r ${category.color}`}
                  >
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">{item.title}</h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <div className="flex items-center gap-2 text-purple-600 font-bold">
                      <span>🔗</span>
                      <span>{item.contact}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Need More Support?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Explore our interactive tools and community features
          </p>
          <div className="flex flex-wrap gap-6 justify-center">
            <a
              href="/"
              className="px-12 py-5 bg-white text-purple-600 rounded-full font-bold text-xl hover:shadow-2xl transition-all transform hover:scale-110"
            >
              Try Our Tools 🛠️
            </a>
            <a
              href="/community"
              className="px-12 py-5 bg-white/20 backdrop-blur-xl text-white rounded-full font-bold text-xl hover:bg-white/30 transition-all transform hover:scale-110 border-2 border-white/30"
            >
              Join Community 👥
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}