# AthleX

## 📌 Description
AthleX is a modern web application designed to empower fitness enthusiasts by bringing **training, nutrition, and shopping** into one platform.  
It provides structured workout plans, personalized meal plans, and an integrated e-commerce feature for gym equipment — all with secure online payments and a seamless user experience.  

---

## 🛠️ Technology Used
- **React with TypeScript** → Scalable, type-safe, and interactive UI.  
- **Firebase** → Real-time database, authentication, and hosting services.  
- **Vercel** → Seamless deployment, CI/CD, and high-performance hosting.  
- **Midtrans** → Secure and reliable online payment gateway (tailored for Indonesia).  

---

## ✨ Features
- **🏋️ Gym Equipment E-Commerce** → Browse, add to cart, and purchase gym equipment.  
- **📋 Workout Plans** → Structured resistance & cardio programs (Easy → Expert).  
- **🥗 Meal Plans** → Curated nutrition to complement workouts & health goals.  
- **💳 Secure Online Payments** → Midtrans integration for trusted transactions.  
- **📱 User-Friendly Experience** → Clean, responsive, and modern UI.  
- **☁️ Scalable & Cloud-Based** → Firebase + Vercel for real-time sync and growth.  

---

## 🚀 Setup Instructions
1. Clone repository:  
  ```bash
  git clone https://github.com/your-username/Athlex.git
  cd athlex
  ```

2. Install dependencies:  
  ```bash
  npm install
  ```
  Or use yarn install / pnpm install depending on your package manager.

3. Set up environment variables:  
  Create a .env file in the project root for main configuration (Firebase, API keys, etc).
  ```bash
  # .env (root)
  VITE_API_KEY=your_firebase_api_key
  VITE_AUTH_DOMAIN=your_project.firebaseapp.com
  VITE_PROJECT_ID=your_project_id
  VITE_STORAGE_BUCKET=your_project.appspot.com
  VITE_MESSAGING_SENDER_ID=your_sender_id
  VITE_APP_ID=your_app_id
  VITE_MEASUREMENT_ID=your_measurement_id

  # Midtrans client key (frontend)
  VITE_MIDTRANS_CLIENT_KEY=your_midtrans_client_key

  # API base URL (Vercel payment gateway URL)
  VITE_API_BASE_URL=https://your-vercel-app.vercel.
  ```

  Create a .env file inside the payment_gateaway/ folder for Midtrans configuration (client key & server key).
  ```bash
  # payment_gateaway/.env
  # Midtrans server-side credentials
  MIDTRANS_SERVER_KEY=your_midtrans_server_key
  MIDTRANS_CLIENT_KEY=your_midtrans_client_key

  # Firebase service account (stringified JSON or file path)
  FIREBASE_SERVICE_ACCOUNT_KEY=your_firebase_service_account

  # Base URL for API server
  BASE_URL=https://your-vercel-app.vercel.app
  ```

4. Run the development server:
  ```bash
  npm run dev
  ```
  The frontend app will be available at http://localhost:5173

5. Build for production:
  ```bash
  npm run dev
  ```

6. Build for production:
  ```bash
  npm run build
  ```
  This will make a folder "dist"    

7. Deployment
  # Frontend (Firebase Hosting)
  Deploy the frontend using Firebase CLI:
  ```bash
  npm run build
  firebase deploy
  ```

  # Payment Gateway (Vercel)
  Connect the project to Vercel.
  Configure environment variables in Vercel dashboard.
  Deploy automatically via Vercel.

## 🤖 AI Support Explanations

### IBM Granite
- Assisted in designing and validating the backend workflow (Firebase + Midtrans integration).  
- Provided optimization insights for TypeScript code to ensure clean and maintainable architecture.  
- Helped generate structured workout and meal plan content with consistency and clarity.  

### ChatGPT (GPT-5)
- Supported rapid debugging and troubleshooting for React, TypeScript, and Firebase services.  
- Suggested best practices and reusable code snippets to accelerate feature implementation.  
- Helped refine documentation and create professional, user-friendly project descriptions.  



