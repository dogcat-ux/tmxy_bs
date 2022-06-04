import request from '../index';
import _ from 'lodash';

export async function getSemester(body?: any, options?: { [key: string]: any }) {
  // @ts-ignore
  return request<API.semesterRes>(`api/v2/activity-semester`, {
    method: 'GET',
    ...(options || {}),
  });
}

export async function creatSemester(body?: { semester: number, start_time: number, end_time: number }, options?: { [key: string]: any }) {
  let params: FormData = new FormData();
  _.forIn(body, function(value, key) {
    // @ts-ignore
    return params.append(key, value);
  });
  // @ts-ignore
  return request<API.creatSemesterRes>(`api/v2/activity-semester`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

export async function putSemester(id:number,body?: { semester: number, start_time: number, end_time: number }, options?: { [key: string]: any }) {
  let params: FormData = new FormData();
  _.forIn(body, function(value, key) {
    // @ts-ignore
    return params.append(key, value);
  });
  // @ts-ignore
  return request<API.creatSemesterRes>(`api/v2/activity-semester/${id}`, {
    method: 'PUT',
    data: params,
    ...(options || {}),
  });
}

export async function amendSemester(id: number, body: { semester?: number, start_time?: number, end_time?: number }, options?: { [key: string]: any }) {
  // @ts-ignore
  return request<API.commonRes>(`api/v2/activity-semester/${id}`, {
    method: 'PUT',
    ...(options || {}),
  });
}



