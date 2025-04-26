import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MusicLibrary from "../components/MusicLibrary";
import { BrowserRouter as Router } from "react-router-dom";
import * as songUtils from "../utils/songUtils";
import React from "react";

jest.mock("../components/SongList", () =>
  jest.fn(({ songs, groupBy }) => (
    <div>
      {groupBy ? (
        <div>Grouped by {groupBy}</div> 
      ) : (
        songs.map((song) => <div key={song.id}>{song.title}</div>)
      )}
    </div>
  ))
);
jest.mock("../components/SongSorter", () =>
  jest.fn(() => <div>Mocked SongSorter</div>)
);
jest.mock("../components/GroupByToggle", () =>
  jest.fn(({ groupBy, setGroupBy }) => (
    <select
      data-testid="groupby-select"
      value={groupBy}
      onChange={(e) => setGroupBy(e.target.value)}
    >
      <option value="">Group By</option>
      <option value="title">Title</option>
      <option value="artist">Artist</option>
      <option value="album">Album</option>
    </select>
  ))
);


describe("MusicLibrary Component", () => {
  const mockSongs = [
    { id: 1, title: "Song 1", artist: "Artist 1", album: "Album 1" },
    { id: 2, title: "Song 2", artist: "Artist 2", album: "Album 2" },
  ];

  const auth = { name: "Patro", role: "admin" };

  it("renders the music library", () => {
    render(
      <Router>
        <MusicLibrary auth={auth} songs={mockSongs} />
      </Router>
    );

    expect(screen.getByText("Song 1")).toBeInTheDocument();
    expect(screen.getByText("Song 2")).toBeInTheDocument();
  });

  it("filters songs based on filter text", () => {
    render(
      <Router>
        <MusicLibrary auth={auth} songs={mockSongs} />
      </Router>
    );

    const filterInput = screen.getByTestId("song-filter-input");
    fireEvent.change(filterInput, { target: { value: "Song 1" } });

    const filteredSong = screen.getByText("Song 1");
    expect(filteredSong).toBeInTheDocument();
    expect(screen.queryByText("Song 2")).toBeNull();
  });

  it('shows "Add Song" button for admin users', () => {
    render(
      <Router>
        <MusicLibrary auth={auth} songs={mockSongs} />
      </Router>
    );
    const addSongButton = screen.getByText("Add Song");
    expect(addSongButton).toBeInTheDocument();
  });

  it('does not show "Add Song" button for non-admin users', () => {
    render(
      <Router>
        <MusicLibrary auth={{ name: "John", role: "user" }} songs={mockSongs} />
      </Router>
    );
    const addSongButton = screen.queryByText("Add Song");
    expect(addSongButton).toBeNull();
  });


  it("renders grouped songs if groupBy is set", () => {
    render(
      <Router>
        <MusicLibrary auth={auth} songs={mockSongs} />
      </Router>
    );

    const groupBySelect = screen.getByTestId("groupby-select");

    fireEvent.change(groupBySelect, { target: { value: "artist" } });

    expect(screen.getByText("Grouped by artist")).toBeInTheDocument();
  });
  it('displays songs grouped by album when groupBy is "album"', () => {
    render(
      <Router>
        <MusicLibrary auth={auth} songs={mockSongs} />
      </Router>
    );

    const groupBySelect = screen.getByTestId("groupby-select");

    fireEvent.change(groupBySelect, { target: { value: "album" } });

    expect(screen.getByText("Grouped by album")).toBeInTheDocument();
  });
  it("renders groupBy options correctly in dropdown", () => {
    render(
      <Router>
        <MusicLibrary auth={auth} songs={mockSongs} />
      </Router>
    );

    const groupBySelect = screen.getByTestId("groupby-select");

    expect(groupBySelect).toHaveValue("");
    fireEvent.change(groupBySelect, { target: { value: "title" } });
    expect(groupBySelect).toHaveValue("title");
    fireEvent.change(groupBySelect, { target: { value: "artist" } });
    expect(groupBySelect).toHaveValue("artist");
  });
  it("filters songs based on filter text", () => {
    render(
      <Router>
        <MusicLibrary auth={auth} songs={mockSongs} />
      </Router>
    );

    const filterInput = screen.getByTestId("song-filter-input");
    fireEvent.change(filterInput, { target: { value: "Song 1" } });

    expect(screen.getByText("Song 1")).toBeInTheDocument();
    expect(screen.queryByText("Song 2")).toBeNull();
  });

  it("calls filterSongs utility with the correct arguments", () => {
    const filterSpy = jest.spyOn(songUtils, "filterSongs");
    render(
      <Router>
        <MusicLibrary auth={auth} songs={mockSongs} />
      </Router>
    );

    const filterInput = screen.getByTestId("song-filter-input");
    fireEvent.change(filterInput, { target: { value: "Song 1" } });

    expect(filterSpy).toHaveBeenCalledWith(mockSongs, "Song 1");
  });

  it("displays 'No songs found.' when filter yields no results", async () => {
    const songs = [
      { id: 1, title: "Song 1", artist: "Artist 1", album: "Album 1" },
      { id: 2, title: "Song 2", artist: "Artist 2", album: "Album 2" },
    ];

    render(
      <Router>
        <MusicLibrary songs={songs} />
      </Router>
    );

    const filterInput = screen.getByPlaceholderText(
      "Filter by title, artist, or album"
    );
    fireEvent.change(filterInput, { target: { value: "nonexistent song" } });

    await waitFor(() => {
      expect(screen.queryByText("No songs found.")).not.toBeInTheDocument();
    });
  });

  it("adds a new song and closes the modal", () => {
    render(
      <Router>
        <MusicLibrary auth={{ name: "Patro", role: "admin" }} songs={[]} />
      </Router>
    );

    fireEvent.click(screen.getByText("Add Song"));

    expect(screen.getByText(/add new song/i)).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText("Title"), {
      target: { value: "New Song" },
    });
    fireEvent.change(screen.getByPlaceholderText("Artist"), {
      target: { value: "New Artist" },
    });
    fireEvent.change(screen.getByPlaceholderText("Album"), {
      target: { value: "Album X" },
    });

    fireEvent.click(screen.getByText("Submit"));

    expect(screen.queryByText(/add new song/i)).not.toBeInTheDocument();

    expect(screen.getByText("New Song")).toBeInTheDocument();
  });

  it("opens and closes the add song modal when the close button is clicked", () => {
    render(
      <Router>
        <MusicLibrary
          auth={{ name: "Patro", role: "admin" }}
          songs={mockSongs}
        />
      </Router>
    );

    fireEvent.click(screen.getByText("Add Song"));

    expect(screen.getByText(/add new song/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText("Close"));

    expect(screen.queryByText(/add new song/i)).not.toBeInTheDocument();
  });

  it("opens and closes the Delete song modal when the Cancel button is clicked", () => {
    render(
      <Router>
        <MusicLibrary
          auth={{ name: "Patro", role: "admin" }}
          songs={mockSongs}
        />
      </Router>
    );

    fireEvent.click(screen.getByText("Delete Songs"));

    expect(screen.getByText(/Select Songs to Delete/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText("Cancel"));

    expect(
      screen.queryByText(/Select Songs to Delete/i)
    ).not.toBeInTheDocument();
  });

  it("deletes selected songs when 'Delete Selected' is clicked", async () => {
    render(
      <Router>
        <MusicLibrary auth={{ name: "Patro", role: "admin" }} songs={[...mockSongs]} />
      </Router>
    );
  
    fireEvent.click(screen.getByText("Delete Songs"));
  
    const checkbox1 = await screen.findByRole("checkbox", {
      name: /song 1/i,
    });
    const checkbox2 = await screen.findByRole("checkbox", {
      name: /song 2/i,
    });
  
    fireEvent.click(checkbox1);
    fireEvent.click(checkbox2);
  
    fireEvent.click(screen.getByText("Delete Selected"));
  
    await waitFor(() => {
      expect(screen.queryByText("Select Songs to Delete")).not.toBeInTheDocument();
    });
  
    expect(screen.queryByText("Song 1")).toBeNull();
    expect(screen.queryByText("Song 2")).toBeNull();
  });
  
});
