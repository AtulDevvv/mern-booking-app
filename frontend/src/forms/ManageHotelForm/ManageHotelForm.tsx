import { FormProvider, useForm } from "react-hook-form";
import HotelDetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestSection from "./GuestSection";
import ImagesSection from "./ImagesSection";
import { HotelTypes } from "../../../../Bakend/src/shared/types";
import { useEffect } from "react";

 export type HotelFormData={
  name:string,
  city:string,
  country:string;
  description:string;
  type:string;
  pricePerNight:number;
  starRating:number;
  facilities:string[];
  imageFiles:FileList;
  imageUrls:string[];
  adultCount:number;
  childCount:number;

 }
 type Props={
  hotel?:HotelTypes;
  onSave:(hotelFormData:FormData)=>void;
  isLoading:boolean;
 }

function ManageHotelForm({onSave,isLoading,hotel}:Props) {

  const formMethods= useForm<HotelFormData>();
  const {handleSubmit,reset} =formMethods;
useEffect(()=>{
  reset(hotel);
},[hotel,reset])

  const onSubmit=handleSubmit((formDataJson:HotelFormData)=>{

    // create new formData object & call our api
   const formData= new FormData();
if(hotel){
  formData.append("hotelId",hotel._id);
}

   formData.append("name",formDataJson.name)
   formData.append("city",formDataJson.city)
   formData.append("country",formDataJson.country)
   formData.append("description",formDataJson.description)
   formData.append("type",formDataJson.type)
   formData.append("pricePerNight",formDataJson.pricePerNight.toString())
   formData.append("starRating",formDataJson.starRating.toString())
   formData.append("adultCount",formDataJson.adultCount.toString())
   formData.append("childCount",formDataJson.adultCount.toString())

   formDataJson.facilities.forEach((facility,index)=>{
    formData.append(`facilities[${index}]`,facility)
   })
   if(formDataJson.imageUrls){
      formDataJson.imageUrls.forEach((url,index)=>{
        formData.append(`imageUrls[${index}]`,url)
      })
    }
   Array.from(formDataJson.imageFiles).forEach((imageFile)=>{
    formData.append(`imageFiles`, imageFile)
   })
   
   onSave(formData)
   
  })

  return (
   <FormProvider {...formMethods}>
    <form  onSubmit={onSubmit}>
      <HotelDetailsSection/>
      <TypeSection/>
      <FacilitiesSection/>
      <GuestSection/>
      <ImagesSection/>
      <span className="flex justify-end ">
        <button type="submit" className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl  disabled:bg-gray-500" disabled={isLoading}> 
         {isLoading ?"Saving":"Save"}
          </button>
      </span>
    </form>
   </FormProvider>
  )
}

export default ManageHotelForm