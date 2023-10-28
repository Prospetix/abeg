import React from 'react'
import { colors } from '../State'

function ThemeSwitch() {
  const changeTheme = (pri, sec) => {
    colors.value = [pri,sec]
    
    console.log(pri);
  }
  
  
  return (
    <div className='theme'>
     <div style={{border: `3px solid ${colors.value[1]}`}} onClick={()=> changeTheme("rgba(231, 236, 240, 0.815)", "#78bc61")} className="switch white"></div>
     
     <div style={{border: `3px solid ${colors.value[1]}`}} onClick={()=> changeTheme("purple", "#F5B841")} className="switch purple"></div>
     
     <div style={{border: `3px solid ${colors.value[1]}`}} onClick={()=> changeTheme("black","#776D5A")} className="switch black"></div>
    </div>
  )
}

export default ThemeSwitch
