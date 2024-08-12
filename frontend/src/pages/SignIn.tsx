import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from '../api-client';
import { useAppContext } from "../contexts/AppContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

export type SignInFormData={
    email:string;
   password:string;
}
function SignIn() {
    const {showToast}=useAppContext();
    const navigate=useNavigate();
    const queryClient=useQueryClient();

    const location=useLocation()


    const {register, handleSubmit,formState: { errors }} =useForm<SignInFormData>();

    const mutation=useMutation(apiClient.signIn,{
        onSuccess:async ()=>{
           showToast({message:"sign in successfull",type:"SUCCESS"})
           await queryClient.invalidateQueries("validateToken")
           navigate(location.state?.from?.pathname || '/');
        },
        onError:(error:Error)=>{
            showToast({message:error.message,type:"ERROR"})

        }
    })
    const onSubmit=handleSubmit((data)=>{
        mutation.mutate(data);

    })
  return (
   <form onSubmit={onSubmit} action="" className=" flex flex-col gap-4">
    <h2 className="text-3xl font-bold"> Sign In </h2>
    <div>
          <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="email">Email</label>
          <input
            {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }, 
            minLength:{
              value:6,
              message:" password  must be at least 6 or more chracters"
            },
            })}
            type="email"
            id="email"
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="password">Password</label>
          <input
            {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
            type="password"
            id="password"
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>
        <span className="text-md">
          Not Registered? <Link className="underline hover:text-blue-400 text-lg" to="/register">Create Account</Link>
        </span>
        <button
          type="submit"
          className=" bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
         Login
        </button>

   </form>
  )
}

export default SignIn