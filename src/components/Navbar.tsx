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
    <nav className="text-white flex justify-between items-center w-full h-10 bg-zinc-600 px-3 rounded">
      {isAuthorized ? (
        <>
          <NavLink className="bg-green-900 p-1 px-3 rounded-xl" to="/">Home</NavLink>
          <NavLink className="bg-green-900 p-1 px-3 rounded-xl" to="/projects">Projects</NavLink>
          <button className="bg-orange-800 p-1 px-3 rounded-xl hover:bg-red-800" onClick={handleSignout}>Logout</button>
        </>
      ) : (
        <>
          <NavLink className="bg-green-900 p-1 px-3 rounded-xl" to="/">Home</NavLink>
          <div>
            <NavLink className="bg-green-900 p-1 px-3 rounded-xl mx-3" to="/login">Sign in</NavLink>
            <NavLink className="bg-green-900 p-1 px-3 rounded-xl" to="/register">
              Register
            </NavLink>
          </div>
        </>
      )}
    </nav>
  );
}

export default Navbar;
