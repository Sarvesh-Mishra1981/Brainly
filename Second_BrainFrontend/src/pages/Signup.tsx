import { useRef } from "react";
import { Button } from "../Components/Button";
import { Input } from "../Components/Input";
import { Backend_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export function Signup() {
    const navigate = useNavigate();
    const usernameref=useRef<HTMLInputElement>(null);
    const passwordref=useRef<HTMLInputElement>(null);
    async function Signit(){
        const username=usernameref.current?.value
        const password=passwordref.current?.value
        await axios.post(Backend_URL+"/api/v1/signup",{
            username,
            password
        })
        navigate("/signin")
    }
  return (
    <div className="h-screen w-screen bg-gradient-to-br from-purple-300 via-indigo-300 to-blue-300 flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm flex flex-col gap-4">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-2">
          Create an Account
        </h1>
        <p className="text-gray-500 text-sm text-center mb-4">
          Join us and explore the experience
        </p>

        <Input ref={usernameref} placeholder="Email" />
        <Input ref={passwordref}  placeholder="Password"/>

        <Button
          loading={false}
          varient="primary"
          text="Sign Up"
          fullWidth={true}
          onClick={Signit}
        />

        <p className="text-center text-sm text-gray-600 mt-3">
          Already have an account?{" "}
          <span className="text-purple-600 hover:underline cursor-pointer">
            <a href="/signin">
            Log in
            </a>
          </span>
        </p>
      </div>
    </div>
  );
}
