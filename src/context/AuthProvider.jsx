import { createContext, useContext, useState, useEffect } from "react";
import AuthService from "../services/AuthService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = AuthService.getStoredUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const login = async (loginRequest) => {
    try {
      const response = await AuthService.login(loginRequest);
      if (response.data.user) {
        setUser(response.data.user);
      }
      return response;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  const isAuthenticated = () => {
    return AuthService.isAuthenticated();
  };

  const getCurrentUser = async () => {
    try {
      const response = await AuthService.getCurrentUser();
      if (response.data) {
        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response;
    } catch (error) {
      console.error("Failed to get current user:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated,
        getCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
