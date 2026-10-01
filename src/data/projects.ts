/** Mostly what I did on the project, closing with a point or two of context. */
export type Highlight = {
  label: string
  body: string
}

export type Shot = {
  /** Path under `public/`. */
  src: string
  alt: string
}

export type Project = {
  slug: string
  title: string
  /** Used where the full title would wrap badly, e.g. prev/next links. */
  shortTitle: string
  category: string
  /** Course code or "Personal project", the line under the category. */
  context: string
  /** One sentence for the project list. */
  summary: string
  /** Paragraphs for the case-study page. */
  overview: readonly string[]
  highlights: readonly Highlight[]
  stack: readonly string[]
  /** Path under `public/`. Left out, the layout falls back to a title plate. */
  image?: string | undefined
  /** Extra screenshots, shown after `image` in the case-study slideshow. */
  gallery?: readonly Shot[] | undefined
  /** Left out for private repositories, where a link would only 404. */
  repoUrl?: string | undefined
  liveUrl?: string | undefined
  /** Button text for `liveUrl`, when "Open the live site" is the wrong noun. */
  liveLabel?: string | undefined
}

const catalogue: readonly Project[] = [
  {
    slug: 'pharmalytics',
    title: 'Pharmalytics',
    shortTitle: 'Pharmalytics',
    category: 'Full-stack web',
    context: 'DLSU: STSWENG',
    summary:
      'An internal patient-records tool for a health clinic, built as a capstone and revived years later as a real production system.',
    overview: [
      'Pharmalytics is an internal tool for a health and pharmacy client. Staff record patient profiles, biometric visits, and medical history, then browse, filter, and export records to Excel. It started as a DLSU capstone, built sprint by sprint with real client feedback.',
      'The project went dormant for about three years after that. I picked it back up on my own in 2026 to actually finish it properly: real role-based auth, CI/CD, automated backups, and a live deployment, instead of the version that just barely held together for a final demo.',
    ],
    highlights: [
      {
        label: 'From product owner to maintainer',
        body: 'Started as product owner and business analyst on a team of eight, shaping requirements and wireframes with the client. Later took the project over solo to make it production-ready.',
      },
      {
        label: 'Access control and a crash fix',
        body: 'Admin, encoder, and viewer roles are enforced on the server. I also fixed a session store that leaked a database connection on every request until the server went down.',
      },
      {
        label: 'CI and backups',
        body: 'Every pull request runs lint, backend tests, and a Playwright suite against a real database, and a scheduled job backs the data up to Google Drive weekly.',
      },
      {
        label: 'Patient records, end to end',
        body: 'Staff record profiles, visits, and medical history, then filter and export them to Excel. Each patient gets a readable ID like P-00001 from an atomic counter, so simultaneous saves never collide.',
      },
    ],
    stack: ['React', 'Vite', 'Tailwind CSS', 'Express', 'MongoDB', 'Mongoose', 'Playwright'],
    image: 'assets/projects/pharmalytics-1.webp',
    gallery: [
      {
        src: 'assets/projects/pharmalytics-2.webp',
        alt: 'Step one of the patient intake form, for profile data',
      },
      {
        src: 'assets/projects/pharmalytics-3.webp',
        alt: 'The biometrics step, with vitals fields and a table of past entries',
      },
    ],
  },
  {
    slug: 'ledgr',
    title: 'LEDGR',
    shortTitle: 'LEDGR',
    category: 'Full-stack web',
    context: 'Springboard internship',
    summary:
      'A self-hosted double-entry accounting system built around Philippine BIR tax rules, from the chart of accounts up to a catalogue of around sixty reports.',
    overview: [
      'LEDGR is a double-entry accounting system for Philippine businesses. It covers the chart of accounts, journals, expenses, invoices, estimates, purchase orders, bank reconciliation, and multi-currency, and it is meant to run on a Raspberry Pi on the office network instead of as a hosted service.',
      'Built as a team of three during an internship. Most of the backend was mine: the controller layer every route goes through, the journal logic, VAT and withholding tax, most of the reports, and auth and audit logging.',
    ],
    highlights: [
      {
        label: 'Tax handling',
        body: 'VAT-inclusive and exclusive entries, withholding tax, and ATC codes post to the right accounts automatically, including a withholding sign bug caught before it threw the books off.',
      },
      {
        label: 'The reports catalogue',
        body: 'Most of the roughly sixty reports, from profit and loss to aging and cash flow, with period comparisons and Excel export, all built on the same posted journal entries.',
      },
      {
        label: 'Journals, auth, and audit',
        body: 'Entries move from draft to posted to voided with rules on what can change, and every write is checked against the session and recorded in an audit log.',
      },
      {
        label: 'Built for the office',
        body: 'Single-tenant and self-hosted, meant to run on a Raspberry Pi on the local network. Uploaded receipts are read with OCR and a local LLM and turned into draft expenses.',
      },
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'PostgreSQL', 'Prisma', 'NextAuth', 'Tailwind CSS', 'daisyUI'],
    image: 'assets/projects/ledgr.webp',
  },
  {
    slug: 'compass-desk',
    title: 'CompassDesk',
    shortTitle: 'CompassDesk',
    category: 'Backend and AI',
    context: 'Springboard internship',
    summary:
      'An AI-assisted ticketing system for customer service teams, where an AI answers first and hands off to a human agent when it should.',
    overview: [
      'CompassDesk is a ticketing and triage system for BPO and customer service teams. A customer opens a ticket, an AI replies first using the company\'s own knowledge base, and the ticket escalates to a human agent when the customer asks for one, the AI decides it cannot help, or an agent claims it.',
      'I built the backend: the REST API, auth and roles, the AI chat flow, the knowledge base with retrieval, and the metrics endpoints that the frontend is built on.',
    ],
    highlights: [
      {
        label: 'Escalation the code can act on',
        body: 'When the model cannot help, it returns a small JSON signal instead of a reply, so handing a ticket to a person is a decision the backend makes rather than something buried in text.',
      },
      {
        label: 'Drafts for agents',
        body: 'Once a person takes over, each customer message comes with an AI-drafted reply they can edit, regenerate, or discard.',
      },
      {
        label: 'Knowledge base and roles',
        body: 'Documents are chunked, embedded, and stored per department for retrieval, and customers, agents, and admins are kept apart with JWT and role checks on the server.',
      },
      {
        label: 'Three views of one ticket',
        body: 'Customers, agents, and admins each get their own interface on the same ticket, with metrics by handler and department and redaction of customer details once they are no longer needed.',
      },
    ],
    stack: ['Node.js', 'Express', 'TypeScript', 'Supabase', 'PostgreSQL', 'Groq', 'Zod', 'Swagger'],
    image: 'assets/projects/compassdesk-1.webp',
    gallery: [
      {
        src: 'assets/projects/compassdesk-2.webp',
        alt: 'The customer request form, with department, subject, message, and attachments',
      },
      {
        src: 'assets/projects/compassdesk-3.webp',
        alt: 'A refund ticket where Compass AI replies first and a human handler takes over',
      },
      {
        src: 'assets/projects/compassdesk-4.webp',
        alt: 'The agent ticket queue, showing which tickets the AI agent or a person is handling',
      },
    ],
  },
  {
    slug: 'hopspring',
    title: 'HopSpring',
    shortTitle: 'HopSpring',
    category: 'AI tooling',
    context: 'Springboard internship',
    summary:
      'A Discord bot that indexes a team\'s project channels and daily reports so anyone can ask questions about them or get a scheduled digest.',
    overview: [
      'HopSpring is a Discord bot for keeping up with a busy server. It scrapes project channels and daily reports, stores them in a vector database, and lets people ask questions about them in a private thread, summarize a channel over a time range, or get an automatic digest posted on a schedule.',
      'It started as a web prototype with a separate frontend. I rebuilt the Discord side, then cut the web app entirely once it was clear everyone was only using the bot, which left one Node.js process with nothing else to deploy.',
    ],
    highlights: [
      {
        label: 'Incremental scraping',
        body: 'A pointer to the last scraped message is saved per channel, so each run only embeds what is new.',
      },
      {
        label: 'Images and API limits',
        body: 'Screenshots are captioned by a vision model before embedding, and API keys rotate when one runs out, which keeps it usable on free tiers.',
      },
      {
        label: 'Scheduled digests',
        body: 'Admins choose the channels and a daily, weekly, or monthly schedule straight from slash commands.',
      },
      {
        label: 'Answers that keep context',
        body: 'Retrieved passages are reranked and chat history carries over, so follow-up questions in a thread stay on track.',
      },
    ],
    stack: ['TypeScript', 'Node.js', 'discord.js', 'LangChain', 'Pinecone', 'Groq', 'Gemini'],
    image: 'assets/projects/hopspring-1.webp',
    gallery: [
      {
        src: 'assets/projects/hopspring-2.webp',
        alt: "HopSpring's Discord profile card, with its avatar and a short bio",
      },
    ],
  },
  {
    slug: 'tweekly',
    title: 'Tweekly: Weekly Schedule Maker',
    shortTitle: 'Tweekly',
    category: 'Frontend web',
    context: 'Personal project',
    summary:
      'A drag-and-drop weekly schedule builder that runs entirely in the browser and exports to PNG, PDF, or JSON.',
    overview: [
      'Tweekly is a weekly schedule builder. You draw blocks straight onto a grid, drag and resize them, and export the result as an image, a PDF, or a JSON file you can import again later. Everything is saved in the browser, so there is no account and no backend.',
      'I built it solo and it is live on Render. Most of the work went into the interaction details, since for a tool like this that is basically the whole product.',
    ],
    highlights: [
      {
        label: 'Hard and soft links',
        body: 'A block that repeats across days can be hard-linked, where everything stays in sync, or soft-linked, where only the time does and the rest can differ per day.',
      },
      {
        label: 'Editor-style controls',
        body: 'Draw, select, and edit modes, marquee selection, copy and paste at the cursor, undo and redo, and keyboard shortcuts for nearly all of it.',
      },
      {
        label: 'Conflicts flagged, not blocked',
        body: 'Overlapping blocks on the same day are highlighted instead of rejected, because sometimes two things really do overlap.',
      },
      {
        label: 'No backend at all',
        body: 'State lives in a Zustand store persisted to local storage, and a JSON export covers moving a schedule between devices.',
      },
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Zustand', 'jsPDF'],
    image: 'assets/projects/tweekly.webp',
    liveUrl: 'https://tweekly.onrender.com',
  },
  {
    slug: 'stella',
    title: 'STELLA: Story Reading Companion',
    shortTitle: 'STELLA',
    category: 'AI and web',
    context: 'DLSU: Thesis',
    summary:
      'A chatbot that reads storybooks alongside children and talks with them about the story, grounded in the text itself.',
    overview: [
      'STELLA is a web app where a child picks a storybook and reads it page by page with Stella, a chatbot that talks with them about what they have just read. It greets them on the cover, asks recall and comprehension questions as the story goes on, and keeps the conversation tied to the book instead of drifting.',
      "Built as a team of five. My part was mostly the reading flow and how Stella behaves: pacing by reading speed, the questioning phases, and a more reliable classifier for a child's messages.",
    ],
    highlights: [
      {
        label: 'Reading pace',
        body: 'Story sections are sized to grade-level reading-speed benchmarks, and phase timers tell a fast reader apart from one who has stopped.',
      },
      {
        label: 'Message classification',
        body: 'Reworked prompts and response validation raised classification accuracy from 50% to 83%. That classification decides whether Stella answers, redirects, or moves on.',
      },
      {
        label: 'The reading screen',
        body: 'Font size and spacing controls, a grade-level filter, and a page flip and chat that lock while Stella is still answering.',
      },
      {
        label: 'Grounded in the book',
        body: 'Passages are retrieved from Pinecone by similarity, and questions move from recall to understanding, analysis, and evaluation using FairytaleQA examples.',
      },
    ],
    stack: ['React', 'JavaScript', 'LangChain', 'Groq', 'Pinecone', 'Firebase'],
    image: 'assets/projects/stella-1.webp',
    gallery: [
      {
        src: 'assets/projects/stella-2.webp',
        alt: 'The same reading screen in dark mode, with the conversation continued',
      },
      {
        src: 'assets/projects/stella-3.webp',
        alt: 'The story library, with an A to Z filter and a search bar',
      },
    ],
  },
  {
    slug: 'd-enroll',
    title: 'D-Enroll: Enrollment System',
    shortTitle: 'D-Enroll',
    category: 'Distributed systems',
    context: 'DLSU: STDISCM',
    summary:
      'A university enrollment system split into gRPC microservices, one per feature, each in its own Docker container.',
    overview: [
      'D-Enroll is a web-based enrollment system with separate student and professor sides. Students browse courses, enroll and drop, view their assessment and grades, run a curriculum audit, and rate their professors. Professors see their classes and encode grades.',
      'Behind the React frontend, an Express gateway talks to eight backend services over gRPC, one each for login, courses, enrollment, faculty, grades, ratings, assessment, and the curriculum audit, all started together with Docker Compose. It was a five-person project, and I worked mostly on the frontend: the course pages, the student and faculty views, and wiring them to the gateway.',
    ],
    highlights: [
      {
        label: 'Student and faculty views',
        body: 'Course pages, enrolled courses, the faculty home, grade encoding, and the curriculum audit screen.',
      },
      {
        label: 'Clear enrollment feedback',
        body: 'The enroll button flips to drop as soon as a course is added, and toasts confirm each action, so students always know where they stand.',
      },
      {
        label: 'Wired to the gateway',
        body: 'Each view calls its service through the gateway, with loading states throughout so slow calls never look like a frozen page.',
      },
      {
        label: 'Microservices over gRPC',
        body: 'Eight Node.js services, one per feature, each in its own container behind a single Express gateway. Remaining seats are computed at query time, so the course list is never stale.',
      },
    ],
    stack: ['React', 'Node.js', 'Express', 'gRPC', 'MySQL', 'Docker'],
    image: 'assets/projects/d-enroll-1.webp',
    gallery: [
      {
        src: 'assets/projects/d-enroll-2.webp',
        alt: "A student's curriculum audit, with course statuses and a units summary",
      },
      {
        src: 'assets/projects/d-enroll-4.webp',
        alt: "The faculty view of a professor's handled sections",
      },
      {
        src: 'assets/projects/d-enroll-3.webp',
        alt: 'Course ratings from students, shown to the professor',
      },
    ],
  },
  {
    slug: 'solofit',
    title: 'SoloFit: Fitness Quest Tracker',
    shortTitle: 'SoloFit',
    category: 'Mobile app',
    context: 'DLSU: MOBICOM',
    summary:
      'An Android app that turns workouts into quests, with EXP, levels, and unlockable titles for sticking with them.',
    overview: [
      'SoloFit is an Android fitness and habit tracker built like a game. Workouts are quests on a quest board, every completed or abandoned attempt is logged, and completed quests earn EXP toward levels and titles you can equip.',
      "Built as a team of four. I designed and built the app's 24 screens, then worked on the SQLite layer behind history, summaries, and stats, and later the level and title system.",
    ],
    highlights: [
      {
        label: "The app's 24 screens",
        body: 'Designed and built the full interface, from the quest board and logging flow to status, daily summary, and quest history.',
      },
      {
        label: 'Data behind the screens',
        body: 'Connected quest history, daily summaries, settings, and stats to SQLite, including editing a logged quest after the fact.',
      },
      {
        label: 'Levels and titles',
        body: 'Quests earn EXP toward levels that unlock colour-coded titles, with a legend explaining each one, plus a daily quote from the ZenQuotes API.',
      },
      {
        label: 'Works offline',
        body: 'Everything is stored on the device, so there is no account to create and no connection needed.',
      },
    ],
    stack: ['Kotlin', 'Android', 'SQLite', 'Retrofit'],
    repoUrl: 'https://github.com/nimbus7462/solofit',
  },
  {
    slug: 'steam-data-warehouse',
    title: 'Steam Games Data Warehouse',
    shortTitle: 'Steam Warehouse',
    category: 'Data engineering',
    context: 'DLSU: STADVDB',
    summary:
      'A snowflake-schema data warehouse of 90,000+ Steam games, loaded by a Python ETL pipeline and explored in a Power BI dashboard.',
    overview: [
      'This project takes a raw dataset of over 90,000 Steam games and turns it into a warehouse built for analysis: a snowflake schema with one fact table and five dimensions, loaded into MySQL by a Python ETL pipeline.',
      'On top of it sits a Power BI dashboard for slicing the catalogue by genre, price, and player engagement, backed by OLAP queries tuned so that slicing stays fast. Built as a team of four.',
    ],
    highlights: [
      {
        label: 'Snowflake schema',
        body: 'One fact table and five dimensions, normalised further where it kept the data consistent.',
      },
      {
        label: 'Python ETL',
        body: 'pandas cleans and reshapes the raw data and SQLAlchemy loads it into MySQL, so the whole load can be rerun from scratch.',
      },
      {
        label: 'OLAP queries',
        body: 'Roll-up and slice queries tuned so the dashboard stays responsive across tens of thousands of games.',
      },
      {
        label: 'A public dashboard',
        body: 'Five report pages cover yearly releases by price tier, genres by playtime and price, how OS support relates to price, and how review counts track positive ratings. Anyone can open it.',
      },
    ],
    stack: ['MySQL', 'Python', 'pandas', 'SQLAlchemy', 'Power BI'],
    image: 'assets/projects/steam-warehouse.webp',
    gallery: [
      {
        src: 'assets/projects/steam-warehouse-2.webp',
        alt: 'Report page comparing total average playtime by genre across price ranges',
      },
      {
        src: 'assets/projects/steam-warehouse-3.webp',
        alt: 'Report page plotting review count against positive rating percentage, coloured by genre',
      },
    ],
    liveUrl:
      'https://app.powerbi.com/view?r=eyJrIjoiNzRmNDhiNTctNjcxNC00MDNjLTkzNzYtNjFkYTM5NDExN2VhIiwidCI6ImYzNGEzNWJkLWE2NWQtNDYwNS1iMGZhLWQyNTcxZjgzMWY1ZSIsImMiOjEwfQ%3D%3D',
    liveLabel: 'Open the dashboard',
  },
  {
    slug: 'family-income-classification',
    title: 'Family Income Classification',
    shortTitle: 'Family Income',
    category: 'Machine learning',
    context: 'DLSU: STINTSY',
    summary:
      'Classifying Philippine households by income from the 2012 Family Income and Expenditure Survey, comparing three models.',
    overview: [
      'Using over 40,000 household records from the 2012 Family Income and Expenditure Survey, we trained and compared KNN, multinomial logistic regression, and a neural network for household income classification.',
      'The neural network, tuned with Optuna, came out ahead at 93.89% validation accuracy. Most of the work before that was cleaning a national survey with dozens of coded columns and deciding which features were worth keeping.',
    ],
    highlights: [
      {
        label: 'Three models, one comparison',
        body: 'KNN, multinomial logistic regression, and a neural network trained on the same split, so the comparison is fair.',
      },
      {
        label: 'Tuned with Optuna',
        body: "Optuna searched the neural network's hyperparameters, taking it to 93.89% validation accuracy.",
      },
      {
        label: 'Real survey data',
        body: 'The FIES has a coded column for every income source and expense, so cleaning and feature selection were a large part of the work.',
      },
    ],
    stack: ['Python', 'pandas', 'NumPy', 'scikit-learn', 'PyTorch', 'Optuna', 'Jupyter'],
    image: 'assets/projects/family-income.webp',
  },
  {
    slug: 'fanime-anime-forum',
    title: 'Fanime: Anime Forum',
    shortTitle: 'Fanime',
    category: 'Full-stack web',
    context: 'DLSU: CCAPDEV',
    summary:
      'A forum where members explore, discuss and vote on anime posts, with profiles, tags and threaded replies.',
    overview: [
      'Fanime is a forum site for anime fans. Members can browse posts, comment, vote, and build a profile. It was built as a team project for a web development course.',
      'My focus was on the parts people actually use the most: posting, replying, and voting. We also added tag-based search so older posts stay easy to find as the forum grows.',
    ],
    highlights: [
      {
        label: 'Posting, replies, and voting',
        body: 'The core of the forum, and the part everything else is built around.',
      },
      {
        label: 'Profiles and tag search',
        body: 'Every member has a profile, and posts can be searched by tag to dig up older threads. The backend runs on Mongoose and MongoDB Atlas with Handlebars views.',
      },
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'Handlebars', 'Mongoose', 'MongoDB Atlas'],
    image: 'assets/projects/fanime.webp',
    repoUrl: 'https://github.com/mark-edison-jim/Fanime',
  },
  {
    slug: 'culinary-training-database',
    title: 'Culinary Training Management System',
    shortTitle: 'Culinary Training DB',
    category: 'Database application',
    context: 'DLSU: CCINFOM',
    summary:
      'A records system for trainees, mentors and training programs, with enrolment and evaluation transactions on top.',
    overview: [
      'A database application for managing a culinary training program: tracking trainees, mentors, training programs, and attendance, plus handling enrolment and evaluations.',
      'Most of the effort went into getting the schema right. Once the relationships between trainees, mentors, and programs were solid, the enrolment flow and the reports followed pretty naturally.',
    ],
    highlights: [
      {
        label: 'Four core record types',
        body: 'Attendance, trainees, mentors and training programs each have their own module instead of one shared editor.',
      },
      {
        label: 'Transactions over records',
        body: 'Enrolment and evaluations are logged as transactions, so there is a history instead of records just getting overwritten.',
      },
      {
        label: 'Reporting',
        body: 'Reports cover trainee evaluations and payment status, the two things an administrator actually needs to check.',
      },
      {
        label: 'Split ownership',
        body: 'Each module and its report had a single owner, so the interfaces between them had to be agreed early on.',
      },
    ],
    stack: ['SQL', 'Java', 'HTML', 'CSS'],
    image: 'assets/projects/sql.webp',
    repoUrl: 'https://github.com/Shioxri/CCINFOM-DB-App',
  },
  {
    slug: 'vending-machine',
    title: 'Fruit & Shake Vending Machine',
    shortTitle: 'Vending Machine',
    category: 'Desktop application',
    context: 'DLSU: CCPROG3',
    summary:
      'A Java vending machine with purchasing, restocking and item creation behind a Swing interface.',
    overview: [
      'A vending machine application built in Java. Customers can browse and buy items, and an admin side handles restocking and adding new products.',
      'I kept the machine logic separate from the interface. Buying and restocking touch the same inventory but need different rules, so the model had to stay correct no matter which one was calling it.',
    ],
    highlights: [
      {
        label: 'Purchasing flow',
        body: 'Buying an item checks against current stock, so customers only ever see what is actually available.',
      },
      {
        label: 'Maintenance flow',
        body: 'Restocking and adding new items live on a separate admin path, away from the customer-facing flow.',
      },
      {
        label: 'Swing interface',
        body: 'The GUI is just a layer over the machine logic, so it could be swapped out without touching how the machine actually works.',
      },
    ],
    stack: ['Java', 'Java Swing'],
    image: 'assets/projects/vendingmachine.webp',
    repoUrl: 'https://github.com/Shioxri/CCPROG3-Machine-Project',
  },
  {
    slug: 'social-connection-graphs',
    title: 'Social Connection Graphs',
    shortTitle: 'Connection Graphs',
    category: 'Algorithms',
    context: 'DLSU: CCDSALG',
    summary:
      'Finding connection paths across 34,216 Facebook accounts from five American colleges using a hash map and BFS.',
    overview: [
      'This project looks at the social graph of five American colleges on Facebook, using a dataset of 34,216 accounts.',
      'I used a hash map to store the connections between accounts and a breadth-first search to find the shortest path between any two of them.',
    ],
    highlights: [
      {
        label: 'Dataset',
        body: '34,216 accounts across five schools, big enough that the data structures you pick actually matter for runtime.',
      },
      {
        label: 'Hash map storage',
        body: 'Storing connections by account ID makes looking up a person\'s neighbours a constant-time operation.',
      },
      {
        label: 'Breadth-first traversal',
        body: 'BFS finds the shortest path by design, which is exactly what you want when the question is how two people are connected.',
      },
    ],
    stack: ['Java'],
    image: 'assets/projects/javagraphs.webp',
    repoUrl: 'https://github.com/Shioxri/CCDSALG-MCO2',
  },
  {
    slug: 'sorting-algorithms',
    title: 'Sorting Algorithm Comparison',
    shortTitle: 'Sorting Algorithms',
    category: 'Algorithms',
    context: 'DLSU: CCDSALG',
    summary:
      'Four sorting algorithms implemented from scratch and timed against each other on a sizable dataset.',
    overview: [
      'I implemented four sorting algorithms from scratch in Java: insertion sort, selection sort, merge sort, and quick sort.',
      'Then I timed all four against the same large dataset to compare them directly, instead of just reasoning about it on paper.',
    ],
    highlights: [
      {
        label: 'Four implementations',
        body: 'Each algorithm was written by hand instead of using a library, so the comparison was apples to apples.',
      },
      {
        label: 'Timed against real data',
        body: 'Running all four on the same large dataset made the gap between the quadratic and the n-log-n algorithms obvious.',
      },
    ],
    stack: ['Java'],
    image: 'assets/projects/javasort.webp',
    repoUrl: 'https://github.com/Shioxri/CCDSALG-MCO1',
  },
  {
    slug: 'ruby-payroll-system',
    title: 'Weekly Payroll System',
    shortTitle: 'Payroll System',
    category: 'Systems programming',
    context: 'DLSU: CSADPRG',
    summary: 'A Ruby payroll simulation that generates daily and weekly salary reports from work hours and day types.',
    overview: [
      'A payroll system written in Ruby that generates daily and weekly salary reports based on hours worked and the type of shift.',
      'Regular, night shift, and overtime pay are each calculated separately before being combined, since a flat hourly rate does not reflect how payroll actually works.',
    ],
    highlights: [
      {
        label: 'Three pay categories',
        body: 'Regular, night, and overtime pay are calculated independently, so a change to one rate does not accidentally break the others.',
      },
      {
        label: 'Day types drive the rate',
        body: 'The type of shift, not just the hours, decides the rate, which is usually where payroll bugs come from.',
      },
      {
        label: 'Daily and weekly views',
        body: 'Daily and weekly reports both come from the same underlying entries, so they always line up.',
      },
    ],
    stack: ['Ruby'],
    image: 'assets/projects/rubyimg.webp',
    repoUrl: 'https://github.com/Shioxri/CSADPRG-MP',
  },
  {
    slug: 'python-budget-app',
    title: 'Simple Budgeting App',
    shortTitle: 'Budgeting App',
    category: 'Learning build',
    context: 'Personal project',
    summary: 'A small budgeting tool written while learning the basics of Python.',
    overview: [
      'A small budgeting app I built while learning Python.',
      'It is not fancy, but I kept it here because these small practice projects are usually where a language actually starts to click.',
    ],
    highlights: [
      {
        label: 'Scope on purpose',
        body: 'Kept intentionally small, just enough to get comfortable with the language without turning it into a bigger project than it needed to be.',
      },
    ],
    stack: ['Python'],
    image: 'assets/projects/pypypy.webp',
    repoUrl: 'https://github.com/Shioxri/Simple-Python-Budgeting-App',
  },
]

/**
 * The home page list, in display order. Kept apart from the catalogue so the
 * curated order can differ from the archive order.
 */
const featuredSlugs = [
  'pharmalytics',
  'ledgr',
  'compass-desk',
  'hopspring',
  'stella',
  'd-enroll',
  'vending-machine',
  'solofit',
  'tweekly',
] as const

export const featuredProjects: readonly Project[] = featuredSlugs.map((slug) => {
  const project = catalogue.find((entry) => entry.slug === slug)
  if (!project) throw new Error(`Featured project "${slug}" is not in the catalogue.`)
  return project
})

/** Featured first, in their curated order, then everything else as listed. */
export const projects: readonly Project[] = [
  ...featuredProjects,
  ...catalogue.filter((project) => !featuredProjects.includes(project)),
]

export function findProject(slug: string | undefined): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

export type ProjectNeighbours = {
  previous: Project | undefined
  next: Project | undefined
}

/** Wraps at both ends so the case-study pager is never a dead end. */
export function getNeighbours(slug: string): ProjectNeighbours {
  const index = projects.findIndex((project) => project.slug === slug)
  if (index === -1) return { previous: undefined, next: undefined }

  return {
    previous: projects[(index - 1 + projects.length) % projects.length],
    next: projects[(index + 1) % projects.length],
  }
}

/** Zero-padded display index, matching the "01 / 07" counters in the layout. */
export function projectNumber(index: number): string {
  return String(index + 1).padStart(2, '0')
}
