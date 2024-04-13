import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import FlavorSection from "./FlavorSection";
import NutritionalFactsSection from "./NutritionalFactsSection";
import CaloriesSection from "./CaloriesSection";
import ImagesSection from "./ImagesSection";
import { BeverageType } from "../../../../Backend/src/models/beverage";
import { useEffect } from "react";



export type BeverageFormData = {
  _id: string;
  userId: string;
  name: string;
  foodType: string;
  country: string;
  description: string;
  flavor: string;
  numberOfServings: number;
  caloriesPerServing: number;
  nutritionalFacts: string[];
  price: number;
  starRating: number;
  imageUrls: string[];
  imageFiles: FileList;
  lastUpdated: Date;
  seller: string;
  dietType: string;
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
      formData.append("foodType", formDataJson.foodType);
      formData.append("country", formDataJson.country);
      formData.append("description", formDataJson.description);
      formData.append("flavor", formDataJson.flavor);
      formData.append("price", formDataJson.price.toString());
      formData.append("starRating", formDataJson.starRating.toString());
      formData.append("numberOfServings", formDataJson.numberOfServings.toString());
      formData.append("caloriesPerServing", formDataJson.caloriesPerServing.toString());
      formData.append("seller", formDataJson.seller);
      formData.append("dietType", formDataJson.dietType);
  
      formDataJson.nutritionalFacts.forEach((nutritionalFact, index) => {
        formData.append(`nutritionalFacts[${index}]`, nutritionalFact);
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
          <FlavorSection />
          <NutritionalFactsSection />
          <CaloriesSection />
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