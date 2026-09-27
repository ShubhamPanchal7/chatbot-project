// Intent definitions for all 100 supported questions and commands
// Each intent contains at least 5-10 natural language variations

export const CATEGORIES = {
  A: "Greetings & Basic Conversation",
  B: "Date & Time",
  C: "Random & Fun Commands",
  D: "Mathematics & Calculations",
  E: "Personal Assistant & Productivity",
  F: "Computer & Web Knowledge",
  G: "Programming & Developer Questions",
  H: "General Knowledge",
  I: "Lifestyle & Everyday Questions",
  J: "Chatbot Controls & Interaction"
};

export const INTENTS = [
  // --- Category A: Greetings & Basic Conversation (1-10) ---
  {
    number: 1,
    id: "GREET_HELLO",
    category: "A",
    categoryName: CATEGORIES.A,
    name: "Hello",
    variations: [
      "hello",
      "hello!",
      "hello there",
      "hello bot",
      "hello chatbot",
      "hello friend",
      "well hello",
      "helo",
      "hellooo",
      "hello assistant"
    ]
  },
  {
    number: 2,
    id: "GREET_HI",
    category: "A",
    categoryName: CATEGORIES.A,
    name: "Hi",
    variations: [
      "hi",
      "hi!",
      "hi there",
      "hi bot",
      "hi chatbot",
      "hi friend",
      "hi buddy",
      "hi assistant",
      "hii",
      "hi how are you"
    ]
  },
  {
    number: 3,
    id: "GREET_HEY",
    category: "A",
    categoryName: CATEGORIES.A,
    name: "Hey",
    variations: [
      "hey",
      "hey!",
      "hey there",
      "hey bot",
      "heyy",
      "hey chatbot",
      "hey buddy",
      "heya",
      "hey assistant"
    ]
  },
  {
    number: 4,
    id: "GREET_GOOD_MORNING",
    category: "A",
    categoryName: CATEGORIES.A,
    name: "Good morning",
    variations: [
      "good morning",
      "good morning!",
      "morning",
      "morning!",
      "good morning bot",
      "very good morning",
      "good mornin",
      "guten morgen",
      "good morning to you",
      "top of the morning"
    ]
  },
  {
    number: 5,
    id: "GREET_GOOD_AFTERNOON",
    category: "A",
    categoryName: CATEGORIES.A,
    name: "Good afternoon",
    variations: [
      "good afternoon",
      "good afternoon!",
      "afternoon",
      "good afternoon bot",
      "afternoon bot",
      "good aftn",
      "good afternoon to you",
      "pleasant afternoon"
    ]
  },
  {
    number: 6,
    id: "GREET_GOOD_EVENING",
    category: "A",
    categoryName: CATEGORIES.A,
    name: "Good evening",
    variations: [
      "good evening",
      "good evening!",
      "evening",
      "good evening bot",
      "good eve",
      "evening to you",
      "good evening chatbot",
      "pleasant evening"
    ]
  },
  {
    number: 7,
    id: "GREET_HOW_ARE_YOU",
    category: "A",
    categoryName: CATEGORIES.A,
    name: "How are you?",
    variations: [
      "how are you",
      "how are you?",
      "how are you doing",
      "how are you doing today",
      "how is it going",
      "how's it going",
      "how are you feeling",
      "how do you do",
      "are you doing well",
      "how are things going"
    ]
  },
  {
    number: 8,
    id: "GREET_WHAT_IS_YOUR_NAME",
    category: "A",
    categoryName: CATEGORIES.A,
    name: "What is your name?",
    variations: [
      "what is your name",
      "what is your name?",
      "what's your name",
      "whats your name",
      "tell me your name",
      "do you have a name",
      "what should i call you",
      "can you tell me your name",
      "your name please",
      "may i know your name"
    ]
  },
  {
    number: 9,
    id: "GREET_WHO_ARE_YOU",
    category: "A",
    categoryName: CATEGORIES.A,
    name: "Who are you?",
    variations: [
      "who are you",
      "who are you?",
      "who are you exactly",
      "tell me who you are",
      "introduce yourself",
      "can you introduce yourself",
      "who created you",
      "what are you",
      "who are you chatbot",
      "tell me about yourself"
    ]
  },
  {
    number: 10,
    id: "GREET_WHAT_CAN_YOU_DO",
    category: "A",
    categoryName: CATEGORIES.A,
    name: "What can you do?",
    variations: [
      "what can you do",
      "what can you do?",
      "what are your features",
      "what can you help me with",
      "show your capabilities",
      "what do you do",
      "what functions do you have",
      "tell me what you can do",
      "what are you capable of",
      "how can you help me"
    ]
  },

  // --- Category B: Date & Time (11-20) ---
  {
    number: 11,
    id: "TIME_CURRENT",
    category: "B",
    categoryName: CATEGORIES.B,
    name: "What time is it?",
    variations: [
      "what time is it",
      "what time is it?",
      "tell me the current time",
      "can you tell me what time it is",
      "could you tell me the time",
      "hey what's the time right now",
      "time please",
      "current time",
      "tell me the time now",
      "do you know what time it is",
      "what is the time"
    ]
  },
  {
    number: 12,
    id: "DATE_TODAY",
    category: "B",
    categoryName: CATEGORIES.B,
    name: "What is today's date?",
    variations: [
      "what is today's date",
      "what is today's date?",
      "what is the date today",
      "what's today's date",
      "tell me today's date",
      "can you tell me the date",
      "what date is it today",
      "today's date please",
      "show me the current date",
      "do you know the date today",
      "current date"
    ]
  },
  {
    number: 13,
    id: "DATE_DAY_TODAY",
    category: "B",
    categoryName: CATEGORIES.B,
    name: "What day is it today?",
    variations: [
      "what day is it today",
      "what day is it today?",
      "what day is it",
      "which day is today",
      "tell me the day",
      "what day of the week is it",
      "day of the week today",
      "what day is today",
      "which day of the week is today",
      "what is today's day"
    ]
  },
  {
    number: 14,
    id: "DATE_MONTH_CURRENT",
    category: "B",
    categoryName: CATEGORIES.B,
    name: "What month is it?",
    variations: [
      "what month is it",
      "what month is it?",
      "what's the current month",
      "which month is this",
      "tell me the current month",
      "current month",
      "what is this month",
      "what month are we in",
      "which month are we currently in",
      "month name please"
    ]
  },
  {
    number: 15,
    id: "DATE_YEAR_CURRENT",
    category: "B",
    categoryName: CATEGORIES.B,
    name: "What year is it?",
    variations: [
      "what year is it",
      "what year is it?",
      "what is the current year",
      "which year is this",
      "tell me the year",
      "current year",
      "what year are we in",
      "what's this year",
      "which year is it now",
      "year please"
    ]
  },
  {
    number: 16,
    id: "DATE_TOMORROW",
    category: "B",
    categoryName: CATEGORIES.B,
    name: "What is tomorrow's date?",
    variations: [
      "what is tomorrow's date",
      "what is tomorrow's date?",
      "what's tomorrow's date",
      "tell me tomorrow's date",
      "tomorrow date",
      "what date will it be tomorrow",
      "can you tell me tomorrow's date",
      "date of tomorrow",
      "what will be the date tomorrow",
      "tomorrows date please"
    ]
  },
  {
    number: 17,
    id: "DATE_YESTERDAY",
    category: "B",
    categoryName: CATEGORIES.B,
    name: "What was yesterday's date?",
    variations: [
      "what was yesterday's date",
      "what was yesterday's date?",
      "what was the date yesterday",
      "yesterday's date",
      "tell me yesterday's date",
      "what date was it yesterday",
      "yesterdays date please",
      "date of yesterday",
      "what date did yesterday have",
      "can you tell me yesterday's date"
    ]
  },
  {
    number: 18,
    id: "DATE_DAY_TOMORROW",
    category: "B",
    categoryName: CATEGORIES.B,
    name: "What day is tomorrow?",
    variations: [
      "what day is tomorrow",
      "what day is tomorrow?",
      "what day of the week is tomorrow",
      "which day is tomorrow",
      "tell me the day tomorrow",
      "tomorrow's day",
      "day tomorrow",
      "which day will it be tomorrow",
      "what day will tomorrow be"
    ]
  },
  {
    number: 19,
    id: "DATE_DAYS_LEFT_IN_YEAR",
    category: "B",
    categoryName: CATEGORIES.B,
    name: "How many days are left in this year?",
    variations: [
      "how many days are left in this year",
      "how many days are left in this year?",
      "days left in this year",
      "how many days until new year",
      "days remaining in the year",
      "how many days left in the year",
      "days till end of the year",
      "days left this year",
      "how many days until next year",
      "remaining days this year"
    ]
  },
  {
    number: 20,
    id: "TIME_TIMESTAMP",
    category: "B",
    categoryName: CATEGORIES.B,
    name: "What is the current timestamp?",
    variations: [
      "what is the current timestamp",
      "what is the current timestamp?",
      "current timestamp",
      "give me the timestamp",
      "tell me the current timestamp",
      "unix timestamp",
      "show timestamp",
      "what is the unix time right now",
      "timestamp please",
      "current unix time"
    ]
  },

  // --- Category C: Random & Fun Commands (21-30) ---
  {
    number: 21,
    id: "RANDOM_FLIP_COIN",
    category: "C",
    categoryName: CATEGORIES.C,
    name: "Flip a coin",
    variations: [
      "flip a coin",
      "flip a coin?",
      "flip a coin for me",
      "can you flip a coin",
      "coin flip",
      "flip coin",
      "please flip a coin",
      "let's flip a coin",
      "do a coin flip",
      "flip a coin please"
    ]
  },
  {
    number: 22,
    id: "RANDOM_TOSS_COIN",
    category: "C",
    categoryName: CATEGORIES.C,
    name: "Toss a coin",
    variations: [
      "toss a coin",
      "toss a coin?",
      "toss a coin for me",
      "coin toss",
      "toss coin",
      "can you toss a coin",
      "toss a coin please",
      "let's toss a coin",
      "do a coin toss",
      "toss the coin"
    ]
  },
  {
    number: 23,
    id: "RANDOM_ROLL_DICE",
    category: "C",
    categoryName: CATEGORIES.C,
    name: "Roll a dice",
    variations: [
      "roll a dice",
      "roll a dice?",
      "roll the dice",
      "can you roll a dice for me",
      "roll a dice please",
      "give me a random dice number",
      "roll one die",
      "let's roll a dice",
      "roll a six-sided die",
      "roll dice"
    ]
  },
  {
    number: 24,
    id: "RANDOM_ROLL_TWO_DICE",
    category: "C",
    categoryName: CATEGORIES.C,
    name: "Roll two dice",
    variations: [
      "roll two dice",
      "roll two dice?",
      "roll 2 dice",
      "roll a pair of dice",
      "can you roll two dice",
      "roll two dice please",
      "toss two dice",
      "roll two die",
      "two dice roll",
      "roll a pair of die"
    ]
  },
  {
    number: 25,
    id: "RANDOM_NUMBER",
    category: "C",
    categoryName: CATEGORIES.C,
    name: "Pick a random number",
    variations: [
      "pick a random number",
      "pick a random number?",
      "give me a random number",
      "generate a random number",
      "choose a random number",
      "random number",
      "select a random number",
      "pick any number",
      "give me any random number",
      "random number please"
    ]
  },
  {
    number: 26,
    id: "RANDOM_NUMBER_RANGE",
    category: "C",
    categoryName: CATEGORIES.C,
    name: "Give me a random number between 1 and 100",
    variations: [
      "give me a random number between 1 and 100",
      "give me a random number between 1 and 100?",
      "pick a random number between 1 and 100",
      "random number between 1 and 100",
      "choose a random number between 1 and 100",
      "number between 1 and 100",
      "random number from 1 to 100",
      "generate a number between 1 and 100",
      "pick a number from 1 to 100"
    ]
  },
  {
    number: 27,
    id: "FUN_TELL_JOKE",
    category: "C",
    categoryName: CATEGORIES.C,
    name: "Tell me a joke",
    variations: [
      "tell me a joke",
      "tell me a joke?",
      "tell a joke",
      "can you tell me a joke",
      "say a joke",
      "give me a joke",
      "do you know any jokes",
      "crack a joke",
      "make me laugh with a joke",
      "joke please"
    ]
  },
  {
    number: 28,
    id: "FUN_SOMETHING_FUNNY",
    category: "C",
    categoryName: CATEGORIES.C,
    name: "Tell me something funny",
    variations: [
      "tell me something funny",
      "tell me something funny?",
      "say something funny",
      "give me something funny",
      "make me laugh",
      "share something hilarious",
      "tell me something humorous",
      "tell something funny",
      "do something funny"
    ]
  },
  {
    number: 29,
    id: "FUN_FACT",
    category: "C",
    categoryName: CATEGORIES.C,
    name: "Give me a fun fact",
    variations: [
      "give me a fun fact",
      "give me a fun fact?",
      "tell me a fun fact",
      "fun fact",
      "share a fun fact",
      "do you know a fun fact",
      "give a fun fact",
      "tell me an interesting fact",
      "random fact",
      "interesting fact please"
    ]
  },
  {
    number: 30,
    id: "FUN_CHOOSE_OPTION",
    category: "C",
    categoryName: CATEGORIES.C,
    name: "Choose a random option for me",
    variations: [
      "choose a random option for me",
      "choose a random option for me?",
      "pick an option for me",
      "choose for me",
      "help me decide",
      "make a decision for me",
      "pick one for me",
      "choose randomly for me",
      "select an option for me",
      "decide for me"
    ]
  },

  // --- Category D: Mathematics & Calculations (31-40) ---
  {
    number: 31,
    id: "MATH_ADD_5_10",
    category: "D",
    categoryName: CATEGORIES.D,
    name: "What is 5 + 10?",
    variations: [
      "what is 5 + 10",
      "what is 5 + 10?",
      "calculate 5 + 10",
      "add 5 and 10",
      "5 + 10",
      "sum of 5 and 10",
      "what's 5 plus 10",
      "5 plus 10",
      "5 add 10"
    ]
  },
  {
    number: 32,
    id: "MATH_SUB_20_7",
    category: "D",
    categoryName: CATEGORIES.D,
    name: "What is 20 - 7?",
    variations: [
      "what is 20 - 7",
      "what is 20 - 7?",
      "calculate 20 - 7",
      "subtract 7 from 20",
      "20 - 7",
      "difference between 20 and 7",
      "what's 20 minus 7",
      "20 minus 7"
    ]
  },
  {
    number: 33,
    id: "MATH_MUL_8_6",
    category: "D",
    categoryName: CATEGORIES.D,
    name: "What is 8 × 6?",
    variations: [
      "what is 8 × 6",
      "what is 8 x 6",
      "what is 8 * 6",
      "what is 8 * 6?",
      "multiply 8 by 6",
      "8 times 6",
      "product of 8 and 6",
      "calculate 8 * 6",
      "what's 8 multiplied by 6",
      "8 x 6"
    ]
  },
  {
    number: 34,
    id: "MATH_DIV_50_5",
    category: "D",
    categoryName: CATEGORIES.D,
    name: "What is 50 ÷ 5?",
    variations: [
      "what is 50 ÷ 5",
      "what is 50 / 5",
      "what is 50 / 5?",
      "divide 50 by 5",
      "50 divided by 5",
      "calculate 50 / 5",
      "quotient of 50 and 5",
      "what's 50 over 5",
      "50 / 5"
    ]
  },
  {
    number: 35,
    id: "MATH_SQUARE_9",
    category: "D",
    categoryName: CATEGORIES.D,
    name: "What is the square of 9?",
    variations: [
      "what is the square of 9",
      "what is the square of 9?",
      "square of 9",
      "9 squared",
      "calculate the square of 9",
      "what's 9 squared",
      "find the square of 9",
      "9^2",
      "what is 9 squared"
    ]
  },
  {
    number: 36,
    id: "MATH_CUBE_3",
    category: "D",
    categoryName: CATEGORIES.D,
    name: "What is the cube of 3?",
    variations: [
      "what is the cube of 3",
      "what is the cube of 3?",
      "cube of 3",
      "3 cubed",
      "calculate the cube of 3",
      "what's 3 cubed",
      "find the cube of 3",
      "3^3",
      "what is 3 cubed"
    ]
  },
  {
    number: 37,
    id: "MATH_SQRT_144",
    category: "D",
    categoryName: CATEGORIES.D,
    name: "What is the square root of 144?",
    variations: [
      "what is the square root of 144",
      "what is the square root of 144?",
      "square root of 144",
      "sqrt of 144",
      "sqrt(144)",
      "root of 144",
      "calculate square root of 144",
      "what's the square root of 144",
      "find the square root of 144"
    ]
  },
  {
    number: 38,
    id: "MATH_PERCENT_10_500",
    category: "D",
    categoryName: CATEGORIES.D,
    name: "What is 10% of 500?",
    variations: [
      "what is 10% of 500",
      "what is 10% of 500?",
      "what is 10 percent of 500",
      "calculate 10 percent of 500",
      "10% of 500",
      "find 10% of 500",
      "what's 10 percent of 500",
      "calculate 10% of 500",
      "10 percent of 500"
    ]
  },
  {
    number: 39,
    id: "MATH_CONVERT_KM_M",
    category: "D",
    categoryName: CATEGORIES.D,
    name: "Convert 5 kilometers to meters",
    variations: [
      "convert 5 kilometers to meters",
      "convert 5 kilometers to meters?",
      "5 kilometers to meters",
      "convert 5 km to m",
      "5 km in meters",
      "how many meters in 5 kilometers",
      "convert 5 km to meters",
      "5 kilometers in meters",
      "5 km to meters"
    ]
  },
  {
    number: 40,
    id: "MATH_MODULO_17_5",
    category: "D",
    categoryName: CATEGORIES.D,
    name: "What is the remainder when 17 is divided by 5?",
    variations: [
      "what is the remainder when 17 is divided by 5",
      "what is the remainder when 17 is divided by 5?",
      "remainder of 17 divided by 5",
      "17 mod 5",
      "17 modulo 5",
      "what is 17 % 5",
      "17 remainder 5",
      "calculate 17 modulo 5",
      "remainder when 17 is divided by 5"
    ]
  },

  // --- Category E: Personal Assistant & Productivity (41-50) ---
  {
    number: 41,
    id: "ASST_REMIND_WATER",
    category: "E",
    categoryName: CATEGORIES.E,
    name: "Remind me to drink water",
    variations: [
      "remind me to drink water",
      "remind me to drink water please",
      "set a reminder to drink water",
      "remind to hydrate",
      "reminder drink water",
      "water reminder",
      "remind me to hydrate",
      "can you remind me to drink water",
      "please remind me to drink water"
    ]
  },
  {
    number: 42,
    id: "ASST_TIMER_1_MIN",
    category: "E",
    categoryName: CATEGORIES.E,
    name: "Set a timer for 1 minute",
    variations: [
      "set a timer for 1 minute",
      "set a timer for 1 minute?",
      "set a 1 minute timer",
      "timer for 1 minute",
      "start a 1 minute timer",
      "can you set a timer for 1 minute",
      "1 minute timer",
      "set timer 1 min",
      "timer 1 minute",
      "start 1 min timer"
    ]
  },
  {
    number: 43,
    id: "ASST_COUNTDOWN_5_MIN",
    category: "E",
    categoryName: CATEGORIES.E,
    name: "Start a 5-minute countdown",
    variations: [
      "start a 5-minute countdown",
      "start a 5 minute countdown",
      "countdown 5 minutes",
      "5 minute countdown",
      "start a countdown for 5 minutes",
      "begin a 5-minute countdown",
      "set countdown for 5 mins",
      "start 5 min countdown",
      "5 min countdown"
    ]
  },
  {
    number: 44,
    id: "ASST_OPEN_GOOGLE",
    category: "E",
    categoryName: CATEGORIES.E,
    name: "Open Google",
    variations: [
      "open google",
      "open google?",
      "launch google",
      "go to google",
      "take me to google",
      "can you open google",
      "open google search",
      "open google com",
      "navigate to google"
    ]
  },
  {
    number: 45,
    id: "ASST_OPEN_YOUTUBE",
    category: "E",
    categoryName: CATEGORIES.E,
    name: "Open YouTube",
    variations: [
      "open youtube",
      "open youtube?",
      "launch youtube",
      "go to youtube",
      "take me to youtube",
      "can you open youtube",
      "open yt",
      "open youtube com",
      "navigate to youtube"
    ]
  },
  {
    number: 46,
    id: "ASST_OPEN_GMAIL",
    category: "E",
    categoryName: CATEGORIES.E,
    name: "Open Gmail",
    variations: [
      "open gmail",
      "open gmail?",
      "launch gmail",
      "go to gmail",
      "take me to gmail",
      "can you open gmail",
      "check my email",
      "open google mail",
      "navigate to gmail"
    ]
  },
  {
    number: 47,
    id: "ASST_SEARCH_JAVA",
    category: "E",
    categoryName: CATEGORIES.E,
    name: "Search for Java tutorials",
    variations: [
      "search for java tutorials",
      "search for java tutorials?",
      "google java tutorials",
      "look up java tutorials",
      "search java tutorials",
      "find java tutorials on google",
      "search the web for java tutorials",
      "can you search for java tutorials",
      "search google for java tutorials"
    ]
  },
  {
    number: 48,
    id: "ASST_WHAT_NEXT",
    category: "E",
    categoryName: CATEGORIES.E,
    name: "What should I do next?",
    variations: [
      "what should i do next",
      "what should i do next?",
      "what should i do now",
      "give me something to do",
      "suggest my next task",
      "what to do next",
      "what next",
      "any idea what i should do next",
      "what should i work on next"
    ]
  },
  {
    number: 49,
    id: "ASST_PRODUCTIVITY_TIP",
    category: "E",
    categoryName: CATEGORIES.E,
    name: "Give me a productivity tip",
    variations: [
      "give me a productivity tip",
      "give me a productivity tip?",
      "productivity tip",
      "tell me a productivity tip",
      "share a productivity tip",
      "how to be more productive",
      "tip for productivity",
      "boost productivity tip",
      "productivity advice"
    ]
  },
  {
    number: 50,
    id: "ASST_HELP_FOCUS",
    category: "E",
    categoryName: CATEGORIES.E,
    name: "Help me focus",
    variations: [
      "help me focus",
      "help me focus?",
      "how can i focus",
      "i cannot focus",
      "i can't focus",
      "tips to focus",
      "help me concentrate on work",
      "how to stay focused",
      "boost my focus",
      "help me maintain focus"
    ]
  },

  // --- Category F: Computer & Web Knowledge (51-60) ---
  {
    number: 51,
    id: "KB_COMPUTER",
    category: "F",
    categoryName: CATEGORIES.F,
    name: "What is a computer?",
    variations: [
      "what is a computer",
      "what is a computer?",
      "define computer",
      "explain computer",
      "what does a computer do",
      "tell me about computers",
      "what is a computer system",
      "meaning of computer",
      "computer definition"
    ]
  },
  {
    number: 52,
    id: "KB_INTERNET",
    category: "F",
    categoryName: CATEGORIES.F,
    name: "What is the internet?",
    variations: [
      "what is the internet",
      "what is the internet?",
      "define internet",
      "explain the internet",
      "what is the net",
      "how does the internet work",
      "what is the world wide web",
      "internet definition",
      "tell me about the internet"
    ]
  },
  {
    number: 53,
    id: "KB_BROWSER",
    category: "F",
    categoryName: CATEGORIES.F,
    name: "What is a browser?",
    variations: [
      "what is a browser",
      "what is a browser?",
      "define web browser",
      "explain what a browser is",
      "what is a web browser",
      "what does a browser do",
      "examples of web browsers",
      "browser definition",
      "tell me about browsers"
    ]
  },
  {
    number: 54,
    id: "KB_HTML",
    category: "F",
    categoryName: CATEGORIES.F,
    name: "What is HTML?",
    variations: [
      "what is html",
      "what is html?",
      "define html",
      "explain html",
      "what does html stand for",
      "what is hypertext markup language",
      "html explanation",
      "html definition",
      "tell me about html"
    ]
  },
  {
    number: 55,
    id: "KB_CSS",
    category: "F",
    categoryName: CATEGORIES.F,
    name: "What is CSS?",
    variations: [
      "what is css",
      "what is css?",
      "define css",
      "explain css",
      "what does css stand for",
      "what is cascading style sheets",
      "css explanation",
      "css definition",
      "tell me about css"
    ]
  },
  {
    number: 56,
    id: "KB_JAVASCRIPT",
    category: "F",
    categoryName: CATEGORIES.F,
    name: "What is JavaScript?",
    variations: [
      "what is javascript",
      "what is javascript?",
      "define javascript",
      "explain javascript",
      "what is js",
      "what is javascript used for",
      "js explanation",
      "javascript definition",
      "tell me about javascript"
    ]
  },
  {
    number: 57,
    id: "KB_REACT",
    category: "F",
    categoryName: CATEGORIES.F,
    name: "What is React?",
    variations: [
      "what is react",
      "what is react?",
      "define react",
      "explain react",
      "what is reactjs",
      "what is react js",
      "why use react",
      "react library explanation",
      "tell me about react"
    ]
  },
  {
    number: 58,
    id: "KB_API",
    category: "F",
    categoryName: CATEGORIES.F,
    name: "What is an API?",
    variations: [
      "what is an api",
      "what is an api?",
      "define api",
      "explain api",
      "what does api stand for",
      "what is an application programming interface",
      "how do apis work",
      "api definition",
      "tell me about apis"
    ]
  },
  {
    number: 59,
    id: "KB_DATABASE",
    category: "F",
    categoryName: CATEGORIES.F,
    name: "What is a database?",
    variations: [
      "what is a database",
      "what is a database?",
      "define database",
      "explain database",
      "what is a db",
      "what is a database used for",
      "types of databases",
      "database definition",
      "tell me about databases"
    ]
  },
  {
    number: 60,
    id: "KB_AI",
    category: "F",
    categoryName: CATEGORIES.F,
    name: "What is artificial intelligence?",
    variations: [
      "what is artificial intelligence",
      "what is artificial intelligence?",
      "what is ai",
      "define artificial intelligence",
      "explain ai",
      "what is machine learning and ai",
      "tell me about ai",
      "artificial intelligence definition",
      "explain artificial intelligence"
    ]
  },

  // --- Category G: Programming & Developer Questions (61-70) ---
  {
    number: 61,
    id: "PROG_VARIABLE",
    category: "G",
    categoryName: CATEGORIES.G,
    name: "What is a variable?",
    variations: [
      "what is a variable",
      "what is a variable?",
      "define variable in programming",
      "explain variables",
      "what is a programming variable",
      "variable in code",
      "what do variables do",
      "variable definition in programming",
      "explain variable"
    ]
  },
  {
    number: 62,
    id: "PROG_FUNCTION",
    category: "G",
    categoryName: CATEGORIES.G,
    name: "What is a function?",
    variations: [
      "what is a function",
      "what is a function?",
      "define function in programming",
      "explain functions",
      "what is a method or function",
      "what does a function do",
      "function in coding",
      "function definition in programming",
      "explain function"
    ]
  },
  {
    number: 63,
    id: "PROG_LOOP",
    category: "G",
    categoryName: CATEGORIES.G,
    name: "What is a loop?",
    variations: [
      "what is a loop",
      "what is a loop?",
      "define loop in programming",
      "explain loops",
      "what does a loop do",
      "for loop and while loop",
      "loops in code",
      "loop definition in programming",
      "explain loop"
    ]
  },
  {
    number: 64,
    id: "PROG_ARRAY",
    category: "G",
    categoryName: CATEGORIES.G,
    name: "What is an array?",
    variations: [
      "what is an array",
      "what is an array?",
      "define array",
      "explain arrays",
      "what is an array in programming",
      "array data structure",
      "how do arrays work",
      "array definition",
      "explain array"
    ]
  },
  {
    number: 65,
    id: "PROG_OBJECT_JS",
    category: "G",
    categoryName: CATEGORIES.G,
    name: "What is an object in JavaScript?",
    variations: [
      "what is an object in javascript",
      "what is an object in javascript?",
      "what is a js object",
      "explain javascript objects",
      "define object in js",
      "objects in javascript",
      "what is an object in programming",
      "javascript object explanation",
      "explain objects in js"
    ]
  },
  {
    number: 66,
    id: "PROG_CONDITIONAL",
    category: "G",
    categoryName: CATEGORIES.G,
    name: "What is a conditional statement?",
    variations: [
      "what is a conditional statement",
      "what is a conditional statement?",
      "define conditional statement",
      "explain if else statements",
      "what is an if statement",
      "conditionals in programming",
      "what are conditionals",
      "conditional statement definition",
      "explain conditionals"
    ]
  },
  {
    number: 67,
    id: "PROG_BUG",
    category: "G",
    categoryName: CATEGORIES.G,
    name: "What is a bug in programming?",
    variations: [
      "what is a bug in programming",
      "what is a bug in programming?",
      "what is a software bug",
      "what is a bug in code",
      "define bug in programming",
      "explain software bugs",
      "what does bug mean in coding",
      "bug definition programming",
      "explain bugs"
    ]
  },
  {
    number: 68,
    id: "PROG_DEBUGGING",
    category: "G",
    categoryName: CATEGORIES.G,
    name: "What is debugging?",
    variations: [
      "what is debugging",
      "what is debugging?",
      "define debugging",
      "explain debugging in programming",
      "how do you debug code",
      "what does debugging mean",
      "debugging process",
      "debugging definition",
      "explain debugging"
    ]
  },
  {
    number: 69,
    id: "PROG_GIT",
    category: "G",
    categoryName: CATEGORIES.G,
    name: "What is Git?",
    variations: [
      "what is git",
      "what is git?",
      "define git",
      "explain git",
      "what is git version control",
      "what is git used for",
      "git explanation",
      "git definition",
      "tell me about git"
    ]
  },
  {
    number: 70,
    id: "PROG_GITHUB",
    category: "G",
    categoryName: CATEGORIES.G,
    name: "What is GitHub?",
    variations: [
      "what is github",
      "what is github?",
      "define github",
      "explain github",
      "what is github used for",
      "difference between git and github",
      "what does github do",
      "github definition",
      "tell me about github"
    ]
  },

  // --- Category H: General Knowledge (71-80) ---
  {
    number: 71,
    id: "GK_CAPITAL_INDIA",
    category: "H",
    categoryName: CATEGORIES.H,
    name: "What is the capital of India?",
    variations: [
      "what is the capital of india",
      "what is the capital of india?",
      "capital of india",
      "what's the capital of india",
      "tell me the capital of india",
      "which city is the capital of india",
      "india capital",
      "capital city of india",
      "what is indias capital"
    ]
  },
  {
    number: 72,
    id: "GK_CAPITAL_FRANCE",
    category: "H",
    categoryName: CATEGORIES.H,
    name: "What is the capital of France?",
    variations: [
      "what is the capital of france",
      "what is the capital of france?",
      "capital of france",
      "what's the capital of france",
      "tell me the capital of france",
      "which city is france's capital",
      "france capital",
      "capital city of france",
      "what is frances capital"
    ]
  },
  {
    number: 73,
    id: "GK_DAYS_IN_WEEK",
    category: "H",
    categoryName: CATEGORIES.H,
    name: "How many days are there in a week?",
    variations: [
      "how many days are there in a week",
      "how many days are there in a week?",
      "days in a week",
      "how many days in a week",
      "number of days in a week",
      "tell me how many days are in a week",
      "how many days are in a week",
      "how many days make a week"
    ]
  },
  {
    number: 74,
    id: "GK_MONTHS_IN_YEAR",
    category: "H",
    categoryName: CATEGORIES.H,
    name: "How many months are there in a year?",
    variations: [
      "how many months are there in a year",
      "how many months are there in a year?",
      "months in a year",
      "how many months in a year",
      "number of months in a year",
      "tell me how many months are in a year",
      "how many months are in 1 year",
      "how many months make a year"
    ]
  },
  {
    number: 75,
    id: "GK_PLANETS_COUNT",
    category: "H",
    categoryName: CATEGORIES.H,
    name: "How many planets are in the Solar System?",
    variations: [
      "how many planets are in the solar system",
      "how many planets are in the solar system?",
      "planets in solar system",
      "number of planets in the solar system",
      "how many planets exist in our solar system",
      "planets in our solar system",
      "how many planets",
      "count of planets in solar system"
    ]
  },
  {
    number: 76,
    id: "GK_RED_PLANET",
    category: "H",
    categoryName: CATEGORIES.H,
    name: "Which planet is known as the Red Planet?",
    variations: [
      "which planet is known as the red planet",
      "which planet is known as the red planet?",
      "what planet is the red planet",
      "why is mars called the red planet",
      "the red planet",
      "red planet in solar system",
      "which planet is called red planet",
      "what is the red planet called"
    ]
  },
  {
    number: 77,
    id: "GK_LARGEST_OCEAN",
    category: "H",
    categoryName: CATEGORIES.H,
    name: "What is the largest ocean on Earth?",
    variations: [
      "what is the largest ocean on earth",
      "what is the largest ocean on earth?",
      "largest ocean",
      "what is the biggest ocean",
      "biggest ocean in the world",
      "which is the largest ocean",
      "largest ocean on earth",
      "which ocean is the biggest"
    ]
  },
  {
    number: 78,
    id: "GK_FASTEST_ANIMAL",
    category: "H",
    categoryName: CATEGORIES.H,
    name: "What is the fastest land animal?",
    variations: [
      "what is the fastest land animal",
      "what is the fastest land animal?",
      "fastest land animal",
      "fastest animal on land",
      "which animal runs the fastest",
      "what animal is the fastest on land",
      "world's fastest land animal",
      "fastest land mammal"
    ]
  },
  {
    number: 79,
    id: "GK_HEXAGON_SIDES",
    category: "H",
    categoryName: CATEGORIES.H,
    name: "How many sides does a hexagon have?",
    variations: [
      "how many sides does a hexagon have",
      "how many sides does a hexagon have?",
      "hexagon sides",
      "how many sides in a hexagon",
      "sides of a hexagon",
      "number of sides on a hexagon",
      "a hexagon has how many sides",
      "how many sides does hexagon have"
    ]
  },
  {
    number: 80,
    id: "GK_WATER_FORMULA",
    category: "H",
    categoryName: CATEGORIES.H,
    name: "What is the chemical formula of water?",
    variations: [
      "what is the chemical formula of water",
      "what is the chemical formula of water?",
      "chemical formula of water",
      "formula of water",
      "chemical formula for water",
      "what is the molecular formula of water",
      "what is water in chemical formula",
      "water chemical formula"
    ]
  },

  // --- Category I: Lifestyle & Everyday Questions (81-90) ---
  {
    number: 81,
    id: "LIFE_QUOTE",
    category: "I",
    categoryName: CATEGORIES.I,
    name: "Give me a motivational quote",
    variations: [
      "give me a motivational quote",
      "give me a motivational quote?",
      "motivational quote",
      "inspire me",
      "give me an inspiring quote",
      "share a motivational quote",
      "quote of the day",
      "tell me a motivational quote",
      "inspire me with a quote"
    ]
  },
  {
    number: 82,
    id: "LIFE_STUDY_TIP",
    category: "I",
    categoryName: CATEGORIES.I,
    name: "Give me a study tip",
    variations: [
      "give me a study tip",
      "give me a study tip?",
      "study tip",
      "how to study better",
      "tips for studying",
      "share a study tip",
      "help me study",
      "study advice",
      "best way to study"
    ]
  },
  {
    number: 83,
    id: "LIFE_CONCENTRATION",
    category: "I",
    categoryName: CATEGORIES.I,
    name: "How can I improve my concentration?",
    variations: [
      "how can i improve my concentration",
      "how can i improve my concentration?",
      "improve concentration",
      "how to improve focus and concentration",
      "tips to improve concentration",
      "boost my concentration",
      "how can i concentrate better",
      "ways to improve concentration"
    ]
  },
  {
    number: 84,
    id: "LIFE_HEALTHY_HABIT",
    category: "I",
    categoryName: CATEGORIES.I,
    name: "Suggest a healthy habit",
    variations: [
      "suggest a healthy habit",
      "suggest a healthy habit?",
      "healthy habit",
      "give me a healthy habit",
      "recommend a healthy habit",
      "good daily habits",
      "healthy lifestyle habit",
      "suggest a good habit",
      "healthy habit idea"
    ]
  },
  {
    number: 85,
    id: "LIFE_MORNING_ROUTINE",
    category: "I",
    categoryName: CATEGORIES.I,
    name: "Give me a morning routine",
    variations: [
      "give me a morning routine",
      "give me a morning routine?",
      "morning routine",
      "suggest a morning routine",
      "healthy morning routine",
      "productive morning routine",
      "what is a good morning routine",
      "recommend a morning routine"
    ]
  },
  {
    number: 86,
    id: "LIFE_BEDTIME_ROUTINE",
    category: "I",
    categoryName: CATEGORIES.I,
    name: "Give me a bedtime routine",
    variations: [
      "give me a bedtime routine",
      "give me a bedtime routine?",
      "bedtime routine",
      "suggest a bedtime routine",
      "healthy bedtime routine",
      "routine before sleep",
      "how to prepare for sleep",
      "night routine"
    ]
  },
  {
    number: 87,
    id: "LIFE_QUICK_WORKOUT",
    category: "I",
    categoryName: CATEGORIES.I,
    name: "Suggest a quick workout",
    variations: [
      "suggest a quick workout",
      "suggest a quick workout?",
      "quick workout",
      "7 minute workout",
      "quick exercise",
      "give me a 5 minute workout",
      "bodyweight workout routine",
      "quick home workout",
      "short workout routine"
    ]
  },
  {
    number: 88,
    id: "LIFE_STAY_ORGANIZED",
    category: "I",
    categoryName: CATEGORIES.I,
    name: "How can I stay organized?",
    variations: [
      "how can i stay organized",
      "how can i stay organized?",
      "how to stay organized",
      "tips to stay organized",
      "staying organized",
      "how do i organize my life",
      "help me get organized",
      "how to organize my work"
    ]
  },
  {
    number: 89,
    id: "LIFE_SUGGEST_HOBBY",
    category: "I",
    categoryName: CATEGORIES.I,
    name: "Suggest a hobby",
    variations: [
      "suggest a hobby",
      "suggest a hobby?",
      "give me a hobby",
      "recommend a hobby",
      "new hobby ideas",
      "what hobby should i pick up",
      "suggest a new hobby",
      "fun hobby recommendation"
    ]
  },
  {
    number: 90,
    id: "LIFE_FUN_ACTIVITY",
    category: "I",
    categoryName: CATEGORIES.I,
    name: "Tell me a fun activity to try",
    variations: [
      "tell me a fun activity to try",
      "tell me a fun activity to try?",
      "fun activity to try",
      "suggest a fun activity",
      "what is a fun activity",
      "give me a fun thing to do",
      "bored give me something fun to do",
      "fun activity recommendation"
    ]
  },

  // --- Category J: Chatbot Controls & Interaction (91-100) ---
  {
    number: 91,
    id: "CTRL_CLEAR_CHAT",
    category: "J",
    categoryName: CATEGORIES.J,
    name: "Clear chat",
    variations: [
      "clear chat",
      "clear the chat",
      "clear messages",
      "clear chat history",
      "clear the conversation",
      "delete chat history",
      "wipe chat",
      "empty chat"
    ]
  },
  {
    number: 92,
    id: "CTRL_RESET_CONVERSATION",
    category: "J",
    categoryName: CATEGORIES.J,
    name: "Reset conversation",
    variations: [
      "reset conversation",
      "reset chat",
      "restart chat",
      "start over",
      "restart conversation",
      "reset the chatbot",
      "reboot conversation",
      "new conversation"
    ]
  },
  {
    number: 93,
    id: "CTRL_REPEAT_THAT",
    category: "J",
    categoryName: CATEGORIES.J,
    name: "Repeat that",
    variations: [
      "repeat that",
      "repeat that please",
      "can you repeat that",
      "could you repeat that",
      "repeat the last message",
      "repeat what you said",
      "repeat last response",
      "repeat please"
    ]
  },
  {
    number: 94,
    id: "CTRL_SAY_AGAIN",
    category: "J",
    categoryName: CATEGORIES.J,
    name: "Say that again",
    variations: [
      "say that again",
      "say that again please",
      "can you say that again",
      "what did you just say",
      "say again",
      "say it once more",
      "tell me that again",
      "can you say it again"
    ]
  },
  {
    number: 95,
    id: "CTRL_SPEAK_RESPONSE",
    category: "J",
    categoryName: CATEGORIES.J,
    name: "Speak this response",
    variations: [
      "speak this response",
      "speak response",
      "read that out loud",
      "read the response aloud",
      "speak that aloud",
      "read aloud",
      "say it out loud",
      "speak out loud"
    ]
  },
  {
    number: 96,
    id: "CTRL_STOP_SPEAKING",
    category: "J",
    categoryName: CATEGORIES.J,
    name: "Stop speaking",
    variations: [
      "stop speaking",
      "stop talking",
      "shut up",
      "be quiet",
      "stop voice",
      "mute speech",
      "silence",
      "stop speech"
    ]
  },
  {
    number: 97,
    id: "CTRL_VOICE_MODE_ON",
    category: "J",
    categoryName: CATEGORIES.J,
    name: "Turn on voice mode",
    variations: [
      "turn on voice mode",
      "enable voice mode",
      "activate voice mode",
      "voice mode on",
      "start voice mode",
      "turn voice mode on",
      "enable speech",
      "turn speech on"
    ]
  },
  {
    number: 98,
    id: "CTRL_VOICE_MODE_OFF",
    category: "J",
    categoryName: CATEGORIES.J,
    name: "Turn off voice mode",
    variations: [
      "turn off voice mode",
      "disable voice mode",
      "deactivate voice mode",
      "voice mode off",
      "stop voice mode",
      "turn voice mode off",
      "disable speech",
      "turn speech off"
    ]
  },
  {
    number: 99,
    id: "CTRL_SHOW_COMMANDS",
    category: "J",
    categoryName: CATEGORIES.J,
    name: "Show available commands",
    variations: [
      "show available commands",
      "show commands",
      "help",
      "list commands",
      "what are the commands",
      "show all commands",
      "command list",
      "list available features",
      "help menu",
      "show help",
      "what can you do"
    ]
  },
  {
    number: 100,
    id: "CTRL_GOODBYE",
    category: "J",
    categoryName: CATEGORIES.J,
    name: "Goodbye",
    variations: [
      "goodbye",
      "bye",
      "bye bye",
      "see you later",
      "farewell",
      "cya",
      "have a good day",
      "good bye",
      "catch you later",
      "see ya"
    ]
  }
];

export function getAllIntents() {
  return INTENTS;
}

export function getIntentById(id) {
  return INTENTS.find((i) => i.id === id);
}

export function getIntentByNumber(num) {
  return INTENTS.find((i) => i.number === num);
}
