export type PortfolioProject = {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  language: string;
  category: string;
  pinned?: boolean;
  featured?: boolean;
  accent: string;
};

const github = (repo: string) => `https://github.com/sajibmrbitz/${repo}`;

// Curated from the public profile and README files. Pinned repositories stay first.
export const portfolioProjects: PortfolioProject[] = [
  {
    id: "submity-cf-2",
    title: "Submity-CF 2.0",
    slug: "submity-cf-2-0",
    description: "A cross-browser Codeforces submission helper with live verdict tracking and an in-page workflow.",
    content: "## Overview\nSubmity makes competitive programming feel faster by placing submission controls directly beside each Codeforces problem.\n\n## What I built\n- **Live verdict tracker** — Follow Testing, Accepted, and Wrong Answer states without leaving the problem page.\n- **Focused workflow** — A hidden iframe keeps the contest context intact while a submission is processed.\n- **Cross-browser support** — Works across Chromium, Firefox, and Firefox-based browsers.\n\n## Why it matters\nThis is a small developer tool with a sharp product goal: remove friction from a workflow I use myself.",
    tags: ["JavaScript", "Browser Extension", "Developer Tools"],
    githubUrl: github("Submity-CF-2.0"),
    language: "JavaScript",
    category: "Developer tooling",
    pinned: true,
    featured: true,
    accent: "#f59e0b",
  },
  {
    id: "havitall",
    title: "Havitall",
    slug: "havitall",
    description: "A browser-to-browser messaging and file-sharing terminal built around WebRTC and burn-after-reading sessions.",
    content: "## Overview\nHavitall is a lightweight, no-account sharing tool for sending text and files between devices in real time.\n\n## Architecture\n- **Peer-to-peer transport** — WebRTC connections through PeerJS keep the core experience server-light.\n- **Large-file path** — Files above 50MB use temporary hosting while the link itself is shared peer-to-peer.\n- **Session hygiene** — Drops disappear after they are opened, with heartbeat and reconnect logic for mobile sessions.\n\n## Design direction\nThe dark cyber-terminal interface reflects the product promise: quick, private, disposable exchanges.",
    tags: ["WebRTC", "PeerJS", "JavaScript", "P2P"],
    githubUrl: github("Havitall"),
    liveUrl: "https://sajibmrbitz.github.io/Havitall/",
    language: "CSS / JavaScript",
    category: "Systems & networking",
    pinned: true,
    featured: true,
    accent: "#22d3ee",
  },
  {
    id: "typerush",
    title: "TypeRush",
    slug: "typerush",
    description: "A real-time multiplayer typing game with TCP/IP races, performance analytics, and a packaged desktop build.",
    content: "## Overview\nTypeRush turns typing practice into a competitive desktop game. Players host or join races, see live progress, and track improvement over time.\n\n## Systems I explored\n- **Real-time multiplayer** — Java sockets synchronize race state over TCP/IP.\n- **Game feedback** — WPM, accuracy, combo streaks, and match results create a readable competitive loop.\n- **Desktop delivery** — Maven, JavaFX, and jpackage support a bundled Windows release.\n\n## Stack\nJava 17, JavaFX, TCP/IP sockets, Maven, jpackage, and WiX Toolset.",
    tags: ["Java", "JavaFX", "TCP/IP", "Game Development"],
    githubUrl: github("TYPERUSH"),
    language: "Java",
    category: "Game development",
    pinned: true,
    featured: true,
    accent: "#a78bfa",
  },
  {
    id: "libertas-vincta",
    title: "LIBERTAS VINCTA",
    slug: "libertas-vincta",
    description: "A branching 2D survival-horror exploration game with explicit route logic, escalation systems, and replayable endings.",
    content: "## Overview\nLIBERTAS VINCTA is a Godot 4.7 survival-horror game built around deliberate state, exploration, and consequence.\n\n## Game systems\n- **Branching progression** — Keys, letters, senses, and route decisions seed later chapters.\n- **Escalation model** — Enemy behavior evolves from hearing to sight, memory, touch, and blood magic.\n- **Verified endings** — Destroy, Flee, Remain, and Loop outcomes are represented in the save-state flow.\n\n## Role\nI contributed to the team game project as a systems-minded game developer, working with authored rules, interaction states, and playable progression.",
    tags: ["Godot", "GDScript", "Game Systems", "Survival Horror"],
    githubUrl: github("LIBERTAS-VINCTA_team_4-s_compliment"),
    language: "GDScript",
    category: "Game development",
    pinned: true,
    featured: true,
    accent: "#ef4444",
  },
  {
    id: "node-runner",
    title: "Node Runner",
    slug: "node-runner",
    description: "A server-authoritative multiplayer arena game where runners capture nodes, manage exposure, and outlast the room.",
    content: "## Overview\nNode Runner is a 2D game-jam project for 3–7 runners. It combines bots, private rooms, shrinking arenas, and a server-owned simulation.\n\n## Architecture\n- **Authoritative server** — Express and Socket.IO own movement, collisions, bots, health, timers, and win conditions.\n- **Multiple clients** — The same online game powers browser play and an Electron desktop wrapper.\n- **Playable deployment** — The project is structured for Render hosting with health checks and release documentation.\n\n## Play\nThe game is available at the live deployment linked below.",
    tags: ["JavaScript", "Node.js", "Socket.IO", "Game Development"],
    githubUrl: github("NODE_RUNNER_IUT_12th_ICT_Fest_2026_GameJam"),
    liveUrl: "https://node-runner-xayv.onrender.com",
    language: "JavaScript",
    category: "Game development",
    pinned: true,
    featured: true,
    accent: "#34d399",
  },
  {
    id: "bubble-shooter",
    title: "Bubble Shooter",
    slug: "bubble-shooter",
    description: "A C and iGraphics arcade remake that applies manual BFS to grid-based bubble gameplay and collision logic.",
    content: "## Overview\nThis classic arcade remake was built from scratch in C with the iGraphics framework used in BUET lab work.\n\n## Engineering notes\n- **Gameplay logic** — Manual breadth-first search handles connected bubble groups and popping behavior.\n- **Interactive physics** — Mouse aiming, trajectory reflection, shooting, and colored grid state drive the arcade loop.\n- **Persistence** — Sessions can be saved and resumed through file handling.\n\nIt is a compact project that shows how I translate algorithms into interactive systems.",
    tags: ["C", "iGraphics", "BFS", "Game Development"],
    githubUrl: github("Bubble-Shooter-iGraphics"),
    language: "C",
    category: "Game development",
    pinned: true,
    featured: true,
    accent: "#fb7185",
  },
  {
    id: "agromind-ai",
    title: "AgroMind AI",
    slug: "agromind-ai",
    description: "A farmer-facing agricultural price intelligence system for Bangladesh with forecasting, seasonality, and bilingual guidance.",
    content: "## Overview\nAgroMind AI turns multi-year retail price data into seasonal insights, forecasts with 80% confidence bands, and Bengali market advisories.\n\n## Technical focus\n- **Forecasting** — ARIMA(1,1,1) forecasts 7–30 days ahead and benchmarks against a persistence baseline.\n- **Hybrid intelligence** — Gemini-powered advice is paired with a deterministic offline fallback.\n- **Scientific delivery** — Walk-forward MAE evaluation, 26 automated tests, CSV exports, and Docker support keep the system explainable and deployable.",
    tags: ["Python", "Streamlit", "ARIMA", "AI Systems"],
    githubUrl: github("AgroMind-AI"),
    language: "Python",
    category: "AI & data systems",
    featured: true,
    accent: "#84cc16",
  },
  {
    id: "chitraverse",
    title: "ChitraVerse",
    slug: "chitraverse",
    description: "A full-stack movie and TV discovery platform with a React client, Express API, and PostgreSQL-backed data layer.",
    content: "## Overview\nChitraVerse is designed as a self-contained media application: the frontend talks to a local backend API rather than calling an external catalog directly.\n\n## Architecture\nReact and Vite power the client, while Node.js, Express, and PostgreSQL handle the server, schema, and synchronization workflow.",
    tags: ["React", "Node.js", "Express", "PostgreSQL"],
    githubUrl: github("ChitraVerse"),
    language: "JavaScript",
    category: "Full-stack web",
    accent: "#60a5fa",
  },
  {
    id: "stealth-audio",
    title: "StealthAudio",
    slug: "stealth-audio",
    description: "A fully client-side audio steganography tool that combines AES encryption with LSB encoding in WAV files.",
    content: "## Overview\nStealthAudio hides encrypted text inside 16-bit PCM WAV files without uploading files to a server.\n\n## Privacy by architecture\nArrayBuffer processing, CryptoJS AES encryption, DataView-based LSB manipulation, and FileReader APIs keep the workflow in browser memory.",
    tags: ["JavaScript", "Cryptography", "Steganography", "Privacy"],
    githubUrl: github("Steganography"),
    liveUrl: "https://sajibmrbitz.github.io/Steganography/",
    language: "JavaScript",
    category: "Security tools",
    accent: "#38bdf8",
  },
  {
    id: "unbound",
    title: "UNBOUND",
    slug: "unbound",
    description: "A side-scrolling movement-puzzle game about degrees of freedom, restrictions, and temporary route-changing powers.",
    content: "## Overview\nUNBOUND uses Phaser Arcade Physics and Vite to build a seven-sector browser game around movement mastery.\n\n## Systems\nPermanent abilities, temporary overrides, restriction fields, checkpoints, and route choice are separated into focused game modules. The result is a game that communicates its rules through both play and a detailed in-game guide.",
    tags: ["JavaScript", "Phaser", "Vite", "Game Design"],
    githubUrl: github("UNBOUND"),
    language: "JavaScript",
    category: "Game development",
    accent: "#fbbf24",
  },
  {
    id: "cp-archive",
    title: "CP-ARCHIVE",
    slug: "cp-archive",
    description: "A tactical archive of Codeforces and LeetCode solutions with problem statements, edge cases, and learning notes.",
    content: "## Overview\nCP-ARCHIVE is my working notebook for competitive programming: solved problems are organized with statements, input-output examples, solution files, and analysis.\n\nIt reflects the habit behind the code—study the edge cases, preserve the reasoning, and keep improving the next solution.",
    tags: ["C++", "Algorithms", "Codeforces", "LeetCode"],
    githubUrl: github("CP-ARCHIVE"),
    language: "C++",
    category: "Algorithms",
    accent: "#f97316",
  },
  {
    id: "ascii-converter",
    title: "Image to ASCII Converter",
    slug: "image-to-ascii-converter",
    description: "An early computer-vision experiment that turns images into terminal-style ASCII and colorful HTML renderings.",
    content: "## Overview\nThis was my first project uploaded to GitHub. It explores how pixels can become text using ASCII values, with a second path that generates a colorful HTML representation.",
    tags: ["C++", "Image Processing", "HTML"],
    githubUrl: github("Image_to_ASCII_converter"),
    language: "C++",
    category: "Experiments",
    accent: "#e879f9",
  },
];

export const pinnedProjects = portfolioProjects.filter((project) => project.pinned);

export const githubProfile = {
  name: "Mahmodur Rahman Sajib",
  username: "sajibmrbitz",
  location: "Dhaka, Bangladesh",
  bio: "CS undergrad. Passionate about system design and algorithms. Learning one line of code at a time.",
  githubUrl: "https://github.com/sajibmrbitz",
  email: "sajibmr2005@gmail.com",
  linkedinUrl: "https://www.linkedin.com/in/mahmodur-rahman-sajib/",
  whatsappUrl: "https://wa.me/bhrom_or29",
};
