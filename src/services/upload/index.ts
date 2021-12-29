import request from '../index';
import _ from 'lodash';

export async function scoreUpload(body: API.ScoreUploadParam, options?: { [key: string]: any }) {
  const params: FormData = new FormData();
  _.forIn(body, function(value, key) {
    // @ts-ignore
    return params.append(key, value);
  });
  return request<API.CommonRes>('api/v2/score-import', {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

export async function gpaUpload(body: API.GpaUploadParam, options?: { [key: string]: any }) {
  const params: FormData = new FormData();
  _.forIn(body, function(value, key) {
    // @ts-ignore
    return params.append(key, value);
  });
  return request<API.CommonRes>('api/v2/gpa-import', {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

export async function studentInfoUpload(body: API.studentInfoUploadParam, options?: { [key: string]: any }) {
  const params: FormData = new FormData();
  _.forIn(body, function(value, key) {
    // @ts-ignore
    return params.append(key, value);
  });
  return request<API.CommonRes>('api/v2/user-import', {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}
