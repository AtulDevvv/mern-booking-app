
import { useForm, SubmitHandler } from 'react-hook-form';
import {useMutation, useQueryClient} from 'react-query'
import * as apiClient from '../api-client';
import { useAppContext } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';

 export type FormValues = {
  firstName: string;
  lastName: string;
 
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const navigate= useNavigate();
  const queryClient=useQueryClient();
  
  const {showToast}=useAppContext()
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>();

  const mutation =useMutation(apiClient.regsiter,{
    onSuccess:async ()=>{
    showToast({message:"Registration Success",type:"SUCCESS"})
    await queryClient.invalidateQueries("validateToken")
    navigate("/")
    },
    onError:(error:Error)=>{
      showToast({message:error.message,type:"ERROR"})
    }
  })
  
  const onSubmit: SubmitHandler<FormValues> = data => {
    mutation.mutate(data)
    console.log(data);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form 
        className="bg-white p-8 rounded shadow-md w-full max-w-lg flex flex-col gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-3xl font-bold text-center mb-6">Create an Account</h2>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full">
            <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="firstName">First Name</label>
            <input
              {...register('firstName', { required: 'First Name is required' })}
              type="text"
              id="firstName"
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
          </div>

          <div className="w-full">
            <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="lastName">Last Name</label>
            <input
              {...register('lastName', { required: 'Last Name is required' })}
              type="text"
              id="lastName"
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
          </div>
        </div>

       
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

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="confirmPassword">Confirm Password</label>
          <input
            {...register('confirmPassword', { required: 'Please confirm your password', validate: value => value === watch('password') || 'Passwords do not match' })}
            type="password"
            id="confirmPassword"
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
