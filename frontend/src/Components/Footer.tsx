

const Footer= () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-8">
      <div className="container mx-auto text-center">
        <ul className="flex justify-center space-x-4 mb-2">
          <li><a href="#" className="hover:text-gray-400">Privacy Policy</a></li>
          <li><a href="#" className="hover:text-gray-400">Terms of Service</a></li>
          <li><a href="#" className="hover:text-gray-400">Contact Us</a></li>
        </ul>
        <p className="text-sm">&copy; {new Date().getFullYear()} Hotel Booking App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
