"use client";

import { useRouter } from "next/navigation";
import { authClient, useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import { useState } from "react";

export default function BlogPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

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

  const articles = [
    {
      title: "Understanding Your Emotions: A Beginner's Guide",
      excerpt: "Learn how to identify, name, and process your feelings in healthy ways. Emotional awareness is the first step to better mental health.",
      category: "Education",
      readTime: "15 min",
      date: "Dec 1, 2025",
      emoji: "🧠",
      gradient: "from-purple-400 to-pink-400",
      link: "/blog/understanding-emotions"
    },
    {
      title: "The Science Behind Breathing Exercises",
      excerpt: "Discover why controlled breathing is one of the most powerful tools for managing stress and anxiety.",
      category: "Techniques",
      readTime: "12 min",
      date: "Dec 1, 2025",
      emoji: "🫁",
      gradient: "from-blue-400 to-cyan-400",
      link: "/blog/science-of-breathing"
    },
    {
      title: "Building Emotional Resilience in Challenging Times",
      excerpt: "Strategies to bounce back from setbacks and develop mental strength that lasts.",
      category: "Growth",
      readTime: "14 min",
      date: "Dec 1, 2025",
      emoji: "💪",
      gradient: "from-green-400 to-emerald-400",
      link: "/blog/emotional-resilience"
    },
    {
      title: "Mindfulness for Beginners: Start Here",
      excerpt: "Simple, practical mindfulness exercises you can do anywhere to stay present and reduce stress.",
      category: "Practice",
      readTime: "16 min",
      date: "Dec 1, 2025",
      emoji: "🧘",
      gradient: "from-yellow-400 to-orange-400",
      link: "/blog/mindfulness-beginners"
    },
    {
      title: "The Transformative Power of Gratitude",
      excerpt: "How a daily gratitude practice can rewire your brain for happiness and improve your mental wellbeing.",
      category: "Habits",
      readTime: "13 min",
      date: "Dec 1, 2025",
      emoji: "🙏",
      gradient: "from-pink-400 to-rose-400",
      link: "/blog/power-of-gratitude"
    },
    {
      title: "Sleep and Mental Health: The Crucial Connection",
      excerpt: "Understanding how sleep affects your emotional wellness and tips for better rest.",
      category: "Wellness",
      readTime: "18 min",
      date: "Dec 1, 2025",
      emoji: "😴",
      gradient: "from-indigo-400 to-purple-400",
      link: "/blog/sleep-mental-health"
    },
    {
      title: "Dealing with Anxiety: Practical Coping Strategies",
      excerpt: "Evidence-based techniques to manage anxiety in your daily life.",
      category: "Techniques",
      readTime: "6 min",
      date: "Oct 22, 2025",
      emoji: "🌊",
      gradient: "from-teal-400 to-cyan-400",
      link: "/blog/dealing-with-anxiety"
    },
    {
      title: "The Role of Exercise in Mental Health",
      excerpt: "How physical activity can boost your mood and reduce symptoms of depression and anxiety.",
      category: "Wellness",
      readTime: "5 min",
      date: "Oct 20, 2025",
      emoji: "🏃",
      gradient: "from-orange-400 to-red-400",
      link: "/blog/role-of-exercise"
    },
    {
      title: "Breaking the Stigma: Talking About Mental Health",
      excerpt: "Why open conversations about mental health matter and how to start them.",
      category: "Advocacy",
      readTime: "7 min",
      date: "Oct 18, 2025",
      emoji: "💬",
      gradient: "from-purple-400 to-indigo-400",
      link: "/blog/breaking-stigma"
    }
  ];

  const categories = ["All", "Education", "Techniques", "Growth", "Wellness", "Practice", "Habits", "Advocacy"];

  const filteredArticles = selectedCategory === "All" 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

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
            Mental Health Blog
          </h1>
          <p className="text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Expert insights, practical tips, and inspiring stories for your emotional wellness journey 📚
          </p>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-[3rem] p-12 shadow-2xl text-white">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-6 py-2 bg-white/20 backdrop-blur-xl rounded-full text-sm font-bold">
                ⭐ Featured
              </span>
              <span className="text-white/80">• 10 min read</span>
            </div>
            <h2 className="text-5xl font-bold mb-6">
              Complete Guide to Emotional Wellness in 2025
            </h2>
            <p className="text-2xl mb-8 leading-relaxed opacity-90">
              Everything you need to know about taking care of your mental health in the modern world. 
              From digital wellness to mindfulness practices, we cover it all.
            </p>
            <button className="px-10 py-4 bg-white text-purple-600 rounded-2xl font-bold text-lg hover:shadow-xl transition-all transform hover:scale-105">
              Read Full Article →
            </button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">Browse by Category</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-8 py-4 rounded-2xl font-bold transition-all transform hover:scale-105 hover:shadow-xl ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white shadow-lg'
                    : 'bg-white/95 backdrop-blur-xl text-gray-800 shadow-md'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          {selectedCategory !== "All" && (
            <div className="text-center mt-6">
              <p className="text-gray-600 text-lg">
                Showing <span className="font-bold text-purple-600">{filteredArticles.length}</span> articles in <span className="font-bold text-purple-600">{selectedCategory}</span>
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            {selectedCategory === "All" ? "Latest Articles" : `${selectedCategory} Articles`}
          </h2>
          {filteredArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article, index) => (
                <div
                  key={index}
                  onClick={() => article.link && router.push(article.link)}
                  className={`bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 ${article.link ? 'cursor-pointer' : 'cursor-default'}`}
                >
                  <div className="text-6xl mb-4">{article.emoji}</div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`px-4 py-1 bg-gradient-to-r ${article.gradient} text-white rounded-full text-sm font-bold`}>
                      {article.category}
                    </span>
                    <span className="text-gray-500 text-sm">• {article.readTime}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3 leading-tight">{article.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{article.date}</span>
                    <button className="text-purple-600 font-bold hover:text-purple-700 transition-colors">
                      Read More →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-6">🔍</div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">No articles found</h3>
              <p className="text-xl text-gray-600 mb-8">Try selecting a different category</p>
              <button
                onClick={() => setSelectedCategory("All")}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold hover:shadow-xl transition-all transform hover:scale-105"
              >
                Show All Articles
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-7xl mb-6">💌</div>
          <h2 className="text-5xl font-bold text-white mb-6">
            Get Mental Health Tips Weekly
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Subscribe to our newsletter for expert insights, practical exercises, and inspiring stories
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-2xl text-gray-800 font-medium focus:outline-none focus:ring-4 focus:ring-white/50"
            />
            <button className="px-10 py-4 bg-white text-purple-600 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105">
              Subscribe
            </button>
          </div>
          <p className="text-sm text-white/70 mt-4">No spam, unsubscribe anytime. Your privacy matters to us.</p>
        </div>
      </section>
    </div>
  );
}