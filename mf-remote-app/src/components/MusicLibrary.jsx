  import React, { useState, useMemo } from "react";
  import SongList from "./SongList.jsx";
  import SongFilter from "./SongFilter.jsx";
  import SongSorter from "./SongSorter.jsx";
  import GroupByToggle from "./GroupByToggle.jsx";
  import AddSongForm from "./AddSongForm.jsx";
  import DeleteSongModal from "./DeleteSongModal.jsx";
  import "../css/MusicLibrary.css";
  import "../css/DeleteSongModal.css";
  import { useNavigate } from "react-router-dom";
  import { filterSongs, sortSongs, groupSongs } from "../utils/songUtils";

  const MusicLibrary = ({ auth = { name: "Patro", role: "auth" }, songs }) => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [songList, setSongList] = useState(songs);
    const [filterText, setFilterText] = useState("");
    const [groupBy, setGroupBy] = useState("");
    const [sortBy, setSortBy] = useState("");

    const filteredSongs = useMemo(() => {
      let result = songList;
      if (filterText) result = filterSongs(result, filterText);
      if (sortBy) result = sortSongs(result, sortBy);
      return result;
    }, [filterText, sortBy, songList]);

    const groupedSongs = useMemo(() => {
      if (!groupBy) return null;
      return groupSongs(filteredSongs, groupBy);
    }, [filteredSongs, groupBy]);

    const handleAddSongClick = () => {
      setIsModalOpen(true);
    };

    const closeModal = () => {
      setIsModalOpen(false);
    };

    const handleDeleteSongs = (selectedIds) => {
      const updatedList = songList.filter((song) => !selectedIds.includes(song.id));
      setSongList(updatedList);
    };

    return (
      <div className="MusicLibrary">
        <div className="controls">
          <div className="left-controls">
            <SongFilter filterText={filterText} setFilterText={setFilterText} />
            <SongSorter sortBy={sortBy} setSortBy={setSortBy} />
            <GroupByToggle groupBy={groupBy} setGroupBy={setGroupBy} />
          </div>

          {auth.role === "admin" && <div className="right-controls">
            <button onClick={handleAddSongClick}>Add Song</button>
            <button onClick={() => setIsDeleteModalOpen(true)}>Delete Songs</button>
          </div>}
        </div>

        <SongList
          songs={groupBy ? groupedSongs : filteredSongs}
          groupBy={groupBy}
        />

        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <AddSongForm
                onAddSong={(newSong) => {
                  setSongList([...songList, newSong]);
                  closeModal();
                }}
                closeModal={closeModal}
              />
            </div>
          </div>
        )}

        {isDeleteModalOpen && (
          <DeleteSongModal
            songs={filteredSongs}
            onDeleteSongs={handleDeleteSongs}
            onClose={() => setIsDeleteModalOpen(false)}
          />
        )}
      </div>
    );
  };

  export default MusicLibrary;
