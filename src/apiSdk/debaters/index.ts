import axios from 'axios';
import queryString from 'query-string';
import { DebaterInterface, DebaterGetQueryInterface } from 'interfaces/debater';
import { GetQueryInterface } from '../../interfaces';

export const getDebaters = async (query?: DebaterGetQueryInterface) => {
  const response = await axios.get(`/api/debaters${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createDebater = async (debater: DebaterInterface) => {
  const response = await axios.post('/api/debaters', debater);
  return response.data;
};

export const updateDebaterById = async (id: string, debater: DebaterInterface) => {
  const response = await axios.put(`/api/debaters/${id}`, debater);
  return response.data;
};

export const getDebaterById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/debaters/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteDebaterById = async (id: string) => {
  const response = await axios.delete(`/api/debaters/${id}`);
  return response.data;
};
