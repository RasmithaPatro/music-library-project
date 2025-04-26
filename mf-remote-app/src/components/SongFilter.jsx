import React from "react";

const SongFilter = ({ filterText, setFilterText }) => {
  return (
    <input
      type="text"
      placeholder="Filter by title, artist, or album"
      value={filterText}
      onChange={(e) => setFilterText(e.target.value)}
      data-testid="song-filter-input" 
    />
  );
};

export default SongFilter;
