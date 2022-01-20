import axios from "axios";

const instance = axios.create({ baseURL: "https://api.themoviedb.org/3" }); //base url to request movie database.

// instance.get("/api") looking like "https://api.themoviedb.org/3/api".

export default instance;
