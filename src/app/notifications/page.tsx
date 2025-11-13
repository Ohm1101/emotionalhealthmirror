"use client";

import { useState, useEffect } from "react";
import { authClient, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function NotificationsPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login");
    } else if (session?.user) {
      fetchNotifications();
    }
  }, [session, isPending, router]);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch("/api/notifications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setNotifications(data.notifications || []);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId: number) => {
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch(`/api/notifications/${notificationId}/read`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        await fetchNotifications();
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch("/api/notifications/read-all", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success("All notifications marked as read! ✅");
        await fetchNotifications();
      }
    } catch (error) {
      console.error("Error marking all as read:", error);
      toast.error("Failed to mark all as read");
    }
  };

  const deleteNotification = async (notificationId: number) => {
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch(`/api/notifications/${notificationId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success("Notification deleted! 🗑️");
        await fetchNotifications();
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
      toast.error("Failed to delete notification");
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

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "mood":
        return "😊";
      case "exercise":
        return "🏋️";
      case "achievement":
        return "🎉";
      case "reminder":
        return "⏰";
      case "wellness":
        return "💚";
      case "community":
        return "👥";
      default:
        return "🔔";
    }
  };

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === "all") return true;
    if (filter === "unread") return !notif.isRead;
    if (filter === "read") return notif.isRead;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  if (isPending || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <div className="text-center">
          <div className="text-8xl mb-6 pulse-glow">🔔</div>
          <p className="text-2xl text-gray-600">Loading notifications...</p>
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

      {/* Notifications Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white/95 backdrop-blur-xl rounded-[3rem] p-12 shadow-[0_30px_90px_rgba(0,0,0,0.2)] border-4 border-yellow-300">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-5xl font-bold bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent mb-2">
                Notifications
              </h2>
              <p className="text-gray-600 text-lg">
                {unreadCount > 0 ? (
                  <span className="font-bold text-orange-600">{unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}</span>
                ) : (
                  <span>You're all caught up! 🎉</span>
                )}
              </p>
            </div>
            <div className="text-8xl pulse-glow">🔔</div>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setFilter("all")}
              className={`px-6 py-3 rounded-2xl font-bold transition-all transform hover:scale-105 ${
                filter === "all"
                  ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-xl"
                  : "bg-white text-gray-700 hover:bg-gray-100 shadow-lg"
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={`px-6 py-3 rounded-2xl font-bold transition-all transform hover:scale-105 ${
                filter === "unread"
                  ? "bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-xl"
                  : "bg-white text-gray-700 hover:bg-gray-100 shadow-lg"
              }`}
            >
              Unread ({unreadCount})
            </button>
            <button
              onClick={() => setFilter("read")}
              className={`px-6 py-3 rounded-2xl font-bold transition-all transform hover:scale-105 ${
                filter === "read"
                  ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-xl"
                  : "bg-white text-gray-700 hover:bg-gray-100 shadow-lg"
              }`}
            >
              Read ({notifications.length - unreadCount})
            </button>
          </div>

          {/* Mark All as Read Button */}
          {unreadCount > 0 && (
            <div className="mb-6">
              <button
                onClick={markAllAsRead}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-xl transition-all transform hover:scale-105"
              >
                ✅ Mark All as Read
              </button>
            </div>
          )}

          {/* Notifications List */}
          <div className="space-y-4">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📭</div>
                <p className="text-xl text-gray-600">
                  {filter === "unread" ? "No unread notifications" : 
                   filter === "read" ? "No read notifications" :
                   "No notifications yet"}
                </p>
              </div>
            ) : (
              filteredNotifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`flex items-start gap-6 p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all ${
                    notif.isRead
                      ? "bg-gradient-to-r from-gray-50 to-gray-100"
                      : "bg-gradient-to-r from-yellow-50 via-orange-50 to-pink-50 border-2 border-orange-300"
                  }`}
                >
                  <div className="text-5xl">{getNotificationIcon(notif.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold text-xl text-gray-800">{notif.title}</h4>
                      {!notif.isRead && (
                        <span className="px-3 py-1 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-full text-xs font-bold">
                          NEW
                        </span>
                      )}
                    </div>
                    <p className="text-gray-700 mb-3">{notif.message}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>🕐 {notif.time || "Just now"}</span>
                      <span className="px-3 py-1 bg-gray-200 rounded-full text-xs font-semibold">
                        {notif.type}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    {!notif.isRead && (
                      <button
                        onClick={() => markAsRead(notif.id)}
                        className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all text-sm"
                        title="Mark as read"
                      >
                        ✓
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notif.id)}
                      className="px-4 py-2 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all text-sm"
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))
            )}
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
      </div>
    </div>
  );
}