import { FormProvider, useForm } from "react-hook-form";
import HotelDetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestSection from "./GuestSection";
import ImagesSection from "./ImagesSection";

 export type HotelFormData={
  name:string,
  city:string,
  country:string;
  description:string;
  type:string;
  pricePerNight:string;
  starRating:number;
  facilities:string[];
  imageFiles:FileList;
  adultCount:number;
  childCount:number;

 }
 type Props={
  onSave:(hotelFormData:FormData)=>void;
  isLoading:boolean;
 }

function ManageHotelForm({onSave,isLoading}:Props) {

  const formMethods= useForm<HotelFormData>();
  const {handleSubmit} =formMethods;
  const onSubmit=handleSubmit((formDataJson:HotelFormData)=>{
    // create new formData object & call our api
   const formData= new FormData();

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