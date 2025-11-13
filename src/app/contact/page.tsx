"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ContactPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Message sent successfully! We'll get back to you soon. 📧");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setSubmitting(false);
    }, 1500);
  };

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

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            Get in Touch
          </h2>
          <p className="text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible 💌
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white/95 backdrop-blur-xl rounded-[3rem] p-12 shadow-2xl">
            <h3 className="text-3xl font-bold mb-8 text-gray-800">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-bold mb-2">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-6 py-4 border-4 border-purple-200 rounded-2xl focus:border-purple-500 focus:outline-none text-lg"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-6 py-4 border-4 border-purple-200 rounded-2xl focus:border-purple-500 focus:outline-none text-lg"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-6 py-4 border-4 border-purple-200 rounded-2xl focus:border-purple-500 focus:outline-none text-lg"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">Message *</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-6 py-4 border-4 border-purple-200 rounded-2xl focus:border-purple-500 focus:outline-none resize-none text-lg"
                  rows="6"
                  placeholder="Tell us what's on your mind..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-5 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white rounded-3xl font-bold text-2xl hover:shadow-2xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">🌀</span>
                    Sending...
                  </span>
                ) : (
                  "📧 Send Message"
                )}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
              <div className="text-5xl mb-4">📧</div>
              <h4 className="text-2xl font-bold mb-3 text-gray-800">Email Us</h4>
              <p className="text-gray-600 text-lg mb-4">
                For general inquiries and support
              </p>
              <a href="mailto:support@emotionalmirror.com" className="text-purple-600 font-bold text-xl hover:text-purple-700 transition-colors">
                support@emotionalmirror.com
              </a>
            </div>

            <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
              <div className="text-5xl mb-4">💬</div>
              <h4 className="text-2xl font-bold mb-3 text-gray-800">Community Support</h4>
              <p className="text-gray-600 text-lg mb-4">
                Connect with others in our community forum
              </p>
              <button
                onClick={() => router.push("/community")}
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold hover:shadow-xl transition-all transform hover:scale-105"
              >
                Visit Community →
              </button>
            </div>

            <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
              <div className="text-5xl mb-4">❓</div>
              <h4 className="text-2xl font-bold mb-3 text-gray-800">FAQs & Support</h4>
              <p className="text-gray-600 text-lg mb-4">
                Find answers to common questions
              </p>
              <button
                onClick={() => router.push("/support")}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl font-bold hover:shadow-xl transition-all transform hover:scale-105"
              >
                Browse FAQs →
              </button>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-8 shadow-2xl text-white">
              <div className="text-5xl mb-4">⏱️</div>
              <h4 className="text-2xl font-bold mb-3">Response Time</h4>
              <p className="text-lg opacity-90">
                We typically respond within 24-48 hours on business days. For urgent mental health concerns, please contact crisis support services.
              </p>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-16 text-center">
          <h3 className="text-3xl font-bold mb-8 text-gray-800">Follow Us</h3>
          <div className="flex gap-6 justify-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-2xl cursor-pointer hover:scale-110 transition-transform shadow-xl">
              T
            </div>
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-2xl cursor-pointer hover:scale-110 transition-transform shadow-xl">
              F
            </div>
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white font-bold text-2xl cursor-pointer hover:scale-110 transition-transform shadow-xl">
              I
            </div>
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-2xl cursor-pointer hover:scale-110 transition-transform shadow-xl">
              L
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}