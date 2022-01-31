/* eslint-disable */
import request from '../index';

export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('api/v2/admin/login', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
