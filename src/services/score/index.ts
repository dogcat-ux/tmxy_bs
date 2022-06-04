import request from '../index';
import _ from 'lodash';

export async function gpaPost(body: {
  page_size: number,
  page_num: number
}, options?: { [key: string]: any }) {
  let params = new FormData();
  _.forIn(body, function (value, key) {
    // @ts-ignore
    return params.append(key, value);
  });
  // @ts-ignore
  return request<API.gpaPost>(`api/v2/gpa`, {
    method: 'POST',
    data:params,
    ...(options || {}),
  });
}

export async function scorePost(body: {
  page_size: number,
  page_num: number
}, options?: { [key: string]: any }) {
  let params = new FormData();
  _.forIn(body, function (value, key) {
    // @ts-ignore
    return params.append(key, value);
  });
  // @ts-ignore
  return request<API.scorePost>(`api/v2/score`, {
    method: 'POST',
    data:params,
    ...(options || {}),
  });
}

export async function gpaDelete(body: {
  id: number
}, options?: { [key: string]: any }) {
  let params = new FormData();
  _.forIn(body, function (value, key) {
    // @ts-ignore
    return params.append(key, value);
  });
  console.log("params",params)
  // @ts-ignore
  return request<API.gpaDelete>(`api/v2/gpa`, {
    method: 'DELETE',
    data:params,
    ...(options || {}),
  });
}

export async function scoreDelete(body: {
  id: number
}, options?: { [key: string]: any }) {
  let params = new FormData();
  _.forIn(body, function (value, key) {
    // @ts-ignore
    return params.append(key, value);
  });
  // @ts-ignore
  return request<API.gpaDelete>(`api/v2/score`, {
    method: 'DELETE',
    data:params,
    ...(options || {}),
  });
}

