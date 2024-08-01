import React from 'react'
import companyLogo from "../Component/Images/pixel6logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import "../Component/Style/NavbarComponent.css"
export default function NavbarComponent() {
  return (
    <>
        <nav>
            <div>
                <img src={companyLogo} alt="" />
            </div>
            <div style={{marginRight:"16px"}}>
                <FontAwesomeIcon icon={faBars} bounce></FontAwesomeIcon>
            </div>
        </nav>
    </>  
    )
}
