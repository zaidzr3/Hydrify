import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
import {BeverageType} from '../../Backend/src/models/beverage'
import { BeverageSearchResponse } from "../../backend/src/shared/types";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
export const register = async (formData: RegisterFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/users/register`,{
        method: "POST",
        credentials: "include",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });


    const responseBody =await response.json();

    if(!response.ok){
        throw new Error(responseBody.message);
    }
};

export const signIn = async(formData: SignInFormData)=>{
    const response = await fetch(`${API_BASE_URL}/api/auth/login`,{
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    const body = await response.json();
    if(!response.ok){
        throw new Error(body.message);
    }
    return body;
}


export const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`,
     {credentials: "include"
    })

    if(!response.ok){
        throw new Error("Token invalid");
    }

    return response.json();
};


export const signOut = async ()=>{
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`,{
        credentials : "include",
        method: "POST"
    });

    if(!response.ok){
        throw new Error("Error during sign out");
    }
}

export const addMyBeverage = async (beverageFormData: FormData)=>{
    const response = await fetch(`${API_BASE_URL}/api/my-beverages`, {
        method: "POST",
        credentials: "include",
        body: beverageFormData,
    });

    if(!response.ok){
        throw new Error("Failed to add the beverage");
    }

    return response.json();
}

export const fetchMyBeverages = async (): Promise<BeverageType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/my-beverages`,{
    credentials: "include"
    });

    if(!response.ok){
        throw new Error("Error fetching Beverages");
    }

    return response.json();
}

export const fetchMyBeverageById = async (beverageId: string): Promise<BeverageType>=>{
    const response = await fetch(`${API_BASE_URL}/api/my-beverages/${beverageId}`, {
        credentials: "include"
    });

    if(!response.ok){
        throw new Error("Error fetching Beverages");
    }

    return response.json();
}

export const updateMyBeverageById = async(beverageFormData: FormData)=>{
    const response = await fetch(`${API_BASE_URL}/api/my-beverages/${beverageFormData.get("beverageId")}`,{
        method: "PUT",
        body: beverageFormData,
        credentials: "include"
    });

    if(!response.ok){
        throw new Error("Failed to update Beverages");
    }

    return response.json();
};

export type SearchParams = {
    name?: string;
    seller?: string;
    caloriesPerServing?: string;
    page?: string;
    nutritionalFacts?: string[];
    flavors?: string[];
    stars?: string[];
    maxPrice?: string;
    sortOption?: string;
};


export const searchBeverages = async (
    searchParams: SearchParams
  ): Promise<BeverageSearchResponse> => {
    const queryParams = new URLSearchParams();
    queryParams.append("name", searchParams.name || "");
    queryParams.append("seller", searchParams.seller || "");
    queryParams.append("caloriesPerServing", searchParams.caloriesPerServing || "");
    queryParams.append("page", searchParams.page || "");
  
    queryParams.append("maxPrice", searchParams.maxPrice || "");
    queryParams.append("sortOption", searchParams.sortOption || "");
  
    searchParams.nutritionalFacts?.forEach((nutritionalFact) =>
      queryParams.append("nutritionalFacts", nutritionalFact)
    );
  
    searchParams.flavors?.forEach((flavor) => queryParams.append("flavors", flavor));
    searchParams.stars?.forEach((star) => queryParams.append("stars", star));
  
    const response = await fetch(
      `${API_BASE_URL}/api/beverages/search?${queryParams}`
    );
  
    if (!response.ok) {
      throw new Error("Error fetching beverages");
    }
  
    return response.json();
  };
  
  export const fetchBeverages = async (): Promise<BeverageType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/beverages`);
    if (!response.ok) {
      throw new Error("Error fetching beverges");
    }
    return response.json();
  };
  
  export const fetchBeverageById = async (beverageId: string): Promise<BeverageType> => {
    const response = await fetch(`${API_BASE_URL}/api/beverages/${beverageId}`);
    if (!response.ok) {
      throw new Error("Error fetching Beverages");
    }
  
    return response.json();
  };