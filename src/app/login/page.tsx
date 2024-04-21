'use client'
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";



export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setbuttonDisabled] = React.useState(false);

  const [loading, setloading] = React.useState(false);

  //call API

  const onLoginUp = async () => {
    try {
      setloading(true);

      const response = await axios.post("/api/users/login", user);
      console.log("Login Success!", response.data);
      //redirect to next page
      router.push("/profile");
    } catch (error: any) {
      console.log("Login Failed!" + error.message);
      toast.error("Login Failed!" + error.message);
    } finally {
      setloading(false);
    }
  };

  //Validation

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setbuttonDisabled(false);
    } else {
      setbuttonDisabled(true);
    }
  }, [user]);

  return (
    // <div className="relative flex flex-col items-center justify-center min-h-screen py-2">
    //   {videobg}
    //   <ReactPlayer
    //     url="vdo/bgvd.mp4"
    //     playing={true}
    //     loop={true}
    //     muted={true}
    //     width="100%"
    //     height="100%"
    //     style={{ position: 'absolute', top: '0', left: '0', zIndex: '-1' }}
    //   />
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "SignUp"}</h1>
      <hr />

      <label htmlFor="email">Email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="email"
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />

      <label htmlFor="password">Password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />

      <button
        onClick={onLoginUp}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        {buttonDisabled ? "No signup" : "Signup"}
      </button>
      <Link href="/login">Visit login page</Link>
    </div>
    // </div>
  );
}