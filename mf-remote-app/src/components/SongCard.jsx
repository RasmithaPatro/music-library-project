import React from "react";

const SongCard = ({ song }) => {
  return (
    <div className="song-card">
      <img src={song.image} alt={song.title} className="album-cover" />
      <div className="song-info">
        <strong>{song.title}</strong>
        <p>{song.artist}</p>
        <p><em>{song.album}</em></p>
      </div>
    </div>
  );
};

export default SongCard;
