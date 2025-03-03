import { apiUrl } from '../../../constants';

export const addUserPostData = async (data: {
  telegramId: string;
  firstName: string;
  lastName: string;
  username: string;
  languageCode: string;
  isPremium: boolean;
  photoUrl: string;
}) => {
  console.log(JSON.stringify(data));

  const response = await fetch(apiUrl + '/user/addUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw Error('Failed to post data');
  }

  return response.json();
};
