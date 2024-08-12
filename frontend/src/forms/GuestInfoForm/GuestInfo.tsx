import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { useSearchContext } from "../../contexts/SearchContext";
import { useAppContext } from "../../contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

type Props={
    hotelId:string;
    pricePerNight:number;

}
type GuestInfoFormData={
    checkIn:Date;
    checkOut:Date;
    adultCount:number;
    childCount:number;


}


function GuestInfo({hotelId,pricePerNight}:Props) {
    const search= useSearchContext()
    const {isLoggedIn} = useAppContext()

    const navigate=useNavigate()
    const location=useLocation()

    const {register,watch,handleSubmit,setValue,formState:{errors}}=useForm<GuestInfoFormData>({
        defaultValues:{
            checkIn:search.checkIn,
            checkOut:search.checkOut,
            adultCount:search.adultCount,
            childCount:search.childCount,


        }
    });

    
    const checkIn=watch("checkIn")
    const checkOut=watch("checkOut")

    const minDate=new Date()
    const maxDate=new Date()

    maxDate.setFullYear(maxDate.getFullYear()+1);

    const onSignInClick=(data:GuestInfoFormData)=>{
        search.saveSearchValues("",data.checkIn,data.checkOut,data.adultCount,data.childCount)

        navigate('/sign-in',{state:{from:location}})
    }

    const onSubmit=(data:GuestInfoFormData)=>{
        search.saveSearchValues("",data.checkIn,data.checkOut,data.adultCount,data.childCount)

        navigate(`/hotel/${hotelId}/booking`);
        
    }
  return (
    <div className="flex flex-col p-4 bg-blue-200 gap-4">
        <h3 className="text-md font-bold ">
            Rs.{pricePerNight}
        </h3>
        <form onSubmit={isLoggedIn?handleSubmit(onSubmit):handleSubmit(onSignInClick)} >
            <div className="grid grid-cols-1 gap-4 items-center ">
            <DatePicker 
            required
            selected={checkIn} className="p-2 min-w-full h-full focus:outline-none" onChange={(date)=>setValue("checkIn",date as Date)}
                selectsStart
                startDate={checkIn}
                endDate={checkOut}
                minDate={minDate}
                maxDate={maxDate}
                placeholderText="check in date"
                wrapperClassName="min-w-full"
                
                />

            </div>
            <div className="grid grid-cols-1 gap-4 items-center mt-4 ">
            <DatePicker 
            required
            selected={checkOut} className="p-2 min-w-full h-full focus:outline-none" onChange={(date)=>setValue("checkOut",date as Date)}
                selectsStart
                startDate={checkIn}
                endDate={checkOut}
                minDate={minDate}
                maxDate={maxDate}
                placeholderText="check in date"
                wrapperClassName="min-w-full"
                
                />

            </div>

            <div className="flex items-center justify-center bg-white px-2 py-1 gap-4 mt-3">
        <label className="items-center flex">
            Adult:
            <input type="number"  className="w-full p-1 focus:outline-none font-bold " min={1}
            max={20} 
            {...register("adultCount",{
                required:"This field is required",
                min:{
                    value:1,
                    message:" There must be at least one adult"
                },
                valueAsNumber:true
            })}
            />
            </label>
            
            {errors.childCount && (
                <span className="text-red-300 font-semibold text-sm">{errors.childCount.message}</span>
            )}
        <label className="items-center flex">
            Children:
            <input type="number"  className="w-full p-1 focus:outline-none font-bold " min={0}
            max={20}{...register("childCount",{
                required:"This field is required",
               
                valueAsNumber:true
            })}/>
            </label>
            {errors.adultCount && (
                <span className="text-red-300 font-semibold text-sm">{errors.adultCount.message}</span>
            )}
             </div>
             <div className="w-full flex justify-center items-center mt-2">

             {isLoggedIn ? (<button className="bg-blue-600  text-white p-2 font-bold hover:bg-blue-500">Book Now</button>):(<button className="bg-blue-600 text-white p-3 font-bold hover:bg-blue-500">Sign in to Book</button>)}
             </div>
        </form>
    </div>
  )
}

export default GuestInfo