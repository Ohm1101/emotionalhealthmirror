"use client";

import { useState, useEffect } from "react";
import { authClient, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface Exercise {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  durationMinutes: number;
}

interface Recommendation {
  id: number;
  emotionName: string;
  recommendedExerciseId: number;
  reason: string;
  exercise?: Exercise;
}

export default function DashboardPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [wellnessData, setWellnessData] = useState<any>(null);
  const [wellnessHistory, setWellnessHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [joyScale, setJoyScale] = useState(5);
  const [showJoyInput, setShowJoyInput] = useState(false);
  const [saving, setSaving] = useState(false);
  const [recommendedExercise, setRecommendedExercise] = useState<{ exercise: Exercise; reason: string } | null>(null);
  const [showRecommendation, setShowRecommendation] = useState(false);

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login");
    } else if (session?.user) {
      fetchWellnessData();
      fetchWellnessHistory();
    }
  }, [session, isPending, router]);

  const fetchWellnessData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch("/api/wellness", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setWellnessData(data.wellness);
        if (data.wellness?.joyScale) {
          setJoyScale(data.wellness.joyScale);
        }
      }
    } catch (error) {
      console.error("Error fetching wellness data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchWellnessHistory = async () => {
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch("/api/wellness/history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setWellnessHistory(data.history || []);
      }
    } catch (error) {
      console.error("Error fetching wellness history:", error);
    }
  };

  const getExerciseRecommendation = async (joyLevel: number) => {
    try {
      const token = localStorage.getItem("bearer_token");
      
      // Determine category based on joy level
      let category = "";
      let reason = "";
      let emotionName = "";
      
      if (joyLevel <= 3) {
        category = "breathing";
        emotionName = "low joy";
        reason = "Deep breathing exercises can help lift your mood and reduce stress. Let's start with gentle breathing techniques.";
      } else if (joyLevel <= 5) {
        category = "stress";
        emotionName = "moderate stress";
        reason = "Stress relief exercises can help balance your emotions and improve your well-being. These techniques are perfect for finding your center.";
      } else if (joyLevel <= 7) {
        category = "anxiety";
        emotionName = "mild tension";
        reason = "Anxiety management exercises can help you maintain emotional balance and prevent stress buildup.";
      } else {
        category = "breathing";
        emotionName = "high joy";
        reason = "Maintain your positive state with calming exercises that will keep you centered and peaceful.";
      }

      // Fetch exercises in the recommended category
      const exercisesResponse = await fetch(`/api/exercises?category=${category}&limit=3`);
      
      if (exercisesResponse.ok) {
        const exercises = await exercisesResponse.json();
        
        if (exercises.length > 0) {
          // Pick a random exercise from the results
          const randomExercise = exercises[Math.floor(Math.random() * exercises.length)];
          
          // Create recommendation in database
          await fetch("/api/recommendations", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              emotionName,
              recommendedExerciseId: randomExercise.id,
              reason,
            }),
          });
          
          setRecommendedExercise({
            exercise: randomExercise,
            reason,
          });
          setShowRecommendation(true);
        }
      }
    } catch (error) {
      console.error("Error getting exercise recommendation:", error);
    }
  };

  const updateJoyScale = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch("/api/wellness", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          score: joyScale,
          moodContribution: joyScale - (wellnessData?.joyScale || 0),
          exerciseContribution: 0,
        }),
      });

      if (response.ok) {
        toast.success(`Joy Scale updated to ${joyScale}! 🌟`);
        await fetchWellnessData();
        await fetchWellnessHistory();
        setShowJoyInput(false);
        
        // Get exercise recommendation based on new joy level
        await getExerciseRecommendation(joyScale);
      } else {
        toast.error("Failed to update Joy Scale");
      }
    } catch (error) {
      console.error("Error updating joy scale:", error);
      toast.error("Failed to update Joy Scale");
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();
    if (error?.code) {
      toast.error("Failed to sign out");
    } else {
      localStorage.removeItem("bearer_token");
      toast.success("Signed out successfully!");
      router.push("/");
    }
  };

  const getJoyEmoji = (score: number) => {
    if (score >= 9) return "🌟";
    if (score >= 7) return "😊";
    if (score >= 5) return "😐";
    if (score >= 3) return "😔";
    return "😢";
  };

  const getJoyMessage = (score: number) => {
    if (score >= 9) return "You're thriving! Keep up the amazing work! 🎉";
    if (score >= 7) return "You're doing great! Stay positive! 💪";
    if (score >= 5) return "You're balanced. Keep nurturing your wellness! 🌱";
    if (score >= 3) return "Hang in there. Practice self-care today! 💚";
    return "We're here for you. Try a wellness exercise! 🫂";
  };

  const getCategoryEmoji = (category: string) => {
    const emojiMap: Record<string, string> = {
      breathing: "🫁",
      meditation: "🧘",
      anxiety: "😰",
      stress: "💆",
      sleep: "😴",
      focus: "🎯",
      mood: "😊",
      tension: "💪",
      depression: "🌈",
      nervousness: "🦋",
    };
    return emojiMap[category.toLowerCase()] || "✨";
  };

  if (isPending || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <div className="text-center">
          <div className="text-8xl mb-6 pulse-glow">📊</div>
          <p className="text-2xl text-gray-600">Loading your wellness dashboard...</p>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-white/60 border-b border-white/20 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => router.push("/")}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl p-3 transform group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
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
                onClick={() => router.push("/profile")}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full font-semibold hover:shadow-2xl transition-all transform hover:scale-105"
              >
                👤 Profile
              </button>
              <button 
                onClick={() => router.push("/notifications")}
                className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full font-semibold hover:shadow-2xl transition-all transform hover:scale-105"
              >
                🔔 Notifications
              </button>
              <button 
                onClick={handleSignOut}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full font-semibold hover:shadow-2xl transition-all transform hover:scale-105"
              >
                🚪 Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <h2 className="text-6xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
            Wellness Dashboard
          </h2>
          <p className="text-gray-600 text-xl">Track your mental health journey and celebrate your progress! 🌟</p>
        </div>

        {/* Joy Scale Section */}
        <div className="bg-white/95 backdrop-blur-xl rounded-[3rem] p-12 shadow-[0_30px_90px_rgba(0,0,0,0.2)] border-4 border-green-300 mb-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
                <span>💚</span> Your Joy Scale
              </h3>
              <p className="text-gray-600 text-lg">Rate your current well-being from 1-10</p>
            </div>
            <div className="text-9xl pulse-glow">{getJoyEmoji(wellnessData?.joyScale || joyScale)}</div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-700 font-bold text-xl">Current Joy Level</span>
              <span className="text-6xl font-bold text-green-600">{wellnessData?.joyScale || joyScale}/10</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden">
              <div
                className="bg-gradient-to-r from-green-400 to-emerald-500 h-8 rounded-full transition-all duration-1000 flex items-center justify-end pr-4"
                style={{ width: `${((wellnessData?.joyScale || joyScale) / 10) * 100}%` }}
              >
                <span className="text-white font-bold">{getJoyEmoji(wellnessData?.joyScale || joyScale)}</span>
              </div>
            </div>
            <p className="text-green-700 font-bold text-lg mt-4 text-center">
              {getJoyMessage(wellnessData?.joyScale || joyScale)}
            </p>
          </div>

          {!showJoyInput ? (
            <button
              onClick={() => setShowJoyInput(true)}
              className="w-full px-10 py-5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl font-bold text-xl hover:shadow-2xl transition-all transform hover:scale-105"
            >
              📝 Update Your Joy Scale
            </button>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={joyScale}
                  onChange={(e) => setJoyScale(parseInt(e.target.value))}
                  className="flex-1 h-4 bg-gradient-to-r from-green-200 to-emerald-200 rounded-full appearance-none cursor-pointer"
                />
                <span className="text-5xl font-bold text-green-600 min-w-[80px] text-center">{joyScale}</span>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={updateJoyScale}
                  disabled={saving}
                  className="flex-1 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50"
                >
                  {saving ? "Saving..." : "💾 Save"}
                </button>
                <button
                  onClick={() => setShowJoyInput(false)}
                  className="px-8 py-4 bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800 rounded-xl font-bold text-lg hover:shadow-xl transition-all transform hover:scale-105"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Wellness History Chart */}
        {wellnessHistory.length > 0 && (
          <div className="bg-white/95 backdrop-blur-xl rounded-[3rem] p-12 shadow-[0_30px_90px_rgba(0,0,0,0.2)] border-4 border-blue-300 mb-8">
            <h3 className="text-4xl font-bold text-gray-800 mb-8 flex items-center gap-3">
              <span>📈</span> Your Wellness Journey
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={wellnessHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                <XAxis dataKey="date" stroke="#6b7280" />
                <YAxis stroke="#6b7280" domain={[0, 10]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "white", 
                    border: "2px solid #10b981", 
                    borderRadius: "1rem",
                    padding: "1rem"
                  }} 
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="joyScale" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  name="Joy Scale"
                  dot={{ fill: "#10b981", r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-8">
          <div 
            onClick={() => router.push("/")}
            className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.2)] transition-all transform hover:scale-105 border-4 border-purple-300 cursor-pointer"
          >
            <div className="text-6xl mb-4">😊</div>
            <h4 className="text-2xl font-bold text-gray-800 mb-2">Track Mood</h4>
            <p className="text-gray-600">Log your emotions and feelings</p>
          </div>
          <div 
            onClick={() => router.push("/exercises")}
            className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.2)] transition-all transform hover:scale-105 border-4 border-yellow-300 cursor-pointer"
          >
            <div className="text-6xl mb-4">🏋️</div>
            <h4 className="text-2xl font-bold text-gray-800 mb-2">Exercises</h4>
            <p className="text-gray-600">Practice wellness activities</p>
          </div>
          <div 
            onClick={() => router.push("/community")}
            className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.2)] transition-all transform hover:scale-105 border-4 border-pink-300 cursor-pointer"
          >
            <div className="text-6xl mb-4">👥</div>
            <h4 className="text-2xl font-bold text-gray-800 mb-2">Community</h4>
            <p className="text-gray-600">Connect with others</p>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => router.push("/")}
            className="px-10 py-5 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white rounded-2xl font-bold text-xl hover:shadow-2xl transition-all transform hover:scale-105"
          >
            ↩️ Back to Home
          </button>
        </div>
      </div>

      {/* Exercise Recommendation Modal */}
      {showRecommendation && recommendedExercise && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[60] flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-[3rem] p-12 max-w-2xl w-full shadow-[0_40px_120px_rgba(0,0,0,0.5)] relative animate-slideUp">
            <button
              onClick={() => setShowRecommendation(false)}
              className="absolute top-8 right-8 text-5xl text-gray-400 hover:text-gray-600 transition-all duration-300 hover:rotate-90 transform"
              aria-label="Close recommendation"
            >
              ×
            </button>

            <div className="text-center mb-8">
              <div className="text-8xl mb-6 animate-bounce-soft">
                {getCategoryEmoji(recommendedExercise.exercise.category)}
              </div>
              <h3 className="text-4xl font-bold text-gray-800 mb-4">
                Recommended Exercise
              </h3>
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                {recommendedExercise.reason}
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-8 mb-8">
              <h4 className="text-3xl font-bold text-gray-800 mb-3">
                {recommendedExercise.exercise.title}
              </h4>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                {recommendedExercise.exercise.description}
              </p>
              <div className="flex gap-3 flex-wrap">
                <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-bold capitalize">
                  {recommendedExercise.exercise.category}
                </span>
                <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-bold capitalize">
                  {recommendedExercise.exercise.difficulty}
                </span>
                <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">
                  ⏱️ {recommendedExercise.exercise.durationMinutes} min
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowRecommendation(false);
                  router.push("/exercises");
                }}
                className="flex-1 px-8 py-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold text-xl hover:shadow-2xl transition-all transform hover:scale-105"
              >
                Try This Exercise →
              </button>
              <button
                onClick={() => setShowRecommendation(false)}
                className="px-8 py-5 bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800 rounded-2xl font-bold text-xl hover:shadow-xl transition-all transform hover:scale-105"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}