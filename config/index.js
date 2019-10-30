
const isDev = process.env.NODE_ENV !== 'production';

export const serverUrl = isDev ? 'http://localhost:3000/api' : 'https://tcollins.xyz/api';

export const conferencesEndPoint = `${serverUrl}/conferences`;
export const locationEndPoint = `${serverUrl}/conferences`;

