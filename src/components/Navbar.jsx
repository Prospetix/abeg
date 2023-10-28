import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSignal } from "@preact/signals-react";
import { AnimatePresence, motion } from "framer-motion";
import { colors, notes } from "../State";
import { searchQuery } from "../State";
import { FaUser } from "react-icons/fa6";

function Navbar() {
  const menu = useSignal(false);

  const [items, setItems] = useState(notes.value);

  const [query, setQuery] = useState("");

  const getQuery = (e) => {
    setQuery(e.target.value.toLowerCase());
    searchQuery.value = query;
  };

  const hideMenu = () => {
    menu.value = !menu.value;

    if (menu.value) {
      setTimeout(() => {
        hideMenu();
      }, 3000);
    }
  };

  return (
    <div
      className="nav"
      style={{ borderBottom: `1px solid ${colors.value[1]}` }}
    >
      <h1 className="logo">
        {" "}
        <span style={{ color: colors.value[1] }}>q</span>uota
      </h1>
      <div className="search">
        <input
          value={query}
          tabIndex={0}
          onChange={(e) => getQuery(e)}
          onKeyUp={(e) => getQuery(e)}
          type="text"
        />
      </div>

      <div
        style={{
          backgroundColor: colors.value[1],
          color: `${colors.value[1] === "#F5B841" ? "black" : ""}`,
        }}
        className={`${menu.value ? "list show" : "list"}`}
      >
        <Link
          className="link"
          to={"/notes"}
          style={{ color: `${colors.value[1] === "#F5B841" ? "black" : ""}` }}
        >
          notes
        </Link>
        <Link
          className="link"
          to={"/"}
          style={{ color: `${colors.value[1] === "#F5B841" ? "black" : ""}` }}
        >
          take notes
        </Link>
      </div>

      <div style={{background: colors.value[1]}} className="profile" onClick={hideMenu}>
        <FaUser className="fa-solid fa-user" />
      </div>
    </div>
  );
}

export default Navbar;
