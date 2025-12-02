"use client";

import { useState, useEffect } from "react";
import { authClient, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ProfilePage() {
  const { data: session, isPending, refetch } = useSession();
  const router = useRouter();
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
  });

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login");
    } else if (session?.user) {
      fetchProfile();
    }
  }, [session, isPending, router]);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch("/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProfileData(data);
        setFormData({
          age: data.age?.toString() || "",
          gender: data.gender || "",
        });
      } else {
        // Profile doesn't exist yet, just set empty form
        setFormData({
          age: "",
          gender: "",
        });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          age: formData.age ? parseInt(formData.age) : null,
          gender: formData.gender || null,
        }),
      });

      if (response.ok) {
        toast.success("Profile updated successfully! 🎉");
        await fetchProfile();
        await refetch();
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
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

  if (isPending || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <div className="text-center">
          <div className="text-8xl mb-6 pulse-glow">🪞</div>
          <p className="text-2xl text-gray-600">Loading your profile...</p>
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
                onClick={() => router.push("/notifications")}
                className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full font-semibold hover:shadow-2xl transition-all transform hover:scale-105"
              >
                🔔 Notifications
              </button>
              <button 
                onClick={() => router.push("/dashboard")}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full font-semibold hover:shadow-2xl transition-all transform hover:scale-105"
              >
                📊 Dashboard
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

      {/* Profile Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white/95 backdrop-blur-xl rounded-[3rem] p-12 shadow-[0_30px_90px_rgba(0,0,0,0.2)] border-4 border-purple-200">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-2">
                Your Profile
              </h2>
              <p className="text-gray-600 text-lg">Manage your account and preferences</p>
            </div>
            <div className="text-8xl pulse-glow">👤</div>
          </div>

          {/* User Info Display */}
          <div className="mb-12 bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 rounded-3xl p-8 border-4 border-purple-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span>👤</span> Account Information
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/80 rounded-2xl p-6 shadow-lg">
                <label className="block text-gray-600 font-semibold text-sm mb-2">Full Name</label>
                <p className="text-2xl font-bold text-gray-800 break-words">{session.user.name}</p>
              </div>
              <div className="bg-white/80 rounded-2xl p-6 shadow-lg">
                <label className="block text-gray-600 font-semibold text-sm mb-2">Email Address</label>
                <p className="text-lg md:text-xl font-bold text-gray-800 break-all overflow-wrap-anywhere">{session.user.email}</p>
              </div>
            </div>
          </div>

          {/* Profile Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-6 shadow-lg text-center">
              <div className="text-4xl mb-2">📊</div>
              <div className="text-3xl font-bold text-gray-800">{profileData?.moodCount || 0}</div>
              <div className="text-sm text-gray-600 mt-1">Mood Entries</div>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl p-6 shadow-lg text-center">
              <div className="text-4xl mb-2">🏋️</div>
              <div className="text-3xl font-bold text-gray-800">{profileData?.exercisesCompleted || 0}</div>
              <div className="text-sm text-gray-600 mt-1">Exercises Done</div>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl p-6 shadow-lg text-center">
              <div className="text-4xl mb-2">🔥</div>
              <div className="text-3xl font-bold text-gray-800">{profileData?.streak || 0}</div>
              <div className="text-sm text-gray-600 mt-1">Day Streak</div>
            </div>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span>✨</span> Additional Information
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-gray-800 font-bold text-lg mb-3 flex items-center gap-2">
                  <span>🎂</span> Age
                </label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full px-6 py-4 border-4 border-purple-200 rounded-2xl focus:border-purple-500 focus:outline-none text-lg shadow-inner bg-white"
                  placeholder="Your age"
                  min="1"
                  max="120"
                />
              </div>

              <div>
                <label className="block text-gray-800 font-bold text-lg mb-3 flex items-center gap-2">
                  <span>⚧️</span> Gender
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full px-6 py-4 border-4 border-purple-200 rounded-2xl focus:border-purple-500 focus:outline-none text-lg shadow-inner bg-white"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="non-binary">Non-binary</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 px-10 py-5 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white rounded-2xl font-bold text-xl hover:shadow-2xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">🌀</span>
                    Saving...
                  </span>
                ) : (
                  "💾 Save Changes"
                )}
              </button>
              <button
                type="button"
                onClick={() => router.push("/")}
                className="px-10 py-5 bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800 rounded-2xl font-bold text-xl hover:shadow-2xl transition-all transform hover:scale-105"
              >
                ↩️ Back to Home
              </button>
            </div>
          </form>

          {/* Account Actions */}
          <div className="mt-12 pt-12 border-t-4 border-purple-200">
            <h3 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span>⚙️</span> Account Settings
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6">
                <h4 className="font-bold text-xl text-blue-800 mb-2">🔐 Security</h4>
                <p className="text-gray-600 mb-4">Change your password or enable 2FA</p>
                <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                  Manage Security
                </button>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
                <h4 className="font-bold text-xl text-purple-800 mb-2">📧 Notifications</h4>
                <p className="text-gray-600 mb-4">Customize your notification preferences</p>
                <button 
                  onClick={() => router.push("/notifications")}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  View Notifications
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}