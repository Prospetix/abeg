import { computed, effect, signal, useSignal } from "@preact/signals-react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { colors, notes} from "../State";
import { searchQuery } from "../State";
import { MdDeleteForever } from "react-icons/md";
import { Toaster, toast } from "sonner";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiArrowGoBackLine } from "react-icons/ri";

function Notes() {
  
  // useEffect(()=> {
  //   const check = localStorage.getItem('notes') === null ? notes.value : JSON.parse(localStorage.getItem("notes"))
  //   // notes.value = [...check]
  //   console.log(check);
  // },[])

  const [notFound, setNotfound] = useState(null)

  const grid = useRef();

  useEffect(()=> {
    setNotfound(grid.current ? grid.current.innerText : null )
    
  },[searchQuery.value])

  console.log(notFound);


  console.log(grid);

  const deleteItem = (id) => {
    toast("are you sure you want to remove?", {
      action: {
        label: "remove",
        Color: "red",
        onClick: () =>
          (notes.value = notes.value.filter((item) => item.id !== id)),
      },
    });
  };

  const check = computed(() => {
    return notes.value.some((item) => item.expand == true);
  });

  function updateNote(id, e) {
    const save = e.target.value;

    notes.value = notes.value.map((item) =>
      item.id === id ? { ...item, content: save } : item
    );
  }

  const expand = (id) => {
    notes.value = notes.value.map((item) =>
      item.id === id ? { ...item, expand: true } : item
    );
  };

  const close = (id) => {
    notes.value = notes.value.map((item) =>
      item.id === id ? { ...item, expand: false } : item
    );
  };

  const edit = (id) => {
    notes.value = notes.value.map((item) =>
      item.id === id ? { ...item, edit: !item.edit } : item
    );
  };

  const naviate = useNavigate();

  const goback = () => {
    naviate(-1);
  };

  return (

    <motion.div
      initial={{ x: -400, opacity: 0 }}
      animate={{ x: 1, opacity: 1 }}
      exit={{ x: -450 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="notes"
    >
      <h5 className="allnotes" style={{ color: colors.value[1] }}>
        all notes
      </h5>
      <button
        style={{
          backgroundColor: colors.value[1],
          color: `${colors.value[1] === "#F5B841" ? "black" : ""}`,
          border: "none",
        }}
        onClick={goback}
        className="backwardN"
      >
        {" "}
        <RiArrowGoBackLine />{" "}
      </button>

      {notes.value.length > 0 ? (

        <div ref={grid} className={`${check.value ? "grid show" : "grid"}`}>
          {notes.value
            .filter((item) => {
              if (searchQuery.value.trim().length < 1) {
                return item;
              } else if (item.title.toLowerCase().includes(searchQuery.value)) {
                return item;
              }
            })
            .map((item) => (
              <AnimatePresence key={item.id}>
                <motion.div
                  // style={{ border: `1px solid ${colors.value[1]}` }}
                  onClick={() => expand(item.id)}
                  onDoubleClick={() => close(item.id)}
                  whileTap={{ scale: 1.1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    ease: "linear",
                    duration: "0.10s",
                  }}
                  className={`${
                    item.expand ? "savenotes opennote" : "savenotes"
                  }`}
                  key={item.id}
                >
                  <motion.h4 style={{ color: colors.value[1] }} key={item.id}>
                    {item.title}

                    <MdDeleteForever
                      className={`${
                        item.expand ? "off" : "fa-solid fa-trash-can trash"
                      }`}
                      onClick={() => deleteItem(item.id)}
                    />

                    {/* <i
                    className={`${item.expand
                      ? "off"
                      : "fa-solid fa-trash-can trash"}`}
                      
                      onClick={()=> deleteItem(item.id)}
                  /> */}
                  </motion.h4>

                  <textarea
                    rows=""
                    cols="36"
                    className={`${item.edit ? "edit" : ""}`}
                    value={item.content}
                    onChange={(e) => updateNote(item.id, e)}
                  >
                    {item.content}
                  </textarea>
                  <h6 style={{ color: colors.value[1] }}>{item.date}</h6>
                  <button
                    style={{
                      backgroundColor: colors.value[1],
                      color: `${colors.value[1] === "#F5B841" ? "black" : ""}`,
                    }}
                    className={`${item.edit ? "red" : ""}`}
                    onClick={() => edit(item.id)}
                  >{`${item.edit ? "save" : "edit"}`}</button>
                </motion.div>
              </AnimatePresence>
            ))}
        </div>
      ) : (
        <h2 style={{ color: "grey", margin: "auto" }}>no notes found</h2>
      )}

      <h2 className={`${notFound === "" ? "online":"hidden"}`} style={{ color: "grey", margin: "auto", zIndex: 5 }}>
        no notes found
      </h2>
    </motion.div>
  );
}

export default Notes;
