import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm"


function GuestSection() {
    const {register,formState:{errors}} =useFormContext<HotelFormData>()

  return (
    <div>
        <h2 className=" text-2xl font-bold "> Guests</h2>
        <div className="grid grid-cols-2 gap-5 p-6 bg-gray-300 ">
            <label className="text-gray-700 text-sm font-semibold">
                Adults
                <input type="number" 
                className="border rounded w-full py-2 px-3 font-normal"
                min={1} 
                
                {...register("adultCount",{
                    required:" This Field is required"
                 })}
                />
            
            {
                errors.adultCount && (
                    <span className="text-sm font-bold text-red-300">{errors.adultCount.message}</span>
                )
            }
            </label>

            <label className="text-gray-700 text-sm font-semibold">
                Children
                <input type="number" 
                className="border rounded w-full py-2 px-3 font-normal"
                min={1} 
                
                {...register("childCount",{
                    required:" This Field is required"
                 })}
                />
            
            {
                errors.childCount && (
                    <span className="text-sm font-bold text-red-300">{errors.childCount.message}</span>
                )
            }
            </label>

        </div>
    </div>
  )
}

export default GuestSection