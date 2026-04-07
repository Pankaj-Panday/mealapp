import { api } from './axios';
import { ENDPOINTS } from './endpoints';
import { LoginFormValues, SignupFormValues } from '../types/auth';
import { LoginApiResponse, SignUpApiResponse } from '../types/apiResponse';

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

export const login = async (
  data: LoginFormValues,
): Promise<LoginApiResponse> => {
  try {
    const response = await api.post(ENDPOINTS.LOGIN, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const googleLogin = async (idToken: string) => {
  try {
    const response = await api.post(ENDPOINTS.GOOGLE_LOGIN, { idToken });
    return response.data;
  } catch (error) {
    throw error;
  }
};
