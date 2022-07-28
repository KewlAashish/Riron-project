import Home from "./pages/Home";
import PostDetails from "./pages/PostDetails";
import About from "./pages/About";
import Error from "./pages/Error";
import CreateEditPost from "./pages/CreateEditPost";
import Auth from "./pages/Auth";
import { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.scss";
import "./media-query.css";
import Header from "./components/Header";
import { auth } from "./firebase-config";
import { signOut } from "firebase/auth";

function App() {
  const [active, setActive] = useState("home");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      setActive("login");
      navigate("/auth");
    });
  };
  return (
    <div className="App">
      <Header
        setActive={setActive}
        active={active}
        user={user}
        handleLogout={handleLogout}
      />
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/" element={<Home setActive={setActive} user={user} />} />
        <Route
          path="/detail/:id"
          element={<PostDetails setActive={setActive} />}
        />
        <Route
          path="/create"
          element={
            user?.uid ? <CreateEditPost user={user} /> : <Navigate to="/auth" />
          }
        ></Route>
        <Route
          path="/edit/:id"
          element={
            user?.uid ? (
              <CreateEditPost user={user} setActive={setActive} />
            ) : (
              <Navigate to="/auth" />
            )
          }
        ></Route>
        <Route path="/about" element={<About />}></Route>
        <Route
          path="/auth"
          element={<Auth setActive={setActive} setUser={setUser} />}
        ></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </div>
  );
}

export default App;
