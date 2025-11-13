"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SupportPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          q: "How do I create an account?",
          a: "Click on the 'Sign Up' button in the top right corner. Fill in your name, email, and create a password. You'll receive a confirmation email to verify your account."
        },
        {
          q: "Is Emotional Mirror free to use?",
          a: "Yes! Emotional Mirror is completely free to use. All features including mood tracking, exercises, community support, and analytics are available at no cost."
        },
        {
          q: "How do I track my mood?",
          a: "After logging in, go to the Mood Tracker section on the homepage. Select the emotion that best describes how you're feeling, and optionally add notes. Your mood will be saved to your personal history."
        }
      ]
    },
    {
      category: "Privacy & Security",
      questions: [
        {
          q: "Is my data private and secure?",
          a: "Absolutely. We take your privacy seriously. All your data is encrypted and stored securely. We never share your personal information with third parties. You can also post anonymously in the community."
        },
        {
          q: "Can I delete my account and data?",
          a: "Yes, you have full control over your data. You can delete your account and all associated data at any time from your profile settings. This action is permanent and cannot be undone."
        },
        {
          q: "Who can see my mood history?",
          a: "Only you can see your mood history and journal entries. They are completely private unless you choose to share specific entries in the community (which can be done anonymously)."
        }
      ]
    },
    {
      category: "Features",
      questions: [
        {
          q: "What are daily exercises?",
          a: "Daily exercises are scientifically-backed mental health activities designed by professionals. They include breathing techniques, meditation, stress relief, and anxiety management exercises. Each exercise takes 5-15 minutes."
        },
        {
          q: "How does the recommendation system work?",
          a: "Based on your current mood and past exercise history, our AI recommends exercises that are most likely to help. The more you use the platform, the better the recommendations become."
        },
        {
          q: "What is the wellness score?",
          a: "Your wellness score (0-100) tracks your overall emotional wellbeing based on your mood patterns, exercise completions, and engagement. It's designed to help you see your progress over time."
        },
        {
          q: "How do I download my mood history?",
          a: "Go to your Analytics dashboard and click the 'Download CSV' button. This will download all your mood tracking data in a spreadsheet format that you can analyze or share with your therapist."
        }
      ]
    },
    {
      category: "Community",
      questions: [
        {
          q: "Is the community safe and moderated?",
          a: "Yes. We have community guidelines and moderation in place. You can report inappropriate content, and our team reviews all reports. We prioritize creating a supportive, judgment-free space."
        },
        {
          q: "Can I post anonymously?",
          a: "Absolutely! When creating a post, simply check the 'Post anonymously' option. Your name will not be shown, and the post will be attributed to 'Anonymous'."
        },
        {
          q: "How do likes and supports work?",
          a: "Likes (❤️) show appreciation for a post. Supports (🤗) are a more meaningful way to show empathy and solidarity. Both help create a positive, encouraging community atmosphere."
        }
      ]
    },
    {
      category: "Technical Issues",
      questions: [
        {
          q: "The site isn't loading properly. What should I do?",
          a: "Try refreshing your browser (Ctrl+F5 or Cmd+R). Clear your browser cache and cookies. Make sure you're using an updated browser (Chrome, Firefox, Safari, or Edge). If issues persist, contact our support team."
        },
        {
          q: "I forgot my password. How do I reset it?",
          a: "On the login page, click 'Forgot Password'. Enter your email address, and we'll send you a password reset link. Follow the instructions in the email to create a new password."
        },
        {
          q: "My mood tracking isn't saving. Help!",
          a: "Make sure you're logged in and have a stable internet connection. After selecting your mood, wait for the confirmation message. If the issue persists, try logging out and back in, or contact support."
        }
      ]
    },
    {
      category: "Mental Health Resources",
      questions: [
        {
          q: "Is this a substitute for therapy?",
          a: "No. Emotional Mirror is a wellness tool to support your mental health journey, but it's not a replacement for professional therapy or medical treatment. We always recommend seeking professional help when needed."
        },
        {
          q: "What if I'm in crisis?",
          a: "If you're experiencing a mental health crisis or having thoughts of self-harm, please call 988 (US) or your local crisis hotline immediately. Emotional Mirror is not designed for crisis intervention."
        },
        {
          q: "Where can I find mental health resources?",
          a: "Visit our Resources page for articles, guides, and links to professional mental health services. We've curated evidence-based resources from trusted organizations."
        }
      ]
    }
  ];

  const filteredFaqs = searchQuery
    ? faqs.map(category => ({
        ...category,
        questions: category.questions.filter(
          faq =>
            faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.a.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.questions.length > 0)
    : faqs;

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
            Help & Support
          </h2>
          <p className="text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Find answers to common questions and get the help you need ❓
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-4 shadow-2xl">
            <div className="flex items-center gap-4">
              <span className="text-3xl">🔍</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-6 py-4 text-lg border-0 focus:outline-none bg-transparent"
                placeholder="Search for help..."
              />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <button
            onClick={() => router.push("/contact")}
            className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl hover:shadow-[0_30px_90px_rgba(0,0,0,0.2)] transition-all transform hover:scale-105 text-center"
          >
            <div className="text-5xl mb-4">📧</div>
            <h4 className="text-xl font-bold mb-2 text-gray-800">Contact Support</h4>
            <p className="text-gray-600">Get personalized help from our team</p>
          </button>

          <button
            onClick={() => router.push("/community")}
            className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl hover:shadow-[0_30px_90px_rgba(0,0,0,0.2)] transition-all transform hover:scale-105 text-center"
          >
            <div className="text-5xl mb-4">💬</div>
            <h4 className="text-xl font-bold mb-2 text-gray-800">Community Help</h4>
            <p className="text-gray-600">Ask questions in our community</p>
          </button>

          <button
            onClick={() => router.push("/resources")}
            className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl hover:shadow-[0_30px_90px_rgba(0,0,0,0.2)] transition-all transform hover:scale-105 text-center"
          >
            <div className="text-5xl mb-4">📚</div>
            <h4 className="text-xl font-bold mb-2 text-gray-800">Browse Resources</h4>
            <p className="text-gray-600">Access mental health materials</p>
          </button>
        </div>

        {/* FAQs */}
        <div className="space-y-8">
          {filteredFaqs.map((category, catIndex) => (
            <div key={catIndex}>
              <h3 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
                <span className="text-purple-600">📋</span> {category.category}
              </h3>
              <div className="space-y-4">
                {category.questions.map((faq, faqIndex) => {
                  const globalIndex = catIndex * 100 + faqIndex;
                  return (
                    <div
                      key={faqIndex}
                      className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => setOpenFaq(openFaq === globalIndex ? null : globalIndex)}
                        className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-purple-50 transition-colors"
                      >
                        <span className="text-xl font-bold text-gray-800 pr-4">{faq.q}</span>
                        <span className="text-3xl text-purple-600 flex-shrink-0">
                          {openFaq === globalIndex ? "−" : "+"}
                        </span>
                      </button>
                      {openFaq === globalIndex && (
                        <div className="px-8 pb-6">
                          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6">
                            <p className="text-gray-700 text-lg leading-relaxed">{faq.a}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Still Need Help */}
        <div className="mt-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-12 shadow-2xl text-white text-center">
          <h3 className="text-4xl font-bold mb-6">Still Need Help?</h3>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Can't find what you're looking for? Our support team is here to help you.
          </p>
          <button
            onClick={() => router.push("/contact")}
            className="px-12 py-5 bg-white text-purple-600 rounded-full font-bold text-xl hover:shadow-2xl transition-all transform hover:scale-105"
          >
            📧 Contact Support Team
          </button>
        </div>
      </div>
    </div>
  );
}