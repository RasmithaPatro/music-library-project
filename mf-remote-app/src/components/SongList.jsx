import React from "react";
import SongCard from "./SongCard.jsx";

const SongList = ({ songs, groupBy }) => {
  if (!songs || (Array.isArray(songs) && songs.length === 0) || (groupBy && Object.keys(songs).length === 0)) {
    return <div>No songs found.</div>;
  }

  return (
    <div className="song-list">
      {groupBy
        ? Object.entries(songs).map(([group, songs]) => (
            <div key={group}>
              <h3 style={{ color: "#6a0dad", marginTop: "20px" }}>{group}</h3>
              <div className="song-list">
                {songs.map((song) => (
                  <SongCard key={song.id} song={song} />
                ))}
              </div>
            </div>
          ))
        : songs.map((song) => <SongCard key={song.id} song={song} />)}
    </div>
  );
};

export default SongList;
