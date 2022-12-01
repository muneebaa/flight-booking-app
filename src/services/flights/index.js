import API from 'global/config/api';

export const getAllFlights = async () => {
  try {
    const response = await API.get('/flights', {
      credentials: 'include',
      withCredentials: true,
    });
    // response.headers.add('Access-Control-Allow-Origin', '*');
    return response;
  } catch (error) {
    throw error.response;
  }
};

export const createFlight = async (data) => {
  try {
    const response = await API.post('/flights', data, {
      credentials: 'include',
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error.response;
  }
};

export const updateFlight = async (data, id) => {
  try {
    const response = await API.patch(`/flights/${id}`, data, {
      credentials: 'include',
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error.response;
  }
};

export const deleteFlight = async (id) => {
  try {
    const response = await API.delete(`/flights/${id}`, {
      credentials: 'include',
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error.response;
  }
};
