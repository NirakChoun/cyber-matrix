# CyberMatrix Educational Platform

An interactive educational cybersecurity website that simulates common cyberattacks in a safe, controlled environment. Built with React and Vite, this platform helps users learn about cybersecurity threats through hands-on experience.

## 🛡️ Features

### Interactive Simulations
- **Phishing Attack Simulation**: Learn to identify and defend against phishing emails with real-world examples
- **SQL Injection Demonstration**: Understand database vulnerabilities through safe, controlled examples
- **DoS Attack Visualization**: Explore Denial of Service attacks and mitigation strategies

### Educational Content
- Step-by-step tutorials for each attack type
- Real-time feedback and analysis
- Security best practices and defense strategies
- Safe learning environment with no real security risks

### Modern UI/UX
- Cybersecurity-themed dark design
- Responsive layout for all devices
- Interactive components and animations
- Clear educational warnings and disclaimers

## 🚀 Getting Started

### Prerequisites
- Node.js (v20.14.0 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cyber-matrix
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔒 Security Notice

⚠️ **EDUCATIONAL USE ONLY**

This platform is designed exclusively for educational purposes. All simulations are contained within the application and pose no real security threats. The knowledge gained should only be used for:

- Learning about cybersecurity threats
- Developing defensive security skills
- Understanding attack vectors to better protect systems
- Educational and training purposes

**Do not use the techniques demonstrated here for malicious purposes.**

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx      # Navigation header
│   └── Footer.jsx      # Footer with disclaimers
├── pages/              # Main application pages
│   ├── Home.jsx        # Landing page
│   ├── PhishingSimulation.jsx     # Phishing attack simulation
│   ├── SQLInjectionSimulation.jsx # SQL injection demo
│   └── DoSSimulation.jsx          # DoS attack visualization
├── App.jsx             # Main application component
└── main.jsx           # Application entry point
```

## 🎯 Learning Objectives

After using this platform, users will understand:

1. **Phishing Attacks**
   - How to identify suspicious emails
   - Common phishing techniques
   - Defense strategies and best practices

2. **SQL Injection**
   - How database vulnerabilities are exploited
   - The importance of input validation
   - Secure coding practices

3. **DoS Attacks**
   - Different types of denial of service attacks
   - Impact on system availability
   - Mitigation and prevention strategies

## 🤝 Contributing

This is an educational project. If you'd like to contribute:

1. Fork the repository
2. Create a feature branch
3. Add educational content or improve existing simulations
4. Ensure all content maintains the educational focus
5. Submit a pull request

## 📄 License

This project is for educational use only. Please respect the educational nature of this platform and use it responsibly.

## 🙏 Acknowledgments

- OWASP for cybersecurity guidelines
- NIST Cybersecurity Framework
- Educational cybersecurity community

---

**Remember: Use this knowledge to defend, not to attack. Stay ethical!**te

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
