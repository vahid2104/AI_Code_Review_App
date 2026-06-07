import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  getMe,
  login as loginService,
  logout as logoutService,
  register as registerService,
  updateSettings,
  type AuthUser,
  type LoginData,
  type RegisterData,
} from "../services/authService";

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateUserSettings: (data: {
  codeStoragePreference: "none" | "summary" | "full";
}) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = Boolean(user);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await getMe();
        setUser(response.user);
      } catch (error) {
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (data: LoginData) => {
    const response = await loginService(data);

    localStorage.setItem("token", response.token);
    setUser(response.user);
  };

  const register = async (data: RegisterData) => {
    const response = await registerService(data);

    localStorage.setItem("token", response.token);
    setUser(response.user);
  };

  const logout = () => {
    logoutService();
    setUser(null);
  };

  const updateUserSettings = async (data: {
  codeStoragePreference: "none" | "summary" | "full";
}) => {
  const response = await updateSettings(data);
  setUser(response.user);
};

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
        updateUserSettings,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};