import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { toast } from "sonner";
import { colors, notes } from "./../State";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function createNote() {

  const [istrue, setistrue] = useState(false);
  const [value, setValue] = useState("");

  const [name, setName] = useState("");

  function getTextValue(e) {
    setName(e.target.value);
  }

  const submit = () => {
    const filteredText = value.substring(3, value.length - 4);

    let months = [
      "jan",
      "feb",
      "mar",
      "apr",
      "may",
      "jun",
      "jul",
      "aug",
      "oct",
      "nov",
      "dec",
    ];

    console.log(filteredText);

    let day = new Date().getDate();
    let month = new Date().getMonth();
    let year = new Date().getFullYear();
    let hour = new Date().getHours();
    let minute = new Date().getMinutes();

    console.log(months[month]);
    let currentDate = `${months[month]} ${day},${year} || ${hour}:${minute}`;

    const newNote = {
      title: name,
      content: filteredText,
      date: currentDate,
      id: new Date().getTime(),
    };

    // setValue("");
    // setName("");

    if (name !== "" && name.trim().length > 5) {
      notes.value = [...notes.value, newNote];

      console.log("ya");
      setName("");
      setValue("");

      toast.success("your note has been added");
    } else if (name.trim().length < 5) {
      toast.error("make sure title is more than 5 letters");
    }

    // console.log(notes.value);
  };

  useEffect(()=> {
    localStorage.setItem('notes', JSON.stringify(notes.value))
  },[notes.value])

  return (
  
      <motion.div
        className="createnote"
        initial={{ opacity: 1, x: 400 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring",duration:1, ease: "linear", stiffness: 200 }}
        exit={{
          y: 500
        }}
      >
        <div className="toolbar">
          <div className="back">
            <Link to={"/notes"} className="N">
              All Notes
            </Link>
            <Link to={"/"} className="backward">
              {" "}
              <AiOutlineHome />{" "}
            </Link>
          </div>
          <div className="textarea">
            <input
              className="typetext"
              placeholder="Note Title"
              type="text"
              value={name}
              onChange={(e) => getTextValue(e)}
            />
            <textarea
              name=""
              id=""
              placeholder="Add notes....."
              cols="30"
              rows="10"
              className="area"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            ></textarea>
          </div>
          <button
            style={{
              backgroundColor: colors.value[1],
              color: `${colors.value[1] === "#F5B841" ? "white" : "black"}`,
            }}
            className="save"
            onClick={submit}
          >
            save
          </button>
        </div>
      </motion.div>
   
  );
}

export default createNote;
