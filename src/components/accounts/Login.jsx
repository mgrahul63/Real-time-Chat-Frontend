import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const { currentUser, login, setError, providerLogin } = useAuth();

  // redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  // submit handler
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const { email, password } = form;

      if (!email || !password) return;

      try {
        setError("");
        setLoading(true);

        await login(email, password);

        navigate("/");
      } catch (err) {
        setError("Failed to login");
      } finally {
        setLoading(false);
      }
    },
    [form, login, navigate, setError],
  );

  // Social Login Handler
  const handleSocialLogin = async (provider) => {
    try {
      const { user } = await providerLogin(provider);

      console.log(user);

      toast.success("Login Successful 👍", {
        style: {
          border: "1px solid #ffffff",
          backgroundColor: "#9f95e9",
        },
      });

      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);

      if (error.code === "auth/account-exists-with-different-credential") {
        toast.error("This email is already registered with another provider.");
      } else {
        toast.error("Social login failed.");
      }
    }
  };

  // login with Google
  const handleGoogleSignIn = () => {
    handleSocialLogin(googleProvider);
  };

  // login with Github
  const handleGithubSignIn = () => {
    handleSocialLogin(githubProvider);
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="text-3xl text-center font-light dark:text-white">
          Login to your account
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Email */}
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="Email address"
            className="w-full px-3 py-2 bg-gray-50 border rounded-md text-sm
            dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            placeholder="Password"
            className="w-full px-3 py-2 bg-gray-50 border rounded-md text-sm
            dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 text-white bg-sky-800 hover:bg-sky-900 rounded-md"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Link */}
          <div className="text-sm text-center">
            <Link
              to="/register"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              Don’t have an account? Register
            </Link>
          </div>
        </form>
        <div className="bg-white rounded-t-lg p-8">
          {" "}
          <p className="text-center text-gray-400 font-light">
            Sign in with
          </p>{" "}
          <div>
            {" "}
            <div className="flex items-center justify-center space-x-4 mt-3">
              {" "}
              <button
                onClick={handleGithubSignIn}
                className="flex items-center py-2 px-4 text-sm uppercase rounded bg-white hover:bg-gray-100 text-[#7C6EE4] border border-transparent hover:border-transparent hover:text-gray-700 shadow-md hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
              >
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  className="w-6 h-6 mr-3"
                >
                  {" "}
                  <path
                    fillRule="evenodd"
                    d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                  />{" "}
                </svg>{" "}
                Github{" "}
              </button>{" "}
              <button
                onClick={handleGoogleSignIn}
                className="flex items-center py-2 px-4 text-sm uppercase rounded bg-white hover:bg-gray-100 text-[#7C6EE4] border border-transparent hover:border-transparent hover:text-gray-700 shadow-md hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
              >
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mr-3"
                  viewBox="0 0 48 48"
                >
                  {" "}
                  <path
                    fill="#fbc02d"
                    d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                  />{" "}
                  <path
                    fill="#e53935"
                    d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
                  />{" "}
                  <path
                    fill="#4caf50"
                    d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
                  />{" "}
                  <path
                    fill="#1565c0"
                    d="M43.611 20.083 43.595 20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
                  />{" "}
                </svg>{" "}
                Google{" "}
              </button>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>
    </div>
  );
};

export default Login;
