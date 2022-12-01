import API from 'global/config/api';

export const postBookFlight = async (data) => {
  try {
    const response = await API.post('/bookflight', data, {
      withCredentials: true,
      // credentials: 'same-origin',
    });
    return response;
  } catch (error) {
    throw error.response;
  }
};

export const userBookedFlight = async () => {
  try {
    const response = await API.get('/bookflight/booked', {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error.response;
  }
};

export const deleteBookedFlight = async (id) => {
  try {
    const response = await API.delete('/bookflight', id, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error.response;
  }
};
