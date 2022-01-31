/* eslint-disable */
import request from '../index';
import _ from 'lodash';

// @ts-ignore
export async function activityDetailList(activity_id: number, body: API.ActivityDetailListParam, options?: { [key: string]: any }) {
  let params = new FormData();
  _.forIn(body, function(value, key) {
    // @ts-ignore
    return params.append(key, value);
  });
  // @ts-ignore
  return request<API.ActivityListCommon>(`api/v2/activity-detail/${activity_id}`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

// @ts-ignore
export async function activityDetailUpload(body: API.ActivityDetailParam, options?: { [key: string]: any }) {
  let params = new FormData();
  _.forIn(body, function(value, key) {
    // @ts-ignore
    return params.append(key, value);
  });
  // @ts-ignore
  return request<API.ActivityDetailRes>(`api/v2/activity-detail`, {
    method: 'POST',

    data: params,
    ...(options || {}),
  });
}

export async function deleteActivityDetail(id?: number, options?: { [key: string]: any }) {
  return request<API.ActivityDetailRes>(`api/v2/activity-detail/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

export async function amendActivityDetail(body?: {
  id: number,
  score: number
}, options?: { [key: string]: any }) {
  let params = new FormData();
  _.forIn(body, function(value, key) {
    // @ts-ignore
    return params.append(key, value);
  });
  // @ts-ignore
  return request<API.ActivityDetailRes>(`api/v2/activity-detail/${id}`, {
    method: 'PUT',

    ...(options || {}),
  });
}

export async function creatActivityDetail(body?: {
  activity_id?: number,
  stu_number?: string,
  score?: number
}, options?: { [key: string]: any }) {
  let params = new FormData();
  _.forIn(body, function(value, key) {
    // @ts-ignore
    return params.append(key, value);
  });
  // @ts-ignore
  return request<API.CommonRes>(`api/v2/activity-add-score`, {
      method: 'POST',
      data: params,
      ...(options || {}),
    },
  );
}



