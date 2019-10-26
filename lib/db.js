import fetch from 'isomorphic-unfetch';
import Redis from 'ioredis';

export default async (url, cacheKey) => {
  const redis = new Redis();
  const lookupKey = cacheKey || url;
  const cachedValue = await redis.get(lookupKey);
  if (!cachedValue) {
    const data = await(await fetch(url)).json();
    await redis.set(lookupKey, JSON.stringify(data));
    return data;
  }
  return JSON.parse(cachedValue);
}

