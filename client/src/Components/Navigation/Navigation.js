import React from 'react'
import cookoutlogo from '../../Icons/the-cookout-logo.svg'
// import GitHubButton from 'react-github-btn'
import '../Navigation/Navigation.css'

const Navigation = () => {
    return (
        <header className="dropShadow">
            <div className="headerWrapper">
                <div className="headerContainer flex">
                    <div className="headerLogoLinkWrapper">
                        <div className="headerLogoLink">
                        <a href='/'>
                            <div className="headerLogo flex flex-row">
                                <div className="logoImg">
                                    <img src={cookoutlogo} alt="Cookout Logo"/>
                                </div>
                            </div>
                        </a>
                        </div>
                    </div>
                    <div className="githubStar">
                    {/* Cookout Github Button */}
                    </div>
                </div>
            </div>
        </header>
    )
}
export default Navigation
