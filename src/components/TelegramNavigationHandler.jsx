import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTelegram } from "../context/TelegramProvider";

export default function TelegramNavigationHandler() {
  const navigate = useNavigate();
  const location = useLocation();
  const telegram = useTelegram();

  useEffect(() => {
    // Determine if we should show the back button based on the current path
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const isRootPath = pathSegments.length <= 1; // Only store slug

    if (!isRootPath) {
      // Show back button for non-root paths
      telegram.backButton.show(() => {
        navigate(-1);
      });
    } else {
      // Hide back button on root paths
      telegram.backButton.hide();
    }

    // Cleanup function
    return () => {
      telegram.backButton.hide();
    };
  }, [location.pathname, navigate, telegram.backButton]);

  return null;
}
