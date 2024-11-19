// const apiUrl = import.meta.env.VITE_API_URL;


// export const fetchData = async (endpoint, options = {}) => {
//   const response = await fetch(`${apiUrl}${endpoint}`, options);
//   if (!response.ok) {
//     throw new Error('Network response was not ok');
//   }
//   return response.json();
// };


const apiUrl = "https://cktalkfusion-backend.onrender.com";
// Function to make API calls (optional wrapper)
export const fetchAPI = async (endpoint, options = {}) => {
  const response = await fetch(`${apiUrl}/${endpoint}`, options);

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }

  return response; // Parse JSON response
};

export default apiUrl;
