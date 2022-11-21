import React, { useState } from "react"
import { useRecoilValue } from "recoil"
import { darkMode } from '../data/userData'

/* Info box on how to add country to My countries */
function InfoBox() {
    const [hideInfo, setHideInfo] = useState(false)
    const darkmode = useRecoilValue(darkMode);

    return (
        <div className={!hideInfo ? (darkmode ? "bg-[#4F4B81] shadow-xl p-10 rounded-xl max-w-xs text-white" : "bg-darkTeal shadow-xl p-10 rounded-xl max-w-xs text-white") : "hidden"}>
            <p>Click on the earth symbol to add to <span className="">My Countries</span></p>
            
            <p onClick={() => setHideInfo(true)} className="font-bold cursor-pointer float-right px-4">
                Close
            </p>
        </div>
    )
}

export default InfoBox
