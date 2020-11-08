import React from 'react'
import './Footer.css'

function Footer() {

    return (
        <footer className="footerWrapper">
            <div className="footerContainer">
                <div className="disclaimer">
                    Demo of In App Call Quality.<br/>
                </div>
                <div className="self">
                    Created with <span role='img' aria-label='heart-emoji'>❤️</span>by <a href="https://www.somikdatta.com" target="_blank" rel="noopener noreferrer">The Cookout Engineering Team</a>
                </div>
            </div>
        </footer>
    )

}

export default Footer
