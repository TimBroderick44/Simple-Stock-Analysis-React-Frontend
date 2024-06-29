import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import style from './Navbar.module.scss';

function Navbar() {
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      logout();
      toast.success('Logout successful!');
    } else {
      toast.error('Logout failed. Please try again.');
    }
  };

  return (
    <div className={style.nav}>
      <h1 className={style.title}>Masamune Stock Analysis and Data</h1>
      {isLoggedIn && (
        <button className={style.logoutButton} onClick={handleLogout}>Logout</button>
      )}
    </div>
  );
}

export default Navbar;
