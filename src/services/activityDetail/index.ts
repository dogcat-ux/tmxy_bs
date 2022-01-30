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
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
    ...(options || {}),
  });
}

// @ts-ignore
export async function activityDetailUpload (body: API.ActivityDetailParam, options?: { [key: string]: any }) {
  let params = new FormData();
  _.forIn(body, function (value, key) {
    // @ts-ignore
    return params.append(key, value);
  })
  // @ts-ignore
  return request<API.ActivityDetailRes>(`api/v2/activity-detail`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
    ...(options || {}),
  });
}




