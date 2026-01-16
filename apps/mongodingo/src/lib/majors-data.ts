export interface Major {
  id: string
  title: string
  titleMn: string
  description: string
  descriptionMn: string
  salary: string
  salaryMn: string
  jobOpenings: string
  jobOpeningsMn: string
  demand: "high" | "very-high" | "medium"
  demandMn: string
  icon: string
  overview: string
  overviewMn: string
  skills: string[]
  skillsMn: string[]
}

export const majors: Major[] = [
  {
    id: "software-engineering",
    title: "Software Engineering",
    titleMn: "Програм хангамжийн инженерчлэл",
    description: "Design, develop, and maintain software systems",
    descriptionMn: "Програм хангамж зохион бүтээх, хөгжүүлэх, засвар үйлчилгээ хийх",
    salary: "₮3.5M - ₮8M/month",
    salaryMn: "Сар бүр 3.5М - 8М төгрөг",
    jobOpenings: "250+ openings",
    jobOpeningsMn: "250+ ажлын байр",
    demand: "very-high",
    demandMn: "Маш өндөр",
    icon: "code",
    overview:
      "Software Engineering is the systematic application of engineering principles to software development. You'll learn to design scalable systems, write clean code, and work in agile teams.",
    overviewMn:
      "Програм хангамжийн инженерчлэл нь инженерчлэлийн зарчмуудыг програм хангамжийн хөгжүүлэлтэд системтэйгээр хэрэглэх мэргэжил юм. Та өргөжих системийг зохион бүтээх, цэвэр код бичих, agile багт ажиллах арга барилыг эзэмшинэ.",
    skills: [
      "Programming Languages (Java, Python, C++)",
      "Data Structures & Algorithms",
      "Software Design Patterns",
      "Version Control (Git)",
      "Testing & Debugging",
      "System Architecture",
    ],
    skillsMn: [
      "Програмчлалын хэл (Java, Python, C++)",
      "Өгөгдлийн бүтэц ба алгоритм",
      "Програм хангамжийн загвар",
      "Хувилбарын хяналт (Git)",
      "Тестлэх ба алдаа засах",
      "Системийн архитектур",
    ],
  },
  {
    id: "web-development",
    title: "Web Development",
    titleMn: "Вэб хөгжүүлэлт",
    description: "Build modern web applications and websites",
    descriptionMn: "Орчин үеийн вэб программ, вэбсайт бүтээх",
    salary: "₮3M - ₮7M/month",
    salaryMn: "Сар бүр 3М - 7М төгрөг",
    jobOpenings: "300+ openings",
    jobOpeningsMn: "300+ ажлын байр",
    demand: "very-high",
    demandMn: "Маш өндөр",
    icon: "globe",
    overview:
      "Web Development focuses on creating websites and web applications. Learn frontend, backend, and full-stack development to build complete web solutions.",
    overviewMn:
      "Вэб хөгжүүлэлт нь вэбсайт болон вэб программуудыг бүтээхэд төвлөрдөг. Frontend, backend болон full-stack хөгжүүлэлтийг сурч, бүрэн вэб шийдлүүдийг бүтээнэ.",
    skills: [
      "HTML, CSS, JavaScript",
      "React / Vue / Angular",
      "Node.js / Express",
      "Databases (SQL, MongoDB)",
      "REST APIs & GraphQL",
      "Responsive Design",
    ],
    skillsMn: [
      "HTML, CSS, JavaScript",
      "React / Vue / Angular",
      "Node.js / Express",
      "Өгөгдлийн сан (SQL, MongoDB)",
      "REST APIs & GraphQL",
      "Responsive дизайн",
    ],
  },
  {
    id: "mobile-development",
    title: "Mobile Development",
    titleMn: "Мобайл хөгжүүлэлт",
    description: "Create native and cross-platform mobile apps",
    descriptionMn: "Native болон cross-platform мобайл апп бүтээх",
    salary: "₮3.5M - ₮7.5M/month",
    salaryMn: "Сар бүр 3.5М - 7.5М төгрөг",
    jobOpenings: "180+ openings",
    jobOpeningsMn: "180+ ажлын байр",
    demand: "high",
    demandMn: "Өндөр",
    icon: "smartphone",
    overview:
      "Mobile Development involves creating applications for iOS and Android platforms. Master native development or cross-platform frameworks to reach millions of users.",
    overviewMn:
      "Мобайл хөгжүүлэлт нь iOS болон Android платформд зориулсан программуудыг бүтээх мэргэжил. Native хөгжүүлэлт эсвэл cross-platform фреймворкуудыг эзэмшиж, сая сая хэрэглэгчдэд хүрнэ.",
    skills: [
      "Swift / Kotlin / Java",
      "React Native / Flutter",
      "Mobile UI/UX Design",
      "Push Notifications",
      "App Store Optimization",
      "Mobile Security",
    ],
    skillsMn: [
      "Swift / Kotlin / Java",
      "React Native / Flutter",
      "Мобайл UI/UX дизайн",
      "Push мэдэгдэл",
      "App Store оновчлол",
      "Мобайл аюулгүй байдал",
    ],
  },
  {
    id: "data-science",
    title: "Data Science",
    titleMn: "Өгөгдлийн шинжлэх ухаан",
    description: "Analyze data and build predictive models",
    descriptionMn: "Өгөгдөл шинжлэх, таамаглах загвар бүтээх",
    salary: "₮4M - ₮9M/month",
    salaryMn: "Сар бүр 4М - 9М төгрөг",
    jobOpenings: "150+ openings",
    jobOpeningsMn: "150+ ажлын байр",
    demand: "very-high",
    demandMn: "Маш өндөр",
    icon: "bar-chart",
    overview:
      "Data Science combines statistics, programming, and domain knowledge to extract insights from data. Learn to build models that predict trends and drive business decisions.",
    overviewMn:
      "Өгөгдлийн шинжлэх ухаан нь статистик, програмчлал, салбарын мэдлэгийг хослуулан өгөгдлөөс ойлголт гаргаж авдаг. Чиг хандлагыг таамаглах, бизнесийн шийдвэр гаргахад туслах загваруудыг бүтээнэ.",
    skills: [
      "Python / R",
      "Statistics & Probability",
      "Machine Learning",
      "Data Visualization",
      "SQL & Big Data",
      "Pandas, NumPy, Scikit-learn",
    ],
    skillsMn: [
      "Python / R",
      "Статистик ба магадлал",
      "Машин сургалт",
      "Өгөгдлийн дүрслэл",
      "SQL & Big Data",
      "Pandas, NumPy, Scikit-learn",
    ],
  },
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    titleMn: "Хиймэл оюун ба машин сургалт",
    description: "Build intelligent systems and AI models",
    descriptionMn: "Оюуны систем, AI загвар бүтээх",
    salary: "₮5M - ₮12M/month",
    salaryMn: "Сар бүр 5М - 12М төгрөг",
    jobOpenings: "120+ openings",
    jobOpeningsMn: "120+ ажлын байр",
    demand: "very-high",
    demandMn: "Маш өндөр",
    icon: "brain",
    overview:
      "AI & Machine Learning focuses on creating systems that can learn and make decisions. Work on cutting-edge technologies like deep learning, computer vision, and natural language processing.",
    overviewMn:
      "Хиймэл оюун ба машин сургалт нь суралцаж, шийдвэр гаргах чадвартай системүүдийг бүтээхэд төвлөрдөг. Гүн сургалт, компьютерын харах чадвар, байгалийн хэлний боловсруулалт зэрэг хамгийн сүүлийн үеийн технологиудтай ажиллана.",
    skills: [
      "Deep Learning (TensorFlow, PyTorch)",
      "Neural Networks",
      "Computer Vision",
      "Natural Language Processing",
      "Reinforcement Learning",
      "Model Deployment",
    ],
    skillsMn: [
      "Гүн сургалт (TensorFlow, PyTorch)",
      "Нейрон сүлжээ",
      "Компьютерын харах чадвар",
      "Байгалийн хэлний боловсруулалт",
      "Тэжээлт сургалт",
      "Загварыг ашиглалтад оруулах",
    ],
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    titleMn: "Кибер аюулгүй байдал",
    description: "Protect systems and data from cyber threats",
    descriptionMn: "Систем, өгөгдлийг кибер аюулаас хамгаалах",
    salary: "₮4M - ₮10M/month",
    salaryMn: "Сар бүр 4М - 10М төгрөг",
    jobOpenings: "100+ openings",
    jobOpeningsMn: "100+ ажлын байр",
    demand: "very-high",
    demandMn: "Маш өндөр",
    icon: "shield",
    overview:
      "Cybersecurity professionals protect organizations from digital threats. Learn ethical hacking, network security, and how to defend against cyberattacks.",
    overviewMn:
      "Кибер аюулгүй байдлын мэргэжилтнүүд байгууллагуудыг дижитал аюулаас хамгаалдаг. Ёс зүйт хакинг, сүлжээний аюулгүй байдал, кибер халдлагаас хамгаалах аргуудыг сурна.",
    skills: [
      "Network Security",
      "Penetration Testing",
      "Cryptography",
      "Security Tools (Wireshark, Metasploit)",
      "Incident Response",
      "Security Compliance",
    ],
    skillsMn: [
      "Сүлжээний аюулгүй байдал",
      "Нэвтрэх тестлэгээ",
      "Криптограф",
      "Аюулгүй байдлын хэрэгслүүд",
      "Осол гэмтлийн хариу үйлдэл",
      "Аюулгүй байдлын дагаж мөрдөх",
    ],
  },
  {
    id: "devops-cloud",
    title: "DevOps / Cloud",
    titleMn: "DevOps / Үүлэн тооцоолол",
    description: "Automate and manage cloud infrastructure",
    descriptionMn: "Үүлэн дэд бүтцийг автоматжуулах, удирдах",
    salary: "₮4M - ₮9M/month",
    salaryMn: "Сар бүр 4М - 9М төгрөг",
    jobOpenings: "130+ openings",
    jobOpeningsMn: "130+ ажлын байр",
    demand: "high",
    demandMn: "Өндөр",
    icon: "cloud",
    overview:
      "DevOps combines development and operations to improve software delivery. Learn to automate deployments, manage cloud services, and ensure system reliability.",
    overviewMn:
      "DevOps нь хөгжүүлэлт болон үйл ажиллагааг хослуулан програм хангамжийн хүргэлтийг сайжруулдаг. Автомат байршуулалт, үүлэн үйлчилгээний удирдлага, системийн найдвартай байдлыг хангах арга барилыг сурна.",
    skills: [
      "Docker & Kubernetes",
      "CI/CD Pipelines",
      "AWS / Azure / GCP",
      "Infrastructure as Code",
      "Monitoring & Logging",
      "Linux Administration",
    ],
    skillsMn: [
      "Docker & Kubernetes",
      "CI/CD Pipeline",
      "AWS / Azure / GCP",
      "Дэд бүтцийг код хэлбэрээр",
      "Хяналт ба бүртгэл",
      "Linux удирдлага",
    ],
  },
  {
    id: "game-development",
    title: "Game Development",
    titleMn: "Тоглоом хөгжүүлэлт",
    description: "Create engaging games and interactive experiences",
    descriptionMn: "Сонирхолтой тоглоом, харилцан үйлчлэлийн туршлага бүтээх",
    salary: "₮3M - ₮7M/month",
    salaryMn: "Сар бүр 3М - 7М төгрөг",
    jobOpenings: "80+ openings",
    jobOpeningsMn: "80+ ажлын байр",
    demand: "medium",
    demandMn: "Дунд",
    icon: "gamepad",
    overview:
      "Game Development involves creating interactive entertainment experiences. Learn game engines, 3D graphics, physics, and how to build games for multiple platforms.",
    overviewMn:
      "Тоглоом хөгжүүлэлт нь харилцан үйлчлэлийн зугаа цэнгэлийн туршлагыг бүтээх мэргэжил. Тоглоомын engine, 3D график, физик, олон платформд зориулсан тоглоом бүтээх аргуудыг сурна.",
    skills: [
      "Unity / Unreal Engine",
      "C# / C++",
      "3D Modeling & Animation",
      "Game Physics",
      "Game Design Principles",
      "Multiplayer Networking",
    ],
    skillsMn: [
      "Unity / Unreal Engine",
      "C# / C++",
      "3D загварчлал ба хөдөлгөөн",
      "Тоглоомын физик",
      "Тоглоомын дизайны зарчим",
      "Олон тоглогчтой сүлжээ",
    ],
  },
]

export function getMajorById(id: string): Major | undefined {
  return majors.find((major) => major.id === id)
}
