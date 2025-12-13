import { createContext, useContext, useEffect, useState } from "react";
import {
  backButton,
  mainButton,
  viewport,
  themeParams,
  initData,
  miniApp,
  useSignal,
  useLaunchParams
} from "@tma.js/sdk-react";

const TelegramContext = createContext();

// Component to apply Telegram theme to CSS variables
const ThemeApplier = () => {
  const bgColor = useSignal(themeParams.backgroundColor);
  const textColor = useSignal(themeParams.textColor);
  const hintColor = useSignal(themeParams.hintColor);
  const linkColor = useSignal(themeParams.linkColor);
  const buttonColor = useSignal(themeParams.buttonColor);
  const buttonTextColor = useSignal(themeParams.buttonTextColor);
  const secondaryBgColor = useSignal(themeParams.secondaryBackgroundColor);

  useEffect(() => {
    const root = document.documentElement;
    if (bgColor) root.style.setProperty('--tg-theme-bg-color', bgColor);
    if (textColor) root.style.setProperty('--tg-theme-text-color', textColor);
    if (hintColor) root.style.setProperty('--tg-theme-hint-color', hintColor);
    if (linkColor) root.style.setProperty('--tg-theme-link-color', linkColor);
    if (buttonColor) root.style.setProperty('--tg-theme-button-color', buttonColor);
    if (buttonTextColor) root.style.setProperty('--tg-theme-button-text-color', buttonTextColor);
    if (secondaryBgColor) root.style.setProperty('--tg-theme-secondary-bg-color', secondaryBgColor);
  }, [bgColor, textColor, hintColor, linkColor, buttonColor, buttonTextColor, secondaryBgColor]);

  return null;
};

export const TelegramProvider = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const [platform, setPlatform] = useState(null);
  const [user, setUser] = useState(null);

  // Get launch params to access user data and platform info
  const launchParams = useLaunchParams();

  // Use signals to track component state
  const isDark = useSignal(themeParams.isDark);
  const bgColor = useSignal(themeParams.backgroundColor);
  const buttonColor = useSignal(themeParams.buttonColor);
  const buttonTextColor = useSignal(themeParams.buttonTextColor);
  const isExpanded = useSignal(viewport.isExpanded);

  useEffect(() => {
    try {
      // Mount required components
      backButton.mount();
      mainButton.mount();
      viewport.mount();
      themeParams.mount();
      miniApp.mount();

      // Expand viewport to full height
      if (!viewport.isExpanded()) {
        viewport.expand();
      }

      // Set platform info
      if (launchParams?.platform) {
        setPlatform(launchParams.platform);
      }

      // Set user info from init data if available
      if (initData && initData.user) {
        setUser({
          id: initData.user.id,
          firstName: initData.user.firstName,
          lastName: initData.user.lastName,
          username: initData.user.username,
          languageCode: initData.user.languageCode,
          isPremium: initData.user.isPremium,
          photoUrl: initData.user.photoUrl
        });
      }

      // Mark as ready
      miniApp.ready();
      setIsReady(true);
    } catch (error) {
      console.error("Error initializing Telegram SDK:", error);
      // Set ready even on error to allow app to function in browser
      setIsReady(true);
    }

    return () => {
      // Cleanup on unmount
      try {
        backButton.unmount();
        mainButton.unmount();
        viewport.unmount();
        themeParams.unmount();
        miniApp.unmount();
      } catch (error) {
        console.error("Error unmounting Telegram components:", error);
      }
    };
  }, [launchParams]);

  const showBackButton = (onClick) => {
    try {
      backButton.show();
      if (onClick) {
        backButton.onClick(onClick);
      }
    } catch (error) {
      console.error("Error showing back button:", error);
    }
  };

  const hideBackButton = () => {
    try {
      backButton.hide();
    } catch (error) {
      console.error("Error hiding back button:", error);
    }
  };

  const showMainButton = (text, onClick) => {
    try {
      mainButton.setText(text);
      mainButton.show();
      if (onClick) {
        mainButton.onClick(onClick);
      }
    } catch (error) {
      console.error("Error showing main button:", error);
    }
  };

  const hideMainButton = () => {
    try {
      mainButton.hide();
    } catch (error) {
      console.error("Error hiding main button:", error);
    }
  };

  const enableMainButton = () => {
    try {
      mainButton.enable();
    } catch (error) {
      console.error("Error enabling main button:", error);
    }
  };

  const disableMainButton = () => {
    try {
      mainButton.disable();
    } catch (error) {
      console.error("Error disabling main button:", error);
    }
  };

  const showAlert = (message) => {
    try {
      miniApp.showAlert(message);
    } catch (error) {
      console.error("Error showing alert:", error);
      alert(message);
    }
  };

  const showConfirm = async (message) => {
    try {
      return await miniApp.showConfirm(message);
    } catch (error) {
      console.error("Error showing confirm:", error);
      return confirm(message);
    }
  };

  const hapticFeedback = (type = "impact", style = "medium") => {
    try {
      if (type === "impact") {
        miniApp.impactOccurred(style);
      } else if (type === "notification") {
        miniApp.notificationOccurred(style);
      } else if (type === "selection") {
        miniApp.selectionChanged();
      }
    } catch (error) {
      console.error("Error with haptic feedback:", error);
    }
  };

  const openLink = (url) => {
    try {
      miniApp.openLink(url);
    } catch (error) {
      console.error("Error opening link:", error);
      window.open(url, "_blank");
    }
  };

  const close = () => {
    try {
      miniApp.close();
    } catch (error) {
      console.error("Error closing mini app:", error);
    }
  };

  const value = {
    isReady,
    platform,
    user,
    theme: {
      isDark,
      backgroundColor: bgColor,
      buttonColor,
      buttonTextColor
    },
    viewport: {
      isExpanded
    },
    backButton: {
      show: showBackButton,
      hide: hideBackButton
    },
    mainButton: {
      show: showMainButton,
      hide: hideMainButton,
      enable: enableMainButton,
      disable: disableMainButton
    },
    showAlert,
    showConfirm,
    hapticFeedback,
    openLink,
    close
  };

  return (
    <TelegramContext.Provider value={value}>
      <ThemeApplier />
      {children}
    </TelegramContext.Provider>
  );
};

export const useTelegram = () => {
  const context = useContext(TelegramContext);
  if (!context) {
    throw new Error("useTelegram must be used within TelegramProvider");
  }
  return context;
};
