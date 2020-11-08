import React from 'react'
import cookoutlogo from '../../Icons/the-cookout-logo.svg'
import './Watermark.css'

function Watermark(){
    return (
        <div className="watermark">
            <img className="logoImage" src={cookoutlogo} alt="Cookout Logo"/>
        </div>
    )
}

export default Watermark
