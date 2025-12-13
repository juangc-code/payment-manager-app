# Telegram Mini App Integration

This application is fully integrated with Telegram Mini Apps, providing a native-like experience within the Telegram app on both Android and iOS platforms.

## Features

### 1. Automatic Theme Integration
- The app automatically adapts to the user's Telegram theme (light/dark mode)
- All colors match the Telegram client's theme for a seamless experience
- Theme changes are applied in real-time through CSS variables

### 2. Native Navigation
- **Back Button**: Automatically shows/hides based on navigation state
- Works with React Router to provide native-like navigation
- Haptic feedback on interactions (iOS and Android)

### 3. Main Button
- Used for primary actions (e.g., payments, confirmations)
- Positioned at the bottom of the Telegram interface
- Can be enabled/disabled and updated dynamically

### 4. Viewport Management
- Automatically expands to full screen height
- Optimized for mobile viewing experience

### 5. User Information
- Access to Telegram user data (username, first name, photo, etc.)
- Platform detection (android, ios, macos, tdesktop, web)

## Usage

### Using the Telegram Context

Import the `useTelegram` hook in any component:

```jsx
import { useTelegram } from "../context/TelegramProvider";

function MyComponent() {
  const telegram = useTelegram();

  // Access user information
  console.log(telegram.user);
  console.log(telegram.platform);

  // Use theme colors
  console.log(telegram.theme.isDark);
  console.log(telegram.theme.backgroundColor);

  return <div>...</div>;
}
```

### Back Button

The back button is automatically managed by the `TelegramNavigationHandler` component. It shows when navigating to nested routes and hides on root paths.

To manually control the back button:

```jsx
const telegram = useTelegram();

// Show back button with custom handler
telegram.backButton.show(() => {
  // Custom navigation logic
  navigate(-1);
});

// Hide back button
telegram.backButton.hide();
```

### Main Button

Use the main button for primary actions in your pages:

```jsx
import { useEffect } from "react";
import { useTelegram } from "../context/TelegramProvider";

function CheckoutPage() {
  const telegram = useTelegram();

  useEffect(() => {
    // Show main button with text and click handler
    telegram.mainButton.show("Pay $10", async () => {
      // Handle payment
      telegram.hapticFeedback("impact", "medium");
      await processPayment();
      telegram.hapticFeedback("notification", "success");
    });

    // Enable the button
    telegram.mainButton.enable();

    return () => {
      // Clean up when component unmounts
      telegram.mainButton.hide();
    };
  }, []);

  return <div>Checkout content...</div>;
}
```

Main button methods:
- `telegram.mainButton.show(text, onClick)` - Show button with text and handler
- `telegram.mainButton.hide()` - Hide the button
- `telegram.mainButton.enable()` - Enable the button
- `telegram.mainButton.disable()` - Disable the button

### Haptic Feedback

Provide tactile feedback on iOS and Android:

```jsx
const telegram = useTelegram();

// Impact feedback (light, medium, heavy, rigid, soft)
telegram.hapticFeedback("impact", "medium");

// Notification feedback (error, success, warning)
telegram.hapticFeedback("notification", "success");

// Selection changed feedback
telegram.hapticFeedback("selection");
```

### Alerts and Confirmations

Use Telegram's native dialogs:

```jsx
const telegram = useTelegram();

// Show alert
telegram.showAlert("Payment successful!");

// Show confirmation dialog
const confirmed = await telegram.showConfirm("Are you sure you want to delete this item?");
if (confirmed) {
  // User confirmed
}
```

### Opening Links

Open external links properly:

```jsx
const telegram = useTelegram();

telegram.openLink("https://example.com");
```

### Closing the Mini App

```jsx
const telegram = useTelegram();

telegram.close(); // Closes the mini app
```

## Platform Compatibility

The integration is compatible with:
- ✅ Telegram for Android
- ✅ Telegram for iOS
- ✅ Telegram Desktop
- ✅ Telegram Web
- ✅ Telegram for macOS

All features gracefully degrade when running outside of Telegram (e.g., in a regular browser).

## Example: CheckoutPage Integration

See `src/pages/checkout/CheckoutPage.jsx` for a complete example of integrating:
- Main button for payment action
- Haptic feedback on interactions
- Alert dialogs for errors
- Graceful fallback for web browsers

## Development

### Testing in Development

When running locally with `npm run dev`, the app will work but Telegram-specific features will be inactive. To test Telegram features:

1. Build your app: `npm run build`
2. Deploy to a public URL (e.g., Vercel, Netlify, GitHub Pages)
3. Create a bot with [@BotFather](https://t.me/botfather)
4. Set your Mini App URL using `/newapp` or `/editapp`
5. Open your bot and launch the Mini App

### Environment Detection

```jsx
const telegram = useTelegram();

if (telegram.isReady) {
  // Running in Telegram
} else {
  // Running in regular browser
}
```

## Resources

- [Telegram Mini Apps Documentation](https://docs.telegram-mini-apps.com/)
- [@tma.js/sdk-react Documentation](https://docs.telegram-mini-apps.com/packages/tma-js-sdk-react)
- [Telegram Bot API](https://core.telegram.org/bots/api)

## Notes

- The app uses CSS variables prefixed with `--tg-theme-` for theming
- Navigation is automatically handled - back button shows/hides based on route
- All Telegram features have fallbacks for web browsers
- Haptic feedback only works on mobile devices (iOS and Android)
