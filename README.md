# LinkUP - Social Event Discovery & Connection Platform

<div align="center">

![LinkUP Logo](./assets/images/icon-foreground.png)

**Connect. Discover. Experience.**

A modern React Native mobile application that brings people together through real-time event discovery, location-based networking, and meaningful connections.

[![Expo](https://img.shields.io/badge/Expo-000000?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com)

</div>

---

##  **Overview**

LinkUP is a cutting-edge social networking platform designed to help users discover local events, connect with like-minded individuals, and build meaningful relationships through shared experiences. The app leverages location-based services, real-time data synchronization, and modern UI/UX principles to create an engaging and intuitive user experience.

---

##  **Key Features**

### 🗺️ **Interactive Map Discovery**
- **Real-time event visualization** on interactive maps
- **Location-based event recommendations** using GPS integration
- **Custom map markers** with event details and attendee information
- **Geospatial queries** for finding nearby activities

### **Smart Networking**
- **People discovery** algorithm with compatibility scoring
- **Mutual friend connections** and social graph integration
- **Distance-based filtering** for local connections
- **Personalized recommendations** based on user preferences

###  **Event Management**
- **Create and host events** with comprehensive details
- **Event categorization** (Outdoor, Food, Music, Sports, Study, Party, Coffee, Gaming)
- **Privacy controls** (Public vs Friends-only events)
- **Real-time attendee tracking** and RSVP management
- **Event chat functionality** for participant coordination

###  **Advanced Authentication**
- **Dual-mode authentication**: Linked (full profile) vs Unlinked (browse-only)
- **Supabase-powered secure authentication** with email/password
- **Phone verification** and location-based registration
- **Profile management** with avatar uploads and bio customization

###  **Real-time Communication**
- **In-app messaging** system for event participants
- **Group chat functionality** for event coordination
- **Push notification support** for event updates and messages
- **Real-time synchronization** across all user devices

### **Modern UI/UX**
- **Gradient-based design system** with consistent theming
- **Smooth animations** using Framer Motion and React Native Reanimated
- **Custom bottom navigation** with contextual hiding
- **Responsive design** for various screen sizes and orientations
- **Dark/Light theme support** with automatic switching

---

##  **Technical Architecture**

### **Frontend Stack**
```
React Native (0.81.5)     # Core mobile framework
├── Expo SDK (~54.0.20)  # Development platform & tools
├── TypeScript (~5.9.2)  # Type safety & better DX
├── Expo Router (~6.0.13) # File-based routing
└── React Navigation     # Navigation stack management
```

### **State Management & Data**
```
Context API             # Global state management
├── AuthContext         # User authentication state
├── ThemeContext        # UI theme management
├── NavigationContext   # Navigation state
└── DialogContext       # Modal/dialog management
```

### **Backend & Services**
```
Supabase               # Backend-as-a-Service
├── Authentication     # User auth & session management
├── Database           # PostgreSQL with real-time subscriptions
├── Storage            # File uploads (avatars, images)
└── Edge Functions     # Serverless business logic
```

### **UI Components & Styling**
```
UI Framework
├── React Native Paper  # Material Design components
├── Expo Linear Gradient # Gradient backgrounds
├── Lucide React Native # Icon system
├── Framer Motion (12.23.24) # Animations
└── Custom Components   # Reusable UI library
```

### **Location & Maps**
```
Location Services
├── Expo Location       # GPS & permissions
├── React Native Maps   # Interactive map rendering
└── Geospatial queries  # Location-based filtering
```

---

## 📱 **Core Screens & Components**

### **Authentication Flow**
- **Dynamic particle background** with animated effects
- **Multi-step registration** with phone, email, and location verification
- **Social login options** (Google Sign-in integration ready)
- **Progressive profiling** with linked/unlinked modes

### **Main Navigation**
- **Custom bottom navigation** with contextual hiding
- **Tab-based routing**: Events, Map, People, Profile
- **Smooth transitions** and micro-interactions
- **Badge notifications** for unread messages and updates

### **Event Discovery**
- **Trending events** feed with algorithmic sorting
- **Friends' events** prioritized display
- **Past events** history and attendance tracking
- **Event cards** with rich media and attendee previews

### **Map Interface**
- **Interactive map view** with clustering support
- **Event markers** with tap-to-preview functionality
- **User location tracking** with permission handling
- **Heat map visualization** for event density

### **People Discovery**
- **Smart matching algorithm** with compatibility scoring
- **Distance-based filtering** and location preferences
- **Mutual friend highlighting** and social proof
- **One-tap invitation** system for events

### **Event Creation**
- **Comprehensive event form** with validation
- **Date/time pickers** with native UI components
- **Location input** with autocomplete suggestions
- **Tag-based categorization** for better discoverability

### **Profile Management**
- **Rich profile customization** with avatar uploads
- **Bio and interests** sections
- **Event history** and attendance statistics
- **Privacy settings** and data management

---

## 🔧 **Development Setup**

### **Prerequisites**
- Node.js 18+ 
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (macOS) or Android Emulator
- Physical device for testing (recommended)

### **Installation**
```bash
# Clone the repository
git clone https://github.com/znafi/LinkUP.git
cd LinkUP

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Supabase credentials

# Start development server
npm start
```

### **Environment Configuration**
```bash
# Required environment variables
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Get these from: https://supabase.com/dashboard/project/_/settings/api
```

### **Running the App**
```bash
# Start Metro bundler
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run in web browser
npm run web
```

---

## 📊 **Database Schema**

### **Users Table**
```sql
- id (uuid, primary key)
- email (text, unique)
- username (text, unique)
- full_name (text)
- phone (text)
- date_of_birth (date)
- location (text)
- avatar_url (text)
- bio (text)
- auth_mode (linked/unlinked)
- created_at (timestamp)
- updated_at (timestamp)
```

### **Events Table**
```sql
- id (uuid, primary key)
- title (text)
- description (text)
- host_id (uuid, foreign key)
- location_name (text)
- location_lat (float)
- location_lng (float)
- event_date (timestamp)
- privacy (public/friends)
- tags (text array)
- max_attendees (integer)
- created_at (timestamp)
```

### **Attendees Table**
```sql
- id (uuid, primary key)
- event_id (uuid, foreign key)
- user_id (uuid, foreign key)
- status (pending/confirmed/declined)
- invited_at (timestamp)
- responded_at (timestamp)
```

---

##  **Performance Optimizations**

### **Rendering Optimizations**
- **FlatList components** with memoization for large datasets
- **Image caching** with expo-image for smooth scrolling
- **Lazy loading** for map markers and event data
- **Virtualization** for people discovery feeds

### **Network Optimizations**
- **Supabase real-time subscriptions** for instant updates
- **Offline support** with AsyncStorage for critical data
- **Request batching** to reduce API calls
- **Optimistic updates** for better perceived performance

### **Memory Management**
- **Component cleanup** with useEffect hooks
- **Animation optimization** using native drivers
- **Image compression** for avatar uploads
- **State management** to prevent memory leaks

---

##  **Security Features**

### **Authentication Security**
- **JWT token management** with automatic refresh
- **Session persistence** with secure storage
- **Password strength validation** during registration
- **Phone verification** for account authenticity

### **Data Protection**
- **Input sanitization** to prevent injection attacks
- **Rate limiting** on API endpoints
- **CORS configuration** for web security
- **Environment variable protection** for sensitive data

### **Privacy Controls**
- **Granular permissions** for location access
- **Privacy settings** for profile visibility
- **Data export** and deletion capabilities
- **GDPR compliance** considerations

---

##  **Testing Strategy**

### **Unit Testing**
- **Component testing** with React Native Testing Library
- **Context testing** for state management
- **Utility function testing** for business logic
- **Mock implementations** for external dependencies

### **Integration Testing**
- **API integration** with Supabase services
- **Navigation testing** for user flows
- **Authentication testing** for complete auth cycles
- **Real-time subscription testing**

### **E2E Testing**
- **Critical user journey** automation
- **Cross-platform compatibility** testing
- **Performance benchmarking** on various devices
- **Accessibility testing** for inclusive design

---

## **Scalability Considerations**

### **Database Scaling**
- **Supabase PostgreSQL** with automatic scaling
- **Database indexing** for query optimization
- **Connection pooling** for high concurrency
- **Read replicas** for global distribution

### **App Performance**
- **Code splitting** for reduced bundle size
- **Image optimization** and CDN delivery
- **Caching strategies** for frequently accessed data
- **Background processing** for non-critical tasks

### **Infrastructure**
- **Edge deployment** with global distribution
- **Load balancing** for high availability
- **Monitoring and alerting** for system health
- **Backup and disaster recovery** planning

---

## **Design System**

### **Color Palette**
```css
--primary: #FF3FA7;      /* Brand pink */
--secondary: #3B82F6;    /* Accent blue */
--success: #10B981;      /* Success green */
--warning: #F59E0B;      /* Warning amber */
--error: #EF4444;        /* Error red */
--dark: #1F2937;         /* Dark mode */
--light: #F9FAFB;        /* Light mode */
```

### **Typography**
- **Primary Font**: System (San Francisco/Roboto)
- **Heading Weights**: 600, 700
- **Body Weights**: 400, 500
- **Monospace**: SF Mono/Roboto Mono

### **Spacing System**
- **Base Unit**: 4px
- **Scale**: 4, 8, 12, 16, 24, 32, 48, 64px
- **Component Padding**: 16px standard
- **Section Margins**: 24px standard

---

## **Continuous Integration/Deployment**

### **Build Pipeline**
```yaml
# GitHub Actions Workflow
1. Code Quality Checks
   - ESLint & Prettier
   - TypeScript compilation
   - Unit test execution

2. Security Scanning
   - Dependency vulnerability check
   - Code security analysis
   - Secret scanning

3. Build Process
   - Metro bundling
   - Asset optimization
   - Platform-specific builds

4. Deployment
   - EAS Build for iOS/Android
   - Automatic store submission
   - Rollout monitoring
```

### **Code Quality**
- **ESLint configuration** for consistent code style
- **Prettier formatting** for automated code cleanup
- **Husky pre-commit hooks** for quality gates
- **TypeScript strict mode** for type safety

---

##  **Platform-Specific Features**

### **iOS Features**
- **Native iOS integration** with Expo modules
- **Face ID/Touch ID** support for authentication
- **Apple Health integration** (planned)
- **iCloud synchronization** for data backup

### **Android Features**
- **Material Design 3** compliance
- **Google Play Services** integration
- **Biometric authentication** support
- **Android Auto compatibility** (planned)

### **Cross-Platform**
- **Responsive design** for all screen sizes
- **Platform-specific UI adaptations**
- **Unified API** for consistent behavior
- **Progressive Web App** support

---

## 🔮 **Future Roadmap**

### **Phase 1: Core Enhancement** (Q1 2024)
- [ ] **Advanced filtering** for events and people
- [ ] **Event recommendations** using ML algorithms
- [ ] **Group creation** and management features
- [ ] **Enhanced notifications** with custom sounds

### **Phase 2: Social Features** (Q2 2024)
- [ ] **Photo/video sharing** in events
- [ ] **Event stories** and highlights
- [ ] **Friend suggestions** based on interests
- [ ] **Social feed** with activity updates

### **Phase 3: Monetization** (Q3 2024)
- [ ] **Premium subscriptions** for advanced features
- [ ] **Event promotion** tools for organizers
- [ ] **Ticket integration** with payment processing
- [ ] **Business profiles** for commercial events

### **Phase 4: Expansion** (Q4 2024)
- [ ] **Web platform** with full feature parity
- [ ] **International expansion** with localization
- [ ] **API platform** for third-party integrations
- [ ] **Wearable app** for quick interactions

---

## **Contributing Guidelines**

### **Development Workflow**
1. **Fork the repository** and create feature branch
2. **Follow coding standards** and commit conventions
3. **Write tests** for new functionality
4. **Submit pull request** with detailed description
5. **Code review** and merge process

### **Code Standards**
- **TypeScript strict mode** for all new code
- **Component composition** over inheritance
- **Immutable state updates** with proper patterns
- **Error boundaries** for graceful error handling

### **Documentation**
- **Inline comments** for complex logic
- **README updates** for new features
- **API documentation** for external interfaces
- **Architecture decision records** (ADRs)

---

## 📞 **Contact & Support**

### **Development Team**
- **Lead Developer**: Zawad Nafi
- **UI/UX Designer**: [Designer Name]
- **Backend Engineer**: [Backend Name]
- **Product Manager**: [PM Name]

### **Community**
- **Discord Server**: [Link to community]
- **Twitter/X**: [@LinkUPApp]
- **Instagram**: [@LinkUPSocial]
- **LinkedIn**: [Company Page]

### **Support**
- **Email**: support@linkup.app
- **Help Center**: [Documentation Link]
- **Bug Reports**: [GitHub Issues]
- **Feature Requests**: [Feature Board]

---

## 📄 **License & Legal**

<div align="center">

**© 2024 LinkUP Inc. All rights reserved.**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Made with ❤️ by the LinkUP Team**

</div>
