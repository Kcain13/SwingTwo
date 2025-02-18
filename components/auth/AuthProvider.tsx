import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check stored authentication status
        const checkAuth = async () => {
            const token = await AsyncStorage.getItem('authToken');
            setIsAuthenticated(!!token);
        };
        checkAuth();
    }, []);

    const login = async () => {
        await AsyncStorage.setItem('authToken', 'your_mock_token'); // Simulate login
        setIsAuthenticated(true);
    };

    const logout = async () => {
        await AsyncStorage.removeItem('authToken');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
