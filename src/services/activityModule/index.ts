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


