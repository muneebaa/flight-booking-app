import API from 'global/config/api';

export const getAllPlaces = async () => {
  try {
    const response = await API.get('/places');
    // response.headers.add('Access-Control-Allow-Origin', '*');
    return response;
  } catch (error) {
    throw error.response;
  }
};

export const getPlaceFlight = async (id) => {
  try {
    const response = await API.get(`/places/${id}/flight`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error.response;
  }
};

// export const signUp = async (data) => {
//   try {
//     const response = await API.post('auth/users/', data);
//     return response;
//   } catch (error) {
//     throw error.response;
//   }
// };
