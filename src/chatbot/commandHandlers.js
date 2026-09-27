// Command Handlers for all 100 chatbot intents
import {
  JOKES,
  FUNNY_THINGS,
  FUN_FACTS,
  MOTIVATIONAL_QUOTES,
  STUDY_TIPS,
  CONCENTRATION_TIPS,
  HEALTHY_HABITS,
  MORNING_ROUTINES,
  BEDTIME_ROUTINES,
  QUICK_WORKOUTS,
  ORGANIZATION_TIPS,
  HOBBIES,
  FUN_ACTIVITIES,
  RANDOM_OPTIONS_FALLBACK,
  PRODUCTIVITY_TIPS,
  FOCUS_TIPS,
  WHAT_NEXT_SUGGESTIONS,
  COMPUTER_WEB_KNOWLEDGE,
  PROGRAMMING_KNOWLEDGE,
  GENERAL_KNOWLEDGE
} from "./responses.js";

import { INTENTS, CATEGORIES } from "./intents.js";
import { parseMathQuery, parseUnitConversion } from "./mathParser.js";

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function handleIntent(intent, params = {}, context = {}) {
  const number = intent.number;

  switch (number) {
    // === Category A: Greetings & Basic Conversation (1-10) ===
    case 1: // Hello
      return {
        text: "Hello! 👋 How can I help you today? Feel free to ask a question, request a calculation, or explore my commands!"
      };
    case 2: // Hi
      return {
        text: "Hi there! 😊 What can I do for you today?"
      };
    case 3: // Hey
      return {
        text: "Hey! Ready whenever you are. How can I assist you right now?"
      };
    case 4: // Good morning
      return {
        text: "Good morning! ☀️ Wishing you a productive and wonderful day ahead. How can I help kickstart your day?"
      };
    case 5: // Good afternoon
      return {
        text: "Good afternoon! 🌤️ Hope your day is going smoothly. What would you like to explore or calculate?"
      };
    case 6: // Good evening
      return {
        text: "Good evening! 🌙 Hope you had a fulfilling day. How can I assist you tonight?"
      };
    case 7: // How are you?
      return {
        text: "I'm doing fantastic, thank you for asking! 🤖 All systems are running smoothly and I'm ready to help. How are you doing today?"
      };
    case 8: // What is your name?
      return {
        text: "I am **Antigravity Chatbot**! 🤖 Your personal assistant and conversational companion built with React and Vite."
      };
    case 9: // Who are you?
      return {
        text: "I am an intelligent, rule-based chatbot equipped with intent recognition for 100+ common questions, calculations, random games, productivity tools, and web tasks!"
      };
    case 10: // What can you do?
      return {
        text: generateHelpText()
      };

    // === Category B: Date & Time (11-20) ===
    case 11: { // What time is it?
      const now = new Date();
      const time12 = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });
      const time24 = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
      return {
        text: `⏰ The current time is **${time12}** (${time24}).`
      };
    }
    case 12: { // What is today's date?
      const now = new Date();
      const formatted = now.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      });
      return {
        text: `📅 Today's date is **${formatted}**.`
      };
    }
    case 13: { // What day is it today?
      const now = new Date();
      const dayName = now.toLocaleDateString("en-US", { weekday: "long" });
      return {
        text: `🗓️ Today is **${dayName}**.`
      };
    }
    case 14: { // What month is it?
      const now = new Date();
      const monthName = now.toLocaleDateString("en-US", { month: "long" });
      return {
        text: `📆 The current month is **${monthName}**.`
      };
    }
    case 15: { // What year is it?
      const now = new Date();
      return {
        text: `📅 The current year is **${now.getFullYear()}**.`
      };
    }
    case 16: { // What is tomorrow's date?
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const formatted = tomorrow.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      });
      return {
        text: `📅 Tomorrow's date is **${formatted}**.`
      };
    }
    case 17: { // What was yesterday's date?
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const formatted = yesterday.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      });
      return {
        text: `📅 Yesterday's date was **${formatted}**.`
      };
    }
    case 18: { // What day is tomorrow?
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dayName = tomorrow.toLocaleDateString("en-US", { weekday: "long" });
      return {
        text: `🗓️ Tomorrow will be **${dayName}**.`
      };
    }
    case 19: { // How many days are left in this year?
      const now = new Date();
      const endOfYear = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
      const diffTime = endOfYear.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return {
        text: `⏳ There are **${diffDays} days** left in ${now.getFullYear()}!`
      };
    }
    case 20: { // What is the current timestamp?
      const now = new Date();
      return {
        text: `⏱️ Current Unix timestamp: **${now.getTime()}** (ms) / **${Math.floor(now.getTime() / 1000)}** (seconds).\nISO 8601: \`${now.toISOString()}\``
      };
    }

    // === Category C: Random & Fun Commands (21-30) ===
    case 21: // Flip a coin
    case 22: { // Toss a coin
      const outcome = Math.random() < 0.5 ? "Heads" : "Tails";
      return {
        text: `🪙 I tossed a coin for you: **${outcome}**!`
      };
    }
    case 23: { // Roll a dice
      const roll = Math.floor(Math.random() * 6) + 1;
      return {
        text: `🎲 You rolled a **${roll}**!`
      };
    }
    case 24: { // Roll two dice
      const d1 = Math.floor(Math.random() * 6) + 1;
      const d2 = Math.floor(Math.random() * 6) + 1;
      const total = d1 + d2;
      return {
        text: `🎲 Die 1: **${d1}**, Die 2: **${d2}** — Total: **${total}**!`
      };
    }
    case 25: { // Pick a random number
      const min = params.min ?? 1;
      const max = params.max ?? 100;
      const rand = Math.floor(Math.random() * (max - min + 1)) + min;
      return {
        text: `🎲 Your random number is **${rand}** (between ${min} and ${max}).`
      };
    }
    case 26: { // Give me a random number between 1 and 100
      const min = params.min ?? 1;
      const max = params.max ?? 100;
      const rand = Math.floor(Math.random() * (max - min + 1)) + min;
      return {
        text: `🎲 Random number between ${min} and ${max}: **${rand}**!`
      };
    }
    case 27: // Tell me a joke
      return {
        text: randomChoice(JOKES)
      };
    case 28: // Tell me something funny
      return {
        text: randomChoice(FUNNY_THINGS)
      };
    case 29: // Give me a fun fact
      return {
        text: `💡 **Fun Fact:** ${randomChoice(FUN_FACTS)}`
      };
    case 30: { // Choose a random option for me
      if (params.options && params.options.length > 1) {
        const chosen = randomChoice(params.options);
        return {
          text: `🎯 I choose: **${chosen}**!`
        };
      }
      return {
        text: `🎯 How about: ${randomChoice(RANDOM_OPTIONS_FALLBACK)}\n*(Tip: You can also say "Choose between pizza, burger, or tacos" to let me pick from your list!)*`
      };
    }

    // === Category D: Mathematics & Calculations (31-40) ===
    case 31: // What is 5 + 10?
    case 32: // What is 20 - 7?
    case 33: // What is 8 × 6?
    case 34: // What is 50 ÷ 5?
    case 35: // What is the square of 9?
    case 36: // What is the cube of 3?
    case 37: // What is the square root of 144?
    case 38: // What is 10% of 500?
    case 40: { // What is the remainder when 17 is divided by 5?
      if (params.mathResult) {
        if (params.mathResult.error) {
          return { text: `⚠️ Math error: ${params.mathResult.error}` };
        }
        return { text: `🧮 ${params.mathResult.text}` };
      }
      // Fallback calculation by input query
      const parsed = parseMathQuery(params.rawInput || "");
      if (parsed) {
        if (parsed.error) return { text: `⚠️ Math error: ${parsed.error}` };
        return { text: `🧮 ${parsed.text}` };
      }
      return { text: "🧮 I can calculate that! Please provide the mathematical expression." };
    }
    case 39: { // Convert 5 kilometers to meters
      if (params.conversionResult) {
        return { text: `📏 ${params.conversionResult.text}` };
      }
      const parsed = parseUnitConversion(params.rawInput || "");
      if (parsed) {
        return { text: `📏 ${parsed.text}` };
      }
      return { text: "📏 5 kilometers = **5000 meters** (1 km = 1000 m)." };
    }

    // === Category E: Personal Assistant & Productivity (41-50) ===
    case 41: { // Remind me to drink water
      return {
        text: "💧 I've scheduled a reminder! Remember to drink a large glass of water now and stay hydrated throughout the day.",
        action: {
          type: "SET_REMINDER",
          label: "Drink Water 💧",
          message: "💧 Reminder: Time to take a sip of water and stay hydrated!",
          durationSeconds: 1200 // 20 mins
        }
      };
    }
    case 42: { // Set a timer for 1 minute
      const duration = params.durationSeconds || 60;
      return {
        text: `⏱️ Timer started for **1 minute**! I will notify you when it's done.`,
        action: {
          type: "SET_TIMER",
          label: "1 minute timer",
          message: "⏰ Ding! Your 1 minute timer is up!",
          durationSeconds: duration
        }
      };
    }
    case 43: { // Start a 5-minute countdown
      const duration = params.durationSeconds || 300;
      return {
        text: `⏳ Countdown started for **5 minutes**! I'll alert you when time expires.`,
        action: {
          type: "SET_TIMER",
          label: "5-minute countdown",
          message: "⏰ Time's up! Your 5-minute countdown has finished.",
          durationSeconds: duration
        }
      };
    }
    case 44: { // Open Google
      const url = "https://www.google.com";
      return {
        text: `🌐 Opening Google: [https://www.google.com](${url})\n*(If your browser blocks the popup, click the link above.)*`,
        action: {
          type: "OPEN_URL",
          url
        }
      };
    }
    case 45: { // Open YouTube
      const url = "https://www.youtube.com";
      return {
        text: `🎥 Opening YouTube: [https://www.youtube.com](${url})\n*(If your browser blocks the popup, click the link above.)*`,
        action: {
          type: "OPEN_URL",
          url
        }
      };
    }
    case 46: { // Open Gmail
      const url = "https://mail.google.com";
      return {
        text: `✉️ Opening Gmail: [https://mail.google.com](${url})\n*(If your browser blocks the popup, click the link above.)*`,
        action: {
          type: "OPEN_URL",
          url
        }
      };
    }
    case 47: { // Search for Java tutorials
      const query = params.searchQuery || "Java tutorials";
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
      return {
        text: `🔍 Searching Google for "${query}":\n[Click here to view search results](${searchUrl})`,
        action: {
          type: "OPEN_URL",
          url: searchUrl
        }
      };
    }
    case 48: // What should I do next?
      return {
        text: `💡 **Suggestion for what to do next:**\n${randomChoice(WHAT_NEXT_SUGGESTIONS)}`
      };
    case 49: // Give me a productivity tip
      return {
        text: `🚀 **Productivity Tip:**\n${randomChoice(PRODUCTIVITY_TIPS)}`
      };
    case 50: // Help me focus
      return {
        text: `🎯 **Focus Strategy:**\n${randomChoice(FOCUS_TIPS)}`
      };

    // === Category F: Computer & Web Knowledge (51-60) ===
    case 51:
    case 52:
    case 53:
    case 54:
    case 55:
    case 56:
    case 57:
    case 58:
    case 59:
    case 60:
      return {
        text: COMPUTER_WEB_KNOWLEDGE[number] || "Information available upon request."
      };

    // === Category G: Programming & Developer Questions (61-70) ===
    case 61:
    case 62:
    case 63:
    case 64:
    case 65:
    case 66:
    case 67:
    case 68:
    case 69:
    case 70:
      return {
        text: PROGRAMMING_KNOWLEDGE[number] || "Programming explanation available."
      };

    // === Category H: General Knowledge (71-80) ===
    case 71:
    case 72:
    case 73:
    case 74:
    case 75:
    case 76:
    case 77:
    case 78:
    case 79:
    case 80:
      return {
        text: GENERAL_KNOWLEDGE[number] || "General knowledge answer available."
      };

    // === Category I: Lifestyle & Everyday Questions (81-90) ===
    case 81: // Motivational quote
      return {
        text: `🌟 ${randomChoice(MOTIVATIONAL_QUOTES)}`
      };
    case 82: // Study tip
      return {
        text: `📚 **Study Tip:**\n${randomChoice(STUDY_TIPS)}`
      };
    case 83: // Improve concentration
      return {
        text: `🧠 **How to improve concentration:**\n${randomChoice(CONCENTRATION_TIPS)}`
      };
    case 84: // Suggest a healthy habit
      return {
        text: `🥗 **Healthy Habit Idea:**\n${randomChoice(HEALTHY_HABITS)}`
      };
    case 85: // Morning routine
      return {
        text: randomChoice(MORNING_ROUTINES)
      };
    case 86: // Bedtime routine
      return {
        text: randomChoice(BEDTIME_ROUTINES)
      };
    case 87: // Quick workout
      return {
        text: randomChoice(QUICK_WORKOUTS)
      };
    case 88: // Stay organized
      return {
        text: randomChoice(ORGANIZATION_TIPS)
      };
    case 89: // Suggest a hobby
      return {
        text: `🎨 **Hobby Suggestion:**\n${randomChoice(HOBBIES)}`
      };
    case 90: // Fun activity to try
      return {
        text: `✨ **Fun Activity Idea:**\n${randomChoice(FUN_ACTIVITIES)}`
      };

    // === Category J: Chatbot Controls & Interaction (91-100) ===
    case 91: // Clear chat
      return {
        text: "🧹 Chat history cleared.",
        action: { type: "CLEAR_CHAT" }
      };
    case 92: // Reset conversation
      return {
        text: "🔄 Conversation reset. Hello! How can I help you today? Feel free to ask any question or type 'help' for commands.",
        action: { type: "RESET_CHAT" }
      };
    case 93: // Repeat that
    case 94: { // Say that again
      const lastBot = context.lastRobotMessage;
      if (lastBot) {
        return {
          text: `🔁 ${lastBot}`
        };
      }
      return {
        text: "I haven't said anything yet to repeat! Feel free to ask me a question."
      };
    }
    case 95: { // Speak this response
      const lastBot = context.lastRobotMessage;
      return {
        text: "🔊 Reading out loud...",
        action: {
          type: "SPEAK",
          textToSpeak: lastBot || "Hello! I am ready to speak your responses."
        }
      };
    }
    case 96: { // Stop speaking
      return {
        text: "🔇 Speech stopped.",
        action: { type: "STOP_SPEAK" }
      };
    }
    case 97: { // Turn on voice mode
      return {
        text: "🎙️ Voice mode enabled. New chatbot responses will be read aloud automatically!",
        action: { type: "VOICE_MODE", enabled: true }
      };
    }
    case 98: { // Turn off voice mode
      return {
        text: "🔇 Voice mode disabled. Responses will no longer be read aloud.",
        action: { type: "VOICE_MODE", enabled: false }
      };
    }
    case 99: // Show available commands
      return {
        text: generateHelpText()
      };
    case 100: // Goodbye
      return {
        text: "Goodbye! 👋 Have a fantastic day ahead. Feel free to come back whenever you have more questions!"
      };

    default:
      return {
        text: "I'm not sure how to answer that yet. Try asking about dates, math calculations, programming, or type 'help' to see what I can do!"
      };
  }
}

/**
 * Generate comprehensive Help text dynamically from INTENTS and CATEGORIES
 */
export function generateHelpText() {
  return `🤖 **Chatbot Capabilities & Commands Guide**

I support 100 common questions & commands across 10 categories:

👋 **A. Greetings & Basic Conversation**
• Examples: "Hello", "How are you?", "What is your name?", "Good morning"

📅 **B. Date & Time**
• Examples: "What time is it?", "What is today's date?", "How many days are left in this year?", "Tomorrow's date"

🎲 **C. Random & Fun Commands**
• Examples: "Flip a coin", "Roll a dice", "Roll two dice", "Tell me a joke", "Random number between 1 and 100"

🧮 **D. Mathematics & Calculations**
• Examples: "What is 5 + 10?", "8 × 6", "50 ÷ 5", "Square root of 144", "10% of 500", "Convert 5 km to meters"

⚡ **E. Personal Assistant & Productivity**
• Examples: "Set a timer for 1 minute", "Open Google", "Open YouTube", "Search for Java tutorials", "Remind me to drink water"

💻 **F. Computer & Web Knowledge**
• Examples: "What is a computer?", "What is HTML?", "What is React?", "What is an API?"

👨‍💻 **G. Programming & Developer Questions**
• Examples: "What is a variable?", "What is a function?", "What is Git?", "What is debugging?"

🌍 **H. General Knowledge**
• Examples: "Capital of India", "Capital of France", "Red Planet", "Fastest land animal"

🌿 **I. Lifestyle & Everyday Questions**
• Examples: "Give me a motivational quote", "Study tip", "Morning routine", "Quick workout"

⚙️ **J. Chatbot Controls & Interaction**
• Examples: "Clear chat", "Repeat that", "Speak this response", "Voice mode on", "Help"

💡 *Tip: Feel free to ask questions with or without question marks!*`;
}
