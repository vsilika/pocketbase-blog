import PocketBase from 'pocketbase';
const apiURL = import.meta.env.VITE_APP_API_URL;
const pb  = new PocketBase(apiURL);
export default pb;
