import { createContext, useState, useEffect } from 'react';

// Create the context with default values
export const AuthContext = createContext({
  customer: null,
  accessToken: null,
  isLoading: false,
  isAuthenticated: false,
  isAuthModalOpen: false,
  setCustomer: () => {},
  setAccessToken: () => {},
  setIsLoading: () => {},
  setIsAuthModalOpen: () => {},
});

export function AuthProvider({ children }) {
  const [customer, setCustomer] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <AuthContext.Provider value={{
      customer,
      accessToken,
      isLoading,
      isAuthenticated: !!customer,
      isAuthModalOpen,
      setCustomer,
      setAccessToken,
      setIsLoading,
      setIsAuthModalOpen,
    }}>
      {children}
    </AuthContext.Provider>
  );
}