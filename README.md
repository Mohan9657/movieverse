# 🎬 MovieVerse — Online Movie Ticket Booking Platform

MovieVerse is a full-stack modern movie ticket booking web application built with **Next.js 16**, **Tailwind CSS**, **MongoDB**, and **Prisma ORM**.  
Users can browse trending movies(from **TMDB API**), view details(like actors names ,rating ,about,trailer), book seats, make payment (fake flow), and download a **QR-code-based e-ticket**.

🚀 **Live Demo:** https://movieverse-zeta-bice.vercel.app/  

---

## ✨ Features

### 🔐 Authentication
- User **Register** and **Login**
- Password hashing using **bcryptjs**
- JWT-based authentication
- Protected routes (My Bookings)

### 🎥 Movie Browsing
- Upcoming & Trending movies fetched from **TMDB API**
- Movie details page with trailer & overview
- Fully responsive and clean UI

### 🎫 Ticket Booking
- Select:
  - Theatre
  - Date
  - Time
  - Multiple seats
- Booking stored in MongoDB using Prisma

### 💳 Payment Flow
- Simple fake payment page to simulate real payment
- Generates booking on successful payment

### 📄 Downloadable Movie Ticket (PDF)
- PDF ticket generated using **pdf-lib**
- Includes:
  - Movie name  
  - Theatre  
  - Time & date  
  - Seats  
  - QR Code  
- Works perfectly on deployed version

### 🧾 My Bookings Page
- Shows all previously booked tickets
- Button to **Download Ticket**

---

## 🛠️ Tech Stack

### **Frontend**
- Next.js 16 (App Router)
- React 19
- Tailwind CSS

### **Backend**
- Next.js API Routes
- Prisma ORM
- MongoDB Atlas

### **Other Tools**
- Axios
- JWT Authentication
- Bcryptjs
- pdf-lib
- qrcode
- TMDB API

---

Developer

Vulli Mohan
Full Stack Developer
India
