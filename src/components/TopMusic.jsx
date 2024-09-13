import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import { CLIENT_ID } from "../hook/useEnv";

function TopMusic({ searchText, setPlay, accessToken, setPlaying }) {
  const spotifyApi = new SpotifyWebApi({
    clientId: CLIENT_ID,
  });

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken, searchText]);

  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    if (!accessToken) return;

    spotifyApi.searchTracks(searchText).then((res) => {
      setTracks(
        res.body.tracks.items.map((item) => {
          return {
            img: item.album.images[0]?.url,
            artistName: item.artists[0]?.name,
            trackName: item.name,
            uri: item.uri,
          };
        })
      );
    });
  }, [accessToken, searchText]);

  const handleClickMusic = (item) => {
    setPlay(item.uri);
    setPlaying(true);
  };

  return (
    <section>
      <h1 className="capitalize text-white font-bold text-3xl my-3">
        {searchText} qo'shiqlari
      </h1>
      <div className="flex gap-5 mb-[50px] overflow-x-auto">
        {tracks.map((item, index) => (
          <div
            onClick={() => handleClickMusic(item)}
            key={index}
            className="min-w-[224px] !h-fit card-bg p-5 rounded-[8px]"
          >
            <img
              className="mb-5 rounded-lg"
              src={item.img}
              alt={item.trackName}
              width={182}
              height={182}
            />
            <div className="text-white flex flex-col">
              <h2 className="font-bold text-[20px] line-clamp-1 mb-2">
                {item.trackName}
              </h2>
              <strong>{item.artistName}</strong>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TopMusic;