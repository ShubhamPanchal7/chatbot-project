import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { INTENTS, getAllIntents, getIntentByNumber } from "../src/chatbot/intents.js";
import { normalizeInput } from "../src/chatbot/intentMatcher.js";
import { processUserMessage, Chatbot } from "../src/chatbot/chatbotEngine.js";
import { evaluateArithmeticExpression, parseMathQuery, parseUnitConversion } from "../src/chatbot/mathParser.js";

describe("Chatbot System Tests", () => {
  it("should have exactly 100 intents defined", () => {
    const intents = getAllIntents();
    assert.equal(intents.length, 100, "Must have exactly 100 intents");
    for (let i = 1; i <= 100; i++) {
      const intent = getIntentByNumber(i);
      assert.ok(intent, `Intent #${i} must exist`);
      assert.equal(intent.number, i);
      assert.ok(
        intent.variations.length >= 5,
        `Intent #${i} (${intent.name}) must have at least 5 variations (has ${intent.variations.length})`
      );
    }
  });

  describe("Input Normalization", () => {
    it("should handle lowercase and trim", () => {
      assert.equal(normalizeInput("  HELLO WORLD  "), "hello world");
    });

    it("should expand contractions", () => {
      assert.equal(normalizeInput("what's the time"), "what is the time");
      assert.equal(normalizeInput("who's that"), "who is that");
      assert.equal(normalizeInput("don't tell me"), "do not tell me");
      assert.equal(normalizeInput("can't focus"), "cannot focus");
      assert.equal(normalizeInput("i'm ready"), "i am ready");
      assert.equal(normalizeInput("let's roll"), "let us roll");
    });

    it("should ignore punctuation like question marks while preserving math operators", () => {
      assert.equal(normalizeInput("What time is it???"), "what time is it");
      assert.equal(normalizeInput("What is 5 + 10?"), "what is 5 + 10");
      assert.equal(normalizeInput("8 * 6!"), "8 * 6");
      assert.equal(normalizeInput("10% of 500."), "10% of 500");
    });
  });

  describe("All 100 Intents - Primary Matching", () => {
    for (const intent of INTENTS) {
      it(`Intent #${intent.number}: "${intent.name}" should match properly`, () => {
        // Test the primary name
        const res = processUserMessage(intent.name);
        assert.ok(res.text, `Intent #${intent.number} response must have text`);
        assert.equal(res.fallback, false, `Intent #${intent.number} must not fall back on primary name: ${intent.name}`);
        assert.equal(res.intent.number, intent.number, `Intent #${intent.number} must match its own number`);
      });

      it(`Intent #${intent.number}: "${intent.name}" variations should match without question marks`, () => {
        // Test first 3 variations for each intent
        for (const variation of intent.variations.slice(0, 3)) {
          const cleanVar = variation.replace(/[?!.]+$/, "");
          const res = processUserMessage(cleanVar);
          assert.equal(res.fallback, false, `Variation "${cleanVar}" for intent #${intent.number} must match`);
          assert.equal(res.intent.number, intent.number, `Variation "${cleanVar}" should match intent #${intent.number}`);
        }
      });
    }
  });

  describe("Category D: Mathematical Expression Parser & Calculations", () => {
    it("should safely evaluate direct arithmetic expressions", () => {
      assert.equal(evaluateArithmeticExpression("5 + 10"), 15);
      assert.equal(evaluateArithmeticExpression("20 - 7"), 13);
      assert.equal(evaluateArithmeticExpression("8 * 6"), 48);
      assert.equal(evaluateArithmeticExpression("50 / 5"), 10);
      assert.equal(evaluateArithmeticExpression("2 + 3 * 4"), 14);
      assert.equal(evaluateArithmeticExpression("(2 + 3) * 4"), 20);
      assert.equal(evaluateArithmeticExpression("2 ^ 3"), 8);
    });

    it("should handle division by zero safely", () => {
      const res = evaluateArithmeticExpression("10 / 0");
      assert.ok(res && res.error, "Division by zero must return an error object");
    });

    it("should parse natural language math queries", () => {
      // 31: 5 + 10
      const addRes = parseMathQuery("what is 5 + 10");
      assert.ok(addRes);
      assert.equal(addRes.result, 15);

      // 32: 20 - 7
      const subRes = parseMathQuery("what is 20 - 7");
      assert.ok(subRes);
      assert.equal(subRes.result, 13);

      // 33: 8 × 6
      const mulRes = parseMathQuery("what is 8 × 6");
      assert.ok(mulRes);
      assert.equal(mulRes.result, 48);

      // 34: 50 ÷ 5
      const divRes = parseMathQuery("what is 50 ÷ 5");
      assert.ok(divRes);
      assert.equal(divRes.result, 10);

      // 35: square of 9
      const sqRes = parseMathQuery("what is the square of 9");
      assert.ok(sqRes);
      assert.equal(sqRes.result, 81);

      // 36: cube of 3
      const cubeRes = parseMathQuery("what is the cube of 3");
      assert.ok(cubeRes);
      assert.equal(cubeRes.result, 27);

      // 37: square root of 144
      const sqrtRes = parseMathQuery("what is the square root of 144");
      assert.ok(sqrtRes);
      assert.equal(sqrtRes.result, 12);

      // 38: 10% of 500
      const pctRes = parseMathQuery("what is 10% of 500");
      assert.ok(pctRes);
      assert.equal(pctRes.result, 50);

      // 40: remainder when 17 is divided by 5
      const modRes = parseMathQuery("what is the remainder when 17 is divided by 5");
      assert.ok(modRes);
      assert.equal(modRes.result, 2);
    });

    it("should parse unit conversions", () => {
      const conv = parseUnitConversion("convert 5 kilometers to meters");
      assert.ok(conv);
      assert.equal(conv.toValue, 5000);
      assert.equal(conv.toUnit, "meters");

      const convMiles = parseUnitConversion("convert 10 miles to km");
      assert.ok(convMiles);
      assert.equal(convMiles.toValue, 16.0934);
    });
  });

  describe("Category B: Date and Time Handlers", () => {
    it("should return valid time string for time queries", () => {
      const res = processUserMessage("what time is it");
      assert.equal(res.intent.id, "TIME_CURRENT");
      assert.match(res.text, /\d{1,2}:\d{2}/);
    });

    it("should return valid date string for today", () => {
      const res = processUserMessage("what is today's date");
      assert.equal(res.intent.id, "DATE_TODAY");
      const currentYear = new Date().getFullYear().toString();
      assert.ok(res.text.includes(currentYear));
    });

    it("should calculate remaining days in year", () => {
      const res = processUserMessage("how many days are left in this year");
      assert.equal(res.intent.id, "DATE_DAYS_LEFT_IN_YEAR");
      assert.match(res.text, /\d+\s+days/);
    });
  });

  describe("Category C: Random & Fun Handlers", () => {
    it("should flip coin with Heads or Tails", () => {
      const res = processUserMessage("flip a coin");
      assert.ok(res.text.includes("Heads") || res.text.includes("Tails"));
    });

    it("should roll one die between 1 and 6", () => {
      for (let i = 0; i < 20; i++) {
        const res = processUserMessage("roll a dice");
        const match = res.text.match(/\*\*(\d)\*\*/);
        assert.ok(match);
        const val = parseInt(match[1], 10);
        assert.ok(val >= 1 && val <= 6);
      }
    });

    it("should roll two dice between 2 and 12", () => {
      const res = processUserMessage("roll two dice");
      assert.ok(res.text.includes("Die 1:"));
      assert.ok(res.text.includes("Die 2:"));
      assert.ok(res.text.includes("Total:"));
    });

    it("should pick a random number in specified range", () => {
      const res = processUserMessage("give me a random number between 10 and 20");
      assert.equal(res.intent.number, 26);
      const match = res.text.match(/\*\*(\d+)\*\*/);
      assert.ok(match);
      const num = parseInt(match[1], 10);
      assert.ok(num >= 10 && num <= 20);
    });
  });

  describe("Category E: Personal Assistant & Productivity", () => {
    it("should return timer action for 1 minute timer", () => {
      const res = processUserMessage("set a timer for 1 minute");
      assert.equal(res.intent.id, "ASST_TIMER_1_MIN");
      assert.ok(res.action);
      assert.equal(res.action.type, "SET_TIMER");
      assert.equal(res.action.durationSeconds, 60);
    });

    it("should return timer action for 5-minute countdown", () => {
      const res = processUserMessage("start a 5-minute countdown");
      assert.equal(res.intent.id, "ASST_COUNTDOWN_5_MIN");
      assert.ok(res.action);
      assert.equal(res.action.type, "SET_TIMER");
      assert.equal(res.action.durationSeconds, 300);
    });

    it("should return open URL action for Google", () => {
      const res = processUserMessage("open google");
      assert.equal(res.intent.id, "ASST_OPEN_GOOGLE");
      assert.equal(res.action.type, "OPEN_URL");
      assert.equal(res.action.url, "https://www.google.com");
    });

    it("should return open URL action for YouTube", () => {
      const res = processUserMessage("open youtube");
      assert.equal(res.intent.id, "ASST_OPEN_YOUTUBE");
      assert.equal(res.action.type, "OPEN_URL");
      assert.equal(res.action.url, "https://www.youtube.com");
    });

    it("should return search action for Java tutorials", () => {
      const res = processUserMessage("search for java tutorials");
      assert.equal(res.intent.id, "ASST_SEARCH_JAVA");
      assert.equal(res.action.type, "OPEN_URL");
      assert.ok(res.action.url.includes("Java+tutorials") || res.action.url.includes("java"));
    });
  });

  describe("Category J: Controls & Voice Actions", () => {
    it("should return CLEAR_CHAT action on explicit clear", () => {
      const res = processUserMessage("clear chat");
      assert.equal(res.intent.id, "CTRL_CLEAR_CHAT");
      assert.equal(res.action.type, "CLEAR_CHAT");
    });

    it("should return RESET_CHAT action on explicit reset", () => {
      const res = processUserMessage("reset conversation");
      assert.equal(res.intent.id, "CTRL_RESET_CONVERSATION");
      assert.equal(res.action.type, "RESET_CHAT");
    });

    it("should repeat last robot message", () => {
      const res = processUserMessage("repeat that", { lastRobotMessage: "Previous Bot Note" });
      assert.equal(res.intent.id, "CTRL_REPEAT_THAT");
      assert.ok(res.text.includes("Previous Bot Note"));
    });

    it("should trigger speak action", () => {
      const res = processUserMessage("speak this response", { lastRobotMessage: "Speaking text" });
      assert.equal(res.intent.id, "CTRL_SPEAK_RESPONSE");
      assert.equal(res.action.type, "SPEAK");
    });

    it("should trigger stop speak action", () => {
      const res = processUserMessage("stop speaking");
      assert.equal(res.intent.id, "CTRL_STOP_SPEAKING");
      assert.equal(res.action.type, "STOP_SPEAK");
    });

    it("should toggle voice mode on and off", () => {
      const onRes = processUserMessage("turn on voice mode");
      assert.equal(onRes.action.type, "VOICE_MODE");
      assert.equal(onRes.action.enabled, true);

      const offRes = processUserMessage("turn off voice mode");
      assert.equal(offRes.action.type, "VOICE_MODE");
      assert.equal(offRes.action.enabled, false);
    });

    it("should show comprehensive help menu", () => {
      const res = processUserMessage("show available commands");
      assert.equal(res.intent.id, "CTRL_SHOW_COMMANDS");
      assert.ok(res.text.includes("Greetings & Basic Conversation"));
      assert.ok(res.text.includes("Chatbot Controls & Interaction"));
    });
  });

  describe("Unknown Questions Fallback", () => {
    it("should handle completely unknown queries with friendly suggestions", () => {
      const res = processUserMessage("What is the best way to travel to Mars tomorrow?");
      assert.equal(res.fallback, true);
      assert.ok(res.text.includes("I'm not sure how to answer that yet"));
      assert.ok(res.text.includes("help") || res.text.includes("calculations"));
    });

    it("should never trigger destructive clear chat on random inputs", () => {
      const res = processUserMessage("I want clear water to drink in the hot sun");
      assert.notEqual(res.intent?.id, "CTRL_CLEAR_CHAT");
    });
  });

  describe("Drop-in Chatbot compatibility", () => {
    it("Chatbot.getResponse should return a string response", () => {
      const resp = Chatbot.getResponse("hello");
      assert.equal(typeof resp, "string");
      assert.ok(resp.length > 0);
    });

    it("Chatbot.getResponseAsync should resolve a string response", async () => {
      const resp = await Chatbot.getResponseAsync("what is 5 + 10");
      assert.equal(typeof resp, "string");
      assert.ok(resp.includes("15"));
    });
  });
});
