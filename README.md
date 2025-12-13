# Telegram E-Commerce App

A fully-featured e-commerce application built as a Telegram Mini App, providing a native experience within the Telegram messenger on Android and iOS.

## Features

- **Telegram Mini App Integration**: Native Telegram experience with theme adaptation, navigation, and haptic feedback
- **Multi-Store Support**: Support for multiple stores with dynamic routing
- **Product Catalog**: Browse and search products
- **Shopping Cart & Checkout**: Complete checkout flow with payment integration
- **Lemon Cash Integration**: Cryptocurrency payments via Lemon Cash SDK
- **Product Management**: Admin interface for managing products
- **User Authentication**: Secure authentication flow
- **Responsive Design**: Optimized for mobile devices

## Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **@tma.js/sdk-react** - Telegram Mini Apps SDK
- **@lemoncash/mini-app-sdk** - Lemon Cash payment integration
- **Axios** - HTTP client

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- A Telegram Bot (create one with [@BotFather](https://t.me/botfather))

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Telegram Mini App Setup

This app is fully integrated with Telegram Mini Apps. See [TELEGRAM_INTEGRATION.md](./TELEGRAM_INTEGRATION.md) for detailed documentation on:

- How to set up your Telegram Bot
- Using Telegram SDK features (back button, main button, haptic feedback, etc.)
- Theme integration and platform compatibility
- Development and testing workflow

### Quick Start for Telegram

1. Build your app: `npm run build`
2. Deploy to a public URL (Vercel, Netlify, GitHub Pages, etc.)
3. Create a bot with [@BotFather](https://t.me/botfather)
4. Use `/newapp` or `/editapp` to set your Mini App URL
5. Open your bot and launch the Mini App

## Project Structure

```
src/
├── components/        # Reusable UI components
├── context/          # React context providers
├── pages/            # Page components
├── routes/           # Routing configuration
└── services/         # API and business logic services
```

## Platform Compatibility

- ✅ Telegram for Android
- ✅ Telegram for iOS
- ✅ Telegram Desktop
- ✅ Telegram Web
- ✅ Telegram for macOS
- ✅ Regular web browsers (with feature fallbacks)

## License

MIT
