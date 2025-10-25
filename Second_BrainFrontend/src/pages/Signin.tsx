import { useRef } from "react";
import { Button } from "../Components/Button";
import { Input } from "../Components/Input";
import axios from "axios";
import { Backend_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function Signin() {
    const usernameref=useRef<HTMLInputElement>(null);
    const passwordref=useRef<HTMLInputElement>(null);
    const navigate= useNavigate();
    async function Signinit(){
        const username=usernameref.current?.value
        const password=passwordref.current?.value
        const response= await axios.post(Backend_URL+"/api/v1/signin",{
            username,
            password
        })
        const jwt=response.data.token
        if (jwt) {
      localStorage.setItem("token", jwt);
      console.log("JWT stored:", jwt);
    } else {
      console.warn("No token received from backend:", response.data);
    }
    navigate("/dashboard")
    }
  return (
    <div className="h-screen w-screen bg-gradient-to-br from-purple-300 via-indigo-300 to-blue-300 flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm flex flex-col gap-4">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-2">
          Sign In
        </h1>
        <p className="text-gray-500 text-sm text-center mb-4">
          Join us and explore the experience
        </p>

        <Input ref={usernameref}  placeholder="Username" />
        <Input ref={passwordref} placeholder="Password"/>

        <Button
          loading={false}
          varient="primary"
          text="Sign In"
          fullWidth={true}
          onClick={Signinit}
        />
      </div>
    </div>
  );
}
