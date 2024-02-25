import { useMutation } from "react-query";
import ManageBeverageForm from "../forms/ManageBeverageForm/ManageBeverageForm";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";

const AddBeverage = () => {
  const { showToast } = useAppContext();

  const { mutate, isLoading } = useMutation(apiClient.addMyBeverage, {
    onSuccess: () => {
      showToast({ message: "Beverage Saved!", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Error Saving Beverage", type: "ERROR" });
    },
  });

  const handleSave = (beverageFormData: FormData) => {
    mutate(beverageFormData);
  };

  return <ManageBeverageForm onSave={handleSave} isLoading={isLoading} />;
};

export default AddBeverage;