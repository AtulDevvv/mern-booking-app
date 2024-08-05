import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm"


function HotelDetailsSection() {
    const{ register ,formState:{errors}} = useFormContext<HotelFormData>()

  return (
    <div className=" flex flex-col gap-4">
        <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>
        <label className=" flex  flex-col mb-2 text-sm font-medium text-gray-700" htmlFor="email">Name
          <input
            {...register('name', { required: 'this field is required',
            })}
            type="text"

            className="w-1/3 p-2 border border-gray-300 rounded"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </label>
          <div className="w-full  gap-7 flex">

          <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="email">City
          <input
            {...register('city', { required: 'this field is required',
            })}
            type="text"

            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
          </label>

          <label className="block mb-2 text-sm font-medium text-gray-700" >Country
          <input
            {...register('country', { required: 'this field is required',
            })}
            type="text"

            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>}
          </label>

          </div>
          <label className="flex flex-col mb-2 text-sm font-medium text-gray-700" >Description
          <textarea
            {...register('description', { required: 'this field is required',
            })}
            rows={10}

            className="w-1/2 p-2 border border-gray-300 rounded"
          ></textarea>
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </label>

          <label className="flex flex-col mb-2 text-sm font-medium text-gray-700" >price Per Night
          <input
            {...register('pricePerNight', { required: 'this field is required',
            })}
            type="number"
            min={1}

            className="w-1/4 p-2 border border-gray-300 rounded"
          />
          {errors.pricePerNight && <p className="text-red-500 text-sm mt-1">{errors.pricePerNight.message}</p>}
          </label>

          <label className="flex flex-col mb-2 text-sm font-medium text-gray-700" >Star Rating
          <select {...register("starRating",{
            required:" This filed is required"
          })}  className=" border rounded w-1/4 p-2 text-gray-700 font-normal">
            <option value="" className="text-sm font-bold">
                Select as Rating
            </option>
            {[1,2,3,4,5].map((num)=>(
                <option value={num}>{num}</option>
            ))}
          </select>
          {errors.starRating && <p className="text-red-500 text-sm mt-1">{errors.starRating.message}</p>}
          </label>

    </div>
  )
}

export default HotelDetailsSection