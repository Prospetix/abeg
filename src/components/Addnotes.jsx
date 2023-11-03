import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { colors, notes } from "./../State";
import ReactQuill from "react-quill";
import { signal, computed } from "@preact/signals-react";
import "react-quill/dist/quill.snow.css";
import { toast } from "sonner";
import { BiSolidCommentAdd } from "react-icons/bi";
import { Link } from "react-router-dom";

function Addnotes() {
  // const [istrue, setistrue] = useState(false);
  // const [value, setValue] = useState("");

  // const [name, setName] = useState("");

  // function getTextValue(e) {
  //   setName(e.target.value);
  // }

  // const submit = () => {
  //   const filteredText = value.substring(3, value.length - 4);

  //   console.log(filteredText);

  //   let day = new Date().getDate();
  //   let month = new Date().getMonth();
  //   let year = new Date().getFullYear();

  //   let currentDate = `${day}-${month}-${year}`;

  //   const newNote = {
  //     title: name,
  //     content: filteredText,
  //     date: currentDate,
  //     id: new Date().getTime(),
  //   };

  //   setValue("");

  //   if (name !== "" && name.trim().length > 5) {
  //     notes.value = [...notes.value, newNote];

  //     console.log("ya");
  //     setName("");

  //     toast.success("your note has been added");
  //   } else if (name.trim().length < 5) {
  //     toast.error("make sure title is more than 5 letter long");
  //   }

  //   // console.log(notes.value);
  // };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: "linear" }}
      className="addnotes"
    >
      <motion.div className="card" style={{ backgroundColor: colors.value[1] }}>
        <h3
          style={{
            color: `${colors.value[1] === "#F5B841" ? "black" : "white"}`,
          }}
        >
          take your first note
        </h3>
      </motion.div>

      <Link to={"/createnote"}>
        <BiSolidCommentAdd
          className="solid"
          style={{ color: colors.value[1] }}
        />
      </Link>
    </motion.div>
  );
}

export default Addnotes;
