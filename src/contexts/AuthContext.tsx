import React, { createContext, useContext, useReducer, useEffect } from "react";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  addresses: Address[];
  preferences: UserPreferences;
}

export interface Address {
  id: string;
  type: "home" | "work" | "other";
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

export interface UserPreferences {
  notifications: boolean;
  marketing: boolean;
  dietaryRestrictions: string[];
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
}

type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: { user: User; token: string } }
  | { type: "LOGIN_FAILURE" }
  | { type: "LOGOUT" }
  | { type: "UPDATE_USER"; payload: Partial<User> }
  | { type: "LOAD_USER"; payload: { user: User; token: string } };

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  token: null,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        isLoading: true,
      };

    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
      };

    case "LOGIN_FAILURE":
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };

    case "UPDATE_USER":
      if (!state.user) return state;
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };

    case "LOAD_USER":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
      };

    default:
      return state;
  }
}

interface AuthContextType extends AuthState {
  login: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  register: (
    userData: RegisterData,
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simulate API calls - In a real app, these would be actual API endpoints
const authAPI = {
  async login(email: string, password: string) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock validation - in real app, this would be server-side
    const mockUsers = JSON.parse(
      localStorage.getItem("freshbite-users") || "[]",
    );
    const user = mockUsers.find((u: any) => u.email === email);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    // In a real app, you'd verify the hashed password
    if (user.password !== password) {
      throw new Error("Invalid email or password");
    }

    // Generate mock JWT-like token
    const token = btoa(
      JSON.stringify({
        userId: user.id,
        email: user.email,
        exp: Date.now() + 24 * 60 * 60 * 1000,
      }),
    );

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        addresses: user.addresses || [],
        preferences: user.preferences || {
          notifications: true,
          marketing: false,
          dietaryRestrictions: [],
        },
      },
      token,
    };
  },

  async register(userData: RegisterData) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const mockUsers = JSON.parse(
      localStorage.getItem("freshbite-users") || "[]",
    );

    // Check if user already exists
    if (mockUsers.some((u: any) => u.email === userData.email)) {
      throw new Error("User with this email already exists");
    }

    // Create new user
    const newUser = {
      id: crypto.randomUUID(),
      ...userData,
      addresses: [],
      preferences: {
        notifications: true,
        marketing: false,
        dietaryRestrictions: [],
      },
    };

    mockUsers.push(newUser);
    localStorage.setItem("freshbite-users", JSON.stringify(mockUsers));

    // Generate token
    const token = btoa(
      JSON.stringify({
        userId: newUser.id,
        email: newUser.email,
        exp: Date.now() + 24 * 60 * 60 * 1000,
      }),
    );

    return {
      user: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        phone: newUser.phone,
        addresses: newUser.addresses,
        preferences: newUser.preferences,
      },
      token,
    };
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("freshbite-token");
    const savedUser = localStorage.getItem("freshbite-user");

    if (savedToken && savedUser) {
      try {
        // Verify token is not expired
        const tokenData = JSON.parse(atob(savedToken));
        if (tokenData.exp > Date.now()) {
          const user = JSON.parse(savedUser);
          dispatch({ type: "LOAD_USER", payload: { user, token: savedToken } });
        } else {
          // Token expired, clear storage
          localStorage.removeItem("freshbite-token");
          localStorage.removeItem("freshbite-user");
        }
      } catch (error) {
        console.error("Failed to load user from localStorage:", error);
        localStorage.removeItem("freshbite-token");
        localStorage.removeItem("freshbite-user");
      }
    }
  }, []);

  // Save user data whenever it changes
  useEffect(() => {
    if (state.token && state.user) {
      localStorage.setItem("freshbite-token", state.token);
      localStorage.setItem("freshbite-user", JSON.stringify(state.user));
    }
  }, [state.token, state.user]);

  const login = async (email: string, password: string) => {
    dispatch({ type: "LOGIN_START" });

    try {
      const { user, token } = await authAPI.login(email, password);
      dispatch({ type: "LOGIN_SUCCESS", payload: { user, token } });
      return { success: true };
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" });
      return {
        success: false,
        error: error instanceof Error ? error.message : "Login failed",
      };
    }
  };

  const register = async (userData: RegisterData) => {
    dispatch({ type: "LOGIN_START" });

    try {
      const { user, token } = await authAPI.register(userData);
      dispatch({ type: "LOGIN_SUCCESS", payload: { user, token } });
      return { success: true };
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" });
      return {
        success: false,
        error: error instanceof Error ? error.message : "Registration failed",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("freshbite-token");
    localStorage.removeItem("freshbite-user");
    dispatch({ type: "LOGOUT" });
  };

  const updateUser = (userData: Partial<User>) => {
    dispatch({ type: "UPDATE_USER", payload: userData });
  };

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
