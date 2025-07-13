import { createContext, useState, useEffect, type ReactNode } from "react"; // Add ReactNode
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";

// 1. Define the User type
interface User {
  id: string; // Example user properties, adjust as per your actual user object
  email: string;
  name?: string; // Optional property
  token: string; // Assuming the token is part of the user object from the API response
  // Add other user properties here
}

// 2. Define the shape of the context value
interface UserContextType {
  user: User | null;
  loading: boolean;
  updateUser: (userData: User) => void;
  clearUser: () => void;
  openAuthForm: boolean;
  setOpenAuthForm: (isOpen: boolean) => void;
}

// 3. Create context with an initial default value that matches UserContextType
// This default value is used when a component consumes the context outside of a Provider.
// It's good practice to provide a default, even if it's a "dummy" one for initial setup.
export const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  updateUser: () => {}, // No-op function for default
  clearUser: () => {}, // No-op function for default
  openAuthForm: false,
  setOpenAuthForm: () => {}, // No-op function for default
});

interface UserProviderProps {
  children: ReactNode; // Explicitly type children
}

const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null); // Explicitly type user state
  const [loading, setLoading] = useState<boolean>(true);
  const [openAuthForm, setOpenAuthForm] = useState<boolean>(false);

  useEffect(() => {
    // No need for `if (user) return;` here, as the initial `user` state is null.
    // The fetch logic should always run on mount to check for a token.

    const accessToken = localStorage.getItem("token");

    if (!accessToken) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        // 4. Type the Axios response data
        const response = await axiosInstance.get<User>(
          API_PATHS.AUTH.GET_PROFILE
        );
        setUser(response.data);
      } catch (error) {
        console.error("User not authenticated", error);
        clearUser();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []); // Empty dependency array means this effect runs once on mount

  const updateUser = (userData: User) => {
    setUser(userData);
    // Ensure `userData.token` exists before saving.
    // Assuming `userData` always contains a token when updating a user.
    localStorage.setItem("token", userData.token);
    setLoading(false); // Consider if you want to set loading to false here or rely on the fetchUser's finally block
  };

  const clearUser = () => {
    setUser(null);
    //setSearchResults([]); // If you want to use this, ensure `setSearchResults` is also part of the context or a separate state management.
    localStorage.removeItem("token");
  };

  // 5. Ensure the value object matches UserContextType
  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        updateUser,
        clearUser,
        openAuthForm,
        setOpenAuthForm,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
