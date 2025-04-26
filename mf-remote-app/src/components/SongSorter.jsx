import React from "react";

const SongSorter = ({ sortBy, setSortBy }) => {
  return (
    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
      <option value="">Sort By</option>
      <option value="title">Title</option>
      <option value="artist">Artist</option>
      <option value="album">Album</option>
    </select>
  );
};

export default SongSorter;
