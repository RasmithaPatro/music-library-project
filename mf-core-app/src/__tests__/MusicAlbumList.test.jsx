import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MusicAlbumList from "../components/MusicAlbumList";
import { MemoryRouter } from "react-router-dom";

jest.mock("MusicAppHost/MusicApp", () => () => <div>Mocked MusicApp</div>);

describe("MusicAlbumList Component", () => {
  it("renders login form when not authenticated", () => {
    render(
      <MemoryRouter>
        <MusicAlbumList />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText(/Enter username/i)).toBeInTheDocument();
  });

  it("renders welcome message after successful login", async () => {
    render(
      <MemoryRouter>
        <MusicAlbumList />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/Enter username/i);
    const loginButton = screen.getByRole("button", { name: /login/i });

    await userEvent.type(input, "rasmitha");
    await userEvent.click(loginButton);

    expect(await screen.findByText(/Welcome, Rasmitha!/i)).toBeInTheDocument();
  });

  it("allows user to log out", async () => {
    render(
      <MemoryRouter>
        <MusicAlbumList />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/Enter username/i);
    const loginButton = screen.getByRole("button", { name: /login/i });

    await userEvent.type(input, "rasmitha");
    await userEvent.click(loginButton);

    // Wait for the welcome message
    await waitFor(() => screen.getByText(/Welcome, Rasmitha!/i));

    // Trigger logout
    const logoutButton = screen.getByTitle("Logout");
    await userEvent.click(logoutButton);

    // Check if the login form appears again
    expect(screen.getByPlaceholderText(/Enter username/i)).toBeInTheDocument();
  });

  it("renders Mocked MusicApp after successful login", async () => {
    render(
      <MemoryRouter>
        <MusicAlbumList />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/Enter username/i);
    const loginButton = screen.getByRole("button", { name: /login/i });

    await userEvent.type(input, "rasmitha");
    await userEvent.click(loginButton);

    // Wait for the welcome message
    await waitFor(() => screen.getByText(/Welcome, Rasmitha!/i));

    // Check if the mocked MusicApp is displayed
    expect(screen.getByText(/Mocked MusicApp/i)).toBeInTheDocument();
  });

  it("shows an alert for invalid username", async () => {
    // Mock global alert to prevent it from showing in the test
    global.alert = jest.fn();

    render(
      <MemoryRouter>
        <MusicAlbumList />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/Enter username/i);
    const loginButton = screen.getByRole("button", { name: /login/i });

    await userEvent.type(input, "invalidUser");
    await userEvent.click(loginButton);

    // Ensure that the alert is called with the correct message
    expect(global.alert).toHaveBeenCalledWith("Invalid user!");
  });

  it("does not allow login with empty username", async () => {
    render(
      <MemoryRouter>
        <MusicAlbumList />
      </MemoryRouter>
    );
  
    const input = screen.getByPlaceholderText(/Enter username/i);
    const loginButton = screen.getByRole("button", { name: /login/i });
  
    // Leave the input empty (don't type anything)
    await userEvent.click(loginButton);
  
    // Check if the login form is still displayed (indicating no login occurred)
    expect(screen.getByPlaceholderText(/Enter username/i)).toBeInTheDocument();
  });
  
});
