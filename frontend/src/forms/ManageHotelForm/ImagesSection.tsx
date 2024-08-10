import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm";
import React from "react";


function ImagesSection() {
    const {register,watch,formState:{errors},setValue}=useFormContext<HotelFormData>();
    const existingImageUrls=watch("imageUrls");

    const handleDelete=(event:React.MouseEvent<HTMLButtonElement,MouseEvent>,imageUrl:string)=>{
        event.preventDefault();
        setValue("imageUrls",existingImageUrls.filter((url)=>url!=imageUrl))

    }
  return (
    <div>
        <h2 className="text-2xl font-bold mb-3"> Images</h2>
        <div className="border rounded p-4 flex flex-col gap-4">
            {
                existingImageUrls && (
                    <div className="grid grid-cols-6 gap-4">{existingImageUrls.map((url)=>(
                        <div className="relative group">
                            <img src={url}  className="min-h-full object-cover"alt="" />
                            <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 w-full text-white text-lg font-bold " 
                            onClick={(event)=>handleDelete(event,url)}
                            >Delete</button>
                        </div>
                    ))}</div>
                )
            }
        <input type="file" 
        multiple
        accept="image/*"
        className="w-full text-gray-700 font-normal"
        {...register("imageFiles",{
            validate:(imageFiles)=>{
                const totalLength=imageFiles.length+ (existingImageUrls?.length || 0);;
                if(totalLength>6){
                    return " Total number of images cannot be more than 6";
                }
                if(totalLength ===0){
                    return " At least one image should be added";
                }
                return true;
            }
        })}
         />

        </div>
        {errors.imageFiles && (
            <span className="text-sm font-bold text-red-300">{errors.imageFiles.message}</span>
        )}
    </div>
  )
}

export default ImagesSection