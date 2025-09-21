import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import axios from "axios";

export interface User {
    id: string;
    username: string;
    email: string;
    roles: [];
}

export interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: () => void;
    logout: () => void;
}

export interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

const BACKEND_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const redirectUri = `${window.location.origin}/auth/callback`;

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [authInProgress, setAuthInProgress] = useState(false);

    const fetchUser = async () => {
        if (authInProgress) return;
        setAuthInProgress(true);

        try {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                setAuthInProgress(false);
                login();
                return;
            }

            const res = await axios.get(`${BACKEND_URL}/user/me`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(res.data);
        } catch {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("idToken");
        } finally {
            setAuthInProgress(false);
            setLoading(false);
        }
    };

    const login = () => {
        if (authInProgress) return;
        setAuthInProgress(true);
        const returnUrl =
            window.location.pathname + window.location.search + window.location.hash;
        localStorage.setItem("return_url", returnUrl);

        const codeVerifier = generateCodeVerifier();
        localStorage.setItem("pkce_verifier", codeVerifier);

        generateCodeChallenge(codeVerifier).then(codeChallenge => {
            const authUrl =
                `${import.meta.env.VITE_KEYCLOAK_URL}/realms/${import.meta.env.VITE_KEYCLOAK_REALM}/protocol/openid-connect/auth` +
                `?client_id=${import.meta.env.VITE_KEYCLOAK_CLIENT_ID}` +
                `&response_type=code` +
                `&scope=openid profile email` +
                `&code_challenge=${codeChallenge}` +
                `&code_challenge_method=S256` +
                `&redirect_uri=${encodeURIComponent(redirectUri)}`;

            window.location.href = authUrl;
        });
    };

    const logout = () => {
        const idToken = localStorage.getItem("idToken");

        localStorage.clear();
        setUser(null);

        const logoutUrl =
            `${import.meta.env.VITE_KEYCLOAK_URL}/realms/${import.meta.env.VITE_KEYCLOAK_REALM}/protocol/openid-connect/logout` +
            `?post_logout_redirect_uri=${encodeURIComponent(window.location.origin)}` +
            (idToken ? `&id_token_hint=${idToken}` : "");

        window.location.href = logoutUrl;
    };

    const handleCallback = async () => {
        if (authInProgress) return;
        setAuthInProgress(true);

        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

        if (!code) {
            console.error("No code found in URL");
            setAuthInProgress(false);
            setLoading(false);
            return;
        }

        const codeVerifier = localStorage.getItem("pkce_verifier");
        if (!codeVerifier) {
            console.error("Missing PKCE code verifier");
            setAuthInProgress(false);
            setLoading(false);
            return;
        }

        try {
            const res = await axios.post(`${BACKEND_URL}/auth/token`, {
                code,
                codeVerifier,
                redirectUri
            });

            const { accessToken, refreshToken, idToken } = res.data;
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            localStorage.setItem("idToken", idToken);
            window.history.replaceState({}, document.title, window.location.pathname);
            const returnUrl = localStorage.getItem("return_url") || "/";
            localStorage.removeItem("return_url");
            window.location.replace(returnUrl);
        } catch (err) {
            console.error("Token exchange failed", err);
            login();
        } finally {
            setAuthInProgress(false);
            setLoading(false);
            sessionStorage.removeItem("callback_handled");
        }
    };

    useEffect(() => {
        const isCallback = window.location.pathname === "/auth/callback";
        const hasCode = window.location.search.includes("code=");

        if (isCallback && hasCode) {
            if (!sessionStorage.getItem("callback_handled")) {
                sessionStorage.setItem("callback_handled", "true");
                handleCallback();
            }
        } else {
            fetchUser();
        }
    }, []);

    if (loading || authInProgress) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

function generateCodeVerifier() {
    const array = new Uint32Array(56 / 2);
    crypto.getRandomValues(array);
    return Array.from(array, dec => ("0" + dec.toString(16)).slice(-2)).join("");
}

async function generateCodeChallenge(verifier: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const digest = await crypto.subtle.digest("SHA-256", data);
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
