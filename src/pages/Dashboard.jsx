import React, { useEffect, useState } from "react";
import { useAuth } from "../hook/useAuth";
import SpotifyWebApi from "spotify-web-api-node";
import { Input } from "antd";
import useDebounce from "../hook/useDebounce";
import axios from "axios";
function Dashboard({ code }) {
  const accessToken = useAuth(code);
  const spotifyApi = new SpotifyWebApi();
  const [title, setTitle] = useState("");
  const titleDebounce = useDebounce(title, 1000);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [titleDebounce]);

  const [tracks, setTracks] = useState([]);

  axios("https://api.spotify.com/v1/browse/categories/toplists/playlists", {
    headers: {
      Authorization: "Bearer " + accessToken,
    }
  }).then(
    (res) => console.log(res)
  );

  useEffect(() => {
    if (title) {
      spotifyApi.searchTracks(titleDebounce).then((res) => {
        console.log(res);

        setTracks(
          res.body.tracks.items.map((item) => {
            const data = {
              img: item.album.images[0].url,
              artistName: item.artists[0].name,
              trackName: item.name,
              uri: item.uri,
            };
            return data;
          })
        );
      });
    }
  }, [accessToken, titleDebounce]);
  console.log(tracks);

  return (
    <div className="p-5">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        size="large"
        className="w-[400px]"
        placeholder="Searching..."
      />
      {tracks.map((item, index) => (
        <img key={index} src={item.img} alt="" />
      ))}
    </div>
  );
}

export default Dashboard;
