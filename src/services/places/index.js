import API from 'global/config/api';

export const getAllPlaces = async () => {
  try {
    const response = await API.get('/places', {
      credentials: 'include',
      withCredentials: true,
    });
    // response.headers.add('Access-Control-Allow-Origin', '*');
    return response;
  } catch (error) {
    throw error.response;
  }
};

export const getPlaceFlight = async (id) => {
  try {
    const response = await API.get(`/places/${id}/flight`, {
      credentials: 'include',
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error.response;
  }
};

export const createPlace = async (data) => {
  try {
    const response = await API.post('/places', data, {
      credentials: 'include',
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error.response;
  }
};

export const updatePlace = async (data, id) => {
  try {
    const response = await API.patch(`/places/${id}`, data, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error.response;
  }
};

export const deletePlace = async (id) => {
  try {
    const response = await API.delete(`/places/${id}`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error.response;
  }
};
