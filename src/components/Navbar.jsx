import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';

const Navbar = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId'); // Check if user logged in

  const handleLogout = () => {
    localStorage.clear();
    alert('Logged out successfully!');
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center space-x-2">
          <img src={Logo} alt="Logo" className="h-10 w-10 object-contain" />
          <Link to="/" className="text-2xl font-bold text-gray-800">
            FinQuest
          </Link>
        </div>

        <div className="flex space-x-6 items-center">
          <Link 
            to="/" 
            className="text-gray-600 hover:text-blue-500 text-lg font-medium transition duration-300"
          >
            Home
          </Link>
          <Link 
            to="/personalize" 
            className="text-gray-600 hover:text-blue-500 text-lg font-medium transition duration-300"
          >
            Personalize Your Learning
          </Link>
          <Link 
            to="/about" 
            className="text-gray-600 hover:text-blue-500 text-lg font-medium transition duration-300"
          >
            About
          </Link>
          <Link 
            to="/profile" 
            className="text-gray-600 hover:text-blue-500 text-lg font-medium transition duration-300"
          >
            Profile
          </Link>

          {/* 🔥 Dynamic part: if logged in show Logout, else show Sign Up / Login */}
          {userId ? (
            <button
              onClick={handleLogout}
              className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Logout
            </button>
          ) : (
            <>
              <Link 
                to="/signup" 
                className="text-gray-600 hover:text-blue-500 text-lg font-medium transition duration-300"
              >
                Sign Up
              </Link>
              <Link 
                to="/login" 
                className="text-gray-600 hover:text-blue-500 text-lg font-medium transition duration-300"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
