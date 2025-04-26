// src/components/MusicAlbumList.jsx
import React, { createContext, useState, useContext,lazy, Suspense } from "react";
import './MusicAlbumList.css'; // Import the CSS file
const MusicApp = lazy(() => import("MusicAppHost/MusicApp"));
import { useNavigate } from "react-router-dom"; // ✅ Import this
  

// Dummy auth logic (simulate backend)
const loginUser = (username) => {
  const users = {
    rasmitha: { name: "Rasmitha", role: "admin" },
    patro: { name: "Patro", role: "user" },
  };
  const key = username.trim().toLowerCase();
  return users[key] ? { user: users[key] } : null;
};

// Auth Context
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  const login = (username) => {
    const result = loginUser(username);
    if (result) {
      setAuth(result.user);
    } else {
      alert("Invalid user!");
    }
  };

  const logout = () => {
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

// Product List UI
const MusicAlbumListContent = () => {
  const { auth, login, logout } = useAuth();
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    login(username);
    setUsername("");
  };

  return (
    <div
      key={auth ? "logged-in" : "login"}
      className={`container ${auth ? "logged-in" : "login-view"}`}
    >
      {!auth ? (
        <div className="formContainer">
          <h2 className="heading">Login</h2>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            className="input"
          />
          <button onClick={handleLogin} className="button">
            Login
          </button>
        </div>
      ) : (
        <div className="">
          <div className="roleInfo">
            <p>Welcome, {auth?.name}!</p>
            <button onClick={logout} className="icon-button" title="Logout">
              ⏻
            </button>
          </div>
          <div className="music-grid">
            <Suspense fallback={null}>
              <MusicApp auth={auth} />
            </Suspense>
          </div>
        </div>
      )}
    </div>
  );
};

// Final Export (with AuthProvider)
const MusicAlbumList = () => (
  <AuthProvider>
    <MusicAlbumListContent />
  </AuthProvider>
);

export default MusicAlbumList;
