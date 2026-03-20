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

## 4️⃣ Forgot Password (OTP Based)

This flow allows users to **reset their password using OTP verification**.

---

### 4.1️⃣ Send OTP for Password Reset

#### 📍 Endpoint

```
POST /api/user/send-otpFor
```

#### 📝 Description

Sends a **4-digit OTP** to the registered mobile number for password reset.

#### 📥 Request Body

```json
{
  "mobile": 9123456780
}
```

#### 📤 Response

```json
{
  "message": "OTP sent successfully for password reset"
}
```

---

### 4.2️⃣ Verify OTP for Password Reset

#### 📍 Endpoint

```
POST /api/user/verify-otpfor
```

#### 📝 Description

Verifies the OTP sent for password reset.

#### 📥 Request Body

```json
{
  "mobile": 9123456780,
  "otp": "5508"
}
```

#### 📤 Response

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

### 4.3️⃣ Reset Password

#### 📍 Endpoint

```
POST /api/user/restepass
```

#### 📝 Description

Resets the user's password after successful OTP verification.

#### 📥 Request Body

```json
{
  "gmail": "aniruddha.saraf@example.com",
  "password": "SecurePass@456dgfybd",
  "Repassword": "SecurePass@456dgfybd"
}
```

#### 📤 Response

```json
{
  "message": "Password reset successfully"
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

## 5 Topic All Api
### 1 Add Topic
#### 📍 Endpoint
```
Post api/topic/topicAdd 
```
#### 📝 Description
    - TO add Topic use this api
####  Request Body
JSON
```
{



}
```

### 2 All topic
#### 📍 Endpoint

```
GET  api/topic/topicget
```
#### 📝 Description

   - To get all Topic use this api
### 3 one Topic
#### 📍 Endpoint

```
GET  api/topic/topicone/:id
```
#### 📝 Description


   - To get one Topic use this api


## 6 All Question Activity
### 1. GET the Question Array

#### 📍 Endpoint

```
GET /api/question/questiona/:topic
```

#### 📝 Description

Now this api through use get Question Array to frented

#### 📤 Response

```json
{
  Data In json
}
```

---

### 2. Insert Question in Dataset

#### 📍 Endpoint

```
POST /api/question/postQuestion
```

#### 📝 Description

To Insert Question in dataset 

#### 📥 Request Body

```json
{
  "difficulty": "easy",
    "questionText": "What are components?",
    "correctAnswer": "Components are reusable pieces of UI in React.",
    "keyConcepts": ["components", "reusable", "UI"],
    "keywords": ["components", "ui"]

}
```

#### 📤 Response

```json
{
   "message": "Questions inserted successfully",
}
```

---

## 7 . Test Record
### 4.3️⃣ Reset Password

#### 📍 Endpoint

```
POST /api/record/restepass
```

#### 📝 Description

Resets the user's password after successful OTP verification.

#### 📥 Request Body

```json
{
  "gmail": "aniruddha.saraf@example.com",
  "password": "SecurePass@456dgfybd",
  "Repassword": "SecurePass@456dgfybd"
}
```

#### 📤 Response

```json
{
  "message": "Password reset successfully"
}
```

---

### 4.3️⃣ Reset Password

#### 📍 Endpoint

```
POST /api/user/restepass
```

#### 📝 Description

Resets the user's password after successful OTP verification.

#### 📥 Request Body

```json
{
  "gmail": "aniruddha.saraf@example.com",
  "password": "SecurePass@456dgfybd",
  "Repassword": "SecurePass@456dgfybd"
}
```

#### 📤 Response

```json
{
  "message": "Password reset successfully"
}
```

---

### 4.3️⃣ Reset Password

#### 📍 Endpoint

```
POST /api/user/restepass
```

#### 📝 Description

Resets the user's password after successful OTP verification.

#### 📥 Request Body

```json
{
  "gmail": "aniruddha.saraf@example.com",
  "password": "SecurePass@456dgfybd",
  "Repassword": "SecurePass@456dgfybd"
}
```

#### 📤 Response

```json
{
  "message": "Password reset successfully"
}
```

---

### 4.3️⃣ Reset Password

#### 📍 Endpoint

```
POST /api/user/restepass
```

#### 📝 Description

Resets the user's password after successful OTP verification.

#### 📥 Request Body

```json
{
  "gmail": "aniruddha.saraf@example.com",
  "password": "SecurePass@456dgfybd",
  "Repassword": "SecurePass@456dgfybd"
}
```

#### 📤 Response

```json
{
  "message": "Password reset successfully"
}
```

---

### 4.3️⃣ Reset Password

#### 📍 Endpoint

```
POST /api/user/restepass
```

#### 📝 Description

Resets the user's password after successful OTP verification.

#### 📥 Request Body

```json
{
  "gmail": "aniruddha.saraf@example.com",
  "password": "SecurePass@456dgfybd",
  "Repassword": "SecurePass@456dgfybd"
}
```

#### 📤 Response

```json
{
  "message": "Password reset successfully"
}
```

---