import { api } from '../api';

export interface AddUserPostDataPayload {
  hash: string;
  telegramId: number;
  firstName: string;
  lastName: string;
  username: string;
  languageCode: string;
  isPremium: boolean;
  photoUrl: string;
}

export interface AddUserResponse {
  success: boolean;
  userId: string;
}

export const addUser = async (
  data: AddUserPostDataPayload
): Promise<AddUserResponse> => {
  const { data: responseData } = await api.post<AddUserResponse>('/user/add', {
    telegram_id: data.telegramId,
    first_name: data.firstName,
    last_name: data.lastName,
    username: data.username,
    language_code: data.languageCode,
    is_premium: data.isPremium,
    photo_url: data.photoUrl,
    hash: data.hash,
  });

  return responseData;
};
