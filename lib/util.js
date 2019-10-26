import fetch from 'isomorphic-unfetch';

export const fetchJson = async (url) => {
  const data = await (await fetch(url)).json();
  return data;
}
