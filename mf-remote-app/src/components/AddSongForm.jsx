import React, { useState } from "react";

const AddSongForm = ({ onAddSong, closeModal }) => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [image, setImage] = useState("");

  const handleAdd = () => {
    if (!title || !artist || !album) {
      alert("Fill all required fields!");
      return;
    }

    const newSong = {
      id: Date.now(),
      title,
      artist,
      album,
      image: image || "https://via.placeholder.com/150"
    };

    onAddSong(newSong);
  };

  return (
    <div className="add-song-form">
        <h2>ADD NEW SONG</h2>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} /><br />
      <input placeholder="Artist" value={artist} onChange={e => setArtist(e.target.value)} /><br />
      <input placeholder="Album" value={album} onChange={e => setAlbum(e.target.value)} /><br />
      <input placeholder="Image URL" value={image} onChange={e => setImage(e.target.value)} /><br />
      <div className="buttonrow">
      <button onClick={handleAdd}>Submit</button>
        <button onClick={closeModal}>Close</button>
      </div>
      
    </div>
  );
};

export default AddSongForm;
