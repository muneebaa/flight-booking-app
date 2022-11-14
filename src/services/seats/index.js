import API from 'global/config/api';

export const getAllSeats = async () => {
  try {
    const response = await API.get('/flightseats');
    // response.headers.add('Access-Control-Allow-Origin', '*');
    return response;
  } catch (error) {
    throw error.response;
  }
};

export const updateBookFlight = async (id) => {
  try {
    const response = await API.patch(
      `/flightseats/${id}`,
      { booked: true },
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    throw error.response;
  }
};
