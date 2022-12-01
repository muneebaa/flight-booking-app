import API from 'global/config/api';

export const getAllSeats = async () => {
  try {
    const response = await API.get('/flightseats', {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error.response;
  }
};

export const getFlightSeats = async (id) => {
  try {
    const response = await API.get(`/flights/${id}/seats`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error.response;
  }
};

export const createSeat = async (data) => {
  try {
    const response = await API.post('/flightseats', data, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error.response;
  }
};

export const deleteSeat = async (data) => {
  try {
    const response = await API.delete(`/flightseats/${data}`, {
      withCredentials: true,
    });
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

export const updateSeat = async (data, id) => {
  try {
    const response = await API.patch(`/flightseats/${id}`, data, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error.response;
  }
};
