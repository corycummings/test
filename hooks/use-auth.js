import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/auth-context';
import { client } from '../shopify/client';
import { 
  MUTATION_ACCESS_TOKEN_CREATE,
  MUTATION_ACCESS_TOKEN_RENEW,
  MUTATION_ACCESS_TOKEN_DELETE
} from '../graphql/auth';
import { QUERY_CUSTOMER, MUTATION_CUSTOMER_CREATE } from '../graphql/customers';

export function useAuth() {
  const {
    customer,
    accessToken,
    isLoading,
    isAuthenticated,
    isAuthModalOpen,
    setCustomer,
    setAccessToken,
    setIsLoading,
    setIsAuthModalOpen
  } = useContext(AuthContext);

  // On initial load, check for access token in localStorage
  useEffect(() => {
    const initialize = async () => {
      const savedToken = localStorage.getItem('customerAccessToken');
      const expiresAt = localStorage.getItem('customerTokenExpiry');
      
      if (savedToken && expiresAt && new Date(expiresAt) > new Date()) {
        setAccessToken(savedToken);
        fetchCustomerData(savedToken);
      } else if (savedToken) {
        // Token expired, try to renew
        const success = await renewToken(savedToken);
        if (!success) {
          // If renewal fails, clear storage
          localStorage.removeItem('customerAccessToken');
          localStorage.removeItem('customerTokenExpiry');
        }
      }
    };

    initialize();
  }, []);

  // Fetch customer data using access token
  const fetchCustomerData = async (token) => {
    if (!token) return;
    
    try {
      setIsLoading(true);
      const { data } = await client.request(QUERY_CUSTOMER, {
        variables: { customerAccessToken: token },
      });
      
      if (data?.customer) {
        setCustomer(data.customer);
      }
    } catch (error) {
      console.error("Error fetching customer data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Login with email and password
  const login = async (email, password) => {
    try {
      setIsLoading(true);
      const { data } = await client.request(MUTATION_ACCESS_TOKEN_CREATE, {
        variables: { 
          input: { 
            email, 
            password 
          } 
        },
      });
      
      if (data?.customerAccessTokenCreate?.customerAccessToken) {
        const { accessToken: token, expiresAt } = data.customerAccessTokenCreate.customerAccessToken;
        
        setAccessToken(token);
        localStorage.setItem('customerAccessToken', token);
        localStorage.setItem('customerTokenExpiry', expiresAt);
        
        await fetchCustomerData(token);
        setIsAuthModalOpen(false);
        return { success: true };
      } else {
        const errors = data?.customerAccessTokenCreate?.customerUserErrors || [];
        return { 
          success: false, 
          errors
        };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { 
        success: false, 
        errors: [{ message: "An unexpected error occurred. Please try again." }] 
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Register a new customer
  const signup = async (firstName, lastName, email, password) => {
    try {
      setIsLoading(true);
      const { data } = await client.request(MUTATION_CUSTOMER_CREATE, {
        variables: { 
          input: { 
            firstName,
            lastName,
            email,
            password
          } 
        },
      });
      
      if (data?.customerCreate?.customer) {
        // After registration, log in with the new credentials
        return await login(email, password);
      } else {
        const errors = data?.customerCreate?.customerUserErrors || [];
        return { 
          success: false, 
          errors
        };
      }
    } catch (error) {
      console.error("Signup error:", error);
      return { 
        success: false, 
        errors: [{ message: "An unexpected error occurred. Please try again." }] 
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Renew access token
  const renewToken = async (token) => {
    try {
      setIsLoading(true);
      const { data } = await client.request(MUTATION_ACCESS_TOKEN_RENEW, {
        variables: { customerAccessToken: token },
      });
      
      if (data?.customerAccessTokenRenew?.customerAccessToken) {
        const { accessToken: newToken, expiresAt } = data.customerAccessTokenRenew.customerAccessToken;
        
        setAccessToken(newToken);
        localStorage.setItem('customerAccessToken', newToken);
        localStorage.setItem('customerTokenExpiry', expiresAt);
        
        await fetchCustomerData(newToken);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Token renewal error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    try {
      setIsLoading(true);
      if (accessToken) {
        await client.request(MUTATION_ACCESS_TOKEN_DELETE, {
          variables: { customerAccessToken: accessToken },
        });
      }
      
      setAccessToken(null);
      setCustomer(null);
      localStorage.removeItem('customerAccessToken');
      localStorage.removeItem('customerTokenExpiry');
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Open auth modal
  const openAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  // Close auth modal
  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return {
    customer,
    accessToken,
    isLoading,
    isAuthenticated,
    isAuthModalOpen,
    login,
    signup,
    logout,
    openAuthModal,
    closeAuthModal
  };
}