import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../img/logo300.png'
import { tokenContext } from '../../context/tokenContext';
function Navbar() {
    let { token, setToken } = useContext(tokenContext)
    let navigate = useNavigate()
    function logOut() {
        localStorage.removeItem("token")
        setToken(null)
        navigate("/login")
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-custom navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" href="index.html"><img src={Logo} width="54" alt="" /> </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        Menu <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto">
                            {token ?
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="profile">Profile</Link>
                                    </li>
                                    <li className="nav-item">
                                        <button className="nav-link" onClick={logOut}>Logout</button>
                                    </li>
                                </> :
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="register">Register</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="login">Login</Link>
                                    </li>
                                </>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;