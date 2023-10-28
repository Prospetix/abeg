import Navbar from "./components/Navbar"
import "./App.css"
import Addnotes from "./components/Addnotes"
import { useState } from "react"
import { Toaster, toast } from 'sonner';
import { Route, Routes, useLocation } from "react-router"
import Notes from "./components/Notes"
import { AnimatePresence } from "framer-motion"
import { colors } from "./State"
// import { notes } from "./State"
import ThemeSwitch from "./components/ThemeSwitch";




export default function App() {
  
  const [open, setOpen] = useState(false)
  const location = useLocation()
  
  const opensidebar = () => {
    setOpen(true)
    console.log('yes');
  }
  
  // console.log(notes.value)

  return (
    <div className="app" style={{backgroundColor: colors.value[0]}}>
      <Navbar opensidebar={opensidebar} />
      <ThemeSwitch />
      
        
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route index element={<Addnotes />} />
          <Route path="/notes" element={<Notes />} />
        </Routes>
      </AnimatePresence>
      <Toaster  position="top-right" richColors/>
      
      
    </div>
  )
}
