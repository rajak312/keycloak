import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import axios from "axios";

export interface User {
    id: string;
    username: string;
    email: string;
    roles: [];
}

type AuthContextType = {
    user: User | null;
    loading: boolean;
    login: () => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

const BACKEND_URL = import.meta.env.API_BASE_URL || "http://localhost:5000";

type Props = { children: ReactNode };

export const AuthProvider = ({ children }: Props) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const res = await axios.get(`${BACKEND_URL}/user/me`, {
                withCredentials: true
            });
            setUser(res.data);
        } catch {
            login();
        } finally {
            setLoading(false);
        }
    };

    const login = () => {
        window.location.href = `${BACKEND_URL}/auth/login`;
    };
    const logout = async () => {
        const res = await axios.get(`${BACKEND_URL}/user/logout`, {
            withCredentials: true
        });
        console.log("Res", res.data);
        login();
    };

    useEffect(() => {
        if (!window.location.search.includes("code")) {
            fetchUser();
        }
    }, []);
    if (!user || loading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
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
