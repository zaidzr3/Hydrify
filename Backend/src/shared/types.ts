export type UserType = {
    _id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  };
  
  export type BeverageType = {
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
    lastUpdated: Date;
  };
  
  export type OrderType = {
    _id: string;
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    adultCount: number;
    childCount: number;
    checkIn: Date;
    checkOut: Date;
    totalCost: number;
  };
  
  export type BeverageSearchResponse = {
    data: BeverageType[];
    pagination: {
      total: number;
      page: number;
      pages: number;
    };
  };