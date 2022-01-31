/* eslint-disable */
import request from '../index';
import _ from 'lodash';

export async function activityList(body: API.ActivityParam, options?: { [key: string]: any }) {
  let params = new FormData();
  _.forIn(body, function(value, key) {
    // @ts-ignore
    return params.append(key, value);
  });
  return request<API.CommonActivityRes>('api/v2/activity', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
    ...(options || {}),
  });
}

export async function amendActivity(activity_id: number, body: API.AmendActivityParam, options?: { [key: string]: any }) {
  let params = new FormData();
  _.forIn(body, function(value, key) {
    // @ts-ignore
    return params.append(key, value);
  });
  return request<API.AmendActivityRes>(`api/v2/activity/${activity_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
    ...(options || {}),
  });
}

export async function deleteActivity(activity_id?: number, options?: { [key: string]: any }) {
  return request<API.AmendActivityRes>(`api/v2/activity/${activity_id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

//0 申请中	 	1 申请通过	 	2 申请失败
export async function checkActivity(activity_id?: number, body?: { status: number }, options?: { [key: string]: any }) {
  let params = new FormData();
  _.forIn(body, function(value, key) {
    // @ts-ignore
    return params.append(key, value);
  });
  return request<API.commonRes>(`api/v2/activity-verify/${activity_id}`, {
    method: 'PUT',
    data: params,
    ...(options || {}),
  });
}
