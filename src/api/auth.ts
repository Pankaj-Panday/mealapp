import { api } from './axios';
import { ENDPOINTS } from './endpoints';
import { LoginFormValues, SignupFormValues } from '../types/auth';
import { SignUpApiResponse } from '../types/apiResponse';

export const signUp = async (
  data: SignupFormValues,
): Promise<SignUpApiResponse> => {
  try {
    const response = await api.post(ENDPOINTS.SIGNUP, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (data: LoginFormValues) => {
  try {
    const response = await api.post(ENDPOINTS.LOGIN, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
