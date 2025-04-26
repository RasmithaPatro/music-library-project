import React, { useState } from "react";
import "../css/DeleteSongModal.css";

const DeleteSongModal = ({ songs, onDeleteSongs, onClose }) => {
  const [selectedSongs, setSelectedSongs] = useState([]);

  const handleCheckboxChange = (id) => {
    setSelectedSongs((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleDelete = () => {
    onDeleteSongs(selectedSongs);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content delete-modal">
        <h2>Select Songs to Delete</h2>
        <div className="song-checkbox-list">
          {songs.map((song) => (
            <div key={song.id} className="checkbox-card">
              <input
                type="checkbox"
                aria-label={song.title} 
                checked={selectedSongs.includes(song.id)}
                onChange={() => handleCheckboxChange(song.id)}
              />

              <img src={song.image} alt={song.title} className="song-thumb" />
              <div className="song-details">
                <strong className="song-title">{song.title}</strong>
                <div className="song-meta">
                  {song.artist} — {song.album}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="delete-actions">
          <button onClick={handleDelete} disabled={selectedSongs.length === 0}>
            Delete Selected
          </button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteSongModal;
