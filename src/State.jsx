import {  computed, signal } from "@preact/signals-react";

import React from 'react'
// export const me = signal('ike')
export const notes = signal([
    {
        title: "my life story",
        content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates nisi ab velit sed iusto adipisci, pariatur itaque dolor? Dolore, quis? Incidunt eaque commodi tempora vero dolorum dignissimos, tempore maxime doloremque?",
        date:"10-01-2023",
        id: 1,
        expand: false,
        edit: false
        
    },
    {
        title: "car lists",
        content: "jeep lexus glk",
        date:"10-01-2023",
        id:2,
        expand: false,
        edit: false
    },
    {
        title: "story to be told",
        content: "fihgsgncuehu iywedtydkhbcn dbce ",
        date:"10-01-2023",
        id:3,
        expand: false,
        edit: false
    },
    {
        title: "exam",
        content: " yes my God is good always" ,
        date:"10-01-2023",
        id:4,
        expand: false,
        edit: false
    },
])

export const searchQuery = signal("")
export const colors = signal("")

export default function state() {
   
  return (
    <div>
      
    </div>
  )
}


