import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { toast } from "sonner";
import { colors, notes } from "./../State";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CgNotes } from "react-icons/cg";
import { FiMic } from "react-icons/fi";
import { AiTwotoneClockCircle } from "react-icons/ai";
import 'regenerator-runtime/runtime';

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { effect } from "@preact/signals-react";

function createNote() {
  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    resetTranscript,
  } = useSpeechRecognition();

  

  const [istrue, setistrue] = useState(false);
  const [value, setValue] = useState("");

  const [name, setName] = useState("");
  const [rec, setRec] = useState(false);

  function getTextValue(e) {
    setName(e.target.value);
  }

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  

  function speech() {
    if (rec) {
      SpeechRecognition.stopListening()
      setRec(!rec)
      toast.error('speech recognition has stopped')
    }else{
      SpeechRecognition.startListening({continuous:true})
      setRec(!rec)
      toast.success('speech recognition has started')
    }
    
   }

  useEffect(()=> {
    SpeechRecognition.stopListening
  })

  const submit = () => {
    const filteredText = value.substring(3, value.length - 4) || transcript;

    console.log(transcript);

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


    if (name !== "" && name.trim().length >= 5) {
      if (name.trim().length >= 20) {
        toast.error("make sure title is not more than 20 letters");
      } else {
        notes.value = [...notes.value, newNote];
        console.log("ya");
        setName("");
        setValue("");
       
        toast.success("your note has been added");
      }
    } else if (name.trim().length < 5) {
      toast.error("make sure title is more than 5 letters");
    }

    // console.log(notes.value);
  };

  

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes.value));
  }, [notes.value]);

  return (
    <motion.div
      className="createnote"
      initial={{ opacity: 1, x: 400 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        type: "spring",
        duration: 1,
        ease: "linear",
        stiffness: 200,
      }}
      exit={{
        y: 600,
      }}
    >
      <div className="toolbar">
        <div className="back">
          <Link to={"/notes"} className="N">
            <CgNotes style={{ fontSize: "1.7rem" }} />
            {/* All Notes */}
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
            value={value || transcript}
            onChange={(e) => setValue(e.target.value || transcript)}
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
        <button
         className={listening ? "blink" : ""}
          style={{
            position: "fixed",
            left: "30px",
            color: "black",
            padding: "40px 20px",
            fontSize: "2rem",
            bottom: "10px",
            backgroundColor: "white",
            borderRadius: "10px",
          }}
          onClick={()=>speech()}
        >
         { listening ? <AiTwotoneClockCircle /> :  <FiMic /> }
        </button>
      </div>
    </motion.div>
  );
}

export default createNote;
