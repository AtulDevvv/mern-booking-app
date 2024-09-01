import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <header className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-4 shadow-md">
      <div className="container mx-auto flex flex-wrap justify-between items-center px-4 lg:px-8">
        <Link to="/" className="text-2xl lg:text-3xl font-extrabold tracking-wide">
        <h1 className="font-['poppins']">BookMania.com</h1>
        </Link>
        <nav className="flex flex-wrap justify-center space-x-4 mt-2 lg:mt-0">
          {isLoggedIn ? (
            <>
              <Link
                to="/my-bookings"
                className="font-bold text-sm md:text-base lg:text-lg hover:bg-white/20 rounded-md px-3 py-2 transition-colors"
              >
                My Bookings
              </Link>
              <Link
                to="/my-hotels"
                className="font-bold text-sm md:text-base lg:text-lg hover:bg-white/20 rounded-md px-3 py-2 transition-colors"
              >
                My Hotels
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="font-bold text-sm md:text-base lg:text-lg hover:bg-white/20 rounded-md px-3 py-2 transition-colors bg-white/30"
            >
              Sign-In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
