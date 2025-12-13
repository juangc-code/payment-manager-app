import Router from "./routes/Router";
import { AppProvider } from "./context/AppProvider";
import { AuthProvider } from "./context/AuthProvider";
import { TelegramProvider } from "./context/TelegramProvider";

export default function App() {
  return (
    <TelegramProvider>
      <AuthProvider>
        <AppProvider>
          <Router />
        </AppProvider>
      </AuthProvider>
    </TelegramProvider>
  );
}
