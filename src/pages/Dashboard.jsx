import React, { useEffect, useState } from "react";
import { Input } from "antd";
import TopMusic from "../components/TopMusic";
import Playback from "../components/Playback";
import { useAuth } from "../hook/useAuth";
import SpotifyWebApi from "spotify-web-api-node";
import { CLIENT_ID } from "../hook/useEnv";

function Dashboard({ code }) {
  const [title, setTitle] = useState("");
  const [play, setPlay] = useState(null);
  const [playing, setPlaying] = useState(false);
  const accessToken = useAuth(code);
  const spotifyApi = new SpotifyWebApi({
    clientId: CLIENT_ID,
  });

  useEffect(() => {
    if (accessToken) {
      spotifyApi.setAccessToken(accessToken);
    }
  }, [accessToken]);

  return (
    <>
      <div className="p-5">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          size="large"
          className="w-[400px]"
          placeholder="Searching..."
        />
      </div>
      <div className="p-5 h-screen overflow-auto">
        <TopMusic
          setPlaying={setPlaying}
          accessToken={accessToken}
          setPlay={setPlay}
          searchText={"Doston Ergashev"}
        />
        <TopMusic
          setPlaying={setPlaying}
          accessToken={accessToken}
          setPlay={setPlay}
          searchText={"Xamdam"}
        />
        <TopMusic
          setPlaying={setPlaying}
          accessToken={accessToken}
          setPlay={setPlay}
          searchText={"Ummon"}
        />
        <Playback
          accessToken={accessToken}
          playing={playing}
          setPlaying={setPlaying}
          play={play}
        />
      </div>
    </>
  );
}

export default Dashboard;