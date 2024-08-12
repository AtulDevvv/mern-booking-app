import { useQuery } from "react-query";
import * as apiClient from "./../api-client";
import BookingForm from "../forms/BookingForm/BookingForm";
import { useSearchContext } from "../contexts/SearchContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookingDetailSummary from "../Components/BookingDetailSummary";
import { Elements } from "@stripe/react-stripe-js";
import { useAppContext } from "../contexts/AppContext";



function Booking() {
    const search= useSearchContext();
    const {stripePromise}=useAppContext();

    const {hotelId}= useParams();

    const [numberOfNights ,setNumberOfNights]=useState<number>(0)

    
    useEffect(()=>{
        if(search.checkIn && search.checkOut){
            const nights=Math.abs((search.checkIn.getTime()-search.checkOut.getTime())/(1000*60*60*24))

            setNumberOfNights(Math.ceil(nights))
        }
    },[search.checkIn,search.checkOut])


    const {data:paymentIntentData} = useQuery("createPaymentIntent",()=>
        apiClient.createPaymentIntent(hotelId as string, numberOfNights.toString())
    ,{
        enabled:!!hotelId && numberOfNights>0
    })

    const {data:hotel} = useQuery('fetchHotelById',()=>apiClient.fetchHotelById(hotelId as string),
{
    enabled : !! hotelId
})
        
    const {data:currentUser}= useQuery("fetchCurrentUser",apiClient.fetchCurrentUser)
    
  return (
    <div className="grid md:grid-cols-[1fr_2fr]">
        <div className="bg-green-200 "> 
            {
      hotel &&  (        
         <BookingDetailSummary checkIn={search.checkIn} checkOut={search.checkOut} adultCount={search.adultCount} childCount={search.childCount} numberOfNights={numberOfNights} hotel={hotel}/>)
            }
            </div>
        {
            currentUser && paymentIntentData &&(
                <Elements stripe={stripePromise} options={{clientSecret:paymentIntentData.clientSecret}}   >
            <BookingForm currentUser={currentUser} paymentIntent={paymentIntentData}/>
            </Elements>
            )
        }
       
    </div>
  )
}

export default Booking