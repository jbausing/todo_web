import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useLazyGetUserQuery, useLoginMutation } from "@/store/api/authApi";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/store/auth/authSlice";

function Login() {
  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login] = useLoginMutation();
  const [getUser] = useLazyGetUserQuery();

  const handleLogin = async () => {
    const { email, password } = formData;

    if (formData.email === "" && formData.password === "") {
      toast.error("Username/email and Password are required");
    } else if (formData.email === "") {
      toast.error("Username/email is required");
    } else if (formData.password === "") {
      toast.error("Password is required");
    } else {
      try {
        await login({ email, password }).unwrap();

        const userResponse = await getUser({}).unwrap();
        const userId = userResponse?.id;
        if (!userId) throw new Error("No user ID found.");
        console.log("userResponse", userResponse);
        navigate("/home");

        dispatch(
          loginSuccess({
            id: String(userResponse?.id),
          })
        );
      } catch (err: any) {
        if (err?.status === 404) {
          toast.error(err?.data?.message ?? "Login failed");
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-20 relative">
      {/* Outer: centers page and restricts width */}
      <div className="w-full max-w-6xl mx-auto py-20 px-6">
        {/* Parent: stacked on small, side-by-side on md+ */}
        <div className="w-full flex flex-col md:flex-row md:items-center gap-12">
          {/* LEFT: keep your exact bordered box classes unchanged, but give it a fixed width on md+ */}
          <div className="border-2 p-20 border-black flex flex-col gap-6 w-full md:w-[520px]">
            <div>
              <h1 className="font-[Poppins] text-b font-bold text-center">
                Log in — it’s your daily dose of digital discipline.
              </h1>
            </div>

            <div className="flex flex-col gap-2">
              <Input
                placeholder="Username"
                className="bg-black text-white h-10 px-4 outline-none focus-visible:ring-0 focus:ring-0 ring-0 shadow-none !rounded-none"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
              />

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="bg-black text-white h-10 px-4 outline-none focus-visible:ring-0 focus:ring-0 ring-0 shadow-none !rounded-none pr-12"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="font-[Poppins] absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400 focus:outline-none"
                  tabIndex={-1}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="text-center">
              <span className="text-sm font-[Poppins] font-bold">
                Forgot Password
              </span>
            </div>
            <div>
              <Button
                className="font-[Poppins] text-base uppercase font-bold bg-[#EFEFEF] h-10 w-full px-4 text-black hover:!bg-[#EFEFEF] hover:!text-black !rounded-none cursor-pointer"
                onClick={handleLogin}
              >
                Log in
              </Button>
            </div>
          </div>

          {/* RIGHT: vertical center & take remaining space; content centered on small screens */}
          <aside className="flex-1 flex flex-col items-center justify-center gap-6 px-6 text-center">
            <h2 className="font-[Poppins] text-lg font-semibold text-center max-w-md">
              Don't have an account? Click{" "}
              <Link
                to="/create-account"
                className="uppercase font-bold underline underline-offset-2"
              >
                CREATE ACCOUNT
              </Link>{" "}
              to make one or log in with:
            </h2>

            <div className="flex gap-6 justify-center md:justify-start mt-2">
              <img
                src="/fb.png"
                alt="Facebook"
                className="w-10 h-10 cursor-pointer hover:scale-110 transition-transform"
              />
              <img
                src="/gmail.png"
                alt="Gmail"
                className="w-10 h-10 cursor-pointer hover:scale-110 transition-transform"
              />
              <img
                src="/apple.png"
                alt="Apple"
                className="w-10 h-10 cursor-pointer hover:scale-110 transition-transform"
              />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Login;
