import { useMutation, useQueryClient } from "react-query"

import  * as apiClient from '../api-client';
import { useAppContext } from "../contexts/AppContext";


function SignOutButton() {
    const queryClient=useQueryClient()
    const {showToast} = useAppContext();

    const mutation=useMutation(apiClient.signOut,{
        onSuccess: async ()=>{
            await queryClient.invalidateQueries("validateToken")
            showToast({message:"Successfully logout",type:"SUCCESS"})
        },
        onError:(error:Error)=>{
            showToast({message:error.message,type:"ERROR"})
        }
    })
    const handleClick=()=>{
        mutation.mutate();
    }
  return (
   <button className=" text-blue-600 px-4 py-2 font-bold bg-white hover:bg-gray-100" onClick={handleClick}>SignOut</button>
  )
} 

export default SignOutButton