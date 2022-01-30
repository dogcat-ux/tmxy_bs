import request from '../index';
import _ from 'lodash';

export async function carousels(body?: any, options?: { [key: string]: any }) {
  // @ts-ignore
  return request<API.carouselsRes>(`api/v2/carousels`, {
    method: 'GET',
    ...(options || {}),
  });
}

export async function creatCarousels(body?: { file?: string }, options?: { [key: string]: any }) {
  let params: FormData = new FormData();
  _.forIn(body, function(value, key) {
    // @ts-ignore
    return params.append(key, value);
  });
  // @ts-ignore
  return request<API.creatCarouselsRes>(`api/v2/carousels`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

export async function deleteCarousels(id: number, options?: { [key: string]: any }) {
  // @ts-ignore
  return request<API.deleteCarouselsRes>(`api/v2/carousels/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}




