# 📌 Project12348 – User Authentication & OTP API

A **User Authentication System** built using **Node.js**, **Express.js**, **MongoDB**, **OTP (SMS) verification**, and **JWT authentication**.

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Token)
- OTP-based mobile verification (SMS)

---

## 🌐 Base URL

```
http://localhost:4000
```

---

## 📂 API Endpoints

---

## 1️⃣ Send OTP

### 📍 Endpoint

```
POST /api/user/send-otp
```

### 📝 Description

Sends a **4-digit OTP** to the user's registered mobile number for verification.

### 📥 Request Body

```json
{
  "mobile": 9123456780
}
```

### 📤 Response

```json
{
  "message": "OTP sent successfully"
}
```

---

## 2️⃣ Verify OTP

### 📍 Endpoint

```
POST /api/user/verify-otp
```

### 📝 Description

Verifies the OTP entered by the user.

### 📥 Request Body

```json
{
  "mobile": 9123456780,
  "otp": "6059"
}
```

### 📤 Response

**Success**
```json
{
  "message": "OTP verified successfully"
}
```

**Failure**
```json
{
  "message": "Invalid or expired OTP"
}
```

---

## 3️⃣ Register User

### 📍 Endpoint

```
POST /api/user/register
```

### 📝 Description

Registers a new user **after successful OTP verification**.

### 📥 Request Body

```json
{
  "name": "Aniruddha Saraf",
  "email": "aniruddha.saraf@example.com",
  "password": "SecurePass@456",
  "mobile": "9123456780",
  "address": "Pune, Maharashtra, India"
}
```

### 📤 Response

```json
{
  "message": "User registered successfully"
}
```

---

## 🔐 Authentication Flow

1. User enters mobile number
2. OTP is sent to the mobile
3. User verifies OTP
4. User registers with personal details
5. JWT token is issued on successful authentication

---

## ✅ Notes

- OTP expires after a predefined time
- Passwords should be stored using hashing (e.g., bcrypt)
- JWT should be sent in headers for protected routes

---

## 📄 License

This project is for learning and development purposes.

