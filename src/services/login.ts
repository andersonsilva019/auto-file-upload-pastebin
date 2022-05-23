import fetch from 'node-fetch'
import { API_DEV_KEY } from '../config/env';

interface LoginParams {
  username: string;
  password: string;
}

const API_ENDPOINT_LOGIN = 'https://pastebin.com/api/api_login.php'

async function login({ username, password }: LoginParams) {
  try {
    const body = new URLSearchParams();
    body.append('api_dev_key', API_DEV_KEY);
    body.append('api_user_name', username);
    body.append('api_user_password', password);

    const response = await fetch(API_ENDPOINT_LOGIN, {
      method: 'POST',
      body: body,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })

    const apiUserKey = await response.text();

    return apiUserKey;
  } catch (error) {
    console.log(error);
  }

}

export { login };