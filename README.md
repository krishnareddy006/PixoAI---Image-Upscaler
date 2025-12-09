# ProxAI - AI Image Upscaler

A production-ready AI-powered image upscaling web application built with Next.js 14, featuring credit-based pricing and secure payment processing.

## ✨ Features

- 🎨 Drag-and-drop image upload with file validation
- 🚀 2x and 4x image upscaling with Real-ESRGAN
- 👤 User authentication with Clerk (email/password + OAuth)
- 💳 Stripe payment integration for subscriptions
- 📊 Credit-based usage system (free tier + paid plans)
- 📱 Fully responsive design (mobile-first)
- 🎯 Free tier: 10 upscales, then paid plans start

## 🛠 Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Database** | PostgreSQL (Neon) + Prisma ORM |
| **Authentication** | Clerk |
| **AI Processing** | Clipdrop API |
| **Payments** | Stripe |
| **Styling** | Tailwind CSS |
| **Image Processing** | Sharp |
| **Deployment** | Vercel |

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- [Clerk Account](https://clerk.com)
- [Neon Database](https://neon.tech)
- [Clipdrop API Key](https://clipdrop.co/apis)
- [Stripe Account](https://stripe.com)


### 1. Clone & Setup

- git clone <repo-url>
- cd ai-image-upscaler
- npm install


### 2. Environment Variables

- Create .env file:


### 3.Database Setup

- Create database tables
npx prisma migrate dev --name init

- Generate Prisma client
npx prisma generate


### 4.Run Development Locally

- npm run dev
- Open http://localhost:3000 in your browser.


### 5.Deployment

- Deploy to Vercel
- Push code to GitHub
- Connect repo to Vercel
- Add environment variables in Vercel dashboard
- Deploy!