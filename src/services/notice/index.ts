import request from '../index';
import _ from 'lodash';

export async function getNotice(body?: any, options?: { [key: string]: any }) {
  // @ts-ignore
  return request<API.noticeRes>(`api/v2/notice`, {
    method: 'GET',
    ...(options || {}),
  });
}

export async function creatNotice(body: { title?: string, conten?: string }, options?: { [key: string]: any }) {
  let params: FormData = new FormData();
  _.forIn(body, function(value, key) {
    // @ts-ignore
    return params.append(key, value);
  });
  // @ts-ignore
  return request<API.creatNoticeRes>(`api/v2/notice`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

export async function deleteNotice(id?: number, body?: any, options?: { [key: string]: any }) {
  // @ts-ignore
  return request<API.commonRes>(`api/v2/notice/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

export async function amendNotice(id?: number, body: { title?: string, conten?: string }, options?: { [key: string]: any }) {
  let params: FormData = new FormData();
  _.forIn(body, function(value, key) {
    // @ts-ignore
    return params.append(key, value);
  });
  return request<API.commonRes>(`api/v2/notice/${id}`, {
    method: 'PUT',
    data: params,
    ...(options || {}),
  });
}



