import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './sidebar.css'
import { useTranslation } from 'react-i18next';
const Sidebar = () => {
    const [showDropdown, setShowDropdown] = useState(false)
    const { t, i18n } = useTranslation();
    return (
        <>
            <div className='menu'>
                <div className='toggle'>
                    <i className="bi bi-list" onClick={() => setShowDropdown(!showDropdown)}></i>
                </div>
                {
                    showDropdown && (
                        <div className='dropdown-menu'>
                            <Link to={"/"}><p>Home</p></Link>
                            <Link to={"/Internship"}><p>{t('Internships')}</p></Link>
                            <Link to={"/Jobs"}><p>{t('Jobs')}</p></Link>
                            <Link to={"/Profile"}><p>Profile </p></Link>
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default Sidebar
