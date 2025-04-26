
export function filterSongs(songs, filterText) {
  return songs.filter(song =>
    song.title.toLowerCase().includes(filterText.toLowerCase()) ||
    song.artist.toLowerCase().includes(filterText.toLowerCase()) ||
    song.album.toLowerCase().includes(filterText.toLowerCase())
  );
}

export function sortSongs(songs, sortBy) {
  return [...songs].sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
}

export function groupSongs(songs, groupBy) {
  return songs.reduce((groups, song) => {
    const key = song[groupBy];
    if (!groups[key]) groups[key] = [];
    groups[key].push(song);
    return groups;
  }, {});
}
