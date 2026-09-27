// Intent Matcher: input normalization, multi-tier intent recognition, and parameter extraction
import { INTENTS, getIntentByNumber } from "./intents.js";
import { parseMathQuery, parseUnitConversion } from "./mathParser.js";

const CONTRACTIONS = {
  "what's": "what is",
  "whats": "what is",
  "who's": "who is",
  "whos": "who is",
  "how's": "how is",
  "hows": "how is",
  "where's": "where is",
  "wheres": "where is",
  "it's": "it is",
  "its": "it is",
  "that's": "that is",
  "thats": "that is",
  "there's": "there is",
  "theres": "there is",
  "can't": "cannot",
  "cant": "cannot",
  "won't": "will not",
  "wont": "will not",
  "don't": "do not",
  "dont": "do not",
  "i'm": "i am",
  "im": "i am",
  "let's": "let us",
  "lets": "let us",
  "you're": "you are",
  "youre": "you are",
  "i've": "i have",
  "ive": "i have",
  "we're": "we are",
  "were": "we are",
  "they're": "they are",
  "theyre": "they are",
  "didn't": "did not",
  "didnt": "did not",
  "doesn't": "does not",
  "doesnt": "does not",
  "wouldn't": "would not",
  "couldn't": "could not",
  "shouldn't": "should not",
  "haven't": "have not",
  "hasn't": "has not"
};

/**
 * Normalizes input:
 * 1. Lowercase
 * 2. Expand contractions
 * 3. Remove punctuation except meaningful math operators
 * 4. Collapse whitespace
 */
export function normalizeInput(input) {
  if (!input || typeof input !== "string") return "";

  let text = input.toLowerCase().trim();

  // Expand contractions
  // First handle words with apostrophes
  text = text.replace(/([a-z]+)'([a-z]+)/gi, (match) => {
    const lower = match.toLowerCase();
    return CONTRACTIONS[lower] || lower.replace("'", "");
  });

  // Handle common contraction tokens without apostrophe when isolated
  const words = text.split(/\s+/).map((w) => {
    return CONTRACTIONS[w] || w;
  });
  text = words.join(" ");

  // Remove punctuation, but keep math symbols: +, -, *, /, %, ^, ×, ÷ and digits/letters
  text = text.replace(/[^a-z0-9\s+\-*/%^×÷.]/gi, " ");

  // Remove standalone dots or trailing periods that are not decimals
  text = text.replace(/(?<!\d)\.|\.(?!\d)/g, " ");

  // Collapse multiple spaces
  text = text.replace(/\s+/g, " ").trim();

  return text;
}

/**
 * Compute Dice Bigram Similarity between two strings (0 to 1)
 */
export function computeBigramSimilarity(str1, str2) {
  const s1 = str1.replace(/\s+/g, "");
  const s2 = str2.replace(/\s+/g, "");
  if (s1 === s2) return 1.0;
  if (s1.length < 2 || s2.length < 2) return 0.0;

  const bigrams1 = new Map();
  for (let i = 0; i < s1.length - 1; i++) {
    const bg = s1.substring(i, i + 2);
    bigrams1.set(bg, (bigrams1.get(bg) || 0) + 1);
  }

  let intersection = 0;
  for (let i = 0; i < s2.length - 1; i++) {
    const bg = s2.substring(i, i + 2);
    const count = bigrams1.get(bg) || 0;
    if (count > 0) {
      bigrams1.set(bg, count - 1);
      intersection++;
    }
  }

  return (2.0 * intersection) / (s1.length + s2.length - 2);
}

/**
 * Compute word-level Jaccard similarity
 */
export function computeTokenOverlap(str1, str2) {
  const t1 = new Set(str1.split(/\s+/));
  const t2 = new Set(str2.split(/\s+/));
  if (t1.size === 0 || t2.size === 0) return 0.0;

  let intersection = 0;
  for (const token of t1) {
    if (t2.has(token)) intersection++;
  }

  const union = new Set([...t1, ...t2]).size;
  return intersection / union;
}

/**
 * Combined confidence score
 */
function calculateConfidence(inputNorm, targetNorm) {
  if (inputNorm === targetNorm) return 1.0;
  const bigram = computeBigramSimilarity(inputNorm, targetNorm);
  const token = computeTokenOverlap(inputNorm, targetNorm);
  return 0.5 * bigram + 0.5 * token;
}

/**
 * Main intent detection function
 */
export function matchIntent(rawInput) {
  if (!rawInput || typeof rawInput !== "string" || !rawInput.trim()) {
    return {
      intent: null,
      confidence: 0,
      params: {},
      fallback: true,
      text: "Please send a message and I'll be happy to assist you!"
    };
  }

  const normalized = normalizeInput(rawInput);

  // === TIER 1: Specialized Pattern Matchers with Parameter Extraction ===

  // 1. Dynamic Web Search: e.g. "search for Java tutorials", "search Python in google"
  const searchMatch = rawInput.match(/(?:search\s+for|search\s+the\s+web\s+for|google|look\s+up|find)\s+(.+?)(?:\s+on\s+google|\s+in\s+google|[?!.]|$)/i);
  if (searchMatch && !normalized.includes("open google") && !normalized.includes("open gmail")) {
    const query = searchMatch[1].trim();
    if (query.length > 0) {
      const isJavaTutorials = /java\s+tutorials?/i.test(query);
      return {
        intent: getIntentByNumber(47), // Intent 47: Search for Java tutorials
        confidence: 0.98,
        params: {
          searchQuery: query,
          isJavaTutorials
        }
      };
    }
  }

  // 2. Dynamic Timers and Countdowns: e.g. "set a timer for 1 minute", "start a 5-minute countdown"
  const timerMatch = rawInput.match(/(?:set\s+(?:a\s+)?timer\s+for|timer\s+for|start\s+(?:a\s+)?(?:countdown\s+for|timer\s+for)|countdown\s+for|start\s+(?:a\s+)?)([\d.]+)\s*(minutes?|mins?|seconds?|secs?)(?:\s+countdown|\s+timer)?/i);
  if (timerMatch) {
    const amount = parseFloat(timerMatch[1]);
    const unit = timerMatch[2].toLowerCase();
    const isSeconds = unit.startsWith("s");
    const seconds = isSeconds ? amount : amount * 60;

    if (Math.round(seconds) === 60) {
      return {
        intent: getIntentByNumber(42), // Intent 42: Set a timer for 1 minute
        confidence: 0.98,
        params: { durationSeconds: seconds }
      };
    } else if (Math.round(seconds) === 300) {
      return {
        intent: getIntentByNumber(43), // Intent 43: Start a 5-minute countdown
        confidence: 0.98,
        params: { durationSeconds: seconds }
      };
    } else {
      // Dynamic timer mapping to Intent 42
      return {
        intent: getIntentByNumber(42),
        confidence: 0.95,
        params: { durationSeconds: seconds }
      };
    }
  }

  // 3. Dynamic Unit Conversions: e.g. "convert 5 kilometers to meters", "5 km to m"
  const unitResult = parseUnitConversion(rawInput);
  if (unitResult) {
    return {
      intent: getIntentByNumber(39), // Intent 39: Convert 5 km to meters
      confidence: 0.95,
      params: {
        rawInput,
        conversionResult: unitResult
      }
    };
  }

  // 4. Dynamic Math Queries: e.g. "what is 5 + 10", "calculate 20 - 7", "what is 8 × 6", "10% of 500"
  const mathResult = parseMathQuery(rawInput);
  if (mathResult) {
    let matchedIntentNumber = 31; // default addition
    if (mathResult.type === "percentage") {
      matchedIntentNumber = 38; // Intent 38: 10% of 500
    } else if (mathResult.type === "sqrt") {
      matchedIntentNumber = 37; // Intent 37: square root of 144
    } else if (mathResult.type === "square") {
      matchedIntentNumber = 35; // Intent 35: square of 9
    } else if (mathResult.type === "cube") {
      matchedIntentNumber = 36; // Intent 36: cube of 3
    } else if (mathResult.type === "modulo") {
      matchedIntentNumber = 40; // Intent 40: remainder when 17 is divided by 5
    } else if (mathResult.type === "addition") {
      matchedIntentNumber = 31; // Intent 31: 5 + 10
    } else if (mathResult.type === "subtraction") {
      matchedIntentNumber = 32; // Intent 32: 20 - 7
    } else if (mathResult.type === "multiplication") {
      matchedIntentNumber = 33; // Intent 33: 8 × 6
    } else if (mathResult.type === "division") {
      matchedIntentNumber = 34; // Intent 34: 50 ÷ 5
    } else if (mathResult.type === "arithmetic") {
      if (mathResult.expression.includes("+")) matchedIntentNumber = 31;
      else if (mathResult.expression.includes("-")) matchedIntentNumber = 32;
      else if (mathResult.expression.includes("*")) matchedIntentNumber = 33;
      else if (mathResult.expression.includes("/")) matchedIntentNumber = 34;
      else if (mathResult.expression.includes("%")) matchedIntentNumber = 40;
    }

    return {
      intent: getIntentByNumber(matchedIntentNumber),
      confidence: 0.96,
      params: {
        rawInput,
        mathResult
      }
    };
  }

  // 5. Random number with custom range: e.g. "random number between 1 and 100", "random number between 5 and 50"
  const rangeMatch = normalized.match(/(?:random\s+number|number)\s+(?:between|from)\s+(\d+)\s+(?:and|to)\s+(\d+)/i);
  if (rangeMatch) {
    const min = parseInt(rangeMatch[1], 10);
    const max = parseInt(rangeMatch[2], 10);
    return {
      intent: getIntentByNumber(26), // Intent 26: random number between 1 and 100
      confidence: 0.98,
      params: { min: Math.min(min, max), max: Math.max(min, max) }
    };
  }

  // 6. Roll two dice explicitly:
  if (/roll\s+(?:2|two)\s+dice|roll\s+a\s+pair\s+of\s+dice|toss\s+two\s+dice/i.test(normalized)) {
    return {
      intent: getIntentByNumber(24), // Intent 24: Roll two dice
      confidence: 0.99,
      params: {}
    };
  }

  // 7. Choose between options: e.g. "choose between pizza, burger, or pasta"
  const chooseMatch = rawInput.match(/(?:choose|pick|select)\s+(?:between\s+|from\s+)?(.+)/i);
  if (chooseMatch && (chooseMatch[1].includes(" or ") || chooseMatch[1].includes(","))) {
    const rawOptions = chooseMatch[1]
      .split(/,\s*|\s+or\s+/i)
      .map((opt) => opt.replace(/[?.!]+$/, "").trim())
      .filter((opt) => opt.length > 0 && !["between", "either", "from"].includes(opt.toLowerCase()));

    if (rawOptions.length > 1) {
      return {
        intent: getIntentByNumber(30), // Intent 30: Choose a random option
        confidence: 0.95,
        params: { options: rawOptions }
      };
    }
  }

  // === TIER 2: Exact Normalized Match against Defined Variations ===
  for (const intent of INTENTS) {
    for (const variation of intent.variations) {
      const varNorm = normalizeInput(variation);
      if (normalized === varNorm) {
        return {
          intent,
          confidence: 1.0,
          params: { rawInput }
        };
      }
    }
  }

  // === TIER 3: High-Confidence Token / Similarity Matching ===
  let bestIntent = null;
  let bestScore = 0;
  let matchedVariation = "";

  for (const intent of INTENTS) {
    for (const variation of intent.variations) {
      const varNorm = normalizeInput(variation);
      const score = calculateConfidence(normalized, varNorm);

      if (score > bestScore) {
        bestScore = score;
        bestIntent = intent;
        matchedVariation = variation;
      }
    }
  }

  // Safety protection for potentially destructive commands (e.g. clear chat, reset)
  // Never execute destructive commands on a weak match
  if (bestIntent && (bestIntent.id === "CTRL_CLEAR_CHAT" || bestIntent.id === "CTRL_RESET_CONVERSATION")) {
    if (bestScore < 0.85) {
      bestScore = 0;
      bestIntent = null;
    }
  }

  // Acceptance threshold for general intents
  if (bestIntent && bestScore >= 0.65) {
    return {
      intent: bestIntent,
      confidence: bestScore,
      matchedVariation,
      params: { rawInput }
    };
  }

  // === TIER 4: Fallback Response for Unknown/Ambiguous Questions ===
  return {
    intent: null,
    confidence: bestScore,
    params: { rawInput },
    fallback: true,
    text: "I'm not sure how to answer that yet. Try asking me about dates, math calculations, programming, or general knowledge. Type **help** to see everything I can do!"
  };
}
