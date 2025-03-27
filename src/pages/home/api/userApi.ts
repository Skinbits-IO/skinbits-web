import { apiUrl } from '../../../constants';

export const addUserPostData = async (data: {
  hash: string;
  telegramId: string;
  firstName: string;
  lastName: string;
  username: string;
  languageCode: string;
  isPremium: boolean;
  photoUrl: string;
}) => {
  const requestBody = convertUserData(data);
  console.log(JSON.stringify(requestBody));

  const response = await fetch(apiUrl + '/user/addUser', {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw Error('Failed to post data');
  }

  return response.json();
};

function convertUserData(data: {
  hash: any;
  telegramId: any;
  firstName: any;
  lastName: any;
  username: any;
  languageCode: any;
  isPremium: any;
  photoUrl: any;
}) {
  return {
    telegram_id: data.telegramId,
    first_name: data.firstName,
    last_name: data.lastName,
    username: data.username,
    language_code: data.languageCode,
    is_premium: data.isPremium,
    photo_url: data.photoUrl,
  };
}
