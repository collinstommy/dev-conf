import fetch from 'isomorphic-unfetch';
import Redis from 'ioredis';

export default async (url, cacheKey) => {
  const { REDIS_PORT, REDIS_HOST } = process.env;
  const redis = new Redis({
    port: REDIS_PORT,
    host: REDIS_HOST,
  });
  console.log('Connecting to redis', REDIS_PORT, REDIS_HOST);
  
  const lookupKey = cacheKey || url;
  const cachedValue = await redis.get(lookupKey);
  if (!cachedValue) {
    const data = await(await fetch(url)).json();
    await redis.set(lookupKey, JSON.stringify(data));
    return data;
  }
  return JSON.parse(cachedValue);
}

