# 🤖 AI Virtual Assistant

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=google-gemini&logoColor=white" alt="Gemini AI" />
</div>

<div align="center">
  <h3>🎯 A Personalized Voice-Enabled AI Assistant with Custom Avatar Support</h3>
  <p>Built with modern web technologies and powered by Google Gemini AI</p>
</div>

---

## 👥 Team

**Created by**: Gaurav, Sahil Kamboj, Dheeraj Kumar, Shehry, Tamanna 🚀

---

## 🌟 Features

### 🎤 **Voice Interaction**
- **Speech Recognition**: Real-time voice input processing
- **Text-to-Speech**: Natural voice responses
- **Voice Commands**: Execute tasks through voice commands

### 🎨 **Personalization**
- **Custom Avatar**: Choose from multiple AI assistant avatars
- **Personal Assistant Name**: Set your own assistant name
- **User Profiles**: Personalized user experience with authentication

### 🔍 **Smart Commands**
- **🌐 Web Search**: "Search Google for..."
- **📺 YouTube Integration**: "Play on YouTube..." / "Search YouTube for..."
- **🧮 Calculator**: "Open calculator"
- **📱 Social Media**: Quick access to Instagram, Facebook
- **🌤️ Weather**: "What's the weather like?"
- **⏰ Time & Date**: Get current time, date, day information
- **💬 General Q&A**: Powered by Google Gemini AI

### 🔐 **Authentication & Security**
- **JWT Authentication**: Secure user sessions
- **Password Encryption**: bcrypt for password security
- **Cookie-based Sessions**: Persistent login state

---

## 🛠️ Technology Stack

### **Frontend** 🎨
| Technology | Purpose | Version |
|------------|---------|---------|
| ![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=white) | UI Framework | 19.1.1 |
| ![Vite](https://img.shields.io/badge/-Vite-646CFF?style=flat-square&logo=vite&logoColor=white) | Build Tool | 7.1.7 |
| ![TailwindCSS](https://img.shields.io/badge/-TailwindCSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white) | Styling | 4.1.14 |
| ![React Router](https://img.shields.io/badge/-React_Router-CA4245?style=flat-square&logo=react-router&logoColor=white) | Navigation | 7.9.3 |
| ![React Icons](https://img.shields.io/badge/-React_Icons-E10098?style=flat-square&logo=react&logoColor=white) | Icons | 5.5.0 |
| ![Axios](https://img.shields.io/badge/-Axios-5A29E4?style=flat-square&logo=axios&logoColor=white) | HTTP Client | 1.12.2 |

### **Backend** ⚙️
| Technology | Purpose | Version |
|------------|---------|---------|
| ![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white) | Runtime | Latest |
| ![Express](https://img.shields.io/badge/-Express-000000?style=flat-square&logo=express&logoColor=white) | Web Framework | 5.1.0 |
| ![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white) | Database | 8.18.3 |
| ![JWT](https://img.shields.io/badge/-JWT-000000?style=flat-square&logo=json-web-tokens&logoColor=white) | Authentication | 9.0.2 |
| ![Cloudinary](https://img.shields.io/badge/-Cloudinary-3448C5?style=flat-square&logo=cloudinary&logoColor=white) | Image Storage | 2.7.0 |
| ![bcrypt](https://img.shields.io/badge/-bcrypt-338033?style=flat-square&logo=npm&logoColor=white) | Password Hashing | 3.0.2 |

### **AI Integration** 🧠
| Technology | Purpose |
|------------|---------|
| ![Google Gemini](https://img.shields.io/badge/-Google_Gemini-4285F4?style=flat-square&logo=google&logoColor=white) | AI Language Model |
| ![Web Speech API](https://img.shields.io/badge/-Web_Speech_API-FF6B6B?style=flat-square&logo=html5&logoColor=white) | Speech Recognition & Synthesis |

---

## 🚀 How It Works

### 1. **🎯 Voice Command Processing**
```mermaid
graph LR
    A[🎤 Voice Input] --> B[🔄 Speech Recognition]
    B --> C[🧠 Gemini AI Processing]
    C --> D[📝 Intent Classification]
    D --> E[⚡ Action Execution]
    E --> F[🔊 Voice Response]
```

### 2. **🤖 AI Response Types**
The assistant can handle various command types:

- **`general`** - Factual questions and conversations
- **`google_search`** - Web search queries
- **`youtube_search`** - YouTube content search
- **`youtube_play`** - Direct YouTube playback
- **`calculator_open`** - Calculator application
- **`instagram_open`** - Social media access
- **`facebook_open`** - Social media access
- **`weather_show`** - Weather information
- **`get_time`** - Current time
- **`get_date`** - Current date
- **`get_day`** - Current day

### 3. **🎨 Personalization Flow**
```
User Registration → Avatar Selection → Assistant Naming → Voice Interaction
```

---

## 📁 Project Structure

```
VirtualAssistant/
├── 🎨 frontend/
│   ├── src/
│   │   ├── 📄 pages/          # React pages (Home, Login, SignUp, Customize)
│   │   ├── 🧩 components/     # Reusable components
│   │   ├── 🎯 context/        # React Context (UserContext)
│   │   ├── 🖼️ assets/         # Images, GIFs, icons
│   │   └── 📱 App.jsx         # Main app component
│   ├── 📦 package.json
│   └── ⚙️ vite.config.js
├── ⚙️ backend/
│   ├── 🔧 config/            # Database & API configurations
│   ├── 🛡️ middlewares/       # Authentication & file upload
│   ├── 📊 models/            # MongoDB schemas
│   ├── 🛣️ routes/            # API endpoints
│   ├── 🎮 controllers/       # Business logic
│   ├── 🤖 gemini.js          # AI integration
│   ├── 🚀 index.js           # Server entry point
│   └── 📦 package.json
└── 📖 README.md
```

---

## 🔧 Installation & Setup

### **Prerequisites** 📋
- ![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white) Node.js (v16+)
- ![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white) MongoDB
- ![Google Cloud](https://img.shields.io/badge/-Google_Cloud-4285F4?style=flat-square&logo=google-cloud&logoColor=white) Google Gemini API Key
- ![Cloudinary](https://img.shields.io/badge/-Cloudinary-3448C5?style=flat-square&logo=cloudinary&logoColor=white) Cloudinary Account

### **1. Clone Repository** 📥
```bash
git clone https://github.com/yourusername/virtual-assistant.git
cd virtual-assistant
```

### **2. Backend Setup** ⚙️
```bash
cd backend
npm install

# Create .env file
touch .env
```

**Environment Variables** 🔐
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/virtualassistant
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_gemini_api_key
GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

```bash
# Start backend server
npm run dev
```

### **3. Frontend Setup** 🎨
```bash
cd ../frontend
npm install

# Start development server
npm run dev
```

### **4. Access Application** 🌐
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3000

---

## 🎮 Usage Guide

### **Getting Started** 🚀
1. **📝 Sign Up**: Create your account
2. **🎨 Customize**: Choose your AI assistant avatar and name
3. **🎤 Enable Voice**: Allow microphone permissions
4. **💬 Start Chatting**: Click the microphone and start speaking!

### **Voice Commands Examples** 🗣️
```
🔍 "Search Google for latest technology news"
📺 "Play relaxing music on YouTube"
🧮 "Open calculator"
🌤️ "What's the weather like today?"
⏰ "What time is it?"
📅 "What's today's date?"
💬 "Tell me a joke"
📱 "Open Instagram"
```

### **Text Input** ⌨️
You can also type your queries if voice input is not available.

---

## 🔒 Security Features

- **🔐 JWT Authentication**: Secure token-based authentication
- **🛡️ Password Encryption**: bcrypt hashing for passwords
- **🍪 HTTP-only Cookies**: Secure session management
- **🔒 CORS Protection**: Cross-origin request security
- **✅ Input Validation**: Server-side input sanitization

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **🍴 Fork** the repository
2. **🌿 Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **💾 Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **📤 Push** to the branch (`git push origin feature/AmazingFeature`)
5. **🔄 Open** a Pull Request

---

## 📝 License

This project is licensed under the **ISC License** - see the [LICENSE](LICENSE) file for details.

---


## 🙏 Acknowledgments

- **Google Gemini AI** for powerful language processing
- **React Community** for amazing frontend tools
- **Node.js Community** for robust backend solutions
- **MongoDB** for flexible data storage
- **Cloudinary** for image management

---

<div align="center">
  <h3>⭐ If you found this project helpful, please give it a star! ⭐</h3>
  <p>Made with ❤️ by Gaurav</p>
</div>

---

## 📞 Support

If you have any questions or need help, feel free to:
- 🐛 Open an issue
- 💬 Start a discussion
- 📧 Contact the team

**Happy Coding!** 🎉
