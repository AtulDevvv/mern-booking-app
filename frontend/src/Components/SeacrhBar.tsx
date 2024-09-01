import { FormEvent, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext"
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { useNavigate } from "react-router-dom";



function SearchBar() {
    const search=useSearchContext();
    const navigate=useNavigate();
    

    const [destination,setDestination]=useState<string>(search.destination);
    const [checkIn,setCheckIn]=useState<Date>(search.checkIn);
    const[checkOut,setCheckOut]=useState<Date>(search.checkOut);
    const [adultCount,setAdultCount]=useState<number>(search.adultCount);
    const [childCount,setChildCount]=useState<number>(search.childCount);

    const handleSubmit=(event:FormEvent)=>{
        event.preventDefault()
        search.saveSearchValues(destination,checkIn,checkOut,adultCount,childCount)

        navigate('/search')

       

    }
    const minDate=new Date()
    const maxDate=new Date();
    maxDate.setFullYear(maxDate.getFullYear()+1)

  return (
   <form onSubmit={handleSubmit} 
   className="-mt-8 p-3 bg-orange-400 rounded shadow-md grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4"
   >
    <div className="flex flex-row items-center flex-1 bg-white p-2">
        <MdTravelExplore size={25} className="mr-2"/>
        <input type="text" placeholder="Where are you going?"  className="text-md w-full focus:outline-none"
        value={destination}
        onChange={(event)=>setDestination(event.target.value)}
        />
    </div>
    <div className="flex bg-white px-2 py-1 gap-4">
        <label className="items-center flex flex-col lg:flex-row">
            <span>Adult:</span>
            <input type="number"  className="w-full p-1 focus:outline-none font-bold " min={1}
            max={20} value={adultCount} onChange={(e)=>setAdultCount(parseInt(e.target.value))}/>
            </label>
            <label className="items-center flex flex-col lg:flex-row">
            Children:
            <input type="number"  className="w-full p-1 focus:outline-none font-bold " min={1}
            max={20} value={childCount} onChange={(e)=>setChildCount(parseInt(e.target.value))}/>
            </label>
             </div>
          

             <div className="w-full flex items-center p-1 focus:outline-none font-bold ">
                <DatePicker selected={checkIn} className="p-2 min-w-full h-full focus:outline-none" onChange={(date)=>setCheckIn(date as Date)}
                selectsStart
                startDate={checkIn}
                endDate={checkOut}
                minDate={minDate}
                maxDate={maxDate}
                placeholderText="check in date"
                wrapperClassName="min-w-full"
                
                />
             </div>
             <div className="w-full flex items-center  p-1 focus:outline-none font-bold ">
                <DatePicker selected={checkOut} className="p-2 "  onChange={(date)=>setCheckOut(date as Date)}
                    selectsStart
                    startDate={checkIn}
                    endDate={checkOut}
                    minDate={minDate}
                    maxDate={maxDate}
                    placeholderText="check out date"
                      wrapperClassName="min-w-full"
                    />
             </div>

             <div className="flex gap-2">
    <button className="w-full md:w-1/2 bg-blue-500 text-white py-3 px-4 font-bold text-lg rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300">
        Search
    </button>
    <button className="w-full md:w-1/2 bg-red-500 text-white py-3 px-4 font-bold text-lg rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300">
        Clear
    </button>
</div>

           
     

   </form>
  )
}

export default SearchBar