import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";

function MyHotels() {
  const { data: hotelData } = useQuery("fetchMyHotels", apiClient.fetchMyHotels, {
    onError: () => {
      // Handle error here
    },
  });

  if (!hotelData) {
    return <span>No hotels found</span>;
  }

  return (
    <div className="space-y-6 p-4 lg:p-8">
      <div className="flex flex-col lg:flex-row justify-between items-center">
        <h1 className="text-2xl lg:text-3xl font-bold mb-4 lg:mb-0">My Hotels</h1>
        <Link
          to="/add-hotel"
          className="flex bg-blue-600 text-white text-lg lg:text-xl font-bold py-2 px-4 rounded-md hover:bg-blue-400 transition-colors"
        >
          Add Hotel
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {hotelData.map((hotel) => (
          <div
            key={hotel._id}
            className="flex flex-col justify-between border border-slate-300 rounded-lg p-6 shadow-md"
          >
            <h2 className="text-xl font-semibold">{hotel.name}</h2>
            <div className="whitespace-pre-line text-gray-700 mt-2 mb-4">{hotel.description}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="border border-slate-300 rounded-sm p-3 flex items-center text-sm">
                <BsMap className="mr-2 text-lg" />
                {hotel.city}, {hotel.country}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center text-sm">
                <BsBuilding className="mr-2 text-lg" />
                {hotel.type}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center text-sm">
                <BiMoney className="mr-2 text-lg" />
                Rs. {hotel.pricePerNight} Per night
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center text-sm">
                <BiHotel className="mr-2 text-lg" />
                {hotel.adultCount} adults, {hotel.childCount} children
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center text-sm">
                <BiStar className="mr-2 text-lg" />
                {hotel.starRating} Star Rating
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Link
                to={`/edit-hotel/${hotel._id}`}
                className="bg-blue-600 text-white text-lg lg:text-xl font-bold py-2 px-4 rounded-md hover:bg-blue-400 transition-colors"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyHotels;
