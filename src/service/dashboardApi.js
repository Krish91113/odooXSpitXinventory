import React from 'react';
  
  const DashboardApi = () =>  {
	return (
	  <div>
	  </div>
	);
  }
  
  export default DashboardApi;
  import React from 'react';
  
  const DashboardApi = () =>  {
	return (
	  <div>
	  </div>
	);
  }
  
  export default DashboardApi;
  import axios from "axios";

axios.defaults.withCredentials = true;

const API = "http://localhost:8080/api/dashboard";

export const getDashboardStats = async () => {
  const res = await axios.get(`${API}/stats`);
  return res.data;
};
