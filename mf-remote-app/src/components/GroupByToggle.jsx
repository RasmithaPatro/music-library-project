import React from "react";

const GroupByToggle = ({ groupBy, setGroupBy }) => {
  return (
    <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
      <option value="">Group By</option>
      <option value="title">Title</option>
      <option value="artist">Artist</option>
      <option value="album">Album</option>
    </select>
  );
};

export default GroupByToggle;
