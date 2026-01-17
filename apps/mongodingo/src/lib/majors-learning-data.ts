export interface Question {
  id: number
  question: string
  questionMn: string
  code?: string
  answers: string[]
  answersMn: string[]
  correctIndex: number
}

export interface Lesson {
  id: string
  title: string
  titleMn: string
  description: string
  descriptionMn: string
  questions: Question[]
}

export interface Course {
  id: string
  title: string
  titleMn: string
  subtitle: string
  subtitleMn: string
  icon: string
  estimatedMinutes: number
  xpReward: number
  lessons: Lesson[]
}

export interface Major {
  id: string
  title: string
  titleMn: string
  description: string
  descriptionMn: string
  courses: Course[]
}

export const majors: Major[] = [
  {
    id: "web-development",
    title: "Web Development",
    titleMn: "Веб хөгжүүлэлт",
    description: "Build modern websites and web applications",
    descriptionMn: "Орчин үеийн вэбсайт болон веб аппликэйшн бүтээх",
    courses: [
      {
        id: "javascript-basics",
        title: "JavaScript Basics",
        titleMn: "JavaScript үндэс",
        subtitle: "Master the fundamentals of JavaScript",
        subtitleMn: "JavaScript-ийн үндсийг эзэмших",
        icon: "⚡",
        estimatedMinutes: 45,
        xpReward: 300,
        lessons: [
          {
            id: "variables",
            title: "Variables",
            titleMn: "Хувьсагч",
            description: "Learn about variables and declarations",
            descriptionMn: "Хувьсагч болон зарлалтын тухай суралцах",
            questions: [
              {
                id: 1,
                question: "Which keyword declares a variable?",
                questionMn: "Хувьсагч зарлах түлхүүр үг аль нь вэ?",
                answers: ["var", "loop", "define", "fn"],
                answersMn: ["var", "loop", "define", "fn"],
                correctIndex: 0,
              },
              {
                id: 2,
                question: "Which keyword cannot be reassigned?",
                questionMn: "Аль түлхүүр үгийг дахин оноож болохгүй вэ?",
                answers: ["const", "let", "var", "change"],
                answersMn: ["const", "let", "var", "change"],
                correctIndex: 0,
              },
              {
                id: 3,
                question: "What symbol assigns a value?",
                questionMn: "Утга оноох тэмдэг аль нь вэ?",
                answers: ["=", "==", "===", "::"],
                answersMn: ["=", "==", "===", "::"],
                correctIndex: 0,
              },
              {
                id: 4,
                question: "Which variable is block-scoped?",
                questionMn: "Аль хувьсагч нь блок хүрээтэй вэ?",
                answers: ["let", "var", "global", "static"],
                answersMn: ["let", "var", "global", "static"],
                correctIndex: 0,
              },
              {
                id: 5,
                question: "typeof 5 returns?",
                questionMn: "typeof 5 юу буцаах вэ?",
                code: "console.log(typeof 5)",
                answers: ['"number"', '"int"', '"float"', '"value"'],
                answersMn: ['"number"', '"int"', '"float"', '"value"'],
                correctIndex: 0,
              },
            ],
          },
          {
            id: "data-types",
            title: "Data Types",
            titleMn: "Өгөгдлийн төрөл",
            description: "Understanding data types in JavaScript",
            descriptionMn: "JavaScript дахь өгөгдлийн төрлүүд",
            questions: [
              {
                id: 1,
                question: "Which is NOT a primitive type?",
                questionMn: "Аль нь primitive төрөл биш вэ?",
                answers: ["object", "string", "number", "boolean"],
                answersMn: ["object", "string", "number", "boolean"],
                correctIndex: 0,
              },
              {
                id: 2,
                question: "What does NaN stand for?",
                questionMn: "NaN юуг илэрхийлэх вэ?",
                answers: ["Not a Number", "Null and None", "New Array Node", "Negative Number"],
                answersMn: ["Тоо биш", "Хоосон", "Шинэ массив", "Сөрөг тоо"],
                correctIndex: 0,
              },
              {
                id: 3,
                question: "Which represents absence of value?",
                questionMn: "Утга байхгүй байдлыг илэрхийлдэг аль нь вэ?",
                answers: ["null", "zero", "false", "empty"],
                answersMn: ["null", "zero", "false", "empty"],
                correctIndex: 0,
              },
              {
                id: 4,
                question: "typeof [] returns?",
                questionMn: "typeof [] юу буцаах вэ?",
                code: "console.log(typeof [])",
                answers: ['"object"', '"array"', '"list"', '"collection"'],
                answersMn: ['"object"', '"array"', '"list"', '"collection"'],
                correctIndex: 0,
              },
              {
                id: 5,
                question: "Which is a falsy value?",
                questionMn: "Аль нь falsy утга вэ?",
                answers: ["0", '"0"', "[]", "{}"],
                answersMn: ["0", '"0"', "[]", "{}"],
                correctIndex: 0,
              },
            ],
          },
          {
            id: "operators",
            title: "Operators",
            titleMn: "Операторууд",
            description: "Working with operators",
            descriptionMn: "Операторуудтай ажиллах",
            questions: [
              {
                id: 1,
                question: "What does === check?",
                questionMn: "=== юуг шалгах вэ?",
                answers: ["Value and Type", "Value only", "Type only", "Reference"],
                answersMn: ["Утга ба төрөл", "Зөвхөн утга", "Зөвхөн төрөл", "Лавлагаа"],
                correctIndex: 0,
              },
              {
                id: 2,
                question: "What is 5 + '5' in JavaScript?",
                questionMn: "JavaScript дээр 5 + '5' юу вэ?",
                answers: ['"55"', "10", "Error", "NaN"],
                answersMn: ['"55"', "10", "Алдаа", "NaN"],
                correctIndex: 0,
              },
              {
                id: 3,
                question: "Which operator is for exponentiation?",
                questionMn: "Зэрэглэлийн оператор аль нь вэ?",
                answers: ["**", "^", "exp", "pow"],
                answersMn: ["**", "^", "exp", "pow"],
                correctIndex: 0,
              },
              {
                id: 4,
                question: "What does ++ do?",
                questionMn: "++ юу хийх вэ?",
                answers: ["Increment by 1", "Add two numbers", "Concatenate", "Compare"],
                answersMn: ["1-ээр нэмэгдүүлэх", "Хоёр тоог нэмэх", "Холбох", "Харьцуулах"],
                correctIndex: 0,
              },
              {
                id: 5,
                question: "What is the logical AND operator?",
                questionMn: "Логик AND оператор аль нь вэ?",
                answers: ["&&", "||", "&", "AND"],
                answersMn: ["&&", "||", "&", "AND"],
                correctIndex: 0,
              },
            ],
          },
          {
            id: "functions",
            title: "Functions",
            titleMn: "Функцууд",
            description: "Master JavaScript functions",
            descriptionMn: "JavaScript функцуудыг эзэмших",
            questions: [
              {
                id: 1,
                question: "Which keyword declares a function?",
                questionMn: "Функц зарлах түлхүүр үг аль нь вэ?",
                answers: ["function", "func", "def", "fn"],
                answersMn: ["function", "func", "def", "fn"],
                correctIndex: 0,
              },
              {
                id: 2,
                question: "What is an arrow function syntax?",
                questionMn: "Arrow функцийн синтакс аль нь вэ?",
                answers: ["() => {}", "() -> {}", "=> () {}", "function() =>"],
                answersMn: ["() => {}", "() -> {}", "=> () {}", "function() =>"],
                correctIndex: 0,
              },
              {
                id: 3,
                question: "What keyword returns a value?",
                questionMn: "Утга буцаах түлхүүр үг аль нь вэ?",
                answers: ["return", "output", "result", "give"],
                answersMn: ["return", "output", "result", "give"],
                correctIndex: 0,
              },
              {
                id: 4,
                question: "What are function inputs called?",
                questionMn: "Функцийн оролтыг юу гэж нэрлэх вэ?",
                answers: ["parameters", "variables", "inputs", "values"],
                answersMn: ["параметр", "хувьсагч", "оролт", "утга"],
                correctIndex: 0,
              },
              {
                id: 5,
                question: "Can functions be assigned to variables?",
                questionMn: "Функцийг хувьсагчид оноож болох уу?",
                answers: ["Yes", "No", "Only arrow functions", "Only named functions"],
                answersMn: ["Тийм", "Үгүй", "Зөвхөн arrow", "Зөвхөн нэртэй"],
                correctIndex: 0,
              },
            ],
          },
          {
            id: "conditionals",
            title: "Conditionals",
            titleMn: "Нөхцөл",
            description: "Learn if/else statements",
            descriptionMn: "If/else хэллэгийг сурах",
            questions: [
              {
                id: 1,
                question: "Which keyword starts a conditional?",
                questionMn: "Нөхцөл эхлүүлэх түлхүүр үг аль нь вэ?",
                answers: ["if", "when", "check", "condition"],
                answersMn: ["if", "when", "check", "condition"],
                correctIndex: 0,
              },
              {
                id: 2,
                question: "What comes after if condition fails?",
                questionMn: "If нөхцөл биелээгүй үед юу ирэх вэ?",
                answers: ["else", "then", "otherwise", "or"],
                answersMn: ["else", "then", "otherwise", "or"],
                correctIndex: 0,
              },
              {
                id: 3,
                question: "What is else if used for?",
                questionMn: "else if-ийг юунд хэрэглэх вэ?",
                answers: ["Multiple conditions", "Loop", "Function", "Variable"],
                answersMn: ["Олон нөхцөл", "Давталт", "Функц", "Хувьсагч"],
                correctIndex: 0,
              },
              {
                id: 4,
                question: "Which is a ternary operator?",
                questionMn: "Ternary оператор аль нь вэ?",
                answers: ["? :", "if else", "switch", "&&"],
                answersMn: ["? :", "if else", "switch", "&&"],
                correctIndex: 0,
              },
              {
                id: 5,
                question: "What does switch statement do?",
                questionMn: "switch хэллэг юу хийх вэ?",
                answers: ["Multiple case checks", "Loop through array", "Declare variable", "Call function"],
                answersMn: ["Олон тохиолдол шалгах", "Массив давтах", "Хувьсагч зарлах", "Функц дуудах"],
                correctIndex: 0,
              },
            ],
          },
          {
            id: "loops",
            title: "Loops",
            titleMn: "Давталт",
            description: "Master loops and iteration",
            descriptionMn: "Давталт болон итерацийг эзэмших",
            questions: [
              {
                id: 1,
                question: "Which creates a basic loop?",
                questionMn: "Үндсэн давталт үүсгэх аль нь вэ?",
                answers: ["for", "loop", "repeat", "iterate"],
                answersMn: ["for", "loop", "repeat", "iterate"],
                correctIndex: 0,
              },
              {
                id: 2,
                question: "What does while loop check?",
                questionMn: "while давталт юуг шалгах вэ?",
                answers: ["Condition before each iteration", "Condition after", "Index", "Array length"],
                answersMn: ["Давталт бүрийн өмнө нөхцөл", "Давталтын дараа", "Индекс", "Массивын урт"],
                correctIndex: 0,
              },
              {
                id: 3,
                question: "What keyword exits a loop?",
                questionMn: "Давталтаас гарах түлхүүр үг аль нь вэ?",
                answers: ["break", "stop", "exit", "end"],
                answersMn: ["break", "stop", "exit", "end"],
                correctIndex: 0,
              },
              {
                id: 4,
                question: "What does continue do in a loop?",
                questionMn: "continue давталтад юу хийх вэ?",
                answers: ["Skip to next iteration", "Exit loop", "Restart loop", "Pause loop"],
                answersMn: ["Дараагийн давталт руу шилжих", "Давталтаас гарах", "Давталт дахин эхлүүлэх", "Зогсоох"],
                correctIndex: 0,
              },
              {
                id: 5,
                question: "Which loop is best for arrays?",
                questionMn: "Массивт хамгийн тохиромжтой давталт аль нь вэ?",
                answers: ["forEach", "while", "do-while", "if"],
                answersMn: ["forEach", "while", "do-while", "if"],
                correctIndex: 0,
              },
            ],
          },
        ],
      },
      {
        id: "html-css",
        title: "HTML & CSS",
        titleMn: "HTML ба CSS",
        subtitle: "Build beautiful web layouts",
        subtitleMn: "Үзэсгэлэнтэй веб дизайн бүтээх",
        icon: "🎨",
        estimatedMinutes: 60,
        xpReward: 350,
        lessons: [
          {
            id: "html-basics",
            title: "HTML Basics",
            titleMn: "HTML үндэс",
            description: "Learn HTML structure",
            descriptionMn: "HTML бүтцийг суралцах",
            questions: [
              {
                id: 1,
                question: "What does HTML stand for?",
                questionMn: "HTML юуг илэрхийлэх вэ?",
                answers: [
                  "HyperText Markup Language",
                  "High Tech Modern Language",
                  "Home Tool Markup Language",
                  "Hyperlinks Text Management Language",
                ],
                answersMn: [
                  "HyperText Markup Language",
                  "High Tech Modern Language",
                  "Home Tool Markup Language",
                  "Hyperlinks Text Management Language",
                ],
                correctIndex: 0,
              },
              {
                id: 2,
                question: "Which tag creates a paragraph?",
                questionMn: "Параграф үүсгэх таг аль нь вэ?",
                answers: ["<p>", "<para>", "<text>", "<paragraph>"],
                answersMn: ["<p>", "<para>", "<text>", "<paragraph>"],
                correctIndex: 0,
              },
              {
                id: 3,
                question: "What is the largest heading tag?",
                questionMn: "Хамгийн том гарчиг таг аль нь вэ?",
                answers: ["<h1>", "<h6>", "<heading>", "<title>"],
                answersMn: ["<h1>", "<h6>", "<heading>", "<title>"],
                correctIndex: 0,
              },
              {
                id: 4,
                question: "Which tag creates a link?",
                questionMn: "Холбоос үүсгэх таг аль нь вэ?",
                answers: ["<a>", "<link>", "<href>", "<url>"],
                answersMn: ["<a>", "<link>", "<href>", "<url>"],
                correctIndex: 0,
              },
              {
                id: 5,
                question: "What attribute specifies image source?",
                questionMn: "Зургийн эх сурвалж заах атрибут аль нь вэ?",
                answers: ["src", "href", "source", "img"],
                answersMn: ["src", "href", "source", "img"],
                correctIndex: 0,
              },
            ],
          },
        ],
      },
      {
        id: "react-fundamentals",
        title: "React Fundamentals",
        titleMn: "React үндэс",
        subtitle: "Build interactive UIs with React",
        subtitleMn: "React ашиглан интерактив UI бүтээх",
        icon: "⚛️",
        estimatedMinutes: 90,
        xpReward: 450,
        lessons: [],
      },
    ],
  },
  {
    id: "game-development",
    title: "Game Development",
    titleMn: "Тоглоом хөгжүүлэлт",
    description: "Create amazing games",
    descriptionMn: "Гайхалтай тоглоом бүтээх",
    courses: [
      {
        id: "unity-basics",
        title: "Unity Basics",
        titleMn: "Unity үндэс",
        subtitle: "Start creating games with Unity",
        subtitleMn: "Unity ашиглан тоглоом бүтээж эхлэх",
        icon: "🎮",
        estimatedMinutes: 120,
        xpReward: 500,
        lessons: [],
      },
    ],
  },
]
