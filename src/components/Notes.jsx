import { computed, effect, signal, useSignal } from "@preact/signals-react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { colors, notes } from "../State";
import { searchQuery } from "../State";
import { MdDeleteForever } from "react-icons/md";

import React, { useEffect, useRef, useState } from "react";

function Notes() {
  const deleteItem = (id) => {
    notes.value = notes.value.filter((item) => item.id !== id);

    console.log("yeeess");
  };

  const check = computed(() => {
    return notes.value.some((item) => item.expand == true);
  });
  console.log(check.value);

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

  return (
    <motion.div
      initial={{ x: -400, opacity: 0 }}
      animate={{ x: 1, opacity: 1 }}
      exit={{ x: -450 }}
      transition={{ type: "spring", stiffness: 200, ease: [0, 2.3, 5, 0.6] }}
      className="notes"
    >
      <h5 className="allnotes" style={{ color: colors.value[1] }}>
        all notes
      </h5>

      <div className={`${check.value ? "grid show" : "grid"}`}>
        {notes.value
          .filter((item) => {
            if (searchQuery.value.trim().length < 1) {
              return item;
            } else if (item.title.toLowerCase().includes(searchQuery.value)) {
              return item;
            }
          })
          .map((item) => (
            <AnimatePresence>
              <motion.div
               
                style={{ border: `1px solid ${colors.value[1]}` }}
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
              >
                <motion.h4 style={{ color: colors.value[1] }}>
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
    </motion.div>
  );
}

export default Notes;
