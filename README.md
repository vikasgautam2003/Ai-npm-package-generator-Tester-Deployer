# Package Forge 📦

An AI-powered platform that autonomously generates, tests, and publishes npm packages using a hybrid cloud-local architecture.

![Turborepo](https://img.shields.io/badge/Turborepo-EF4444?logo=turborepo&logoColor=white&style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white&style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white&style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white&style=for-the-badge)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white&style=for-the-badge)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white&style=for-the-badge)
![Redis](https://img.shields.io/badge/Redis-DC382D?logo=redis&logoColor=white&style=for-the-badge)
![Google Gemini](https://img.shields.io/badge/Gemini_AI-8E75B2?logo=google-bard&logoColor=white&style=for-the-badge)
![BullMQ](https://img.shields.io/badge/BullMQ-black?logo=npm&logoColor=white&style=for-the-badge)

---

### ▶️ [Live Demo](https://package-forge.vercel.app/)

---

## 📖 About The Project

Package Forge is a "Private PaaS" (Platform as a Service) designed to automate the lifecycle of software creation. It allows users to describe a software package in plain English, and then uses AI to generate the code, validates it inside a secure Docker sandbox, and publishes it to the npm registry—all without human intervention.

The project utilizes a unique **Hybrid Architecture**:

* **The Face (Cloud):** A Next.js frontend hosted on Vercel, ensuring high availability and global access.
* **The Brain (Local):** A heavy-compute worker running on a local machine (e.g., a laptop) that handles AI generation and Docker compilation.
* **The Bridge (Redis):** Upstash Redis acts as the nervous system connecting the cloud frontend to the local worker in real-time.

---

![Package Interface](./apps/web/public/ai.png)

## 🌟 Key Features

- **AI-Driven Code Generation**: Utilizes Google Gemini to architect and write complete, functional npm packages from scratch.
- **Automated Quality Assurance**: Every generated package is spun up inside an isolated **Docker container** to verify installation and build processes before delivery.
- **Hybrid "Hacker" Deployment**: Runs heavy workloads on local hardware ($0 cost) while maintaining a professional cloud presence.
- **Mission Control Dashboard**: A real-time UI featuring live streaming logs, file exploration, and syntax-highlighted code editing.
- **One-Click NPM Publishing**: Automatically handles versioning and publishing to the public npm registry upon user approval.
- **System Heartbeat**: Real-time status monitoring to detect if the local worker is online or sleeping.

---

## 🔧 Tech Stack

This project is engineered as a high-performance monorepo using **Turborepo**, which orchestrates the build pipeline for both the **Next.js** frontend and the **Node.js** backend worker.

| Technology      | Role & Justification                                                                                                   |
| :-------------- | :--------------------------------------------------------------------------------------------------------------------- |
| **Turborepo** | **Monorepo Build System**: Manages the workspace, ensuring efficient caching and task orchestration between apps.      |
| **Next.js 14** | **Frontend Framework**: Powers the dashboard with Server Actions and React Server Components.          |
| **Node.js** | **Worker Runtime**: Runs the heavy background process that manages AI interactions and file system operations.         |
| **BullMQ** | **Job Queue**: Manages the asynchronous task pipeline (Generation -> Testing -> Publishing) with robust retry logic.   |
| **Upstash Redis**| **Message Broker**: Serves as the cloud bridge, allowing the Vercel frontend to send jobs to the local worker securely.|
| **Docker** | **Sandboxing**: Provides ephemeral containers to safely test generated code without risking the host machine.          |
| **Google Gemini**| **LLM Engine**: The intelligence layer responsible for writing code, fixing bugs, and generating documentation.       |
| **Tailwind CSS**| **Styling**: Ensures a responsive, dark-mode "developer-native" aesthetic for the dashboard.                           |

---

## 📦 Getting Started

To set up your own instance of Package Forge, follow these steps.

### Prerequisites

- **Node.js** (`v18` or higher)
- **Docker Desktop** (Must be running for sandboxing to work)
- **Upstash Redis** Account (Free tier is sufficient)
- **Google Gemini API Key**
- **NPM Auth Token** (For publishing packages)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/package-forge.git](https://github.com/your-username/package-forge.git)
    cd package-forge
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**

    Create a `.env` file in `apps/web/` (Frontend):
    ```env
    REDIS_CONNECTION_URL="rediss://default:pass@your-upstash-instance:6379"
    ```

    Create a `.env` file in `apps/worker/` (Backend):
    ```env
    REDIS_CONNECTION_URL="rediss://default:pass@your-upstash-instance:6379"
    GEMINI_API_KEY="your_google_gemini_key"
    NPM_TOKEN="npm_your_auth_token"
    ```

### ▶️ Running the App

You need to run the frontend (Cloud/Local) and the worker (Local) concurrently.

1.  **Start the Frontend (Mission Control):**
    ```bash
    # In a new terminal
    cd apps/web
    npm run dev
    ```
    *Access at: `http://localhost:3000`*

2.  **Start the Worker (The Engine):**
    ```bash
    # In a separate terminal
    cd apps/worker
    npx tsx src/index.ts
    ```
    *You should see: `🚀 Worker Listening on Upstash Cloud...`*

---

## 🚀 Deployment Strategy

This project uses the **"Hacker Strategy"** for deployment:

1.  **Deploy `apps/web` to Vercel**: Connect your GitHub repo and add the `REDIS_CONNECTION_URL` env variable.
2.  **Run `apps/worker` on your Laptop**: Keep your terminal running.
3.  **Result**: The Vercel URL is globally accessible. When your laptop is on, the "System Status" turns **ONLINE**, and users can generate packages. When you close your laptop, the system gracefully shows **OFFLINE**.
