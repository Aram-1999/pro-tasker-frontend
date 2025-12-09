import { createContext } from "react";

interface ContextType {
    isAuthorized: boolean;
    login: (token: string) => void;
    logout: () => void
} 

const IsAuthorized = createContext<ContextType>({
    isAuthorized: false,
    login: (token) => console.log(token),
    logout: () => console.log('Logging out!')    
});

export default IsAuthorized