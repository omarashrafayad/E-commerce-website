# 🛒 AuraShop: Modern Full-Stack E-Commerce Solution

[![Next.js](https://img.shields.io/badge/Next.js-16+-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-9+-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

An enterprise-grade, high-performance e-commerce platform built with **Next.js 16**, **TypeScript**, and **Node.js**. Engineered for scalability, visual excellence, and a seamless user experience across all devices.

---

## 🌟 Project Overview

**AuraShop** is more than just a store — it's a comprehensive digital commerce infrastructure. Designed to meet modern retail demands, it bridges the gap between sophisticated UI/UX and robust, secure backend architecture. Whether you're managing complex inventory or providing a buttery-smooth checkout flow for customers, AuraShop delivers on every front.

### 🎯 Key Value Propositions
*   **Performance-First Architecture:** Optimized for core web vitals using Next.js 16 App Router.
*   **Aesthetic UI/UX:** Premium feel with smooth animations, dark mode, and RTL support.
*   **Secure Foundation:** Industrial-standard authentication and data validation.
*   **Scalable Backend:** Modular Node.js API designed for high availability and low latency.

---

## 🛠️ Technical Prowess & Stack

### **Frontend Infrastructure**
*   **Framework:** `Next.js 16` (App Router) with full `TypeScript` implementation.
*   **State Management:** Hybrid approach using `Zustand` for client state and `TanStack React Query v5` for server state/caching.
*   **Styling & UI:** `Tailwind CSS 4`, `Radix UI` (Headless), and `Lucide React` for a consistent design system.
*   **Interactions:** `Framer Motion` for fluid layout transitions and scroll-triggered micro-animations.
*   **Forms & Validation:** `React Hook Form` integrated with `Zod` schemas for bulletproof data integrity.

### **Backend Infrastructure**
*   **Runtime:** `Node.js` with `Express.js` using a clean controller-service-repository pattern.
*   **Persistence:** `MongoDB` with `Mongoose` ODM for flexible, high-speed data modelling.
*   **Auth & Security:** `JWT` (Stateless Auth), `bcryptjs` hashing, and custom middleware guards.
*   **Asset Management:** `Multer` for file orchestration and `Sharp` for real-time image optimization.

---

## 💎 Core Features

### **🛒 The Customer Experience**
*   **Dynamic Product Discovery:** Advanced filtering, sorting, and category-based navigation.
*   **Persistent Shopping Cart:** Real-time cart synchronization across sessions.
*   **Wishlist & Personalization:** High-speed user collections for a curated shopping journey.
*   **Dark Mode & RTL:** Full support for system-based themes and Right-to-Left languages (Arabic).

### **📊 The Management Experience**
*   **Role-Based Dashboards:** Secure portals for Admins and Instructors.
*   **Data Visualization:** High-performance management tables powered by `TanStack Table`.
*   **Inventory Orchestration:** Real-time management of brands, categories, and stock levels.

---

## 📁 Repository Architecture

```bash
E-commerce/
├── frontend/             # Next.js Application (Client & Admin)
│   ├── app/              # App Router (Groups: (main), (auth), dashboard)
│   ├── features/         # Modular feature-based folder structure
│   └── components/       # Reusable Atomic UI components
└── backend/              # Node.js API & Server
    ├── controllers/      # API Logic
    ├── models/           # Mongoose Schemas
    └── routes/           # Endpoint Definitions
```

---

## ⚡ Quick Start

### **Prerequisites**
*   Node.js 20.x or higher
*   MongoDB Instance (Local or Atlas)

### **Installation**

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/omarashrafayad/E-commerce-website.git
    cd E-commerce-website
    ```

2.  **Environment Setup:**
    Create a `.env` file in both `frontend` and `backend` folders (see source for keys).

3.  **Start Services:**
    ```bash
    # Open terminal 1 (Backend)
    cd backend && npm install && npm run dev

    # Open terminal 2 (Frontend)
    cd frontend && npm install && npm run dev
    ```

---

## 📜 Professional Standard
This project adheres to **Clean Code** principles, **SOLID** architecture, and industry-standard security practices. It is a production-ready template for enterprise-level commerce.

---

**Developed by [Omar Ashraf Ayad](https://github.com/omarashrafayad)**  
*Available for collaborations and technical discussions.*
