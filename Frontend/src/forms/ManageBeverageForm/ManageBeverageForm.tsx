import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import { BeverageType } from "../../../../Backend/src/models/beverage";
import { useEffect } from "react";


export type BeverageFormData = {
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    pricePerNight: number;
    starRating: number;
    facilities: string[];
    imageFiles: FileList;
    imageUrls: string[];
    adultCount: number;
    childCount: number;
}

type Props = {
    beverage?: BeverageType;
    onSave: (beverageFormData: FormData) => void;
    isLoading: boolean;
  };
  
  const ManageBeverageForm = ({ onSave, isLoading, beverage} : Props) => {
    const formMethods = useForm<BeverageFormData>();
    const { handleSubmit, reset} = formMethods;

    useEffect(()=>{
        reset(beverage);
    }, [beverage, reset]);
  
  
    const onSubmit = handleSubmit((formDataJson: BeverageFormData) => {
      const formData = new FormData();
      if(beverage){
        formData.append("beverageId", beverage._id);
      }
      
      formData.append("name", formDataJson.name);
      formData.append("city", formDataJson.city);
      formData.append("country", formDataJson.country);
      formData.append("description", formDataJson.description);
      formData.append("type", formDataJson.type);
      formData.append("pricePerNight", formDataJson.pricePerNight.toString());
      formData.append("starRating", formDataJson.starRating.toString());
      formData.append("adultCount", formDataJson.adultCount.toString());
      formData.append("childCount", formDataJson.childCount.toString());
  
      formDataJson.facilities.forEach((facility, index) => {
        formData.append(`facilities[${index}]`, facility);
      });
      

      if(formDataJson.imageUrls){
        formDataJson.imageUrls.forEach((url, index)=>{
            formData.append(`imageUrls[${index}]`, url);
        })
      }
  
      Array.from(formDataJson.imageFiles).forEach((imageFile) => {
        formData.append(`imageFiles`, imageFile);
      });
  
      onSave(formData);
    });
  
    return (
      <FormProvider {...formMethods}>
        <form className="flex flex-col gap-10" onSubmit={onSubmit}>
          <DetailsSection />
          <TypeSection />
          <FacilitiesSection />
          <GuestsSection />
          <ImagesSection />
          <span className="flex justify-end">
            <button
              disabled={isLoading}
              type="submit"
              className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500"
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </span>
        </form>
      </FormProvider>
    );
  };
  
  export default ManageBeverageForm;