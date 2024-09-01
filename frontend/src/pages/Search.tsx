import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContext"
import * as apiClient from "../api-client"
import { useState } from "react";
import SearchResultCard from "../Components/SearchResultCard";
import Pagination from "../Components/Pagination";
import StarRatingFilter from "../Components/StarRatingFilter";
import HotelTypesFilter from "../Components/HotelTypesFilter";
import FacilitiesFilter from "../Components/FacilitiesFilter";
import PriceFilter from "../Components/PriceFilter";

function Search() {
    const search=useSearchContext();
    const[page,setPage]=useState<number>(1)
    const[selectedStars,setSelectedStars]=useState<string[]>([])
   const [selectedHotelTypes,setSelectedHotelTypes]=useState<string[]>([])
    const [selectedFacilities,setSelectedFacilities]=useState<string[]>([])

    const [selectPrice,setSelectedPrice]=useState<number | undefined>()
  
    const searchParams={
        destination:search.destination,
        checkIn:search.checkIn.toISOString(),
        checkOut:search.checkOut.toISOString(),
        adultCount:search.adultCount.toString(),
        childCount:search.childCount.toString(),
        page:page.toString(),
        stars:selectedStars,
        types:selectedHotelTypes,
        facilities:selectedFacilities,
        maxPrice:selectPrice?.toString(),

    }
    const {data:hotelData}=useQuery(["searchHotels",searchParams],()=>apiClient.searchHotels(searchParams))

    const handleStarsChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
      const starRating=event.target.value;
      setSelectedStars((prevStars)=>event.target.checked?[...prevStars,starRating]:prevStars.filter((star)=>star !== starRating))

    }
    const handleHotelTypesChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
      const hotelType=event.target.value;
      setSelectedHotelTypes((prevStars)=>event.target.checked?[...prevStars,hotelType]:prevStars.filter((type)=>type !== hotelType))

    }
    const handleHotelFacilities=(event:React.ChangeEvent<HTMLInputElement>)=>{
      const hotelFacility=event.target.value;
      setSelectedFacilities((prevStars)=>event.target.checked?[...prevStars,hotelFacility]:prevStars.filter((facility)=>facility !== hotelFacility))

    }
    

  return (
    <div className="grid grid-cols-2 lg:grid-cols-[250px_1fr] gap-5">
      <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border border-slate-300 pb-5">
            Filter By:
          </h3>
      {/* {Todo filters} */}
      <StarRatingFilter selectedStars={selectedStars} onChange={handleStarsChange}/>

      <HotelTypesFilter selectedHotelTypes={selectedHotelTypes} onChange={handleHotelTypesChange}/>
        </div>
       <FacilitiesFilter selectedFacilities={selectedFacilities} onChange={handleHotelFacilities}/>
       <PriceFilter selectedPrice={selectPrice} onChange={(value?:number)=>setSelectedPrice(value)}/>
      </div>
      <div className="flex flex-col gap-5 ">
          <div className="flex justify-between items-center font-bold">
           <span className="text-xl font-bold"> {hotelData?.pagination.total} Hotel Found
            {search.destination?`in ${search.destination}`:""}
           </span>
          </div>
          {hotelData?.data.map((hotel)=>(
          <SearchResultCard hotel={hotel}/>
          ))}
        </div>
        <div>
          <Pagination page={hotelData?.pagination.page || 1} pages={hotelData?.pagination.pages || 1} onPageChange={(page)=>(setPage(page))} />
        </div>
    </div>
  )
}

export default Search