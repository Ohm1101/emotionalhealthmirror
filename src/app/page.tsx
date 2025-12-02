"use client";

import { useState, useEffect, useRef } from "react";
import { authClient, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function Home() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [currentMood, setCurrentMood] = useState("");
  const [moodHistory, setMoodHistory] = useState([]);
  const [showBreathing, setShowBreathing] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState("inhale");
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [showResources, setShowResources] = useState(false);
  const [moodNotes, setMoodNotes] = useState("");
  const [activeTab, setActiveTab] = useState("mood");
  const [journalEntries, setJournalEntries] = useState([]);
  const [breathCount, setBreathCount] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [wellnessScore, setWellnessScore] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [loadingMoods, setLoadingMoods] = useState(false);
  const [moodAnalytics, setMoodAnalytics] = useState(null);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [savingMood, setSavingMood] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);
  const [dailyQuote, setDailyQuote] = useState(null);
  const canvasRef = useRef(null);
  const [currentAffirmation, setCurrentAffirmation] = useState("");
  const [randomAffirmation, setRandomAffirmation] = useState("");
  
  // New states for interactive resources
  const [activeResource, setActiveResource] = useState(null);
  const [gratitudeEntries, setGratitudeEntries] = useState(["", "", ""]);
  const [visualizationStep, setVisualizationStep] = useState(0);
  const [relaxationStep, setRelaxationStep] = useState(0);
  const [eftStep, setEftStep] = useState(0);
  const [meditationTimer, setMeditationTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [completingExercise, setCompletingExercise] = useState(false);

  // Add new state for profile dropdown
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef(null);

  // Add new state for main navigation menu
  const [showNavMenu, setShowNavMenu] = useState(false);
  const navMenuRef = useRef(null);

  // Load breath count from localStorage on mount
  useEffect(() => {
    loadBreathCount();
  }, []);

  const loadBreathCount = () => {
    const storedData = localStorage.getItem("breathData");
    if (storedData) {
      const { count, lastUpdated } = JSON.parse(storedData);
      const lastDate = new Date(lastUpdated);
      const now = new Date();
      
      // Check if we need to reset (past 12pm of current day)
      const todayNoon = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0);
      
      // If last update was before today's noon and we're past noon, or if it's a different day
      if (lastDate < todayNoon && now >= todayNoon) {
        // Reset count
        setBreathCount(0);
        localStorage.setItem("breathData", JSON.stringify({ count: 0, lastUpdated: now.toISOString() }));
      } else if (lastDate.toDateString() !== now.toDateString() && now < todayNoon) {
        // Different day but before noon - check if last update was before yesterday's noon
        const yesterdayNoon = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 12, 0, 0);
        if (lastDate < yesterdayNoon) {
          setBreathCount(0);
          localStorage.setItem("breathData", JSON.stringify({ count: 0, lastUpdated: now.toISOString() }));
        } else {
          setBreathCount(count);
        }
      } else {
        // Same day or valid time window - keep count
        setBreathCount(count);
      }
    }
  };

  const updateBreathCount = (newCount: number) => {
    const now = new Date();
    setBreathCount(newCount);
    localStorage.setItem("breathData", JSON.stringify({ 
      count: newCount, 
      lastUpdated: now.toISOString() 
    }));
  };

  // Fetch mood history when user logs in
  useEffect(() => {
    if (session?.user) {
      fetchMoodHistory();
      fetchMoodAnalytics();
      fetchWellnessScore();
      fetchDailyQuote();
    }
  }, [session?.user]);

  // Rotate affirmations every 10 seconds
  useEffect(() => {
    // Set initial random affirmation
    setRandomAffirmation(affirmations[Math.floor(Math.random() * affirmations.length)]);
    
    // Change affirmation every 10 seconds
    const interval = setInterval(() => {
      setRandomAffirmation(affirmations[Math.floor(Math.random() * affirmations.length)]);
    }, 10000); // 10 seconds
    
    return () => clearInterval(interval);
  }, []);

  const fetchMoodHistory = async () => {
    setLoadingMoods(true);
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch("/api/moods", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Map API response to UI format
        const mappedData = data.map((entry: any) => ({
          id: entry.id,
          mood: entry.emotionName,
          emoji: entry.emotionEmoji,
          color: entry.emotionColor,
          notes: entry.notes || "",
          time: new Date(entry.createdAt).toLocaleTimeString(),
          date: new Date(entry.createdAt).toLocaleDateString(),
          timestamp: new Date(entry.createdAt).getTime(),
        }));
        setMoodHistory(mappedData);
        setJournalEntries(mappedData);
      }
    } catch (error) {
      console.error("Error fetching mood history:", error);
    } finally {
      setLoadingMoods(false);
    }
  };

  const fetchMoodAnalytics = async () => {
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch("/api/moods/analytics", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMoodAnalytics(data);
      }
    } catch (error) {
      console.error("Error fetching mood analytics:", error);
    }
  };

  const fetchWellnessScore = async () => {
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch("/api/wellness", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.wellness) {
          setWellnessScore(data.wellness.joyScale || 0);
        }
      }
    } catch (error) {
      console.error("Error fetching wellness score:", error);
    }
  };

  const fetchRecommendations = async (mood: string) => {
    if (!session?.user) return;
    
    setLoadingRecommendations(true);
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch(`/api/recommendations?mood=${mood}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setRecommendations(data.recommendations || []);
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setLoadingRecommendations(false);
    }
  };

  const fetchDailyQuote = async () => {
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch("/api/quotes/daily", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setDailyQuote(data.quote);
      }
    } catch (error) {
      console.error("Error fetching daily quote:", error);
    }
  };

  const updateWellnessScore = async (change: number) => {
    if (!session?.user) return;

    try {
      const token = localStorage.getItem("bearer_token");
      const newScore = Math.max(0, Math.min(100, wellnessScore + change));
      
      const response = await fetch("/api/wellness", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          score: newScore,
          moodContribution: change,
          exerciseContribution: 0,
        }),
      });

      if (response.ok) {
        setWellnessScore(newScore);
        if (change > 0) {
          toast.success(`Your wellness score increased to ${newScore}! 🌟`);
        }
      } else {
        const errorData = await response.json();
        console.error("Failed to update wellness score:", errorData);
      }
    } catch (error) {
      console.error("Error updating wellness score:", error);
    }
  };

  const downloadMoodHistory = async () => {
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch("/api/moods/download", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `mood-history-${new Date().toISOString().split("T")[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        toast.success("Mood history downloaded successfully! 📊");
      } else {
        toast.error("Failed to download mood history");
      }
    } catch (error) {
      console.error("Error downloading mood history:", error);
      toast.error("Failed to download mood history");
    }
  };

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();
    if (error?.code) {
      toast.error("Failed to sign out");
    } else {
      localStorage.removeItem("bearer_token");
      toast.success("Signed out successfully!");
      router.refresh();
    }
  };

  const emotions = [
    { 
      name: "Joyful", 
      emoji: "😊", 
      color: "#fbbf24", 
      gradient: "from-yellow-400 to-orange-400",
      description: "Feeling happy, content, and positive",
      tips: ["Share your joy with others", "Write down what made you smile", "Dance to your favorite music"],
      activities: ["Gratitude journaling", "Call a friend", "Celebrate small wins"]
    },
    { 
      name: "Peaceful", 
      emoji: "😌", 
      color: "#14b8a6", 
      gradient: "from-teal-400 to-cyan-400",
      description: "Calm, relaxed, and centered",
      tips: ["Practice mindfulness", "Enjoy the present moment", "Take a nature walk"],
      activities: ["Meditation", "Deep breathing", "Gentle yoga"]
    },
    { 
      name: "Melancholy", 
      emoji: "😢", 
      color: "#3b82f6", 
      gradient: "from-blue-400 to-indigo-400",
      description: "Feeling sad, down, or reflective",
      tips: ["It's okay to feel sad", "Reach out to someone you trust", "Be gentle with yourself"],
      activities: ["Journaling", "Watch comfort shows", "Create art"]
    },
    { 
      name: "Frustrated", 
      emoji: "😠", 
      color: "#ef4444", 
      gradient: "from-red-400 to-rose-400",
      description: "Angry, upset, or irritated",
      tips: ["Take deep breaths", "Physical exercise helps", "Write down what's bothering you"],
      activities: ["Boxing workout", "Scream into a pillow", "Write angry letters"]
    },
    { 
      name: "Worried", 
      emoji: "😰", 
      color: "#8b5cf6", 
      gradient: "from-purple-400 to-violet-400",
      description: "Anxious, nervous, or concerned",
      tips: ["Ground yourself in the present", "Challenge worried thoughts", "Talk to someone"],
      activities: ["4-7-8 breathing", "Progressive muscle relaxation", "Anxiety journal"]
    },
    { 
      name: "Energized", 
      emoji: "🤩", 
      color: "#ec4899", 
      gradient: "from-pink-400 to-fuchsia-400",
      description: "Excited, motivated, and enthusiastic",
      tips: ["Channel this energy productively", "Start that project you've been thinking about", "Exercise"],
      activities: ["Creative projects", "Social activities", "Learning something new"]
    },
    { 
      name: "Overwhelmed", 
      emoji: "😵", 
      color: "#f97316", 
      gradient: "from-orange-400 to-amber-400",
      description: "Stressed, too much to handle",
      tips: ["Break tasks into smaller steps", "Say no to non-essentials", "Take a break"],
      activities: ["Priority list", "Delegate tasks", "Self-care time"]
    },
    { 
      name: "Content", 
      emoji: "☺️", 
      color: "#10b981", 
      gradient: "from-green-400 to-emerald-400",
      description: "Satisfied and at ease",
      tips: ["Appreciate this moment", "Reflect on what's working", "Maintain healthy habits"],
      activities: ["Gratitude practice", "Maintain routines", "Quality time"]
    },
  ];

  const affirmations = [
    "You are stronger than you know",
    "This moment will pass, and you will grow",
    "You deserve peace and happiness",
    "Take it one breath at a time",
    "You are doing your best, and that's enough",
    "It's okay to feel what you feel",
    "You are worthy of love and care",
    "Every day is a new beginning",
    "Your feelings are valid",
    "You have the power to create change",
    "Be patient with yourself",
    "You are not alone in this journey"
  ];

  const mentalHealthArticles = [
    {
      title: "Understanding Your Emotions",
      excerpt: "Learn how to identify, accept, and process your feelings in healthy ways.",
      icon: "🧠",
      category: "Education",
      readTime: "5 min"
    },
    {
      title: "The Science of Breathing",
      excerpt: "Discover how controlled breathing can reduce stress and anxiety.",
      icon: "🫁",
      category: "Techniques",
      readTime: "4 min"
    },
    {
      title: "Building Emotional Resilience",
      excerpt: "Strategies to bounce back from challenges and build mental strength.",
      icon: "💪",
      category: "Growth",
      readTime: "7 min"
    },
    {
      title: "Mindfulness for Beginners",
      excerpt: "Simple practices to stay present and reduce overwhelming thoughts.",
      icon: "🧘",
      category: "Practice",
      readTime: "6 min"
    },
    {
      title: "The Power of Gratitude",
      excerpt: "How practicing gratitude can transform your mental wellbeing.",
      icon: "🙏",
      category: "Habits",
      readTime: "5 min"
    },
    {
      title: "Sleep and Mental Health",
      excerpt: "Understanding the crucial connection between rest and emotional wellness.",
      icon: "😴",
      category: "Wellness",
      readTime: "8 min"
    }
  ];

  const resources = [
    { 
      id: "box-breathing",
      title: "Box Breathing", 
      description: "4-4-4-4 breathing technique for instant calm", 
      icon: "🫁",
      category: "Breathing",
      difficulty: "Easy"
    },
    { 
      id: "gratitude-journal",
      title: "Gratitude Journal", 
      description: "Write 3 things you're grateful for daily", 
      icon: "📝",
      category: "Writing",
      difficulty: "Easy"
    },
    { 
      id: "body-scan",
      title: "Body Scan Meditation", 
      description: "Progressive relaxation from head to toe", 
      icon: "🧘",
      category: "Meditation",
      difficulty: "Medium"
    },
    { 
      id: "music",
      title: "Mood-Boost Playlist", 
      description: "Curated music for emotional uplift", 
      icon: "🎵",
      category: "Music",
      difficulty: "Easy"
    },
    { 
      id: "nature",
      title: "Nature Immersion", 
      description: "Connect with outdoors for mental clarity", 
      icon: "🌳",
      category: "Activity",
      difficulty: "Easy"
    },
    { 
      id: "talk-therapy",
      title: "Talk Therapy", 
      description: "Reach out to professionals or trusted friends", 
      icon: "💬",
      category: "Support",
      difficulty: "Medium"
    },
    { 
      id: "muscle-relaxation",
      title: "Progressive Muscle Relaxation", 
      description: "Systematic tension and release technique", 
      icon: "💆",
      category: "Physical",
      difficulty: "Medium"
    },
    { 
      id: "visualization",
      title: "Visualization Exercise", 
      description: "Mental imagery for peace and calm", 
      icon: "🌅",
      category: "Mental",
      difficulty: "Medium"
    },
    { 
      id: "eft",
      title: "Emotional Freedom Technique", 
      description: "Tapping method for emotional relief", 
      icon: "👆",
      category: "Technique",
      difficulty: "Advanced"
    }
  ];

  const visualizationSteps = [
    {
      title: "Find Your Space",
      description: "Sit comfortably and close your eyes. Take three deep breaths.",
      image: "🪑"
    },
    {
      title: "Imagine Your Safe Place",
      description: "Picture a place where you feel completely safe and at peace. It could be real or imaginary.",
      image: "🏞️"
    },
    {
      title: "Engage Your Senses",
      description: "What do you see? Hear? Smell? Feel the temperature. Make it vivid.",
      image: "👁️"
    },
    {
      title: "Feel the Peace",
      description: "Notice how calm and safe you feel here. This is your sanctuary.",
      image: "☮️"
    },
    {
      title: "Return Gently",
      description: "When ready, slowly open your eyes. You can return here anytime.",
      image: "✨"
    }
  ];

  const muscleGroups = [
    { name: "Feet & Toes", instruction: "Curl your toes tightly, hold for 5 seconds, then release", emoji: "🦶" },
    { name: "Calves & Legs", instruction: "Tense your calf and thigh muscles, hold, then relax completely", emoji: "🦵" },
    { name: "Stomach", instruction: "Tighten your stomach muscles, hold for 5 seconds, then let go", emoji: "🫃" },
    { name: "Chest", instruction: "Take a deep breath and hold, tense your chest, then exhale and release", emoji: "🫁" },
    { name: "Arms & Hands", instruction: "Make fists and tense your arms, hold, then release and shake out", emoji: "💪" },
    { name: "Shoulders", instruction: "Raise shoulders to ears, hold tension, then drop and relax", emoji: "🤷" },
    { name: "Neck", instruction: "Gently press head back, hold, then return to center and relax", emoji: "🦒" },
    { name: "Face", instruction: "Scrunch facial muscles tight, hold, then release and let jaw drop", emoji: "😌" }
  ];

  const eftTappingPoints = [
    { name: "Karate Chop", location: "Side of hand", instruction: "Tap here while stating your concern", emoji: "🤚" },
    { name: "Eyebrow", location: "Beginning of eyebrow", instruction: "Tap gently with 2 fingers", emoji: "👁️" },
    { name: "Side of Eye", location: "Bone at corner of eye", instruction: "Tap the outer corner", emoji: "👀" },
    { name: "Under Eye", location: "Bone under eye", instruction: "Tap gently under the eye", emoji: "👁️" },
    { name: "Under Nose", location: "Between nose and lip", instruction: "Tap this meridian point", emoji: "👃" },
    { name: "Chin", location: "Below lower lip", instruction: "Tap the chin point", emoji: "🗣️" },
    { name: "Collarbone", location: "Below collarbone", instruction: "Tap with fingers together", emoji: "🫀" },
    { name: "Under Arm", location: "4 inches below armpit", instruction: "Tap on the side of body", emoji: "💪" },
    { name: "Top of Head", location: "Crown of head", instruction: "Tap with all fingers", emoji: "👑" }
  ];

  // Meditation timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setMeditationTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particlesArray = [];
    const numberOfParticles = 50;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesArray.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Breathing exercise
  useEffect(() => {
    if (showBreathing) {
      const phases = ["inhale", "hold", "exhale", "hold"];
      let currentIndex = 0;
      const interval = setInterval(() => {
        currentIndex = (currentIndex + 1) % phases.length;
        setBreathingPhase(phases[currentIndex]);
        if (phases[currentIndex] === "inhale") {
          updateBreathCount(breathCount + 1);
        }
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [showBreathing, breathCount]);

  // Close modals on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showBreathing) setShowBreathing(false);
        if (showResources) setShowResources(false);
        if (showQuiz) setShowQuiz(false);
        if (showAnalytics) setShowAnalytics(false);
        if (activeResource) setActiveResource(null);
        if (showProfileMenu) setShowProfileMenu(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [showBreathing, showResources, showQuiz, showAnalytics, activeResource, showProfileMenu]);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };

    if (showProfileMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfileMenu]);

  // Close navigation menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navMenuRef.current && !navMenuRef.current.contains(event.target as Node)) {
        setShowNavMenu(false);
      }
    };

    if (showNavMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNavMenu]);

  const handleResourceClick = (resource: any) => {
    setActiveResource(resource);
    
    // Reset states for different exercises
    setVisualizationStep(0);
    setRelaxationStep(0);
    setEftStep(0);
    setMeditationTimer(0);
    setIsTimerRunning(false);
    setGratitudeEntries(["", "", ""]);
    
    // Track engagement
    toast.success(`Starting ${resource.title}! 🎯`);
  };

  const saveGratitudeJournal = async () => {
    const filledEntries = gratitudeEntries.filter(entry => entry.trim());
    if (filledEntries.length === 0) {
      toast.error("Please write at least one gratitude entry");
      return;
    }

    if (session?.user) {
      try {
        const token = localStorage.getItem("bearer_token");
        await fetch("/api/moods", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            mood: "Grateful",
            emoji: "🙏",
            color: "#10b981",
            notes: `Gratitude Journal:\n${filledEntries.map((entry, i) => `${i + 1}. ${entry}`).join('\n')}`,
            intensity: 8,
          }),
        });
        
        toast.success("Gratitude journal saved! 💚");
        setActiveResource(null);
        await fetchMoodHistory();
      } catch (error) {
        toast.error("Failed to save gratitude journal");
      }
    } else {
      toast.success("Gratitude practice completed! 🙏");
      setActiveResource(null);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const completeBreathingExercise = async () => {
    if (breathCount === 0) {
      toast.error("Complete at least one breath cycle first!");
      return;
    }

    setCompletingExercise(true);
    try {
      if (session?.user) {
        const token = localStorage.getItem("bearer_token");
        await fetch("/api/moods", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            mood: "Peaceful",
            emoji: "🫁",
            color: "#14b8a6",
            notes: `Completed ${breathCount} breath cycles with Box Breathing exercise`,
            intensity: 8,
          }),
        });
        
        await updateWellnessScore(3);
        await fetchMoodHistory();
      }
      
      toast.success(`Great job! You completed ${breathCount} breath cycles! 🎉`);
      setShowBreathing(false);
      // Don't reset breathCount to 0 - keep it for the day
    } catch (error) {
      toast.error("Failed to save exercise");
    } finally {
      setCompletingExercise(false);
    }
  };

  const completeExercise = async (exerciseName: string, exerciseEmoji: string) => {
    setCompletingExercise(true);
    try {
      if (session?.user) {
        const token = localStorage.getItem("bearer_token");
        await fetch("/api/moods", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            mood: "Accomplished",
            emoji: exerciseEmoji,
            color: "#10b981",
            notes: `Completed ${exerciseName} exercise`,
            intensity: 9,
          }),
        });
        
        await updateWellnessScore(5);
        await fetchMoodHistory();
      }
      
      toast.success(`${exerciseName} completed! 🎉`);
      setActiveResource(null);
    } catch (error) {
      toast.error("Failed to save exercise completion");
    } finally {
      setCompletingExercise(false);
    }
  };

  const handleMoodSelect = async (emotion) => {
    setCurrentMood(emotion.name);
    setSelectedEmotion(emotion);
    
    // Set a random affirmation that won't change until next mood selection
    setCurrentAffirmation(affirmations[Math.floor(Math.random() * affirmations.length)]);
    
    // Fetch recommendations for this mood
    if (session?.user) {
      fetchRecommendations(emotion.name);
    }
    
    // Don't save automatically - user needs to click submit button
  };

  const handleSubmitMood = async () => {
    if (!selectedEmotion) return;

    if (!session?.user) {
      toast.error("Please login to track your mood 🔐");
      return;
    }

    setSavingMood(true);
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch("/api/moods", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          emotionName: selectedEmotion.name,
          emotionEmoji: selectedEmotion.emoji,
          emotionColor: selectedEmotion.color,
          notes: moodNotes || "",
        }),
      });

      if (response.ok) {
        // Refresh both mood history and analytics
        await Promise.all([
          fetchMoodHistory(),
          fetchMoodAnalytics()
        ]);
        
        // Update wellness score based on mood
        const moodImpact = {
          "Joyful": 5,
          "Content": 4,
          "Peaceful": 3,
          "Energized": 4,
          "Melancholy": -2,
          "Frustrated": -3,
          "Worried": -2,
          "Overwhelmed": -4,
        };
        await updateWellnessScore(moodImpact[selectedEmotion.name] || 0);
        
        toast.success(`Mood "${selectedEmotion.name}" tracked successfully! 💚`);
        
        // Clear the mood notes after successful save
        setMoodNotes("");
      } else {
        const errorData = await response.json();
        console.error("Failed to save mood:", errorData);
        toast.error("Failed to track mood");
      }
    } catch (error) {
      console.error("Error saving mood:", error);
      toast.error("Failed to track mood");
    } finally {
      setSavingMood(false);
    }
  };

  const handleSaveMood = async () => {
    if (!moodNotes.trim() || !selectedEmotion) return;

    if (!session?.user) {
      toast.error("Please login to save your mood notes 🔐");
      return;
    }

    setSavingMood(true);
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch("/api/moods", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          emotionName: selectedEmotion.name,
          emotionEmoji: selectedEmotion.emoji,
          emotionColor: selectedEmotion.color,
          notes: moodNotes,
        }),
      });

      if (response.ok) {
        setMoodNotes("");
        
        // Refresh both mood history and analytics
        await Promise.all([
          fetchMoodHistory(),
          fetchMoodAnalytics()
        ]);
        
        // Update wellness score based on mood
        const moodImpact = {
          "Joyful": 5,
          "Content": 4,
          "Peaceful": 3,
          "Energized": 4,
          "Melancholy": -2,
          "Frustrated": -3,
          "Worried": -2,
          "Overwhelmed": -4,
        };
        await updateWellnessScore(moodImpact[selectedEmotion.name] || 0);
        
        toast.success("Mood saved successfully! 💚");
      } else {
        const errorData = await response.json();
        console.error("Failed to save mood:", errorData);
        toast.error("Failed to save mood");
      }
    } catch (error) {
      console.error("Error saving mood:", error);
      toast.error("Failed to save mood");
    } finally {
      setSavingMood(false);
    }
  };

  const handleQuizAnswer = (answerIndex) => {
    setWellnessScore(prev => prev + answerIndex + 1);
    
    if (quizStep < wellnessQuestions.length - 1) {
      setQuizStep(prev => prev + 1);
    } else {
      setTimeout(() => {
        setShowQuiz(false);
        setQuizStep(0);
      }, 2000);
    }
  };

  const getMoodEmoji = (score) => {
    if (score >= 16) return "🌟";
    if (score >= 12) return "😊";
    if (score >= 8) return "😐";
    return "😔";
  };

  const wellnessQuestions = [
    {
      question: "How would you rate your sleep quality this week?",
      options: ["Poor", "Fair", "Good", "Excellent"]
    },
    {
      question: "How often do you feel stressed?",
      options: ["Always", "Often", "Sometimes", "Rarely"]
    },
    {
      question: "Do you have someone to talk to about your feelings?",
      options: ["No one", "One person", "A few people", "Many people"]
    },
    {
      question: "How physically active are you?",
      options: ["Not at all", "Slightly", "Moderately", "Very active"]
    },
    {
      question: "How satisfied are you with your life currently?",
      options: ["Not satisfied", "Somewhat", "Satisfied", "Very satisfied"]
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden relative">
      {/* Animated Canvas Background */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 -z-20 opacity-30"
      />

      {/* Gradient Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div 
          className="absolute top-10 left-10 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-60 float-animation"
          style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
        ></div>
        <div 
          className="absolute top-40 right-20 w-[500px] h-[500px] bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-60 float-animation" 
          style={{ animationDelay: "1s", transform: `translate(${-mousePosition.x}px, ${mousePosition.y}px)` }}
        ></div>
        <div 
          className="absolute bottom-20 left-40 w-[450px] h-[450px] bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-60 float-animation" 
          style={{ animationDelay: "2s", transform: `translate(${mousePosition.x}px, ${-mousePosition.y}px)` }}
        ></div>
        <div 
          className="absolute bottom-40 right-10 w-[480px] h-[480px] bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60 float-animation" 
          style={{ animationDelay: "3s", transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)` }}
        ></div>
        <div 
          className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 float-animation" 
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

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
              {!isPending && (
                <>
                  {session?.user ? (
                    <>
                      {/* Navigation Menu Dropdown */}
                      <div className="relative" ref={navMenuRef}>
                        <button
                          onClick={() => setShowNavMenu(!showNavMenu)}
                          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full font-semibold hover:shadow-2xl transition-all transform hover:scale-105"
                        >
                          <span className="text-xl">☰</span>
                          <span>Menu</span>
                          <svg 
                            className={`w-4 h-4 transition-transform ${showNavMenu ? 'rotate-180' : ''}`} 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>

                        {/* Navigation Dropdown */}
                        {showNavMenu && (
                          <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border-2 border-blue-200 overflow-hidden z-50 animate-slide-in-right">
                            <div className="p-3">
                              <button
                                onClick={() => {
                                  router.push("/");
                                  setShowNavMenu(false);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-xl transition-colors text-left"
                              >
                                <span className="text-2xl">🏠</span>
                                <div>
                                  <p className="font-semibold">Home</p>
                                  <p className="text-xs text-gray-500">Navigate back to homepage</p>
                                </div>
                              </button>

                              <button
                                onClick={() => {
                                  router.push("/exercises");
                                  setShowNavMenu(false);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-xl transition-colors text-left"
                              >
                                <span className="text-2xl">🏋️</span>
                                <div>
                                  <p className="font-semibold">Exercises</p>
                                  <p className="text-xs text-gray-500">Access wellness exercises</p>
                                </div>
                              </button>

                              <button
                                onClick={() => {
                                  setShowAnalytics(true);
                                  setShowNavMenu(false);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-xl transition-colors text-left"
                              >
                                <span className="text-2xl">📈</span>
                                <div>
                                  <p className="font-semibold">Analytics</p>
                                  <p className="text-xs text-gray-500">View mood analytics</p>
                                </div>
                              </button>

                              <button
                                onClick={() => {
                                  router.push("/community");
                                  setShowNavMenu(false);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-xl transition-colors text-left"
                              >
                                <span className="text-2xl">👥</span>
                                <div>
                                  <p className="font-semibold">Community</p>
                                  <p className="text-xs text-gray-500">Join the community</p>
                                </div>
                              </button>

                              <button
                                onClick={() => {
                                  setShowResources(true);
                                  setShowNavMenu(false);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-xl transition-colors text-left"
                              >
                                <span className="text-2xl">🎯</span>
                                <div>
                                  <p className="font-semibold">Resources</p>
                                  <p className="text-xs text-gray-500">Access mental health toolkit</p>
                                </div>
                              </button>

                              <button
                                onClick={() => {
                                  setShowBreathing(true);
                                  setShowNavMenu(false);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-xl transition-colors text-left"
                              >
                                <span className="text-2xl">🫁</span>
                                <div>
                                  <p className="font-semibold">Breathe</p>
                                  <p className="text-xs text-gray-500">Quick breathing exercises</p>
                                </div>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Profile Dropdown Menu */}
                      <div className="relative" ref={profileMenuRef}>
                        <button
                          onClick={() => setShowProfileMenu(!showProfileMenu)}
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:shadow-2xl transition-all transform hover:scale-105"
                        >
                          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-purple-600 font-bold text-lg">
                            {session.user.name?.charAt(0).toUpperCase()}
                          </div>
                          <svg 
                            className={`w-4 h-4 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>

                        {/* Profile Dropdown */}
                        {showProfileMenu && (
                          <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border-2 border-purple-200 overflow-hidden z-50 animate-slide-in-right">
                            {/* Profile Header */}
                            <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 p-6">
                              <div className="flex items-center gap-4">
                                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-purple-600 font-bold text-3xl shadow-lg">
                                  {session.user.name?.charAt(0).toUpperCase()}
                                </div>
                                <div className="text-white">
                                  <h4 className="font-bold text-2xl mb-1">{session.user.name}</h4>
                                  <p className="text-sm text-white/90">{session.user.email}</p>
                                </div>
                              </div>
                            </div>

                            {/* Menu Items */}
                            <div className="p-3">
                              <button
                                onClick={() => {
                                  router.push("/profile");
                                  setShowProfileMenu(false);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-purple-50 rounded-xl transition-colors text-left"
                              >
                                <span className="text-2xl">👤</span>
                                <div>
                                  <p className="font-semibold">My Profile</p>
                                  <p className="text-xs text-gray-500">View and edit your profile</p>
                                </div>
                              </button>

                              <button
                                onClick={() => {
                                  router.push("/dashboard");
                                  setShowProfileMenu(false);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-purple-50 rounded-xl transition-colors text-left"
                              >
                                <span className="text-2xl">📊</span>
                                <div>
                                  <p className="font-semibold">Dashboard</p>
                                  <p className="text-xs text-gray-500">Your wellness overview</p>
                                </div>
                              </button>

                              <button
                                onClick={() => {
                                  setShowAnalytics(true);
                                  setShowProfileMenu(false);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-purple-50 rounded-xl transition-colors text-left"
                              >
                                <span className="text-2xl">📈</span>
                                <div>
                                  <p className="font-semibold">Mood Analytics</p>
                                  <p className="text-xs text-gray-500">View your emotional insights</p>
                                </div>
                              </button>

                              <button
                                onClick={() => {
                                  router.push("/notifications");
                                  setShowProfileMenu(false);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-purple-50 rounded-xl transition-colors text-left"
                              >
                                <span className="text-2xl">🔔</span>
                                <div>
                                  <p className="font-semibold">Notifications</p>
                                  <p className="text-xs text-gray-500">Check your updates</p>
                                </div>
                              </button>

                              <div className="border-t border-gray-200 my-2"></div>

                              <button
                                onClick={() => {
                                  handleSignOut();
                                  setShowProfileMenu(false);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors text-left"
                              >
                                <span className="text-2xl">🚪</span>
                                <div>
                                  <p className="font-semibold">Sign Out</p>
                                  <p className="text-xs text-red-400">Logout from your account</p>
                                </div>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
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

      {/* Welcome Back Section - Only shown when logged in */}
      {!isPending && session?.user && (
        <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-4 bg-white/80 backdrop-blur-xl rounded-full px-8 py-4 shadow-xl border-2 border-purple-200 fade-in-up">
              <span className="text-4xl">👋</span>
              <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                Welcome back, {session.user.name?.split(' ')[0] || session.user.name}!
              </h2>
            </div>
          </div>
        </section>
      )}

      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center fade-in-up">
            <h2 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-8 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent gradient-animate leading-tight">
              Your Journey to<br/>Emotional Wellness
            </h2>
            <p className="text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              A safe, interactive sanctuary to understand your emotions, track your mental health journey, 
              and discover personalized tools for inner peace. 💙
            </p>
            
            {/* Stats Bar */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
              <div 
                onClick={() => setActiveTab("mood")}
                className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border-2 border-yellow-300 hover:scale-105 transition-transform cursor-pointer"
              >
                <div className="text-5xl mb-3">✨</div>
                <div className="text-4xl font-bold text-gray-800">{moodHistory.length}</div>
                <div className="text-sm text-gray-600 mt-2">Moods Tracked</div>
              </div>
              <div 
                onClick={() => setActiveTab("journal")}
                className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border-2 border-pink-300 hover:scale-105 transition-transform cursor-pointer"
              >
                <div className="text-5xl mb-3">📝</div>
                <div className="text-4xl font-bold text-gray-800">{journalEntries.length}</div>
                <div className="text-sm text-gray-600 mt-2">Journal Entries</div>
              </div>
              <div 
                onClick={() => setShowBreathing(true)}
                className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border-2 border-blue-300 hover:scale-105 transition-transform cursor-pointer"
              >
                <div className="text-5xl mb-3">🫁</div>
                <div className="text-4xl font-bold text-gray-800">{breathCount}</div>
                <div className="text-sm text-gray-600 mt-2">Breaths Taken</div>
              </div>
              <div 
                onClick={() => {
                  if (session?.user) {
                    setShowAnalytics(true);
                  } else {
                    toast.error("Please login to view your wellness score details 🔐");
                  }
                }}
                className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border-2 border-green-300 hover:scale-105 transition-transform cursor-pointer"
              >
                <div className="text-5xl mb-3">{getMoodEmoji(wellnessScore)}</div>
                <div className="text-4xl font-bold text-gray-800">{wellnessScore}</div>
                <div className="text-sm text-gray-600 mt-2">Wellness Score</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-6 justify-center">
              <div 
                onClick={() => setShowBreathing(true)}
                className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-8 py-4 rounded-full shadow-2xl border-4 border-white/50 shimmer font-bold text-lg hover:scale-110 transition-transform cursor-pointer"
              >
                <span>✨ Safe Space</span>
              </div>
              <div 
                onClick={() => setShowResources(true)}
                className="bg-gradient-to-r from-green-400 to-emerald-400 text-white px-8 py-4 rounded-full shadow-2xl border-4 border-white/50 shimmer font-bold text-lg hover:scale-110 transition-transform cursor-pointer"
              >
                <span>💚 Self-Care Tools</span>
              </div>
              <div 
                onClick={() => {
                  if (session?.user) {
                    setShowAnalytics(true);
                  } else {
                    toast.error("Please login to view your personal growth analytics 🔐");
                  }
                }}
                className="bg-gradient-to-r from-blue-400 to-indigo-400 text-white px-8 py-4 rounded-full shadow-2xl border-4 border-white/50 shimmer font-bold text-lg hover:scale-110 transition-transform cursor-pointer"
              >
                <span>🌟 Personal Growth</span>
              </div>
              <div 
                onClick={() => setActiveTab("learn")}
                className="bg-gradient-to-r from-purple-400 to-pink-400 text-white px-8 py-4 rounded-full shadow-2xl border-4 border-white/50 shimmer font-bold text-lg hover:scale-110 transition-transform cursor-pointer"
              >
                <span>🎯 Expert Guidance</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <button
              onClick={() => setActiveTab("mood")}
              className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 ${
                activeTab === "mood"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-2xl"
                  : "bg-white/80 text-gray-700 hover:bg-white shadow-lg"
              }`}
            >
              😊 Mood Tracker
            </button>
            <button
              onClick={() => setActiveTab("journal")}
              className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 ${
                activeTab === "journal"
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-2xl"
                  : "bg-white/80 text-gray-700 hover:bg-white shadow-lg"
              }`}
            >
              📔 Journal
            </button>
            <button
              onClick={() => setActiveTab("learn")}
              className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 ${
                activeTab === "learn"
                  ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-2xl"
                  : "bg-white/80 text-gray-700 hover:bg-white shadow-lg"
              }`}
            >
              📚 Learn
            </button>
          </div>
        </div>
      </section>

      {/* Mood Tracker Tab */}
      {activeTab === "mood" && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-5xl font-bold text-center mb-6 text-gray-800">
              How Are You Feeling Right Now?
            </h3>
            <p className="text-center text-gray-600 mb-16 text-xl">
              Select the emotion that resonates with you. Your feelings are valid and important.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8 mb-16">
              {emotions.map((emotion, index) => (
                <button
                  key={emotion.name}
                  onClick={() => handleMoodSelect(emotion)}
                  className={`relative group bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] transition-all duration-500 transform hover:scale-110 hover:-rotate-2 border-4 ${
                    currentMood === emotion.name ? "border-opacity-100 scale-110 shadow-[0_20px_60px_rgba(0,0,0,0.3)]" : "border-opacity-20"
                  }`}
                  style={{ 
                    borderColor: emotion.color,
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <div className="text-7xl mb-4 pulse-glow transform group-hover:scale-125 transition-transform">{emotion.emoji}</div>
                  <div className="font-bold text-xl text-gray-800 mb-2">{emotion.name}</div>
                  <div className="text-sm text-gray-600">{emotion.description}</div>
                  <div 
                    className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br ${emotion.gradient}`}
                  ></div>
                </button>
              ))}
            </div>

            {/* Selected Emotion Display */}
            {selectedEmotion && (
              <div 
                className={`bg-white/95 backdrop-blur-xl rounded-[3rem] p-12 shadow-[0_30px_90px_rgba(0,0,0,0.2)] mb-16 border-8 fade-in-up`}
                style={{ borderColor: selectedEmotion.color }}
              >
                <div className="flex flex-col lg:flex-row items-center gap-10">
                  <div className="text-[150px] leading-none pulse-glow">{selectedEmotion.emoji}</div>
                  <div className="flex-1 text-center lg:text-left">
                    <h4 className="text-5xl font-bold mb-4" style={{ color: selectedEmotion.color }}>
                      You're feeling {selectedEmotion.name}
                    </h4>
                    <p className="text-gray-700 text-2xl mb-6 leading-relaxed">{selectedEmotion.description}</p>
                    <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 mb-6">
                      <p className="text-purple-700 font-bold text-xl italic">
                        "{currentAffirmation}"
                      </p>
                    </div>

                    {/* Tips Section */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6">
                        <h5 className="font-bold text-lg mb-3 text-blue-800 flex items-center gap-2">
                          <span>💡</span> Helpful Tips
                        </h5>
                        <ul className="space-y-2">
                          {selectedEmotion.tips.map((tip, i) => (
                            <li key={i} className="text-gray-700 flex items-start gap-2">
                              <span className="text-blue-500 mt-1">•</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6">
                        <h5 className="font-bold text-lg mb-3 text-green-800 flex items-center gap-2">
                          <span>🎯</span> Try These Activities
                        </h5>
                        <ul className="space-y-2">
                          {selectedEmotion.activities.map((activity, i) => (
                            <li key={i} className="text-gray-700 flex items-start gap-2">
                              <span className="text-green-500 mt-1">•</span>
                              <span>{activity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Personalized Exercise Recommendations */}
                {session?.user && recommendations.length > 0 && (
                  <div className="mt-8 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl p-8">
                    <h5 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
                      <span>💡</span> Recommended Exercises for You
                    </h5>
                    <p className="text-gray-600 mb-6 text-lg">
                      Based on your current mood, here are some exercises that might help:
                    </p>
                    <div className="grid md:grid-cols-3 gap-6">
                      {recommendations.slice(0, 3).map((rec: any) => (
                        <div
                          key={rec.id}
                          className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer"
                          onClick={() => router.push("/exercises")}
                        >
                          <div className="text-5xl mb-3">{rec.emoji || "🎯"}</div>
                          <h6 className="font-bold text-xl text-gray-800 mb-2">{rec.title}</h6>
                          <p className="text-gray-600 text-sm mb-4">{rec.description}</p>
                          <div className="flex items-center gap-2">
                            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">
                              {rec.category}
                            </span>
                            <span className="text-gray-500 text-xs">⏱️ {rec.duration} min</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => router.push("/exercises")}
                      className="mt-6 w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl font-bold hover:shadow-xl transition-all transform hover:scale-105"
                    >
                      View All Exercises →
                    </button>
                  </div>
                )}

                {/* Wellness Score Progress */}
                {session?.user && (
                  <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8">
                    <h5 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                      <span>💚</span> Your Wellness Score
                    </h5>
                    <div className="flex items-center gap-6">
                      <div className="flex-1">
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">Current Score</span>
                          <span className="font-bold text-2xl text-green-600">{wellnessScore}/100</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-green-400 to-emerald-500 h-6 rounded-full transition-all duration-1000"
                            style={{ width: `${wellnessScore}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-gray-600 mt-3">
                          {wellnessScore >= 80 ? "🌟 Excellent! You're thriving!" :
                           wellnessScore >= 60 ? "😊 Good! Keep up the healthy habits!" :
                           wellnessScore >= 40 ? "💪 You're making progress!" :
                           "🌱 Every step forward counts!"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Mood Notes */}
                <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8">
                  <label className="block text-gray-800 font-bold text-xl mb-4 flex items-center gap-2">
                    <span>✍️</span> Share Your Thoughts (Optional & Private)
                  </label>
                  <textarea
                    value={moodNotes}
                    onChange={(e) => setMoodNotes(e.target.value)}
                    className="w-full px-6 py-4 border-4 border-purple-200 rounded-2xl focus:border-purple-500 focus:outline-none resize-none text-lg shadow-inner bg-white"
                    rows="4"
                    placeholder="What's on your mind? Express yourself freely... 💭"
                  ></textarea>
                  <button
                    onClick={handleSubmitMood}
                    disabled={savingMood || !selectedEmotion}
                    className="mt-4 px-10 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105 hover:rotate-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {savingMood ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-spin">🌀</span>
                        Saving...
                      </span>
                    ) : (
                      "💾 Save to My Journal"
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Mood History */}
            {moodHistory.length > 0 && (
              <div className="bg-white/95 backdrop-blur-xl rounded-[3rem] p-12 shadow-2xl">
                <h4 className="text-4xl font-bold mb-8 text-gray-800 flex items-center gap-3">
                  <span>📊</span> Your Emotional Journey
                </h4>
                <div className="grid md:grid-cols-2 gap-6">
                  {moodHistory.map((entry, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-6 bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 rounded-2xl border-l-8 shadow-lg hover:shadow-xl transition-all hover:scale-102"
                      style={{ borderColor: entry.color }}
                    >
                      <div className="flex items-center gap-5">
                        <span className="text-5xl">{entry.emoji}</span>
                        <div>
                          <div className="font-bold text-xl text-gray-800">{entry.mood}</div>
                          <div className="text-sm text-gray-600">{entry.date}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-600">{entry.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Journal Tab */}
      {activeTab === "journal" && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-5xl font-bold text-center mb-6 text-gray-800">
              Your Private Journal
            </h3>
            <p className="text-center text-gray-600 mb-16 text-xl">
              A safe space to express your deepest thoughts and feelings
            </p>

            {journalEntries.length === 0 ? (
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-16 shadow-2xl text-center">
                <div className="text-8xl mb-6">📔</div>
                <h4 className="text-3xl font-bold text-gray-800 mb-4">No Journal Entries Yet</h4>
                <p className="text-xl text-gray-600 mb-8">Start by tracking your mood and adding your thoughts!</p>
                <button
                  onClick={() => setActiveTab("mood")}
                  className="px-10 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105"
                >
                  Track Your Mood
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                {journalEntries.map((entry, index) => (
                  <div
                    key={index}
                    className="bg-white/95 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border-l-8 border-purple-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] transition-all"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <span className="text-5xl">{emotions.find(e => e.name === entry.mood)?.emoji || "😊"}</span>
                        <div>
                          <h5 className="text-2xl font-bold text-gray-800">{entry.mood}</h5>
                          <p className="text-gray-600">{entry.date} at {entry.time}</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6">
                      <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">{entry.notes}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Learn Tab */}
      {activeTab === "learn" && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-5xl font-bold text-center mb-6 text-gray-800">
              Mental Health Education
            </h3>
            <p className="text-center text-gray-600 mb-16 text-xl">
              Discover insights, techniques, and wisdom for your emotional wellbeing
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mentalHealthArticles.map((article, index) => (
                <div
                  key={article.title}
                  className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl hover:shadow-[0_30px_90px_rgba(0,0,0,0.2)] transition-all duration-500 transform hover:scale-105 hover:-rotate-1 border-2 border-purple-200 fade-in-up cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-6xl mb-6">{article.icon}</div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-4 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-bold">
                      {article.category}
                    </span>
                    <span className="text-gray-500 text-sm">• {article.readTime} read</span>
                  </div>
                  <h4 className="text-2xl font-bold mb-3 text-gray-800">{article.title}</h4>
                  <p className="text-gray-600 text-lg mb-6 leading-relaxed">{article.excerpt}</p>
                  <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold hover:shadow-xl transition-all transform hover:scale-105">
                    Read Article →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Breathing Exercise Modal */}
      {showBreathing && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-md z-[60] flex items-center justify-center p-4 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowBreathing(false);
              setBreathCount(0);
            }
          }}
        >
          <div className="bg-white rounded-3xl sm:rounded-[3rem] p-6 sm:p-12 lg:p-16 max-w-3xl w-full shadow-[0_40px_120px_rgba(0,0,0,0.5)] relative my-8">
            {/* Enhanced Close Button */}
            <button
              onClick={() => {
                setShowBreathing(false);
                setBreathCount(0);
              }}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110 hover:rotate-90 duration-300"
              aria-label="Close breathing exercise"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-3 sm:mb-4 text-gray-800">
              Box Breathing Exercise
            </h3>
            <p className="text-center text-gray-600 text-base sm:text-lg mb-8 sm:mb-12">
              Breathe with the circle • {breathCount} breaths completed
            </p>
            
            <div className="flex flex-col items-center justify-center py-6 sm:py-12">
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 mb-8 sm:mb-12">
                <div 
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 breathe-animation shadow-[0_0_80px_rgba(147,51,234,0.6)]"
                  style={{
                    animationDuration: breathingPhase === "hold" ? "2s" : "4s"
                  }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white capitalize block mb-2">
                      {breathingPhase}
                    </span>
                    <span className="text-sm sm:text-base text-white/80">for 4 seconds</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center w-full">
                <p className="text-xl sm:text-2xl text-purple-800 font-bold mb-4 sm:mb-6">How It Works</p>
                <div className="grid grid-cols-2 gap-3 sm:gap-4 text-gray-700">
                  <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4">
                    <p className="font-bold text-blue-600 text-sm sm:text-base">1. Inhale</p>
                    <p className="text-xs sm:text-sm">Breathe in deeply for 4 seconds</p>
                  </div>
                  <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4">
                    <p className="font-bold text-purple-600 text-sm sm:text-base">2. Hold</p>
                    <p className="text-xs sm:text-sm">Hold your breath for 4 seconds</p>
                  </div>
                  <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4">
                    <p className="font-bold text-pink-600 text-sm sm:text-base">3. Exhale</p>
                    <p className="text-xs sm:text-sm">Breathe out slowly for 4 seconds</p>
                  </div>
                  <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4">
                    <p className="font-bold text-indigo-600 text-sm sm:text-base">4. Hold</p>
                    <p className="text-xs sm:text-sm">Hold again for 4 seconds</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-4 w-full mt-8">
              <button
                onClick={() => {
                  setShowBreathing(false);
                  setBreathCount(0);
                }}
                className="flex-1 py-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-2xl font-bold hover:shadow-xl transition-all transform hover:scale-105"
              >
                🏠 Home
              </button>
              <button
                onClick={completeBreathingExercise}
                disabled={completingExercise || breathCount === 0}
                className="flex-1 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl font-bold hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {completingExercise ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">🌀</span>
                    Completing...
                  </span>
                ) : (
                  "✅ Complete Exercise"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Resources Section */}
      {showResources && (
        <section className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md overflow-y-auto">
          <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <button
                onClick={() => {
                  setShowResources(false);
                  setActiveResource(null);
                }}
                className="fixed top-8 right-8 text-6xl text-white hover:text-gray-300 transition-colors hover:rotate-90 transform duration-300 z-10"
              >
                ×
              </button>

              <h3 className="text-6xl font-bold text-center mb-6 text-white">
                Mental Health Toolkit
              </h3>
              <p className="text-center text-white/90 mb-16 text-2xl">
                Evidence-based tools and techniques for emotional wellbeing
              </p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {resources.map((resource, index) => (
                  <div
                    key={resource.id}
                    onClick={() => handleResourceClick(resource)}
                    className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl hover:shadow-[0_30px_90px_rgba(255,255,255,0.3)] transition-all duration-500 transform hover:scale-105 hover:rotate-1 border-2 border-white/30 fade-in-up cursor-pointer"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="text-6xl mb-6">{resource.icon}</div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-4 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full text-sm font-bold">
                        {resource.category}
                      </span>
                      <span className={`px-4 py-1 rounded-full text-sm font-bold ${
                        resource.difficulty === "Easy" ? "bg-green-100 text-green-700" :
                        resource.difficulty === "Medium" ? "bg-yellow-100 text-yellow-700" :
                        "bg-red-100 text-red-700"
                      }`}>
                        {resource.difficulty}
                      </span>
                    </div>
                    <h4 className="text-2xl font-bold mb-3 text-gray-800">{resource.title}</h4>
                    <p className="text-gray-600 text-lg mb-6">{resource.description}</p>
                    <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold hover:shadow-xl transition-all transform hover:scale-105">
                      Start Exercise →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Interactive Resource Modal */}
      {activeResource && (
        <div className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-lg flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-[3rem] p-12 max-w-4xl w-full shadow-[0_40px_120px_rgba(0,0,0,0.5)] relative my-8">
            <button
              onClick={() => setActiveResource(null)}
              className="absolute top-8 right-8 text-5xl text-gray-400 hover:text-gray-600 transition-colors hover:rotate-90 transform duration-300"
            >
              ×
            </button>

            {/* Box Breathing */}
            {activeResource.id === "box-breathing" && (
              <div className="text-center">
                <div className="text-6xl mb-6">{activeResource.icon}</div>
                <h3 className="text-4xl font-bold mb-4 text-gray-800">{activeResource.title}</h3>
                <p className="text-xl text-gray-600 mb-8">Follow the rhythm: Inhale 4s → Hold 4s → Exhale 4s → Hold 4s</p>
                
                <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-3xl p-8 mb-8">
                  <div className="relative w-64 h-64 mx-auto mb-6">
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 breathe-animation shadow-[0_0_80px_rgba(147,51,234,0.6)]"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <span className="text-4xl font-bold text-white capitalize block mb-2">
                          {breathingPhase}
                        </span>
                        <span className="text-lg text-white/80">for 4 seconds</span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => {
                      setShowBreathing(true);
                      setActiveResource(null);
                    }}
                    className="px-10 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl font-bold hover:shadow-xl transition-all transform hover:scale-105"
                  >
                    Start Full Session
                  </button>
                </div>
              </div>
            )}

            {/* Gratitude Journal */}
            {activeResource.id === "gratitude-journal" && (
              <div>
                <div className="text-6xl mb-6 text-center">{activeResource.icon}</div>
                <h3 className="text-4xl font-bold mb-4 text-gray-800 text-center">{activeResource.title}</h3>
                <p className="text-xl text-gray-600 mb-8 text-center">Write three things you're grateful for today</p>
                
                <div className="space-y-6">
                  {[0, 1, 2].map((index) => (
                    <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6">
                      <label className="block text-gray-700 font-bold mb-3 flex items-center gap-2">
                        <span className="text-2xl">{index + 1}.</span>
                        <span>I'm grateful for...</span>
                      </label>
                      <textarea
                        value={gratitudeEntries[index]}
                        onChange={(e) => {
                          const newEntries = [...gratitudeEntries];
                          newEntries[index] = e.target.value;
                          setGratitudeEntries(newEntries);
                        }}
                        className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none resize-none text-lg"
                        rows="3"
                        placeholder="Express your gratitude..."
                      />
                    </div>
                  ))}
                </div>
                
                <button
                  onClick={saveGratitudeJournal}
                  className="mt-8 w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold text-lg hover:shadow-xl transition-all transform hover:scale-105"
                >
                  Save Gratitude Journal 💚
                </button>
              </div>
            )}

            {/* Body Scan Meditation */}
            {activeResource.id === "body-scan" && (
              <div>
                <div className="text-6xl mb-6 text-center">{activeResource.icon}</div>
                <h3 className="text-4xl font-bold mb-4 text-gray-800 text-center">{activeResource.title}</h3>
                <p className="text-xl text-gray-600 mb-8 text-center">Progressive relaxation meditation</p>
                
                <div className="bg-gradient-to-r from-teal-100 to-cyan-100 rounded-3xl p-8 mb-8">
                  <div className="text-center mb-6">
                    <div className="text-6xl mb-4">⏱️</div>
                    <div className="text-5xl font-bold text-gray-800 mb-2">{formatTime(meditationTimer)}</div>
                    <button
                      onClick={() => setIsTimerRunning(!isTimerRunning)}
                      className="px-8 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-2xl font-bold hover:shadow-xl transition-all transform hover:scale-105"
                    >
                      {isTimerRunning ? "Pause" : "Start"} Timer
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      <strong>Instructions:</strong> Lie down comfortably. Close your eyes. Take three deep breaths.
                    </p>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      Starting from your toes, slowly bring awareness to each part of your body. 
                      Notice any sensations, tension, or warmth. Don't judge, just observe.
                    </p>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      Move gradually upward: feet → legs → hips → stomach → chest → arms → hands → shoulders → neck → face → head.
                    </p>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      Take your time with each area. Breathe into any tension and let it dissolve.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Music Playlist */}
            {activeResource.id === "music" && (
              <div className="text-center">
                <div className="text-6xl mb-6">{activeResource.icon}</div>
                <h3 className="text-4xl font-bold mb-4 text-gray-800">{activeResource.title}</h3>
                <p className="text-xl text-gray-600 mb-8">Curated playlists for every mood</p>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  {[
                    { name: "Calm & Peaceful", emoji: "🌊", color: "from-blue-400 to-cyan-400" },
                    { name: "Happy & Uplifting", emoji: "☀️", color: "from-yellow-400 to-orange-400" },
                    { name: "Focus & Clarity", emoji: "🎯", color: "from-purple-400 to-indigo-400" },
                    { name: "Sleep & Relaxation", emoji: "🌙", color: "from-indigo-400 to-purple-400" }
                  ].map((playlist) => (
                    <div
                      key={playlist.name}
                      className={`bg-gradient-to-r ${playlist.color} p-8 rounded-3xl text-white cursor-pointer hover:scale-105 transition-transform shadow-xl`}
                    >
                      <div className="text-5xl mb-3">{playlist.emoji}</div>
                      <div className="font-bold text-xl">{playlist.name}</div>
                    </div>
                  ))}
                </div>
                
                <p className="text-gray-600">
                  💡 Tip: Create your own playlist with songs that bring you joy and peace
                </p>
              </div>
            )}

            {/* Nature Immersion */}
            {activeResource.id === "nature" && (
              <div className="text-center">
                <div className="text-6xl mb-6">{activeResource.icon}</div>
                <h3 className="text-4xl font-bold mb-4 text-gray-800">{activeResource.title}</h3>
                <p className="text-xl text-gray-600 mb-8 text-center">Connect with the healing power of nature</p>
                
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-3xl p-8 mb-8">
                  <div className="space-y-6 text-left">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">🌳</div>
                      <div>
                        <h4 className="font-bold text-xl text-gray-800 mb-2">Forest Bathing</h4>
                        <p className="text-gray-700">Spend 20-30 minutes walking mindfully in nature</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">🌅</div>
                      <div>
                        <h4 className="font-bold text-xl text-gray-800 mb-2">Sunrise/Sunset</h4>
                        <p className="text-gray-700">Watch the sky transform - a natural meditation</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">🌊</div>
                      <div>
                        <h4 className="font-bold text-xl text-gray-800 mb-2">Water Therapy</h4>
                        <p className="text-gray-700">Sit by water - ocean, river, or fountain</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">🌺</div>
                      <div>
                        <h4 className="font-bold text-xl text-gray-800 mb-2">Garden Connection</h4>
                        <p className="text-gray-700">Tend to plants or simply observe flowers</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Talk Therapy Resources */}
            {activeResource.id === "talk-therapy" && (
              <div>
                <div className="text-6xl mb-6 text-center">{activeResource.icon}</div>
                <h3 className="text-4xl font-bold mb-4 text-gray-800 text-center">{activeResource.title}</h3>
                <p className="text-xl text-gray-600 mb-8 text-center">Professional support and resources</p>
                
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-2xl p-6">
                    <h4 className="font-bold text-2xl text-gray-800 mb-3 flex items-center gap-2">
                      <span>🆘</span> Crisis Support
                    </h4>
                    <p className="text-gray-700 mb-2">
                      <strong>US Crisis Hotline:</strong> Call or text <span className="text-3xl font-bold text-blue-600">988</span>
                    </p>
                    <p className="text-gray-700">
                      <strong>Crisis Text Line:</strong> Text HOME to 741741
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6">
                    <h4 className="font-bold text-2xl text-gray-800 mb-3 flex items-center gap-2">
                      <span>👨‍⚕️</span> Find a Therapist
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• <strong>Psychology Today:</strong> therapist directory</li>
                      <li>• <strong>BetterHelp:</strong> online therapy platform</li>
                      <li>• <strong>Talkspace:</strong> text-based therapy</li>
                      <li>• <strong>Open Path:</strong> affordable therapy ($30-$80/session)</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-6">
                    <h4 className="font-bold text-2xl text-gray-800 mb-3 flex items-center gap-2">
                      <span>👥</span> Support Groups
                    </h4>
                    <p className="text-gray-700">
                      Connect with others who understand. Look for local or online support groups for anxiety, depression, grief, or specific challenges.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Progressive Muscle Relaxation */}
            {activeResource.id === "muscle-relaxation" && (
              <div>
                <div className="text-6xl mb-6 text-center">{activeResource.icon}</div>
                <h3 className="text-4xl font-bold mb-4 text-gray-800 text-center">{activeResource.title}</h3>
                <p className="text-xl text-gray-600 mb-8 text-center">Systematic tension and release technique</p>
                
                <div className="bg-gradient-to-r from-orange-100 to-amber-100 rounded-3xl p-8 mb-6">
                  <h4 className="font-bold text-2xl text-gray-800 mb-6 text-center">
                    Step {relaxationStep + 1} of {muscleGroups.length}
                  </h4>
                  
                  <div className="text-center mb-8">
                    <div className="text-7xl mb-4">{muscleGroups[relaxationStep].emoji}</div>
                    <h5 className="text-3xl font-bold text-gray-800 mb-4">{muscleGroups[relaxationStep].name}</h5>
                    <p className="text-xl text-gray-700 leading-relaxed">{muscleGroups[relaxationStep].instruction}</p>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
                    <div
                      className="bg-gradient-to-r from-orange-400 to-amber-400 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${((relaxationStep + 1) / muscleGroups.length) * 100}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex gap-4">
                    {relaxationStep > 0 && (
                      <button
                        onClick={() => setRelaxationStep(relaxationStep - 1)}
                        className="flex-1 py-3 bg-gray-200 text-gray-800 rounded-2xl font-bold hover:bg-gray-300 transition-all"
                      >
                        ← Previous
                      </button>
                    )}
                    {relaxationStep < muscleGroups.length - 1 ? (
                      <button
                        onClick={() => setRelaxationStep(relaxationStep + 1)}
                        className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-2xl font-bold hover:shadow-xl transition-all transform hover:scale-105"
                      >
                        Next →
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          toast.success("Progressive muscle relaxation completed! 🎉");
                          setActiveResource(null);
                        }}
                        className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl font-bold hover:shadow-xl transition-all transform hover:scale-105"
                      >
                        Complete ✓
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Visualization Exercise */}
            {activeResource.id === "visualization" && (
              <div>
                <div className="text-6xl mb-6 text-center">{activeResource.icon}</div>
                <h3 className="text-4xl font-bold mb-4 text-gray-800 text-center">{activeResource.title}</h3>
                <p className="text-xl text-gray-600 mb-8 text-center">Guided imagery for peace and calm</p>
                
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-3xl p-8 mb-6">
                  <h4 className="font-bold text-2xl text-gray-800 mb-6 text-center">
                    Step {visualizationStep + 1} of {visualizationSteps.length}
                  </h4>
                  
                  <div className="text-center mb-8">
                    <div className="text-7xl mb-4">{visualizationSteps[visualizationStep].image}</div>
                    <h5 className="text-3xl font-bold text-gray-800 mb-4">{visualizationSteps[visualizationStep].title}</h5>
                    <p className="text-xl text-gray-700 leading-relaxed">{visualizationSteps[visualizationStep].description}</p>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
                    <div
                      className="bg-gradient-to-r from-blue-400 to-purple-400 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${((visualizationStep + 1) / visualizationSteps.length) * 100}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex gap-4">
                    {visualizationStep > 0 && (
                      <button
                        onClick={() => setVisualizationStep(visualizationStep - 1)}
                        className="flex-1 py-3 bg-gray-200 text-gray-800 rounded-2xl font-bold hover:bg-gray-300 transition-all"
                      >
                        ← Previous
                      </button>
                    )}
                    {visualizationStep < visualizationSteps.length - 1 ? (
                      <button
                        onClick={() => setVisualizationStep(visualizationStep + 1)}
                        className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl font-bold hover:shadow-xl transition-all transform hover:scale-105"
                      >
                        Next →
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          toast.success("Visualization exercise completed! 🎉");
                          setActiveResource(null);
                        }}
                        className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl font-bold hover:shadow-xl transition-all transform hover:scale-105"
                      >
                        Complete ✓
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* EFT Tapping */}
            {activeResource.id === "eft" && (
              <div>
                <div className="text-6xl mb-6 text-center">{activeResource.icon}</div>
                <h3 className="text-4xl font-bold mb-4 text-gray-800 text-center">{activeResource.title}</h3>
                <p className="text-xl text-gray-600 mb-8 text-center">Emotional Freedom Technique - Tapping for relief</p>
                
                <div className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-3xl p-8 mb-6">
                  <h4 className="font-bold text-2xl text-gray-800 mb-6 text-center">
                    Point {eftStep + 1} of {eftTappingPoints.length}
                  </h4>
                  
                  <div className="text-center mb-8">
                    <div className="text-7xl mb-4">{eftTappingPoints[eftStep].emoji}</div>
                    <h5 className="text-3xl font-bold text-gray-800 mb-2">{eftTappingPoints[eftStep].name}</h5>
                    <p className="text-lg text-gray-600 mb-4">{eftTappingPoints[eftStep].location}</p>
                    <p className="text-xl text-gray-700 leading-relaxed">{eftTappingPoints[eftStep].instruction}</p>
                  </div>
                  
                  <div className="bg-white rounded-2xl p-6 mb-6">
                    <p className="text-gray-700 text-center">
                      <strong>Tap 5-7 times</strong> while saying:<br/>
                      <em className="text-purple-600">"Even though I feel [emotion], I deeply and completely accept myself"</em>
                    </p>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
                    <div
                      className="bg-gradient-to-r from-pink-400 to-rose-400 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${((eftStep + 1) / eftTappingPoints.length) * 100}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex gap-4">
                    {eftStep > 0 && (
                      <button
                        onClick={() => setEftStep(eftStep - 1)}
                        className="flex-1 py-3 bg-gray-200 text-gray-800 rounded-2xl font-bold hover:bg-gray-300 transition-all"
                      >
                        ← Previous
                      </button>
                    )}
                    {eftStep < eftTappingPoints.length - 1 ? (
                      <button
                        onClick={() => setEftStep(eftStep + 1)}
                        className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl font-bold hover:shadow-xl transition-all transform hover:scale-105"
                      >
                        Next Point →
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          toast.success("EFT tapping round completed! 🎉");
                          setActiveResource(null);
                        }}
                        className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl font-bold hover:shadow-xl transition-all transform hover:scale-105"
                      >
                        Complete ✓
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Wellness Quiz Modal */}
      {showQuiz && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-[3rem] p-16 max-w-3xl w-full shadow-[0_40px_120px_rgba(0,0,0,0.5)] relative">
            <button
              onClick={() => {
                setShowQuiz(false);
                setQuizStep(0);
                setWellnessScore(0);
              }}
              className="absolute top-8 right-8 text-5xl text-gray-400 hover:text-gray-600 transition-colors hover:rotate-90 transform duration-300"
            >
              ×
            </button>
            
            {quizStep < wellnessQuestions.length ? (
              <>
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold text-purple-600">
                      Question {quizStep + 1} of {wellnessQuestions.length}
                    </span>
                    <span className="text-5xl">{getMoodEmoji(wellnessScore)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${((quizStep) / wellnessQuestions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <h3 className="text-4xl font-bold mb-8 text-gray-800">
                  {wellnessQuestions[quizStep].question}
                </h3>
                
                <div className="space-y-4">
                  {wellnessQuestions[quizStep].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuizAnswer(index)}
                      className="w-full p-6 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 rounded-2xl text-left font-bold text-xl text-gray-800 transition-all transform hover:scale-105 hover:shadow-xl border-2 border-transparent hover:border-purple-400"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center">
                <div className="text-9xl mb-8">{getMoodEmoji(wellnessScore)}</div>
                <h3 className="text-5xl font-bold mb-6 text-gray-800">
                  Wellness Check Complete!
                </h3>
                <p className="text-2xl text-gray-600 mb-8">
                  Your wellness score: <span className="font-bold text-purple-600">{wellnessScore}/20</span>
                </p>
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl p-8 mb-8">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {wellnessScore >= 16 ? "You're doing great! Keep up the good work with your mental health practices." :
                     wellnessScore >= 12 ? "You're on a good path. Consider incorporating more self-care activities." :
                     wellnessScore >= 8 ? "There's room for improvement. Try our resources to boost your wellbeing." :
                     "We're here to support you. Explore our tools and consider reaching out to a professional."}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Analytics Modal */}
      {showAnalytics && moodAnalytics && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-md z-[60] overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowAnalytics(false);
            }
          }}
        >
          <div className="min-h-screen flex items-start justify-center p-4 py-16">
            <div className="bg-white rounded-3xl sm:rounded-[3rem] p-6 sm:p-12 lg:p-16 max-w-7xl w-full shadow-[0_40px_120px_rgba(0,0,0,0.5)] relative my-8">
              <button
                onClick={() => setShowAnalytics(false)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110 hover:rotate-90 duration-300"
                aria-label="Close analytics"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-3 sm:mb-4 text-gray-800 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
                <span>📈</span> Your Mood Analytics
              </h3>
              <p className="text-center text-gray-600 text-base sm:text-lg mb-8 sm:mb-12">
                Insights into your emotional wellbeing journey
              </p>

              <div className="flex justify-center gap-4 mb-8 sm:mb-12">
                <button
                  onClick={downloadMoodHistory}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl font-bold hover:shadow-xl transition-all transform hover:scale-105 text-sm sm:text-base"
                >
                  📥 Download CSV
                </button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl">
                  <div className="text-3xl sm:text-4xl mb-2">📊</div>
                  <div className="text-2xl sm:text-3xl font-bold text-gray-800">{moodAnalytics.totalMoods}</div>
                  <div className="text-xs sm:text-sm text-gray-600 mt-1">Total Check-ins</div>
                </div>
                <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl">
                  <div className="text-3xl sm:text-4xl mb-2">{moodAnalytics.dominantMood?.emoji || "😊"}</div>
                  <div className="text-base sm:text-xl font-bold text-gray-800 truncate">{moodAnalytics.dominantMood?.mood || "N/A"}</div>
                  <div className="text-xs sm:text-sm text-gray-600 mt-1">Most Common Mood</div>
                </div>
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl">
                  <div className="text-3xl sm:text-4xl mb-2">📅</div>
                  <div className="text-2xl sm:text-3xl font-bold text-gray-800">{moodAnalytics.weeklyAverage}</div>
                  <div className="text-xs sm:text-sm text-gray-600 mt-1">Weekly Check-ins</div>
                </div>
                <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl">
                  <div className="text-3xl sm:text-4xl mb-2">⭐</div>
                  <div className="text-2xl sm:text-3xl font-bold text-gray-800">{moodAnalytics.streak || 0}</div>
                  <div className="text-xs sm:text-sm text-gray-600 mt-1">Day Streak</div>
                </div>
              </div>

              {/* Charts */}
              <div className="space-y-6 sm:space-y-8">
                {/* Weekly Trend */}
                {moodAnalytics.weeklyTrend && moodAnalytics.weeklyTrend.length > 0 && (
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl">
                    <h4 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">📅 Weekly Mood Trend</h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={moodAnalytics.weeklyTrend}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                        <XAxis dataKey="date" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: "white", 
                            border: "2px solid #8b5cf6", 
                            borderRadius: "1rem",
                            padding: "1rem"
                          }} 
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="count" 
                          stroke="#8b5cf6" 
                          strokeWidth={3}
                          name="Check-ins"
                          dot={{ fill: "#8b5cf6", r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {/* Mood Distribution */}
                {moodAnalytics.moodDistribution && moodAnalytics.moodDistribution.length > 0 && (
                  <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl">
                      <h4 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">🎨 Mood Distribution</h4>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={moodAnalytics.moodDistribution}
                            dataKey="count"
                            nameKey="mood"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label={(entry) => `${entry.mood} (${entry.count})`}
                          >
                            {moodAnalytics.moodDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color || `hsl(${index * 45}, 70%, 60%)`} />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: "white", 
                              border: "2px solid #14b8a6", 
                              borderRadius: "1rem",
                              padding: "1rem"
                            }} 
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl">
                      <h4 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">📊 Mood Frequency</h4>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={moodAnalytics.moodDistribution}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                          <XAxis dataKey="mood" stroke="#6b7280" />
                          <YAxis stroke="#6b7280" />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: "white", 
                              border: "2px solid #10b981", 
                              borderRadius: "1rem",
                              padding: "1rem"
                            }} 
                          />
                          <Bar dataKey="count" fill="#10b981" radius={[8, 8, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}
              </div>

              {/* Insights */}
              <div className="mt-6 sm:mt-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8">
                <h4 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-800 flex items-center gap-2">
                  <span>💡</span> Insights & Tips
                </h4>
                <div className="space-y-2 sm:space-y-3 text-gray-700 text-sm sm:text-base">
                  <p>• You've tracked your mood <strong>{moodAnalytics.totalMoods} times</strong> - great job staying mindful!</p>
                  {moodAnalytics.dominantMood && (
                    <p>• Your most common mood is <strong>{moodAnalytics.dominantMood.mood}</strong> - this shows your emotional patterns</p>
                  )}
                  <p>• Keep checking in daily to build better emotional awareness</p>
                  <p>• Consider journaling when you notice pattern changes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Daily Quote Floating Card */}
      {randomAffirmation && (
        <div className="fixed bottom-8 right-8 z-40">
          <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white p-6 rounded-3xl shadow-2xl max-w-sm float-animation">
            <p className="text-sm font-bold mb-2">💫 Daily Affirmation</p>
            <p className="text-lg italic">"{randomAffirmation}"</p>
          </div>
        </div>
      )}

      {/* Affirmation Banner */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 gradient-animate relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="text-8xl mb-8 pulse-glow">✨</div>
          <h3 className="text-6xl font-bold text-white mb-6">
            You Are Worthy of Care & Compassion
          </h3>
          <p className="text-2xl text-white/95 mb-12 leading-relaxed max-w-4xl mx-auto">
            Taking time to understand your emotions is a powerful act of self-love. 
            Every feeling is valid, and you deserve support on this journey. You're not alone.
          </p>
          <div className="flex flex-wrap gap-6 justify-center">
            <button 
              onClick={() => setShowBreathing(true)}
              className="px-12 py-5 bg-white text-purple-600 rounded-full font-bold text-xl hover:shadow-[0_20px_60px_rgba(255,255,255,0.4)] transition-all transform hover:scale-110 hover:rotate-2"
            >
              🫁 Start Breathing Exercise
            </button>
            <button 
              onClick={() => {
                setActiveTab("mood");
                window.scrollTo({ top: 600, behavior: 'smooth' });
              }}
              className="px-12 py-5 bg-white/20 backdrop-blur-xl text-white rounded-full font-bold text-xl hover:bg-white/30 transition-all transform hover:scale-110 hover:-rotate-2 border-2 border-white/30"
            >
              😊 Track Your Mood
            </button>
            <button 
              onClick={() => setShowQuiz(true)}
              className="px-12 py-5 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full font-bold text-xl hover:shadow-[0_20px_60px_rgba(255,255,255,0.4)] transition-all transform hover:scale-105"
            >
              📊 Take Wellness Check
            </button>
          </div>
        </div>
      </section>

      {/* Emergency Resources */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-red-50 to-rose-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-12 shadow-2xl border-4 border-red-300">
            <h3 className="text-4xl font-bold text-red-600 mb-6 flex items-center gap-3">
              <span>🆘</span> Crisis Support Resources
            </h3>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              If you're experiencing a mental health crisis or having thoughts of self-harm, 
              please reach out for immediate professional help. You deserve support.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-red-100 to-rose-100 rounded-2xl p-6">
                <h4 className="font-bold text-2xl text-red-700 mb-3">IND INDIA</h4>
                <p className="text-gray-700 mb-2">
                  <strong>Crisis Hotline:</strong> <span className="text-3xl font-bold text-red-600">112</span>
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Crisis Text Line:</strong> Text HOME to 741741
                </p>
                <p className="text-sm text-gray-600">Available 24/7, Free & Confidential</p>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl p-6">
                <h4 className="font-bold text-2xl text-blue-700 mb-3">🌍 International</h4>
                <p className="text-gray-700 mb-2">
                  <strong>Find Help:</strong> findahelpline.com
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Emergency:</strong> Contact local emergency services
                </p>
                <p className="text-sm text-gray-600">Crisis support worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white/90 to-purple-50/90 backdrop-blur-xl border-t-4 border-purple-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-5xl">🪞</span>
                <div>
                  <h4 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Emotional Mirror
                  </h4>
                  <p className="text-gray-600">Mental Wellness Companion</p>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                Your safe, interactive sanctuary for understanding emotions, tracking mental health, 
                and discovering personalized tools for inner peace and emotional growth.
              </p>
              <div className="flex gap-4">
                <a 
                  href="mailto:emotionalhealthmirror@gmail.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold cursor-pointer hover:scale-110 transition-transform"
                  aria-label="Email"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
                <a 
                  href="https://facebook.com/emotionalhealthmirror" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold cursor-pointer hover:scale-110 transition-transform"
                  aria-label="Facebook"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a 
                  href="https://instagram.com/emotionalhealthmirror" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white font-bold cursor-pointer hover:scale-110 transition-transform"
                  aria-label="Instagram"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.421.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.419-.419-.689-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h5 className="font-bold text-xl text-gray-800 mb-4">Quick Links</h5>
              <ul className="space-y-3 text-gray-600">
                <li>
                  <a href="/about" className="hover:text-purple-600 cursor-pointer transition-colors">About Us</a>
                </li>
                <li>
                  <a href="/resources" className="hover:text-purple-600 cursor-pointer transition-colors">Resources</a>
                </li>
                <li>
                  <a href="/blog" className="hover:text-purple-600 cursor-pointer transition-colors">Blog</a>
                </li>
                <li>
                  <a href="/community" className="hover:text-purple-600 cursor-pointer transition-colors">Community</a>
                </li>
                <li>
                  <a href="/support" className="hover:text-purple-600 cursor-pointer transition-colors">Support</a>
                </li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-bold text-xl text-gray-800 mb-4">Legal</h5>
              <ul className="space-y-3 text-gray-600">
                <li>
                  <a href="/privacy" className="hover:text-purple-600 cursor-pointer transition-colors">Privacy Policy</a>
                </li>
                <li>
                  <a href="/terms" className="hover:text-purple-600 cursor-pointer transition-colors">Terms of Service</a>
                </li>
                <li>
                  <a href="/cookies" className="hover:text-purple-600 cursor-pointer transition-colors">Cookie Policy</a>
                </li>
                <li>
                  <a href="/disclaimer" className="hover:text-purple-600 cursor-pointer transition-colors">Disclaimer</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t-2 border-purple-200 pt-8">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div className="flex gap-6 text-sm text-gray-600">
                <span className="flex items-center gap-2">💚 Self-Care</span>
                <span className="flex items-center gap-2">🌈 Emotional Health</span>
                <span className="flex items-center gap-2">✨ Mental Wellness</span>
                <span className="flex items-center gap-2">🎯 Personal Growth</span>
              </div>
              <p className="text-gray-600">
                © 2025 Emotional Mirror. Made for your wellbeing
              </p>
            </div>
            <div className="mt-8 text-center text-gray-500 text-sm bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6">
              <p className="font-bold text-lg text-gray-700 mb-2">
                ⚠️ Important Disclaimer
              </p>
              <p>
                Emotional Mirror is a supportive tool and not a substitute for professional mental health care. 
                If you're experiencing a crisis or need immediate help, please contact emergency services or a mental health professional.
              </p>
            </div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}