// Safe mathematical expression parser and unit conversion engine without eval()

/**
 * Clean floating point inaccuracies (e.g. 0.1 + 0.2 = 0.3)
 */
function cleanNumber(num) {
  if (!isFinite(num)) return num;
  return Math.round(num * 1e10) / 1e10;
}

/**
 * Safe arithmetic expression evaluator using recursive descent / operator precedence
 * Supports +, -, *, /, %, ^, parentheses
 */
export function evaluateArithmeticExpression(expr) {
  if (typeof expr !== "string") return null;

  // Replace symbols like ×, ÷, x
  let sanitized = expr
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/(\d+)\s*[xX]\s*(\d+)/g, "$1 * $2")
    .replace(/\s+/g, "");

  // Check valid characters only
  if (!/^[\d+\-*/%^().]+$/.test(sanitized)) {
    return null;
  }

  let index = 0;

  function peek() {
    return sanitized[index];
  }

  function get() {
    return sanitized[index++];
  }

  function parseNumber() {
    let start = index;
    if (peek() === "-" || peek() === "+") {
      index++;
    }
    let hasDot = false;
    while (index < sanitized.length) {
      const c = peek();
      if (c >= "0" && c <= "9") {
        index++;
      } else if (c === "." && !hasDot) {
        hasDot = true;
        index++;
      } else {
        break;
      }
    }
    const token = sanitized.slice(start, index);
    const val = parseFloat(token);
    if (isNaN(val)) throw new Error("Invalid number token");
    return val;
  }

  function parsePrimary() {
    if (peek() === "(") {
      get(); // consume '('
      const val = parseExpression();
      if (get() !== ")") throw new Error("Mismatched parentheses");
      return val;
    }
    return parseNumber();
  }

  function parsePower() {
    let val = parsePrimary();
    while (peek() === "^") {
      get(); // consume '^'
      const exp = parsePower(); // right-associative
      val = Math.pow(val, exp);
    }
    return val;
  }

  function parseTerm() {
    let val = parsePower();
    while (peek() === "*" || peek() === "/" || peek() === "%") {
      const op = get();
      const nextVal = parsePower();
      if (op === "*") {
        val = val * nextVal;
      } else if (op === "/") {
        if (nextVal === 0) {
          throw new Error("Division by zero");
        }
        val = val / nextVal;
      } else if (op === "%") {
        if (nextVal === 0) {
          throw new Error("Division by zero in modulo");
        }
        val = val % nextVal;
      }
    }
    return val;
  }

  function parseExpression() {
    let val = parseTerm();
    while (peek() === "+" || peek() === "-") {
      const op = get();
      const nextVal = parseTerm();
      if (op === "+") {
        val = val + nextVal;
      } else if (op === "-") {
        val = val - nextVal;
      }
    }
    return val;
  }

  try {
    const result = parseExpression();
    if (index !== sanitized.length) return null;
    return cleanNumber(result);
  } catch (err) {
    if (err.message && err.message.includes("zero")) {
      return { error: "Division by zero is undefined." };
    }
    return null;
  }
}

/**
 * Natural language mathematical query parser
 */
export function parseMathQuery(input) {
  if (!input) return null;
  const raw = input.trim();
  const lower = raw.toLowerCase().replace(/[?,!]+$/, "").trim();

  // 1. Percentage: "10% of 500", "what is 20 percent of 350", "calculate 10% of 500"
  const percentMatch = lower.match(/(?:what\s+is\s+|calculate\s+|find\s+)?([\d.]+)\s*(?:%|percent)\s+of\s+([\d.]+)/i);
  if (percentMatch) {
    const pct = parseFloat(percentMatch[1]);
    const total = parseFloat(percentMatch[2]);
    const ans = cleanNumber((pct / 100) * total);
    return {
      type: "percentage",
      expression: `${pct}% of ${total}`,
      result: ans,
      text: `${pct}% of ${total} = **${ans}**`
    };
  }

  // 2. Square Root: "square root of 144", "sqrt of 144", "sqrt(144)", "root of 144"
  const sqrtMatch = lower.match(/(?:what\s+is\s+|calculate\s+|find\s+)?(?:the\s+)?(?:square\s+root|sqrt|root)\s*(?:of|\()?\s*([\d.]+)\)?/i);
  if (sqrtMatch) {
    const n = parseFloat(sqrtMatch[1]);
    if (n < 0) {
      return {
        type: "sqrt",
        error: "Square root of a negative number is undefined in real numbers."
      };
    }
    const ans = cleanNumber(Math.sqrt(n));
    return {
      type: "sqrt",
      expression: `√${n}`,
      result: ans,
      text: `The square root of ${n} is **${ans}**`
    };
  }

  // 3. Square: "square of 9", "9 squared", "find the square of 9", "what is 9^2"
  const squareMatch = lower.match(/(?:what\s+is\s+|calculate\s+|find\s+)?(?:the\s+)?square\s+of\s+([\d.]+)/i) ||
                      lower.match(/(?:what\s+is\s+|calculate\s+)?([\d.]+)\s*(?:squared|\^2)/i);
  if (squareMatch) {
    const n = parseFloat(squareMatch[1]);
    const ans = cleanNumber(n * n);
    return {
      type: "square",
      expression: `${n}²`,
      result: ans,
      text: `The square of ${n} is **${ans}**`
    };
  }

  // 4. Cube: "cube of 3", "3 cubed", "find the cube of 3", "what is 3^3"
  const cubeMatch = lower.match(/(?:what\s+is\s+|calculate\s+|find\s+)?(?:the\s+)?cube\s+of\s+([\d.]+)/i) ||
                    lower.match(/(?:what\s+is\s+|calculate\s+)?([\d.]+)\s*(?:cubed|\^3)/i);
  if (cubeMatch) {
    const n = parseFloat(cubeMatch[1]);
    const ans = cleanNumber(n * n * n);
    return {
      type: "cube",
      expression: `${n}³`,
      result: ans,
      text: `The cube of ${n} is **${ans}**`
    };
  }

  // 5. Remainder / Modulo:
  // "what is the remainder when 17 is divided by 5", "remainder of 17 divided by 5", "17 mod 5", "17 modulo 5", "17 % 5"
  const remainderMatch = lower.match(/(?:what\s+is\s+)?(?:the\s+)?remainder\s+(?:when|of)\s+([\d.]+)\s+(?:is\s+)?divided\s+by\s+([\d.]+)/i) ||
                         lower.match(/(?:what\s+is\s+|calculate\s+)?([\d.]+)\s*(?:mod|modulo|%)\s*([\d.]+)/i);
  if (remainderMatch) {
    const a = parseFloat(remainderMatch[1]);
    const b = parseFloat(remainderMatch[2]);
    if (b === 0) {
      return {
        type: "modulo",
        error: "Cannot calculate remainder with a divisor of zero."
      };
    }
    const ans = cleanNumber(a % b);
    return {
      type: "modulo",
      expression: `${a} mod ${b}`,
      result: ans,
      text: `The remainder when ${a} is divided by ${b} is **${ans}**`
    };
  }

  // 6. Natural language arithmetic:
  // "add X and Y" / "sum of X and Y"
  const addMatch = lower.match(/(?:add\s+([\d.]+)\s+(?:and|to)\s+([\d.]+)|sum\s+of\s+([\d.]+)\s+and\s+([\d.]+))/i);
  if (addMatch) {
    const a = parseFloat(addMatch[1] || addMatch[3]);
    const b = parseFloat(addMatch[2] || addMatch[4]);
    const ans = cleanNumber(a + b);
    return {
      type: "addition",
      expression: `${a} + ${b}`,
      result: ans,
      text: `${a} + ${b} = **${ans}**`
    };
  }

  // "subtract X from Y" / "difference between X and Y"
  const subMatch = lower.match(/(?:subtract\s+([\d.]+)\s+from\s+([\d.]+)|difference\s+between\s+([\d.]+)\s+and\s+([\d.]+))/i);
  if (subMatch) {
    const a = subMatch[1] ? parseFloat(subMatch[2]) : parseFloat(subMatch[3]);
    const b = subMatch[1] ? parseFloat(subMatch[1]) : parseFloat(subMatch[4]);
    const ans = cleanNumber(a - b);
    return {
      type: "subtraction",
      expression: `${a} - ${b}`,
      result: ans,
      text: `${a} - ${b} = **${ans}**`
    };
  }

  // "multiply X by Y" / "product of X and Y"
  const mulMatch = lower.match(/(?:multiply\s+([\d.]+)\s+by\s+([\d.]+)|product\s+of\s+([\d.]+)\s+and\s+([\d.]+))/i);
  if (mulMatch) {
    const a = parseFloat(mulMatch[1] || mulMatch[3]);
    const b = parseFloat(mulMatch[2] || mulMatch[4]);
    const ans = cleanNumber(a * b);
    return {
      type: "multiplication",
      expression: `${a} × ${b}`,
      result: ans,
      text: `${a} × ${b} = **${ans}**`
    };
  }

  // "divide X by Y" / "quotient of X and Y"
  const divMatch = lower.match(/(?:divide\s+([\d.]+)\s+by\s+([\d.]+)|quotient\s+of\s+([\d.]+)\s+and\s+([\d.]+))/i);
  if (divMatch) {
    const a = parseFloat(divMatch[1] || divMatch[3]);
    const b = parseFloat(divMatch[2] || divMatch[4]);
    if (b === 0) {
      return {
        type: "division",
        error: "Division by zero is undefined."
      };
    }
    const ans = cleanNumber(a / b);
    return {
      type: "division",
      expression: `${a} ÷ ${b}`,
      result: ans,
      text: `${a} ÷ ${b} = **${ans}**`
    };
  }

  // 7. General arithmetic expression: "what is 5 + 10", "calculate 20 - 7", "8 * 6", "50 / 5", "50 divided by 5", "8 times 6", "20 minus 7", "5 plus 10"
  // Normalize conversational phrases into operators
  let mathExpr = lower
    .replace(/^(?:what\s+is|what's|whats|calculate|evaluate|solve)\s+/i, "")
    .replace(/\s+plus\s+/g, " + ")
    .replace(/\s+minus\s+/g, " - ")
    .replace(/\s+(?:times|multiplied\s+by)\s+/g, " * ")
    .replace(/\s+(?:divided\s+by|over)\s+/g, " / ")
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .trim();

  // If the expression has at least one math operator and numbers
  if (/[+\-*/^%]/.test(mathExpr) && /\d/.test(mathExpr)) {
    const evaluated = evaluateArithmeticExpression(mathExpr);
    if (evaluated !== null) {
      if (typeof evaluated === "object" && evaluated.error) {
        return { type: "arithmetic", error: evaluated.error };
      }
      return {
        type: "arithmetic",
        expression: mathExpr,
        result: evaluated,
        text: `${mathExpr} = **${evaluated}**`
      };
    }
  }

  return null;
}

/**
 * Dynamic Unit Converter
 * Handles:
 * - kilometers to meters, meters to kilometers
 * - miles to kilometers, kilometers to miles
 * - kilograms to grams, grams to kilograms
 * - pounds to kilograms, kilograms to pounds
 * - celsius to fahrenheit, fahrenheit to celsius
 */
export function parseUnitConversion(input) {
  if (!input) return null;
  const lower = input.toLowerCase().replace(/[?,!]+$/, "").trim();

  // "convert 5 kilometers to meters", "5 km to meters", "5 km in m", "how many meters in 5 kilometers"
  const regexes = [
    /(?:convert\s+)?([\d.]+)\s*(kilometers?|km|meters?|m|miles?|mi|kilograms?|kg|grams?|g|pounds?|lbs?|celsius|c|fahrenheit|f)\s+(?:to|in|into)\s+(kilometers?|km|meters?|m|miles?|mi|kilograms?|kg|grams?|g|pounds?|lbs?|celsius|c|fahrenheit|f)/i,
    /how\s+many\s+(kilometers?|km|meters?|m|miles?|mi|kilograms?|kg|grams?|g|pounds?|lbs?)\s+in\s+([\d.]+)\s*(kilometers?|km|meters?|m|miles?|mi|kilograms?|kg|grams?|g|pounds?|lbs?)/i
  ];

  let val, fromUnit, toUnit;

  const m1 = lower.match(regexes[0]);
  if (m1) {
    val = parseFloat(m1[1]);
    fromUnit = normalizeUnit(m1[2]);
    toUnit = normalizeUnit(m1[3]);
  } else {
    const m2 = lower.match(regexes[1]);
    if (m2) {
      toUnit = normalizeUnit(m2[1]);
      val = parseFloat(m2[2]);
      fromUnit = normalizeUnit(m2[3]);
    }
  }

  if (val !== undefined && fromUnit && toUnit) {
    const result = convertUnits(val, fromUnit, toUnit);
    if (result) {
      return {
        type: "unit_conversion",
        fromValue: val,
        fromUnit,
        toValue: result.value,
        toUnit: result.unitName,
        text: `${val} ${fromUnit} = **${result.value} ${result.unitName}**`
      };
    }
  }

  return null;
}

function normalizeUnit(unit) {
  const u = unit.toLowerCase();
  if (["kilometer", "kilometers", "km"].includes(u)) return "km";
  if (["meter", "meters", "m"].includes(u)) return "m";
  if (["mile", "miles", "mi"].includes(u)) return "miles";
  if (["kilogram", "kilograms", "kg"].includes(u)) return "kg";
  if (["gram", "grams", "g"].includes(u)) return "g";
  if (["pound", "pounds", "lb", "lbs"].includes(u)) return "lbs";
  if (["celsius", "c"].includes(u)) return "celsius";
  if (["fahrenheit", "f"].includes(u)) return "fahrenheit";
  return u;
}

function convertUnits(val, from, to) {
  // Distance
  if (from === "km" && to === "m") return { value: cleanNumber(val * 1000), unitName: "meters" };
  if (from === "m" && to === "km") return { value: cleanNumber(val / 1000), unitName: "kilometers" };
  if (from === "miles" && to === "km") return { value: cleanNumber(val * 1.60934), unitName: "kilometers" };
  if (from === "km" && to === "miles") return { value: cleanNumber(val / 1.60934), unitName: "miles" };

  // Weight
  if (from === "kg" && to === "g") return { value: cleanNumber(val * 1000), unitName: "grams" };
  if (from === "g" && to === "kg") return { value: cleanNumber(val / 1000), unitName: "kilograms" };
  if (from === "lbs" && to === "kg") return { value: cleanNumber(val * 0.453592), unitName: "kilograms" };
  if (from === "kg" && to === "lbs") return { value: cleanNumber(val / 0.453592), unitName: "pounds" };

  // Temperature
  if (from === "celsius" && to === "fahrenheit") {
    return { value: cleanNumber((val * 9) / 5 + 32), unitName: "°F (Fahrenheit)" };
  }
  if (from === "fahrenheit" && to === "celsius") {
    return { value: cleanNumber(((val - 32) * 5) / 9), unitName: "°C (Celsius)" };
  }

  return null;
}
