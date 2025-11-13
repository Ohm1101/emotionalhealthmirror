"use client";

import { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Post {
  id: number;
  userId: number;
  authorName: string;
  content: string;
  emotionTag: string;
  isAnonymous: boolean;
  likesCount: number;
  isModerated: boolean;
  createdAt: string;
}

export default function CommunityPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState("general");
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [supportedPosts, setSupportedPosts] = useState<Set<number>>(new Set());

  const emotions = [
    { value: "general", label: "General", emoji: "💬", color: "gray" },
    { value: "joyful", label: "Joyful", emoji: "😊", color: "yellow" },
    { value: "peaceful", label: "Peaceful", emoji: "😌", color: "teal" },
    { value: "melancholy", label: "Melancholy", emoji: "😢", color: "blue" },
    { value: "frustrated", label: "Frustrated", emoji: "😠", color: "red" },
    { value: "worried", label: "Worried", emoji: "😰", color: "purple" },
    { value: "energized", label: "Energized", emoji: "🤩", color: "pink" },
    { value: "overwhelmed", label: "Overwhelmed", emoji: "😵", color: "orange" },
  ];

  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error("Please login to access the community 🔐");
      router.push("/login");
    } else if (session?.user) {
      fetchPosts();
    }
  }, [session, isPending, router]);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch("/api/community", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // API returns array directly, not wrapped in posts object
        setPosts(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async () => {
    if (!newPostContent.trim()) {
      toast.error("Please write something to share");
      return;
    }

    if (newPostContent.trim().length < 10) {
      toast.error("Post must be at least 10 characters long");
      return;
    }

    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch("/api/community", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          authorName: isAnonymous ? "Anonymous" : session?.user?.name || "User",
          content: newPostContent,
          emotionTag: selectedEmotion,
          isAnonymous: isAnonymous,
        }),
      });

      if (response.ok) {
        toast.success("Post shared with the community! 💚");
        setNewPostContent("");
        setIsAnonymous(false);
        setSelectedEmotion("general");
        setShowCreatePost(false);
        await fetchPosts();
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to create post");
    }
  };

  const handleLike = async (postId: number) => {
    if (likedPosts.has(postId)) return;

    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch(`/api/community/${postId}/like`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setLikedPosts(new Set([...likedPosts, postId]));
        await fetchPosts();
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleSupport = async (postId: number) => {
    if (supportedPosts.has(postId)) return;

    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch(`/api/community/${postId}/support`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setSupportedPosts(new Set([...supportedPosts, postId]));
        toast.success("Sent support! 💙");
        await fetchPosts();
      }
    } catch (error) {
      console.error("Error supporting post:", error);
    }
  };

  const handleReport = async (postId: number) => {
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch(`/api/community/${postId}/report`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success("Post reported. Our team will review it.");
        await fetchPosts();
      }
    } catch (error) {
      console.error("Error reporting post:", error);
    }
  };

  const handleDeletePost = async (postId: number) => {
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch(`/api/community/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success("Post deleted");
        await fetchPosts();
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return "just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return date.toLocaleDateString();
  };

  const getEmotionDetails = (emotionTag: string) => {
    return emotions.find(e => e.value === emotionTag) || emotions[0];
  };

  if (isPending || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-spin">🌀</div>
          <p className="text-xl text-gray-600">Loading community...</p>
        </div>
      </div>
    );
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
            <button
              onClick={() => router.push("/")}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold hover:shadow-2xl transition-all transform hover:scale-105"
            >
              🏠 Home
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            Community Support
          </h2>
          <p className="text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
            A safe space to share your journey and support others 💙
          </p>
          <button
            onClick={() => setShowCreatePost(true)}
            className="px-12 py-5 bg-gradient-to-r from-green-400 to-emerald-400 text-white rounded-full font-bold text-2xl hover:shadow-2xl transition-all transform hover:scale-110"
          >
            ✍️ Share Your Story
          </button>
        </div>

        {/* Community Guidelines */}
        <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-3xl p-8 mb-12 border-4 border-blue-300">
          <h3 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2">
            <span>🛡️</span> Community Guidelines
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              <span>Be kind, respectful, and supportive to everyone</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              <span>Share your experiences, not medical advice</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              <span>You can post anonymously for privacy</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              <span>Report inappropriate content to keep our space safe</span>
            </li>
          </ul>
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.length === 0 ? (
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-16 shadow-2xl text-center">
              <div className="text-8xl mb-6">💬</div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">No Posts Yet</h3>
              <p className="text-xl text-gray-600 mb-8">
                Be the first to share your story with the community!
              </p>
              <button
                onClick={() => setShowCreatePost(true)}
                className="px-10 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105"
              >
                ✍️ Create First Post
              </button>
            </div>
          ) : (
            posts.map((post, index) => {
              const emotion = getEmotionDetails(post.emotionTag);
              return (
                <div
                  key={post.id}
                  className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl hover:shadow-[0_30px_90px_rgba(0,0,0,0.15)] transition-all border-2 border-purple-200"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Post Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {post.isAnonymous ? "🎭" : post.authorName?.charAt(0) || "U"}
                      </div>
                      <div>
                        <div className="font-bold text-gray-800 flex items-center gap-2">
                          {post.authorName || "User"}
                          <span className="text-2xl">{emotion.emoji}</span>
                        </div>
                        <div className="text-sm text-gray-500">{getTimeAgo(post.createdAt)}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {!post.isAnonymous && post.userId === Number(session?.user?.id) && (
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                          title="Delete"
                        >
                          🗑️
                        </button>
                      )}
                      <button
                        onClick={() => handleReport(post.id)}
                        className="text-gray-400 hover:text-orange-500 transition-colors"
                        title="Report"
                      >
                        ⚠️
                      </button>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="mb-6">
                    <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
                      {post.content}
                    </p>
                  </div>

                  {/* Post Actions */}
                  <div className="flex items-center gap-4 pt-4 border-t-2 border-gray-100">
                    <button
                      onClick={() => handleLike(post.id)}
                      disabled={likedPosts.has(post.id)}
                      className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-110 ${
                        likedPosts.has(post.id)
                          ? "bg-pink-500 text-white"
                          : "bg-pink-100 text-pink-600 hover:bg-pink-200"
                      }`}
                    >
                      <span className="text-xl">❤️</span>
                      <span>{post.likesCount || 0} {post.likesCount === 1 ? "Like" : "Likes"}</span>
                    </button>
                    <button
                      onClick={() => handleSupport(post.id)}
                      disabled={supportedPosts.has(post.id)}
                      className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-110 ${
                        supportedPosts.has(post.id)
                          ? "bg-blue-500 text-white"
                          : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                      }`}
                    >
                      <span className="text-xl">🤗</span>
                      <span>Support</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Create Post Modal */}
      {showCreatePost && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[60] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-[3rem] p-16 max-w-3xl w-full shadow-[0_40px_120px_rgba(0,0,0,0.5)] relative my-8">
            <button
              onClick={() => {
                setShowCreatePost(false);
                setNewPostContent("");
                setIsAnonymous(false);
                setSelectedEmotion("general");
              }}
              className="absolute top-8 right-8 text-5xl text-gray-400 hover:text-gray-600 transition-colors hover:rotate-90 transform duration-300"
            >
              ×
            </button>

            <h3 className="text-5xl font-bold text-center mb-4 text-gray-800">
              Share Your Story
            </h3>
            <p className="text-xl text-gray-600 text-center mb-12">
              Express yourself in a safe, supportive community
            </p>

            {/* Emotion Selector */}
            <div className="mb-8">
              <label className="block text-gray-800 font-bold text-lg mb-4">
                How are you feeling?
              </label>
              <div className="grid grid-cols-4 gap-4">
                {emotions.map((emotion) => (
                  <button
                    key={emotion.value}
                    onClick={() => setSelectedEmotion(emotion.value)}
                    className={`p-4 rounded-2xl font-semibold transition-all transform hover:scale-105 ${
                      selectedEmotion === emotion.value
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-xl scale-105"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <div className="text-3xl mb-2">{emotion.emoji}</div>
                    <div className="text-sm">{emotion.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-gray-800 font-bold text-lg mb-4">
                Your message
              </label>
              <textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                className="w-full px-6 py-4 border-4 border-purple-200 rounded-2xl focus:border-purple-500 focus:outline-none resize-none text-lg"
                rows="8"
                placeholder="Share your thoughts, experiences, or feelings... Your words might help someone who needs to hear them. 💙"
              ></textarea>
              <div className="text-right text-sm text-gray-500 mt-2">
                {newPostContent.length} / 1000 characters
              </div>
            </div>

            <div className="mb-8">
              <label className="flex items-center gap-4 cursor-pointer bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-2xl hover:from-purple-200 hover:to-pink-200 transition-all">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="w-6 h-6 text-purple-600 rounded focus:ring-purple-500"
                />
                <div>
                  <div className="font-bold text-gray-800 flex items-center gap-2">
                    <span>🎭</span> Post Anonymously
                  </div>
                  <div className="text-sm text-gray-600">
                    Your identity will be hidden to protect your privacy
                  </div>
                </div>
              </label>
            </div>

            <button
              onClick={handleCreatePost}
              disabled={!newPostContent.trim() || newPostContent.trim().length < 10}
              className="w-full py-5 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white rounded-3xl font-bold text-2xl hover:shadow-2xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ✨ Share with Community
            </button>

            <p className="text-center text-sm text-gray-500 mt-6">
              By posting, you agree to our community guidelines
            </p>
          </div>
        </div>
      )}
    </div>
  );
}