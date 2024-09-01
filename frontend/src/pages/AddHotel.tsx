import { useMutation } from "react-query";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

function AddHotel() {
  const { showToast } = useAppContext();
  const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
    onSuccess: () => {
      showToast({ message: "Hotel Saved!", type: "SUCCESS" });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return (
    <div className="container mx-auto p-4 lg:p-8 bg-gradient-to-r from-orange-400 via-orange-500 to-purple-600 rounded-lg shadow-md">
      <h1 className="text-2xl lg:text-3xl font-extrabold text-white mb-6">Add New Hotel</h1>
      <ManageHotelForm onSave={handleSave} isLoading={isLoading} />
    </div>
  );
}

export default AddHotel;
