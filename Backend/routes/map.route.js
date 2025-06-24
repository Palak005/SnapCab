import {Router} from "express"
import axios  from 'axios';
import mapController from "../controllers/map.controller.js";

const router = Router();

router.get("/autoSuggestion", mapController.getSuggestions);

router.post('/geoCoding', async(req, res) => {
    const {starting, destination} = req.body;

    if (!starting || !destination) {
      return res.status(400).json({ error: 'Starting and Destination Address is required' });
    }

    try {
      const Startcoord = await getGeocode(starting);
      const desCoord = await getGeocode(destination);

      const source = Startcoord.lat + "," + Startcoord.lon;
      const target = desCoord.lat + "," + desCoord.lon;

      const response = await axios.get("https://apis.mappls.com/advancedmaps/v2", {
        params : {
          source,
          target,
          costing : "auto",
          speedTypes : "predictive"
        }
      });

      res.json(coord);

    } catch (error) {
      console.error('Geocode API Error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

export default router;
