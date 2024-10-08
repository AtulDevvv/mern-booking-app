import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "./../api-client"
import { AiFillStar } from "react-icons/ai";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import GuestInfo from "../forms/GuestInfoForm/GuestInfo";

function Details() {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
      };

    const {hotelId}=useParams();

    const {data:hotel}= useQuery("fetchHotelById",()=>
        apiClient.fetchHotelById(hotelId as string),{
            enabled:!!hotelId,
        }
    );

    if(!hotel){
         return <>
         </>
    }

    

  return (
    <div className="space-y-6">
        <div>
            <span className="flex">
                {Array.from({length:hotel.starRating}).map(()=>(
                    <AiFillStar className="fill-yellow-400"/>
                ))}
            </span>
            <h1 className="text-3xl font-bold">{hotel.name}</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-1 p-2 gap-4">
        <Slider {...settings}>
          {hotel.imageUrls.map((image, index) => (
            <div key={index} className="h-[500px]">
              <img
                src={image}
                alt={hotel.name}
                className="rounded-md  w-full h-full object-cover object-center"
              />
            </div>
          ))}
        </Slider>
        </div>
        <div className="grid grid-cols-2 p-2 lg:grid-cols-3 gap-4">
            {
                hotel.facilities.map((facility)=>(
                    <div className="border border-slate-300  rounded-sm p-3 ">
                        {facility}
                    </div>
                ))
            }
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6  ">
  <div className="flex flex-col lg:flex-row lg:justify-between space-y-6 lg:space-y-0 lg:space-x-6">
    <p className="whitespace-pre-line flex-grow text-gray-700 text-base md:text-lg lg:text-xl">
      {hotel.description}
    </p>
    <div className="lg:h-fit lg:w-full">
      <GuestInfo pricePerNight={hotel.pricePerNight} hotelId={hotel._id} />
    </div>
  </div>
</div>

    </div>
  )
}

export default Details