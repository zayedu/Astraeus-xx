# Astraeus - RBC Internal Chatbot

A modern, AI-powered chatbot interface for RBC's internal data insights, combining RBC's brand identity with Stripe's sleek aesthetic and ChatGPT's intuitive chat experience.

## ✨ Features

- **Modern Chat Interface**: ChatGPT-inspired UI with message bubbles, auto-scroll, and smooth animations
- **Dual Model Support**: Toggle between DFR and PAR team endpoints for different data insights
- **Streaming Markdown**: Real-time markdown rendering with incremental updates
- **RBC Brand Integration**: Official RBC colors (Medium Persian Blue #005DAA, Cyber Yellow #FFD200)
- **Stripe-Inspired Design**: Glass morphism, gradients, and micro-interactions
- **Fully Responsive**: Mobile-first design with accessibility features
- **Performance Optimized**: Bundle size under 300KB gzipped

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Running backend services on:
  - \`localhost:8080/par/stream-insights\` (DFR team)
  - \`127.0.0.1:8080/dfr/stream-insights\` (PAR team)

### Installation

\`\`\`bash
# Clone the repository
git clone <repository-url>
cd astraeus-chatbot

# Install dependencies
npm install

# Start development server
npm run dev
\`\`\`

The application will be available at \`http://localhost:5173\`

### Build for Production

\`\`\`bash
# Build the application
npm run build

# Preview the build
npm run preview
\`\`\`

## 🏗️ Architecture

### Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling with custom RBC theme
- **Framer Motion** for smooth animations
- **Zustand** for lightweight state management
- **react-markdown** for streaming markdown rendering

### Project Structure

\`\`\`
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # App header with branding
│   ├── ModelToggle.tsx # DFR/PAR model selector
│   ├── ChatMessage.tsx # Individual message component
│   └── ChatInput.tsx   # Message input with auto-resize
├── services/           # API and external services
│   └── api.ts         # Streaming API integration
├── store/             # State management
│   └── chatStore.ts   # Chat state with Zustand
├── App.tsx            # Main application component
├── main.tsx           # Application entry point
├── App.css            # Custom styles and animations
└── index.css          # Global styles and Tailwind imports
\`\`\`

## 🎨 Design System

### Colors

- **Primary**: Medium Persian Blue (#005DAA)
- **Secondary**: Cyber Yellow (#FFD200)  
- **Background**: Gradient from slate to blue tones
- **Glass Effects**: White with backdrop blur

### Typography

- **Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

### Components

- **Glass Morphism**: Backdrop blur with subtle borders
- **Rounded Corners**: 2xl (16px) for cards, xl (12px) for buttons
- **Shadows**: Soft, layered shadows for depth
- **Animations**: Framer Motion for smooth transitions

## 🔧 Configuration

### Environment Variables

No environment variables required for basic functionality. The API endpoints are configured in \`src/services/api.ts\`.

### Customization

#### Changing API Endpoints

Edit \`src/services/api.ts\`:

\`\`\`typescript
const endpoints = {
  dfr: 'your-dfr-endpoint',
  par: 'your-par-endpoint'
}
\`\`\`

#### Modifying Brand Colors

Update \`tailwind.config.js\`:

\`\`\`javascript
colors: {
  rbc: {
    blue: '#005DAA',
    yellow: '#FFD200',
    // Add more colors as needed
  }
}
\`\`\`

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch Friendly**: Large tap targets and gesture support
- **Keyboard Navigation**: Full keyboard accessibility

## ♿ Accessibility

- **ARIA Labels**: Comprehensive screen reader support
- **Keyboard Navigation**: Tab order and focus management
- **Color Contrast**: WCAG AA compliant color combinations
- **Focus Indicators**: Clear focus states for all interactive elements

## 🚀 Performance

- **Code Splitting**: Automatic route-based splitting
- **Lazy Loading**: Heavy components loaded on demand
- **Bundle Size**: Optimized to stay under 300KB gzipped
- **Streaming**: Efficient real-time data handling

## 🧪 Development

### Available Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run preview\` - Preview production build
- \`npm run lint\` - Run ESLint

### Code Quality

- **TypeScript**: Full type safety
- **ESLint**: Code linting with React hooks rules
- **Prettier**: Code formatting (configure as needed)

## 📦 Deployment

### Vercel (Recommended)

\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
\`\`\`

### Other Platforms

The built application in \`dist/\` can be deployed to any static hosting service:

- Netlify
- AWS S3 + CloudFront
- GitHub Pages
- Firebase Hosting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

Internal RBC project - All rights reserved.

## 🆘 Support

For technical support or questions:

- Create an issue in the repository
- Contact the development team
- Check the troubleshooting section below

## 🔧 Troubleshooting

### Common Issues

**Build fails with TypeScript errors**
- Run \`npm run lint\` to check for type issues
- Ensure all dependencies are installed

**Streaming not working**
- Verify backend services are running
- Check CORS configuration on backend
- Confirm API endpoints in \`api.ts\`

**Styling issues**
- Clear browser cache
- Rebuild Tailwind: \`npm run build\`
- Check for conflicting CSS

**Performance issues**
- Run \`npm run build\` and check bundle size
- Use React DevTools Profiler
- Check for memory leaks in streaming connections
