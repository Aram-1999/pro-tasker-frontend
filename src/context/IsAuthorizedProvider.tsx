import { useState } from "react";
import IsAuthorized from "./IsAuthorized";
import { useNavigate } from "react-router-dom";


interface PropsType {
  children: React.ReactNode;
}

function IsAutherizedProvider({ children }: PropsType) {
  const [isAuthorized, setIsAuthorized] = useState(() => {
    const value = localStorage.getItem('pro-tasker-isAuthorized');
    return value === "true" || false
  })
  const [timeoutId, setTimeoutId] = useState<number | null>(null);
  const navigate = useNavigate();

  const login = (token: string) => {
    localStorage.setItem("pro-tasker-token", token);
    localStorage.setItem('pro-tasker-isAuthorized', "true");
    setIsAuthorized(true);
    const toId = setTimeout(() => {
      localStorage.removeItem("pro-tasker-token")
      localStorage.setItem('pro-tasker-isAuthorized', "false");
      setIsAuthorized(false)
      navigate('/')
     }, 1200 *1000);
     setTimeoutId(toId);

  };

  const logout = () => {
    localStorage.removeItem("pro-tasker-token");
    localStorage.setItem('pro-tasker-isAuthorized', "false");
    setIsAuthorized(false);

    if (timeoutId) clearTimeout(timeoutId);
  };

  return (
    <IsAuthorized.Provider value={{ isAuthorized, login, logout }}>
      {children}
    </IsAuthorized.Provider>
  );
}

export default IsAutherizedProvider;