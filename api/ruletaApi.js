import axios from "axios";

const ruletaApi = axios.create({
  baseURL: "/api",
});

export default ruletaApi;
