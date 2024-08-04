
// Header.js

import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";


const Header = () => {
  const {isLoggedIn}= useAppContext();
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold ">Hotel Booking App</h1>
        <nav>
          {
            isLoggedIn?<>
            <Link to="/my-bookings" className=" font-bold p-2 text-md  hover:bg-gray-300">My Bookings</Link>
            <Link to="/my-hotels" className=" font-bold p-2 text-md  hover:bg-gray-300">My Hotels</Link>
       
           <SignOutButton/>
            
            </>: <ul className="flex space-x-4">
          <Link className="hover:text-blue-200 p-2 bg-white/30 " to="/sign-in">Sign-In</Link>
            </ul>
          }
         
        </nav>
        
      </div>
    </header>
  );
};

export default Header;
