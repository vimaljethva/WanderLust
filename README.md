
# 🌍 Wanderlust

A full-stack **Travel & Listing Web App** inspired by Airbnb — built with **Node.js, Express, MongoDB, and EJS**.
Users can explore, list, and book properties from around the world — from cozy cabins near Mount Fuji to luxury hotels in Dubai.

---

### 📸 Screenshots

#### 🏠 Home Page

![Alt text](indexcompress.png)



---

## 🧾 Project Overview

**Wanderlust** is a travel & property listing application that lets users:

* Browse and view property listings from different countries 🌎
* Add, edit, and delete their own listings 🏡
* Explore details, photos, and pricing for each destination 💸
* Book and manage travel stays easily through an intuitive UI

The project mimics Airbnb’s functionality but is built entirely from scratch using Express and MongoDB.

---

## 🛠️ Tech Stack

* 💻 **Backend:** Node.js + Express.js
* 🗄️ **Database:** MongoDB (Atlas Free Cluster 512MB)
* 🎨 **Templating:** EJS (Embedded JavaScript)
* 💅 **Styling:** Bootstrap + Custom CSS
* ☁️ **Hosting:** Render (Free Tier)

---

## ⚙️ Setup

Follow these steps to get **Wanderlust** running locally 👇

**1. Clone the repository:**

```bash
git clone https://github.com/vimaljethva/Wanderlust.git
```

**2. Navigate to the project directory:**

```bash
cd Wanderlust
```

**3. Install dependencies:**

```bash
npm install

```

#### 4. Add .env file at root directory of your project (where your package.json file is location)
```
# Cloudinary Configuration
CLOUD_NAME=your_cloud_name_here
CLOUD_API_KEY=your_api_key_here
CLOUD_API_SECRET=your_api_secret_here

# MongoDB Atlas Connection
ATLASDB_URL=your_mongodb_connection_string_here

# Application Secret (used for JWT or session signing)
SECRET=your_secret_key_here
```





**5. Start the application:**

```bash
node app.js
```

**6. Open in your browser:**
Visit 👉 [http://localhost:8080](http://localhost:8080)

---

## 🚀 Features

✅ User-friendly EJS UI with Bootstrap styling<br>
✅ Add, edit, and view listings dynamically<br>
✅ Store and retrieve data from MongoDB Atlas<br>
✅ Deployed on Render’s free hosting plan<br>
✅ MVC Architecture<br>
✅ Add user authentication (Login/Signup)<br>
✅ Organized folder structure (routes, views, models, public)<br>
✅ Integrate cloud image uploads (e.g., Cloudinary)<br>
✅ Implement review & rating system<br>

---

## 🧩 Future Enhancements
* Improve responsive design for mobile
  
---
