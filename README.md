# PixoAI - AI Image Upscaler

A production-ready AI-powered image upscaling web application built with Next.js 14. Users can upload images, enhance them using Clipdrop AI (2x / 4x), compare before/after with a slider, and manage usage through a credit-based system with optional Stripe payments.

---

## 🧠 Approach

The application is designed as a full-stack Next.js (App Router) SaaS-style product:

- Built a **credit-based workflow**: users get free credits on signup, and each upscale consumes a credit.
- Used **Next.js serverless API routes** for all backend logic (upscaling, credits, billing) to keep deployment simple on a single platform (Vercel).
- Integrated **Clerk** for authentication so all credit and history logic is tied to a secure user identity.
- Used **Prisma + Neon Postgres** for persistent storage of users, credits, and future subscription data.
- Implemented a **comparison slider UI** for original vs upscaled images, with careful handling of dimensions and responsiveness.
- Added clear UX around credits: upgrade box when credits are 0, image uploader always visible, and dynamic comparison section.
- Focused on a clean, dark-themed UI with Tailwind CSS and responsive layouts for mobile and desktop.

---

## 🛠 Tech Stack (and Why)

| Category          | Technology                     | Why it was chosen                                                 |
|-------------------|--------------------------------|-------------------------------------------------------------------|
| Framework         | Next.js 14 (App Router)        | Full-stack, file-based routing, great Vercel support             |
| Language          | TypeScript                     | Type safety and better DX                                        |
| Database          | PostgreSQL (Neon) + Prisma ORM | Typed schema, easy migrations, managed Postgres in the cloud     |
| Authentication    | Clerk                          | Simple auth flows, good Next.js integration                      |
| AI Processing     | Clipdrop API                   | High-quality upscaling with generous free credits                |
| Payments          | Stripe                         | Reliable payments and easy integration for credit purchases      |
| Styling           | Tailwind CSS                   | Rapid styling and consistent design system                       |
| Image Processing  | Sharp                          | Resizing images server-side and enforcing size limits            |
| Deployment        | Vercel, Render                 | First-class support for Next.js and serverless API routes        |

---

## ⚙️ Setup Instructions (Local Development)

### 1. Prerequisites

- Node.js 18+
- [Clerk Account](https://clerk.com)
- [Neon Database](https://neon.tech)
- [Clipdrop API Key](https://clipdrop.co/apis)
- [Stripe Account](https://stripe.com)


### 2. Clone & Install

- git clone <repo-url>
- cd ai-image-upscaler
- npm install


---

### 3. Environment Variables

- Create a `.env` file in the project root and add:

- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
- CLERK_SECRET_KEY=...
- CLERK_WEBHOOK_SECRET=...
- DATABASE_URL=...
- CLIPDROP_API_KEY=...
- NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=...
- STRIPE_SECRET_KEY=...
- STRIPE_WEBHOOK_SECRET=...
- NEXT_PUBLIC_APP_URL=http://localhost:3000
- NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
- NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
- NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
- NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
- NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID=...
- NEXT_PUBLIC_STRIPE_PRO_PRICE_ID=...
- NEXT_PUBLIC_STRIPE_ENTERPRISE_PRICE_ID=...

- Adjust values according to your own keys and database.

---

### 4. Database Setup

- Run Prisma against your database:

- Push schema and create tables
- npx prisma migrate dev --name init

- Generate Prisma client
- npx prisma generate


- You can inspect the database with:

- npx prisma studio


---

### 5. Run Development Server

- npm run dev

- Then open:

- http://localhost:3000


- Flow to test locally:

1. Sign up via Clerk (email or OAuth).
2. Confirm you receive free credits.
3. Upload an image (PNG/JPG/WebP, max 10MB).
4. Choose 2x or 4x upscale.
5. View the before/after comparison slider.
6. Watch credits decrease after each upscale.

---

## ⏱ Time Spent

Approximately **10 hours** from scratch to deployment, including:

- Project setup, environment configuration, and Prisma DB
- Implementing auth, credits logic, and Clipdrop integration
- Building the comparison slider and responsive UI
- Testing, debugging, and deployment to Vercel

---

## 🧩 Challenges & Solutions

### 1. Handling Duplicate User Creation (Prisma P2002)

- **Problem:** When fetching credits, concurrent requests sometimes tried to create the same user twice, causing a `P2002` unique constraint error on `email`.
- **Solution:** Reworked the `/api/user/credits` route to use `upsert` on `clerkId`, ensuring atomic “find-or-create” behavior and preventing duplicate inserts.

### 2. Credit Fetch Overhead

- **Problem:** The frontend was calling `/api/user/credits` too often, leading to unnecessary database reads.
- **Solution:** Cached credits on the client and only fetched them when the user signed in or after an upscale/scale change, reducing repeated calls.

### 3. Responsive Before/After Slider

- **Problem:** The comparison slider looked correct on desktop but overflowed or misaligned
