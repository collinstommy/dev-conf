/* global process */
import getJson from './db';
import dotenv from 'dotenv'

dotenv.config();

const getCoordinates = location => {
  const geoCodeApi = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}`;
  const url = `${geoCodeApi}&key=${process.env.GOOGLE_MAPS_API}`;
  return getJson(encodeURI(url), geoCodeApi);
};

export default async (locations) => {
  const attachPlaceToRequest = id => {
    return getCoordinates(id)
      .then(function (data) {
        const found = data && data.results.length
        const coordinates = found && data.results[0].geometry.location;
        return {
          id,
          coordinates
        };
      });
  };

  const locationRequests = locations.map(attachPlaceToRequest);
  return Promise.all(locationRequests);
};
