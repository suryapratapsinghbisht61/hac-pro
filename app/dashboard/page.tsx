"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import {
  MessageCircle,
  BookOpen,
  History,
  Search,
  Send,
  Menu,
  X,
  User,
  Play,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ArrowLeft,
} from "lucide-react"

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
  resources?: Resource[]
}

interface Resource {
  type: "youtube" | "khan" | "wikipedia"
  title: string
  url: string
  description?: string
}

interface ChatHistory {
  id: string
  title: string
  messages: Message[]
  timestamp: Date
}

interface CourseSummary {
  id: string
  title: string
  keyPoints: string[]
  examples: string[]
  quiz: string[]
  timestamp: Date
}

export default function AILearningDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"tutor" | "summary" | "history">("tutor")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([])
  const [courseSummaries, setCourseSummaries] = useState<CourseSummary[]>([])
  const [courseText, setCourseText] = useState("")
  const [expandedHistory, setExpandedHistory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Simulate streaming text effect
  const streamText = async (text: string, messageId: string) => {
    const words = text.split(" ")
    let currentText = ""

    for (let i = 0; i < words.length; i++) {
      currentText += (i > 0 ? " " : "") + words[i]
      setMessages((prev) => prev.map((msg) => (msg.id === messageId ? { ...msg, text: currentText } : msg)))
      await new Promise((resolve) => setTimeout(resolve, 50))
    }
  }

  const askGemini = async (question: string): Promise<{ text: string; resources: Resource[] }> => {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: question }),
      })

      const data = await response.json()

      if (!response.ok) {
        return {
          text: `⚠️ ${data.error || "Something went wrong. Please try again."}`,
          resources: [],
        }
      }

      return {
        text: data.text,
        resources: data.resources || [],
      }
    } catch (error) {
      console.error("Error calling chat API:", error)
      return {
        text: "I'm having trouble connecting to the AI service right now. Please make sure your GEMINI_API_KEY environment variable is set in your project settings.",
        resources: [],
      }
    }
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    try {
      const response = await askGemini(inputMessage)

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "",
        isUser: false,
        timestamp: new Date(),
        resources: response.resources,
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)

      await streamText(response.text, aiMessage.id)
    } catch (error) {
      setIsTyping(false)
      console.error("Error calling Gemini API:", error)
    }
  }

  const generateCourseSummary = async () => {
    if (!courseText.trim()) return

    const summary: CourseSummary = {
      id: Date.now().toString(),
      title: `Course Summary - ${new Date().toLocaleDateString()}`,
      keyPoints: [
        "Main concept explanation and core principles",
        "Important formulas and methodologies",
        "Real-world applications and use cases",
        "Common misconceptions to avoid",
      ],
      examples: [
        "Practical example demonstrating the concept",
        "Step-by-step problem solving approach",
        "Case study from industry application",
      ],
      quiz: [
        "What are the key principles discussed?",
        "How would you apply this in a real scenario?",
        "What are the main benefits of this approach?",
      ],
      timestamp: new Date(),
    }

    setCourseSummaries((prev) => [summary, ...prev])
    setCourseText("")
  }

  const ResourceCard = ({ resource }: { resource: Resource }) => {
    const getIcon = () => {
      switch (resource.type) {
        case "youtube":
          return <Play className="w-4 h-4" />
        case "khan":
          return <BookOpen className="w-4 h-4" />
        case "wikipedia":
          return <ExternalLink className="w-4 h-4" />
      }
    }

    const getColor = () => {
      switch (resource.type) {
        case "youtube":
          return "from-red-500 to-red-700"
        case "khan":
          return "from-gray-500 to-gray-700"
        case "wikipedia":
          return "from-red-400 to-red-600"
      }
    }

    return (
      <motion.a
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`block p-3 rounded-lg bg-gradient-to-r ${getColor()} text-white text-sm hover:shadow-lg transition-all duration-200`}
      >
        <div className="flex items-center gap-2 mb-1">
          {getIcon()}
          <span className="font-medium">{resource.title}</span>
        </div>
        {resource.description && <p className="text-white/80 text-xs">{resource.description}</p>}
      </motion.a>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-rose-100 text-gray-800">
      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || window.innerWidth >= 768) && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="fixed left-0 top-0 h-full w-80 bg-white/80 backdrop-blur-xl border-r border-blue-200/40 z-50 md:relative md:w-64 shadow-lg shadow-blue-200/30"
          >
            <div className="p-6">
              {/* Profile Section */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 via-pink-400 to-rose-500 flex items-center justify-center shadow-lg shadow-blue-300/40">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Alex Student</h3>
                  <p className="text-sm text-gray-600">Level 5 Learner</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm mb-2 text-gray-700">
                  <span>Learning Progress</span>
                  <span>75%</span>
                </div>
                <div className="w-full bg-blue-100/50 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "75%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="bg-gradient-to-r from-blue-400 via-pink-400 to-rose-500 h-2 rounded-full shadow-sm shadow-blue-300/50"
                  />
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {[
                  { id: "tutor", label: "AI Tutor", icon: MessageCircle },
                  { id: "summary", label: "Course Summary", icon: BookOpen },
                  { id: "history", label: "History", icon: History },
                ].map(({ id, label, icon: Icon }) => (
                  <motion.button
                    key={id}
                    whileHover={{ x: 4 }}
                    onClick={() => {
                      setActiveTab(id as any)
                      setSidebarOpen(false)
                    }}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                      activeTab === id
                        ? "bg-gradient-to-r from-blue-100/60 via-pink-100/60 to-rose-100/60 border border-blue-300/50 shadow-lg shadow-blue-200/30 text-gray-800"
                        : "hover:bg-blue-50/40 text-gray-700"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {label}
                  </motion.button>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        {/* Top Bar */}
        <div className="sticky top-0 bg-white/80 backdrop-blur-xl border-b border-blue-200/30 p-4 z-40 shadow-sm shadow-blue-200/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/")}
                className="p-2 hover:bg-blue-100/60 rounded-lg transition-all duration-200 border border-blue-300/30 hover:border-blue-400/50 text-gray-700"
              >
                <ArrowLeft className="w-5 h-5" />
              </motion.button>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden p-2 hover:bg-blue-100/60 rounded-lg text-gray-700"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-800">Good morning, Alex! 🌟</h1>
                <p className="text-sm text-gray-600">Ready to learn something amazing today?</p>
              </div>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search anything..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white/60 border border-blue-300/40 rounded-lg focus:outline-none focus:border-blue-400 focus:shadow-lg focus:shadow-blue-300/30 w-64 text-gray-800"
              />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 pb-24">
          <AnimatePresence mode="wait">
            {activeTab === "tutor" && (
              <motion.div
                key="tutor"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="w-6 h-6 text-blue-500" />
                  <h2 className="text-2xl font-bold text-gray-800">AI Tutor Chat</h2>
                </div>

                {/* Chat Messages */}
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.isUser
                            ? "bg-gradient-to-r from-blue-400 via-pink-400 to-rose-500 text-white shadow-lg shadow-blue-300/40"
                            : "bg-white/70 backdrop-blur-sm border border-blue-300/40 text-gray-800 shadow-lg shadow-blue-200/30"
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        {message.resources && (
                          <div className="mt-3 space-y-2">
                            {message.resources.map((resource, index) => (
                              <ResourceCard key={index} resource={resource} />
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                      <div className="bg-white/70 backdrop-blur-sm border border-blue-300/40 px-4 py-2 rounded-lg">
                        <div className="flex space-x-1">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: i * 0.2 }}
                              className="w-2 h-2 bg-blue-400 rounded-full"
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Chat Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Ask me anything about your studies..."
                    className="flex-1 px-4 py-3 bg-white/60 border border-blue-300/40 rounded-lg focus:outline-none focus:border-blue-400 focus:shadow-lg focus:shadow-blue-300/30 text-gray-800"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSendMessage}
                    className="px-6 py-3 bg-gradient-to-r from-blue-400 via-pink-400 to-rose-500 rounded-lg hover:shadow-lg hover:shadow-blue-300/40 transition-all duration-200 text-white"
                  >
                    <Send className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {activeTab === "summary" && (
              <motion.div
                key="summary"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-2 mb-6">
                  <BookOpen className="w-6 h-6 text-gray-600" />
                  <h2 className="text-2xl font-bold text-gray-800">Course Summarizer</h2>
                </div>

                {/* Input Area */}
                <div className="space-y-4">
                  <textarea
                    value={courseText}
                    onChange={(e) => setCourseText(e.target.value)}
                    placeholder="Paste your course material, notes, or text here to get an AI-powered summary..."
                    className="w-full h-32 px-4 py-3 bg-white/60 border border-blue-300/40 rounded-lg focus:outline-none focus:border-blue-400 focus:shadow-lg focus:shadow-blue-300/30 resize-none text-gray-800"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={generateCourseSummary}
                    className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-700 rounded-lg hover:shadow-lg hover:shadow-gray-400/30 transition-all duration-200 text-white"
                  >
                    Generate Summary
                  </motion.button>
                </div>

                {/* Summaries */}
                <div className="space-y-4">
                  {courseSummaries.map((summary) => (
                    <motion.div
                      key={summary.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white/70 backdrop-blur-sm border border-blue-300/40 rounded-lg p-6 shadow-lg shadow-blue-200/30"
                    >
                      <h3 className="text-lg font-semibold mb-4 text-gray-800">{summary.title}</h3>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-pink-600 mb-2">Key Points</h4>
                          <ul className="space-y-1 text-sm text-gray-700">
                            {summary.keyPoints.map((point, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="text-pink-500 mt-1">•</span>
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-600 mb-2">Examples</h4>
                          <ul className="space-y-1 text-sm text-gray-700">
                            {summary.examples.map((example, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="text-gray-500 mt-1">•</span>
                                {example}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-medium text-rose-600 mb-2">Quiz Questions</h4>
                          <ul className="space-y-1 text-sm text-gray-700">
                            {summary.quiz.map((question, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="text-rose-500 mt-1">{index + 1}.</span>
                                {question}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "history" && (
              <motion.div
                key="history"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2 mb-6">
                  <History className="w-6 h-6 text-gray-600" />
                  <h2 className="text-2xl font-bold text-gray-800">Learning History</h2>
                </div>

                <div className="space-y-4">
                  {chatHistory.map((chat) => (
                    <motion.div
                      key={chat.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white/70 backdrop-blur-sm border border-blue-300/40 rounded-lg p-4 shadow-lg shadow-blue-200/30"
                    >
                      <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => setExpandedHistory(expandedHistory === chat.id ? null : chat.id)}
                      >
                        <div>
                          <h3 className="font-medium text-gray-800">{chat.title}</h3>
                          <p className="text-sm text-gray-600">{chat.timestamp.toLocaleDateString()}</p>
                        </div>
                        {expandedHistory === chat.id ? (
                          <ChevronUp className="w-5 h-5 text-gray-600" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-600" />
                        )}
                      </div>

                      <AnimatePresence>
                        {expandedHistory === chat.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mt-4 space-y-2 overflow-hidden"
                          >
                            {chat.messages.map((message) => (
                              <div
                                key={message.id}
                                className={`text-sm ${message.isUser ? "text-pink-600" : "text-gray-700"}`}
                              >
                                <strong>{message.isUser ? "You" : "AI"}:</strong> {message.text}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}

                  {chatHistory.length === 0 && (
                    <div className="text-center py-12 text-gray-600">
                      <History className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <p>No chat history yet. Start a conversation with the AI Tutor!</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-blue-200/30 p-4 md:hidden shadow-lg shadow-blue-200/20">
        <div className="flex justify-around">
          {[
            { id: "history", label: "History", icon: History },
            { id: "summary", label: "Summary", icon: BookOpen },
            { id: "tutor", label: "AI Tutor", icon: MessageCircle },
          ].map(({ id, label, icon: Icon }) => (
            <motion.button
              key={id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(id as any)}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200 ${
                activeTab === id ? "text-pink-500" : "text-gray-500"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs">{label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}
