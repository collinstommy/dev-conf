import dotenv from 'dotenv'
import geocodeApi from '../../data/geocode-api';

dotenv.config();

export default async (req, res) => {
  const coordinates = geocodeApi(req.query.id);
  res.status(200).json(coordinates);
};
