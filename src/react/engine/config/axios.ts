// Core
import axios from 'axios';
import { Auth, Amplify } from "aws-amplify";
import awsconfig from '../../../aws-exports';

Amplify.configure(awsconfig);

const axiosApiInstance = axios.create({
  baseURL: process.env.REACT_APP_REST_URI,
});
axiosApiInstance.interceptors.request.use(
  async config => {
    // @ts-ignore
    // eslint-disable-next-line no-param-reassign
    config.headers = {
      'Authorization': `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
      'Content-Type': 'application/json',
    }
    return config;
  },
  error => {
    Promise.reject(error)
  });

export const api = Object.freeze({
  devices: {
    getClusters(params?: unknown) {
      return axiosApiInstance.get('devices/cluster', { params });
    },
  }
});
