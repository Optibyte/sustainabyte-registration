# Sustainabyte - Smart Energy Solutions Landing Page

![Sustainabyte](https://img.shields.io/badge/Sustainabyte-Energy%20Optimization-blue?style=for-the-badge&logo=next.js)
![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css)

A modern, responsive landing page for Sustainabyte - an energy optimization platform that helps facilities achieve 7-30% energy savings through intelligent, predictive, and controlled systems.

## 🌟 Features

### ✨ Core Features

- **Responsive Design**: Fully responsive across all devices and screen sizes
- **Smooth Animations**: Custom shimmer button effects and reveal animations
- **Interactive Elements**: Smooth scrolling navigation and hover effects
- **Professional UI**: Modern design with gradient backgrounds and glassmorphism effects

### 🎯 User Experience

- **Consultation Booking**: Integrated form with validation and email notifications
- **International Support**: Phone input with country selection
- **Real-time Feedback**: Toast notifications for form submissions
- **Accessibility**: Proper ARIA labels and keyboard navigation

### 📧 Backend Integration

- **Email Automation**: Gmail SMTP integration for consultation requests
- **Dual Notifications**: Automatic emails to both company and customers
- **Professional Templates**: Beautiful HTML email templates
- **Form Validation**: Comprehensive client and server-side validation

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: Radix UI primitives with custom styling
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Animations**: Framer Motion (Reveal components)

### Backend

- **API Routes**: Next.js API routes
- **Email Service**: Nodemailer with Gmail SMTP
- **Validation**: Zod schemas
- **Notifications**: Sonner toast library

### Development Tools

- **Package Manager**: Bun (recommended) / npm / yarn / pnpm
- **Linting**: ESLint with Next.js config
- **Type Checking**: TypeScript
- **Code Formatting**: Prettier (via editor)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Gmail account for SMTP (or any SMTP provider)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/sustainabyte-landing.git
   cd sustainabyte-landing
   ```

2. **Install dependencies**

   ```bash
   # Using Bun (recommended)
   bun install

   # Or using npm
   npm install

   # Or using yarn
   yarn install

   # Or using pnpm
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your configuration:

   ```env
   # Email Configuration (Gmail SMTP)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password

   # Consultation Email Settings
   CONSULTATION_TARGET_EMAIL=consultations@sustainabyte.com
   CONSULTATION_FROM_EMAIL=your-email@gmail.com
   ```

4. **Run the development server**

   ```bash
   # Using Bun
   bun run dev

   # Or using npm
   npm run dev

   # Or using yarn
   yarn dev

   # Or using pnpm
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📧 Email Configuration

### Gmail Setup

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Use the App Password in `SMTP_PASS`

### Environment Variables

```env
# Required for email functionality
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-character-app-password

# Optional: Custom email addresses
CONSULTATION_TARGET_EMAIL=consultations@yourcompany.com
CONSULTATION_FROM_EMAIL=noreply@yourcompany.com
```

## 📁 Project Structure

```
sustainabyte-landing/
├── app/
│   ├── api/
│   │   └── inquiry/
│   │       └── route.ts          # Consultation form API
│   ├── favicon.ico
│   ├── globals.css               # Global styles & animations
│   ├── layout.tsx                # Root layout with metadata
│   └── page.tsx                  # Main landing page
├── components/
│   └── ui/                       # Reusable UI components
│       ├── badge.tsx
│       ├── button.tsx
│       ├── form.tsx
│       ├── input.tsx
│       ├── magic-card.tsx
│       ├── phone-input.tsx
│       ├── reveal.tsx
│       ├── select.tsx
│       ├── shimmer-button.tsx
│       └── textarea.tsx
├── hooks/                        # Custom React hooks
├── lib/
│   └── utils.ts                  # Utility functions
├── public/                       # Static assets
├── .env.local                    # Environment variables (gitignored)
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## 🎨 Customization

### Colors & Branding

Update the color scheme in `tailwind.config.ts` and component files:

```typescript
// Primary brand colors
--primary-blue: #052657
--primary-green: #4db846
--accent-gold: #f59e0b
```

### Content

Edit the following sections in `app/page.tsx`:

- Hero section text and badges
- Benefits section
- Consultation form fields
- Footer content

### Email Templates

Customize email templates in `app/api/inquiry/route.ts`:

- Company notification email
- Customer confirmation email

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

The app can be deployed to any platform supporting Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- Self-hosted with Docker

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines

- Use TypeScript for all new code
- Follow the existing code style
- Add proper error handling
- Test email functionality locally
- Ensure responsive design works on all devices

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support or questions:

- Email: support@sustainabyte.com
- Website: [sustainabyte.com](https://sustainabyte.com)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Accessible UI primitives
- [Lucide](https://lucide.dev/) - Beautiful icons
- [Framer Motion](https://www.framer.com/motion/) - Animation library

---

**Built with ❤️ for sustainable energy optimization**
