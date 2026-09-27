// Central Chatbot Engine: coordinates normalization, intent detection, handlers, and actions
import { matchIntent, normalizeInput } from "./intentMatcher.js";
import { handleIntent, generateHelpText } from "./commandHandlers.js";
import { getAllIntents } from "./intents.js";

/**
 * Synchronous core message processor
 * @param {string} userMessage - Raw message from user
 * @param {object} context - Context object (e.g. { lastRobotMessage, voiceMode, ... })
 * @returns {object} { text, action, intent, confidence, fallback }
 */
export function processUserMessage(userMessage, context = {}) {
  if (!userMessage || typeof userMessage !== "string" || !userMessage.trim()) {
    return {
      text: "Sorry, it looks like your message is empty. Please send a message and I will give you a response! 😊",
      fallback: true
    };
  }

  const match = matchIntent(userMessage, context);

  if (!match.intent) {
    return {
      text: match.text || "I'm not sure how to answer that yet. Try asking me about dates, calculations, programming, or general knowledge. Type 'help' to see available features.",
      confidence: match.confidence,
      fallback: true,
      action: null
    };
  }

  const response = handleIntent(match.intent, match.params, context);

  return {
    text: response.text,
    action: response.action || null,
    intent: match.intent,
    confidence: match.confidence,
    fallback: false
  };
}

/**
 * Asynchronous core message processor
 * Simulates a realistic short thinking delay (unless in test environment)
 */
export async function processUserMessageAsync(userMessage, context = {}, delayMs = 300) {
  if (typeof globalThis.process !== "undefined" && globalThis.process.env && globalThis.process.env.NODE_ENV === "test") {
    delayMs = 0;
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      const result = processUserMessage(userMessage, context);
      resolve(result);
    }, delayMs);
  });
}

/**
 * Backwards compatible Chatbot object (drop-in replacement for supersimpledev Chatbot)
 */
export const Chatbot = {
  getResponse: function (message, context = {}) {
    const result = processUserMessage(message, context);
    return result.text;
  },

  getResponseAsync: function (message, context = {}) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.getResponse(message, context));
      }, 400);
    });
  },

  process: processUserMessage,
  processAsync: processUserMessageAsync,
  getAllIntents,
  getHelpText: generateHelpText,
  normalizeInput
};

export default Chatbot;
