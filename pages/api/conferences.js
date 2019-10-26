
import GithubAPI from '../../lib/github-api';
import geocodeApi from '../../lib/geocode-api';

const GITHUB_DETAILS = {
  owner: 'tech-conferences',
  repo: 'conference-data',
  dataFolderPath: 'conferences/2020',
};

const getConferences = async () => {
  const api = new GithubAPI(GITHUB_DETAILS.owner, GITHUB_DETAILS.repo);
  const attachIdToRequest = ({ path, name }) => {
    return api.getJsonFromFile(path)
      .then(function (data) {
        return {
          data,
          id: name.replace('.json', ''),
        };
      });
  };
  const fileList = await api.getFilesNameFromDirectory(GITHUB_DETAILS.dataFolderPath);
  const fileRequests = fileList.map(attachIdToRequest);
  return Promise.all(fileRequests);
};

export default async (req, res) => {
  const conferenceData = await getConferences();
  const withLanguage = conferenceData.reduce((result, byLanguage) => {
    const withLanguage = byLanguage.data.map(item => ({ ...item, language: byLanguage.id }));
    return result.concat(withLanguage);
  }, []);
 
  const locations = withLanguage.map(({ city, country }) => `${city},${country}`);
  const locationDict = await geocodeApi(Array.from(new Set(locations)));

  const withCoordinates = withLanguage.map(conf => {
    const { city, country } = conf;
    const { coordinates } = locationDict.find(loc => loc.id === `${city},${country}`)
    return {
      ...conf,
      coordinates
    }
  });
  res.status(200).json(withCoordinates);
};
