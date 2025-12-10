import { AxiosError } from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import IsAuthorized from "../context/IsAuthorized";
import { apiClient } from "../clients/api";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate()

  const {login} = useContext(IsAuthorized)

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const response = await apiClient.post(`/api/users/login`, {
        email,
        password,
      });
      login(response.data.token);
      navigate('/projects')
      setError("");
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error?.response?.data?.message);
      }
    } finally {
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="text-white text-center mt-8">
      <form
        className="w-fit p-5 mx-auto shadow shadow-red-300"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold">Login</h2>
        <br />
        <label className="text-lg font-semibold" htmlFor="email">
          Email
        </label>
        <br />
        <input
          className="border my-4 rounded p-1 w-[300px]"
          id="email"
          type="text"
          name="email"
          value={email}
          onChange={handleEmail}
          required
        />
        <br />
        <label className="text-lg font-semibold" htmlFor="password">
          Password
        </label>
        <br />
        <input
          className="border my-4 rounded p-1 w-[300px]"
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
          minLength={8}
        />
        <br />
        <button
          className="border bg-blue-600 mt-10 hover:bg-blue-700 hover:cursor-pointer px-5 p-1 rounded-lg w-[300px]"
          type="submit"
        >
          Login
        </button>
        {error && <p className="text-red-400 font-sm">{error}</p>}
        <p className="text-gray-400 mt-3">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
