import { NavLink, useNavigate } from "react-router-dom";
import { apiClient } from "../clients/api";
import { AxiosError } from "axios";
import { useContext } from "react";
import IsAuthorized from "../context/IsAuthorized";

function Navbar() {
  const navigate = useNavigate();
  const { isAuthorized, logout } = useContext(IsAuthorized);

  const handleSignout = async () => {
    try {
      await apiClient.post("/api/users/logout");
      logout();
      navigate("/");
    } catch (error) {
      if (error instanceof AxiosError)
        console.log(error?.response?.data?.message);
    }
  };

  return (
    <nav className="text-white flex justify-between items-center w-full h-10">
      {isAuthorized ? (
        <>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/projects">Projects</NavLink>
          <button onClick={handleSignout}>Logout</button>
        </>
      ) : (
        <>
          <NavLink to="/">Home</NavLink>
          <div>
            <NavLink to="/login">Sign in</NavLink>
            <NavLink className="mx-2" to="/register">
              Register
            </NavLink>
          </div>
        </>
      )}
    </nav>
  );
}

export default Navbar;
