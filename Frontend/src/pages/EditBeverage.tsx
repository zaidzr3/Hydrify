import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import ManageBeverageForm from "../forms/ManageBeverageForm/ManageBeverageForm";
import { useAppContext } from "../contexts/AppContext";

const EditBeverage = () => {
  const { beverageId } = useParams();
  const { showToast } = useAppContext();

  const { data: beverage } = useQuery(
    "fetchMyBeverageById",
    () => apiClient.fetchMyBeverageById(beverageId || ""),
    {
      enabled: !!beverageId,
    }
  );

  const { mutate, isLoading } = useMutation(apiClient.updateMyBeverageById, {
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

  return (
    <ManageBeverageForm beverage={beverage} onSave={handleSave} isLoading={isLoading} />
  );
};

export default EditBeverage;