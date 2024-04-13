import express, { Request, Response } from "express";
import Beverage from "../models/beverage";
import { OrderType, BeverageSearchResponse } from "../shared/types";
import { param, validationResult } from "express-validator";
import verifyToken from "../middleware/auth";

const router = express.Router();

router.get("/search", async (req: Request, res: Response) => {
  try {
    const query = constructSearchQuery(req.query);

    let sortOptions = {};
    switch (req.query.sortOption) {
      case "starRating":
        sortOptions = { starRating: -1 };
        break;
      case "priceAsc":
        sortOptions = { price: 1 };
        break;
      case "priceDesc":
        sortOptions = { price: 1 };
        break;
    }

    const pageSize = 5;
    const pageNumber = parseInt(
      req.query.page ? req.query.page.toString() : "1"
    );
    const skip = (pageNumber - 1) * pageSize;

    const beverages = await Beverage.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize);

    const total = await Beverage.countDocuments(query);

    const response: BeverageSearchResponse = {
      data: beverages,
      pagination: {
        total, 
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      },
    };

    res.json(response);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const beverages = await Beverage.find().sort("-lastUpdated");
    res.json(beverages);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error fetching beverages" });
  }
});

router.get(
  "/:id",
  [param("id").notEmpty().withMessage("Beverage ID is required")],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.id.toString();

    try {
      const beverage = await Beverage.findById(id);
      res.json(beverage);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error fetching beverage" });
    }
  }
);

const constructSearchQuery = (queryParams: any) => {
  let constructedQuery: any = {};

  if (queryParams.name) {
    constructedQuery.$or = [
      { name: new RegExp(queryParams.name, "i") },
    ];
  }

  if (queryParams.seller) {
    constructedQuery.seller = {
      $gte: parseInt(queryParams.seller),
    };
  }

  if (queryParams.caloriesPerServing) {
    constructedQuery.caloriesPerServing = {
      $gte: parseInt(queryParams.caloriesPerServing),
    };
  }

  if (queryParams.nutritionalFacts) {
    constructedQuery.nutritionalFacts = {
      $all: Array.isArray(queryParams.nutritionalFacts)
        ? queryParams.nutritionalFacts
        : [queryParams.nutritionalFacts],
    };
  }

  if (queryParams.flavors) {
    constructedQuery.flavor = {
      $in: Array.isArray(queryParams.flavors)
        ? queryParams.flavors
        : [queryParams.flavors],
    };
  }

  if (queryParams.stars) {
    const starRatings = Array.isArray(queryParams.stars)
      ? queryParams.stars.map((star: string) => parseInt(star))
      : parseInt(queryParams.stars);

    constructedQuery.starRating = { $in: starRatings };
  }

  if (queryParams.maxPrice) {
    constructedQuery.pricePerNight = {
      $lte: parseInt(queryParams.maxPrice).toString(),
    };
  }

  return constructedQuery;
};

export default router;