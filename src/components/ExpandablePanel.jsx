import React, { useState } from 'react'
import { GoChevronDown } from "react-icons/go";
import { GoChevronLeft } from "react-icons/go";

const ExpandablePanel = ({ header, children }) => {
    // defining state variable for expansion section to control it
    const [expanded, setExpanded] = useState(false);

    // handling expanded Click
    const handleExpandedClick = () => {
        setExpanded(!expanded);
    }
  return (
    <div className='m-6 border rounded'>
        <div className='flex items center justify-between p-2 text-xl'> 
            <div className='flex items-center justify-between gap-4'>
                { header }
            </div>
            <div onClick = {handleExpandedClick} className='cursor-pointer'>
                {expanded ? <GoChevronDown /> : <GoChevronLeft />}
            </div>
        </div>
        {expanded && <div className='p=2 border-t'> { children } </div> }
    </div>        
  )
}

export default ExpandablePanel