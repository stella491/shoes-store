import { useState, type ChangeEvent, type FormEvent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import api from "../api/api";
import { toast } from "react-toastify";
import type { AuthUser } from "../types/auth";

interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [_submitting, _setSubmitting] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const { login } = useAuth();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.dismiss();
    try {
      const res = await api.post<{ token: string; user: AuthUser }>(
        "/auth/login",
        formData,
      );

      const { token, user } = res.data;

      if (token) {
        login({ token, user });
        toast.success("Login successful");
        navigate(user.role === "admin" ? "/admin" : "/");
      }
    } catch {
      toast.error("Unable to login");
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6">Log In</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            name="email"
            type="email"
            onChange={handleChange}
            required
            autoComplete="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password (min 6 characters)
          </label>
          <input
            name="password"
            type="password"
            onChange={handleChange}
            required
            minLength={6}
            autoComplete="new-password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition"
        >
          Log In
        </button>
      </form>
      <p className="mt-4 text-center text-gray-600">
        Don't have an account?{" "}
        <NavLink
          to="/signup"
          className="text-red-500 font-medium hover:underline"
        >
        Sign Up
        </NavLink>
      </p>
    </div>
  );
};

export default Login;
