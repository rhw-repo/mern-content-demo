import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const { logout } = useLogout()
    const { user } = useAuthContext()
    const navigate = useNavigate()
    const handleClick = () => {
        logout() 
        // navigate to login page on logout from any page
        navigate("/login")
    }

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>CONTENT MANAGEMENT APP</h1>
                </Link>
                <nav>
                    {user && (
                        <div>
                            <span>{user.email}</span>
                            <button onClick={handleClick}>Log Out</button>
                        </div>
                    )}
                    {!user && (
                        <div>
                            <Link to="/login">Login</Link>
                            <Link to="/Signup">Signup</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default Navbar;