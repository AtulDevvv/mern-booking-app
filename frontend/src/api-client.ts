import { FormValues } from "./pages/Register"
import { SignInFormData } from "./pages/SignIn";
import { PaymentIntentResponse, UserType } from "../../Bakend/src/shared/types";

import {HotelSearchResponse, HotelTypes} from "../../Bakend/src/shared/types";
import { BookingFormData } from "./forms/BookingForm/BookingForm";

const API_BASE_URL= import.meta.env.VITE_API_BASE_URL || '';

 export const  fetchCurrentUser= async():Promise<UserType>=>{
    const response= await fetch(`${API_BASE_URL}/api/users/me`,{
        credentials:"include",

    })
    if(!response.ok){
        throw new Error("Errror fecthing user")
    }

    return response.json();
 }
export const regsiter =async (formData:FormValues)=>{
    const response=await fetch(`${API_BASE_URL}/api/users/register`,{
        method:"POST",
        credentials:"include",
        
        headers:{
            "content-Type":"application/json",
        },
        body:JSON.stringify(formData),


    });
    const responseBody=await response.json();
    if(!response.ok){
        throw new Error(responseBody.message);
    }

}

export const validateToken=async ()=>{
     const response=await fetch(`${API_BASE_URL}/api/auth/validate-token`,{
        credentials:"include"
     });
     if(!response.ok){
        throw new Error ("Token invalid")
     }
     return response.json();
}

export const signIn= async (formData:SignInFormData)=>{
    const response= await fetch (`${API_BASE_URL}/api/auth/login`,{
        method:"POST",
        credentials:"include",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(formData)
         
    });
    const body= await response.json();

    if(!response.ok){
        throw new Error(body.message);


    }
    return body;
}

export const signOut=async ()=>{
    const response =await fetch(`${API_BASE_URL}/api/auth/logout`,{
        credentials:"include",
        method:"POST",

    })
    if(!response){
        throw new Error(" Error during sign out");
        
    }
    // return response.json(); 
}

 export const addMyHotel=async (hotelFormData:FormData)=>{
const response =await fetch (`${API_BASE_URL}/api/my-hotels`,{
    method:"POST",
    credentials:"include",
    body:hotelFormData,

});
if(!response.ok){
    throw new Error("Failed to add hotel");
}
return response.json();

}

export const fetchMyHotels=async ():Promise<HotelTypes[]>=>{
     const response= await fetch(`${API_BASE_URL}/api/my-hotels`,{
        credentials:"include",

     });
      if(!response.ok){
        throw new Error(" Error fecthing hotels")
      }
      return response.json();
}

export const fetchMyHotelById= async (hotelId:string):Promise<HotelTypes>=>{
    const response= await fetch (`${API_BASE_URL}/api/my-hotels/${hotelId}`,{
       credentials:"include",

    })
    if(!response.ok){
        throw new Error ("Error fetching Hotels")
    }
     return response.json()
}

export const updateMyHotelById= async (hotelFormData:FormData)=>{
     const response= await fetch(`${API_BASE_URL}/api/my-hotels/${hotelFormData.get("hotelId")}`,{
        method:"PUT",
        body:hotelFormData,
        credentials:"include",
     });

     if(!response.ok){
        throw new Error("Failed to update Hotel");
     }

     return response.json();
}

export type searchParams={
    destination:string;
    checkIn:string;
    checkOut:string;
    adultCount:string;
    childCount:string;
    page?:string;
    facilities?:string[];
    types?:string[];
    stars?:string[];
    maxPrice?:string;
    sortOptions?:string;


}
export const searchHotels=async (searchParams:searchParams):Promise<HotelSearchResponse>=>{
const queryParams=new URLSearchParams();
queryParams.append("destination", searchParams.destination||"");
queryParams.append("checkIn", searchParams.checkIn || "");
queryParams.append("checkOut", searchParams.checkOut|| "");
queryParams.append("adultCount", searchParams.adultCount|| "");
queryParams.append("childCount", searchParams.childCount|| "");
queryParams.append("page", searchParams.page|| "");

queryParams.append("maxPrice", searchParams.maxPrice||"");
queryParams.append("sortOptions", searchParams.sortOptions|| "");

searchParams.facilities?.forEach((facility)=>{
    queryParams.append("facilities",facility)
})

searchParams.types?.forEach((type)=>queryParams.append("types",type))
searchParams.stars?.forEach((star)=>queryParams.append("stars",star))

const response= await fetch(`${API_BASE_URL}/api/hotels/search?${queryParams}`);
if(!response){
    throw new Error("Error fetching hotels")
}
return response.json();

}

export const fetchHotelById= async (hotelId:string):Promise<HotelTypes>=>{
    const response=await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`);
    if(!response.ok){
        throw new Error("Error fecthing Hotels")

    }
    return response.json();

}

export const createPaymentIntent= async(hotelId:string,numberOfNights:string):Promise<PaymentIntentResponse>=>{
    const response =await fetch(`${API_BASE_URL}/api/hotels/${hotelId}/bookings/payment-intent`,{
        credentials:"include",
        method:"POST",
        body:JSON.stringify({numberOfNights}),
        headers:{
            "Content-type":"application/json",
        }

    })
    if(!response.ok){
        throw new Error ("Error fecthing payment intent")
    }
    return response.json();
}

export const createRoomBooking= async (formData:BookingFormData)=>{
    const respone= await fetch(`${API_BASE_URL}/api/hotels/${formData.hotelId}/bookings`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        credentials:"include",
        body:JSON.stringify(formData)
    })
    if(!respone.ok){
        throw new Error(" Error booking Room ")
    }
    console.log("yews i'm running")
}

export const fetchMyBookings=async():Promise<HotelTypes[]>=>{
    const response= await fetch(`${API_BASE_URL}/api/my-bookings`,{
        credentials:"include",

    });
    if(!response.ok){
        throw new Error("Unable to fetch bookings")

    }
    return response.json()
}

export const fecthHotels= async():Promise<HotelTypes[]>=>{
    const response= await fetch(`${API_BASE_URL}/api/hotels`);
    if(!response.ok){
        throw new Error ("Error fetching hotels");

    }
    return response.json();

}