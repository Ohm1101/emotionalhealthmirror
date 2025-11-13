"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { authClient, useSession } from "@/lib/auth-client";
import { toast } from "sonner";

interface Exercise {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  durationMinutes: number;
  instructions: string;
}

export default function ExercisesPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeExercise, setActiveExercise] = useState<Exercise | null>(null);
  const [exerciseStep, setExerciseStep] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [isExercising, setIsExercising] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);
  const [isCompleting, setIsCompleting] = useState(false);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loadingExercises, setLoadingExercises] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetchExercises();
    if (session?.user) {
      fetchCompletedExercises();
    }
  }, [session?.user]);

  const fetchExercises = async () => {
    setLoadingExercises(true);
    try {
      const response = await fetch("/api/exercises");
      if (response.ok) {
        const data = await response.json();
        setExercises(data);
      }
    } catch (error) {
      console.error("Error fetching exercises:", error);
      toast.error("Failed to load exercises");
    } finally {
      setLoadingExercises(false);
    }
  };

  const fetchCompletedExercises = async () => {
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch("/api/completions/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Note: The API doesn't return completed exercise IDs, so we'll track locally
        // This is a limitation we'll handle by showing completion count instead
      }
    } catch (error) {
      console.error("Error fetching completed exercises:", error);
    }
  };

  const getInstructionSteps = (instructions: string): string[] => {
    return instructions.split('\n').filter(step => step.trim());
  };

  const startExercise = (exercise: Exercise) => {
    const steps = getInstructionSteps(exercise.instructions);
    setActiveExercise(exercise);
    setIsExercising(true);
    setExerciseStep(0);
    setCountdown(30); // 30 seconds per step
  };

  const nextStep = () => {
    if (!activeExercise) return;
    const steps = getInstructionSteps(activeExercise.instructions);
    
    if (exerciseStep < steps.length - 1) {
      setExerciseStep(exerciseStep + 1);
      setCountdown(30);
    } else {
      completeExercise();
    }
  };

  const previousStep = () => {
    if (exerciseStep > 0) {
      setExerciseStep(exerciseStep - 1);
      setCountdown(30);
    }
  };

  const stopExercise = () => {
    setIsExercising(false);
    setActiveExercise(null);
    setExerciseStep(0);
    setCountdown(0);
  };

  const completeExercise = async () => {
    if (!activeExercise || isCompleting) return;
    
    setIsCompleting(true);
    
    if (session?.user) {
      try {
        const token = localStorage.getItem("bearer_token");
        const response = await fetch("/api/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            exerciseId: activeExercise.id,
            completionTimeSeconds: activeExercise.durationMinutes * 60,
            feltBetter: true,
            difficultyRating: activeExercise.difficulty === "easy" ? 1 : activeExercise.difficulty === "medium" ? 2 : 3,
            joyIncrease: 5,
          }),
        });

        if (response.ok) {
          toast.success(`🎉 Completed: ${activeExercise.title}!`);
          setCompletedExercises([...completedExercises, activeExercise.id]);
        } else {
          const error = await response.json();
          toast.error(error.error || "Failed to save completion");
        }
      } catch (error) {
        console.error("Error completing exercise:", error);
        toast.error("Failed to save completion");
      }
    } else {
      toast.success(`🎉 Completed: ${activeExercise.title}!`);
    }
    
    setIsCompleting(false);
    stopExercise();
  };

  useEffect(() => {
    if (!isExercising || countdown <= 0) return;

    const interval = setInterval(() => {
      setCountdown((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [isExercising, countdown]);

  // Auto-advance to next step when countdown reaches 0
  useEffect(() => {
    if (isExercising && countdown === 0 && activeExercise) {
      const timer = setTimeout(() => {
        nextStep();
      }, 500); // Small delay for smooth transition
      
      return () => clearTimeout(timer);
    }
  }, [countdown, isExercising, activeExercise]);

  const isCompleted = (exerciseId: number) => {
    return completedExercises.includes(exerciseId);
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
    };
    return emojiMap[category.toLowerCase()] || "✨";
  };

  const getDifficultyColor = (difficulty: string) => {
    const normalized = difficulty.toLowerCase();
    if (normalized === "easy") return "bg-green-100 text-green-700";
    if (normalized === "medium") return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  const filteredExercises = activeCategory === "all" 
    ? exercises 
    : exercises.filter(ex => ex.category.toLowerCase() === activeCategory.toLowerCase());

  const categories = ["all", ...Array.from(new Set(exercises.map(ex => ex.category.toLowerCase())))];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-blue-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-white/60 border-b border-white/20 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <button
              onClick={() => router.push("/")}
              className="flex items-center space-x-3 group cursor-pointer hover:scale-105 transition-transform"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl p-3 transform group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                  Wellness Exercises
                </h1>
                <p className="text-xs text-gray-600">Back to Home</p>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            Wellness Exercises
          </h2>
          <p className="text-2xl text-gray-700 mb-12 max-w-3xl mx-auto">
            Explore evidence-based techniques to reduce stress, improve focus, and cultivate inner peace 🧘‍♀️
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-4 justify-center mb-16">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-2xl"
                    : "bg-white text-gray-700 hover:bg-gray-50 shadow-lg"
                }`}
              >
                {category === "all" ? "🌟 All Exercises" : `${getCategoryEmoji(category)} ${category.charAt(0).toUpperCase() + category.slice(1)}`}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Exercises Grid */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {loadingExercises ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
              <p className="mt-4 text-xl text-gray-600">Loading exercises...</p>
            </div>
          ) : filteredExercises.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-2xl text-gray-600">No exercises found in this category</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredExercises.map((exercise) => (
                <div
                  key={exercise.id}
                  className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl hover:shadow-[0_30px_90px_rgba(0,0,0,0.2)] transition-all duration-300 transform hover:scale-105 border-2 border-purple-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-6xl">{getCategoryEmoji(exercise.category)}</div>
                    {isCompleted(exercise.id) && (
                      <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                        ✓ Completed
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{exercise.title}</h3>
                  <p className="text-purple-600 font-semibold mb-4 capitalize">{exercise.category}</p>
                  <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">{exercise.description}</p>
                  
                  <div className="flex items-center gap-2 mb-6 flex-wrap">
                    <span className={`px-4 py-1 rounded-full text-sm font-bold transition-colors ${getDifficultyColor(exercise.difficulty)}`}>
                      {exercise.difficulty}
                    </span>
                    <span className="px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">
                      ⏱️ {exercise.durationMinutes} min
                    </span>
                  </div>

                  <button
                    onClick={() => startExercise(exercise)}
                    className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Start Exercise →
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Exercise Modal */}
      {activeExercise && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[60] flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl sm:rounded-[3rem] p-6 sm:p-12 lg:p-16 max-w-3xl w-full shadow-[0_40px_120px_rgba(0,0,0,0.5)] relative my-8 animate-slideUp">
            <button
              onClick={stopExercise}
              className="absolute top-4 right-4 sm:top-8 sm:right-8 text-4xl sm:text-5xl text-gray-400 hover:text-gray-600 transition-all duration-300 hover:rotate-90 transform z-10"
              aria-label="Close exercise"
            >
              ×
            </button>

            <div className="text-center mb-6 sm:mb-8">
              <div className="text-5xl sm:text-6xl lg:text-8xl mb-3 sm:mb-4 animate-bounce-soft">{getCategoryEmoji(activeExercise.category)}</div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
                {activeExercise.title}
              </h3>
              <p className="text-lg sm:text-xl text-gray-600 capitalize">{activeExercise.category}</p>
            </div>

            <div className="flex flex-col items-center justify-center py-6 sm:py-12">
              {/* Progress Bar */}
              <div className="w-full mb-8">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Step {exerciseStep + 1} of {getInstructionSteps(activeExercise.instructions).length}</span>
                  <span>{countdown}s remaining</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${((exerciseStep + 1) / getInstructionSteps(activeExercise.instructions).length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Instruction */}
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 text-center w-full mb-8 min-h-[200px] flex items-center justify-center transition-all duration-500">
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-800 font-semibold leading-relaxed">
                  {getInstructionSteps(activeExercise.instructions)[exerciseStep]}
                </p>
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4 w-full max-w-2xl">
                <button
                  onClick={stopExercise}
                  disabled={isCompleting}
                  className="px-6 py-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-2xl font-bold hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>
                
                {exerciseStep > 0 && (
                  <button
                    onClick={previousStep}
                    className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl font-bold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    ← Previous Step
                  </button>
                )}
                
                <button
                  onClick={nextStep}
                  disabled={isCompleting}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl font-bold hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCompleting ? "Saving..." : exerciseStep === getInstructionSteps(activeExercise.instructions).length - 1 ? "Complete ✓" : "Next Step →"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Info Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-bold text-gray-800 mb-6">
            💡 Tips for Best Results
          </h3>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <h4 className="font-bold text-xl text-purple-600 mb-3">🎯 Be Consistent</h4>
              <p className="text-gray-700">
                Practice regularly, even if just for 5 minutes daily. Consistency builds lasting benefits.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <h4 className="font-bold text-xl text-blue-600 mb-3">🧘 Find a Quiet Space</h4>
              <p className="text-gray-700">
                Choose a comfortable, quiet environment where you won't be disturbed.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <h4 className="font-bold text-xl text-green-600 mb-3">⏰ Choose Your Time</h4>
              <p className="text-gray-700">
                Morning exercises energize, evening ones promote sleep. Find what works for you.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <h4 className="font-bold text-xl text-pink-600 mb-3">💚 Be Patient</h4>
              <p className="text-gray-700">
                Benefits grow over time. Don't judge yourself—every practice session counts.
              </p>
            </div>
          </div>
        </div>
      </section>

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