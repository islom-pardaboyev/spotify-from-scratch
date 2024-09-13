import React from "react";
import { CLIENT_ID } from "../hook/useEnv";
import { FaSpotify } from "react-icons/fa";

function Login() {
  const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=http://localhost:5173&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-read-recently-played`;
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-black to-green-900">
      <a
        href={AUTH_URL}
        className="capitalize w-[200px] rounded-full p-4 text-center bg-green-600 hover:bg-green-700 text-white font-semibold text-lg flex items-center justify-center space-x-2 shadow-lg"
      >
        <FaSpotify className="scale-125"/>
        <span>Login to Spotify</span>
      </a>
    </div>
  );
}

export default Login;
