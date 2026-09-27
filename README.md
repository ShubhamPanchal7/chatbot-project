# Chatbot Web Application 🤖✨

<div align="center">

<img src="https://img.shields.io/badge/React-Frontend-blue?style=for-the-badge&logo=react" />
<img src="https://img.shields.io/badge/Vite-Build%20Tool-purple?style=for-the-badge&logo=vite" />
<img src="https://img.shields.io/badge/JavaScript-ES6-yellow?style=for-the-badge&logo=javascript" />
<img src="https://img.shields.io/badge/Responsive-UI-green?style=for-the-badge" />

<br><br>

A modern and interactive chatbot web application built using **React.js** and **Vite**.
This chatbot performs fun and utility-based commands with a smooth and responsive user interface.

</div>

---

# 🌟 Features

<table>
<tr>
<td width="50%">

### 💬 Smart Chat Interface

* Interactive chatbot conversation flow
* Smooth message rendering
* User-friendly UI experience

### 🎲 Fun Commands

* Dice Roll Simulation
* Coin Flip Generator
* Randomized outputs

</td>

<td width="50%">

### 📅 Utility Commands

* Date query support
* Dynamic responses
* Real-time interaction

### ⚡ Performance

* Fast rendering with Vite
* Responsive layout
* Lightweight frontend architecture

</td>
</tr>
</table>

---

# 🛠️ Tech Stack

<div align="center">

| Technology    | Purpose                  |
| ------------- | ------------------------ |
| ⚛️ React.js   | Frontend Library         |
| ⚡ Vite        | Development & Build Tool |
| 🎨 CSS3       | Styling                  |
| 🧠 JavaScript | Logic & Functionality    |
| 🌐 HTML5      | Structure                |

</div>

---

# 📸 Project Preview

## 💬 Conversation Flow

<p align="center">
  <img src="screenshots/chatbot-conversation.png" width="850"/>
</p>

---

## 📥 Empty Chatbox (Bottom Input)

<p align="center">
  <img src="screenshots/chatbot-empty-chatbox-bottom.png" width="850"/>
</p>

---

## 📤 Empty Chatbox (Top Input)

<p align="center">
  <img src="screenshots/chatbot-empty-chatbox-top.png" width="850"/>
</p>

---

## 🎮 Demo Commands

<p align="center">
  <img src="screenshots/chatbot-demo-commands.png" width="850"/>
</p>

---

# 🚀 Getting Started

## 📦 Clone Repository

```bash
git clone https://github.com/ShubhamPanchal7/chatbot-project.git
```

---

## 📂 Navigate to Project

```bash
cd chatbot-project
```

---

## 📥 Install Dependencies

```bash
npm install
```

---

## ▶️ Run Development Server

```bash
npm run dev
```

---

---

## 🧪 Run Tests

```bash
npm test
```

---

# 🎯 Supported Capabilities (100 Common Questions & Commands)

The chatbot now features a modular intent recognition engine supporting 100 common questions across 10 categories, each recognized with multiple natural language variations:

| Category | Description & Examples |
| -------- | ---------------------- |
| **👋 A. Greetings & Conversation** | Hello, Hi, Hey, Good morning, How are you, What is your name, Who are you, What can you do |
| **📅 B. Date & Time** | Current time, today's date, day of week, current month/year, tomorrow/yesterday, days left in year, timestamp |
| **🎲 C. Random & Fun** | Flip/toss coin, roll one/two dice, random numbers, custom ranges, jokes, funny quotes, fun facts, decision picker |
| **🧮 D. Mathematics & Calculations** | Dynamic arithmetic (+, -, ×, ÷), squares, cubes, square roots, percentages, modulos, unit conversions (no eval) |
| **⚡ E. Productivity & Assistant** | Drink water reminder, in-app countdown timers (1 min, 5 min), Google/YouTube/Gmail links, web search, productivity/focus tips |
| **💻 F. Computer & Web Knowledge** | Computer, Internet, Browser, HTML, CSS, JavaScript, React, API, Database, Artificial Intelligence |
| **👨‍💻 G. Programming & Developer** | Variables, Functions, Loops, Arrays, JS Objects, Conditionals, Bugs, Debugging, Git, GitHub |
| **🌍 H. General Knowledge** | Capitals (India, France), days/months counts, planets count, Red Planet, largest ocean, cheetah speed, hexagon sides, water formula |
| **🌿 I. Lifestyle & Everyday** | Motivational quotes, study tips, concentration strategies, healthy habits, morning/bedtime routines, 7-min workouts, hobbies |
| **⚙️ J. Chatbot Controls & Voice** | Clear chat, reset conversation, repeat response, text-to-speech reading, stop speech, voice mode toggle, help menu |

---

# 🏗️ Architecture

```
User Input ──▶ Normalization ──▶ Multi-Tier Intent Matcher ──▶ Parameter Extraction ──▶ Command Handler ──▶ Response & Actions
```

* `src/chatbot/intentMatcher.js` — Normalization (contractions, whitespace, punctuation) and multi-tier pattern/similarity matching.
* `src/chatbot/intents.js` — Definitions of all 100 intents with 5–10+ natural language variations each.
* `src/chatbot/mathParser.js` — Safe arithmetic, percentage, exponent, and unit parser without `eval()`.
* `src/chatbot/responses.js` — Predefined knowledge bases, jokes, quotes, and advice datasets.
* `src/chatbot/commandHandlers.js` — Dynamic execution for time/date, random logic, assistance tools, and help generation.
* `src/chatbot/chatbotEngine.js` — Central coordinator and backwards-compatible Chatbot API.

---

# 👨‍💻 Developer

<div align="center">

## Shubham Panchal

💻 Passionate Web Developer
🚀 Learning React, Full Stack Development & DSA

</div>

---

# ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!
