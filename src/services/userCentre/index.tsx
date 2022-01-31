/* eslint-disable */
import request from '../index';
import _ from 'lodash';
import scoreDetailRes from '@/services/userCentre/data';
import scoreDetailParam from '@/services/userCentre/data';

// import request as rq from "umi"

export async function personCenter(body: API.personCenterParam, options?: { [key: string]: any }) {
  let params = new FormData();
  _.forIn(body, function(value, key) {
    // @ts-ignore
    return params.append(key, value);
  });
  return request<API.personCenterRes>(`api/v2/person-center`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

export async function personCenterPut(body: {
  stu_number: string,
  user_name: string,
  phone: string
}, options?: { [key: string]: any }) {
  let params = new FormData();
  _.forIn(body, function(value, key) {
    // @ts-ignore
    return params.append(key, value);
  });
  return request<API.commonRes>(`api/v2/person-center`, {
    method: 'PUT',
    data: params,
    ...(options || {}),
  });
}

export async function personCenterDelete(body: { stu_number: number }, options?: { [key: string]: any }) {
  let params = new FormData();
  _.forIn(body, function(value, key) {
    // @ts-ignore
    return params.append(key, value);
  });
  return request<API.personCenterRes>(`api/v2/person-center`, {
    method: 'DELETE',
    data: params,
    ...(options || {}),
  });
}

export async function allScoreDetail(body: API.allScoreDetailParam, options?: { [key: string]: any }) {
  let params = new FormData();
  _.forIn(body, function(value, key) {
    // @ts-ignore
    return params.append(key, value);
  });
  return request<API.allScoreDetailRes>(`api/v2/all-score-detail`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

export async function scoreDetail(body: scoreDetailParam, options?: { [key: string]: any }) {
  let params = new FormData();
  _.forIn(body, function(value, key) {
    // @ts-ignore
    return params.append(key, value);
  });
  return request<scoreDetailRes>(`api/v2/score-detail`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

export async function scoreDetailAmend(body: {
  id: number,
  score: number,
  stu_number: string,
  type: number
}, options?: { [key: string]: any }) {
  let params = new FormData();
  _.forIn(body, function(value, key) {
    // @ts-ignore
    return params.append(key, value);
  });
  return request<scoreDetailRes>(`api/v2/score-detail`, {
    method: 'PUT',
    data: params,
    ...(options || {}),
  });
}

export async function semesterList(
  body: API.SemesterListParam,
  options?: { [key: string]: any },
) {
  // @ts-ignore
  return request<API.SemesterListRes>('/api/v2/person-center-semester', {
    method: 'GET',
    params: { ...body },
    ...(options || {}),
  });
}

export async function yearList(options?: { [key: string]: any }) {
  // @ts-ignore
  return request<API.YearListRes>('/api/v2/person-center-year', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function gradeList(options?: { [key: string]: any }) {
  // @ts-ignore
  return request<API.GradeListRes>('/api/v2/person-detail-grade', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function detailDelete(body: {
  type?: number,
  id?: number
}, options?: { [key: string]: any }) {
  let params = new FormData();
  _.forIn(body, function(value, key) {
    // @ts-ignore
    return params.append(key, value);
  });
  return request(`api/v2/person-detail`, {
    method: 'DELETE',
    data: params,
    ...(options || {}),
  });
}

export async function extraType(body: { type: number }, options?: { [key: string]: any }) {
  let params = new FormData();
  _.forIn(body, function(value, key) {
    // @ts-ignore
    return params.append(key, value);
  });
  // @ts-ignore
  return request<API.TypeRes>('/api/v2/person-center-extra', {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

export async function createAllScore(body: API.CreateAllScoreParam, options?: { [key: string]: any }) {
  let params = new FormData();
  _.forIn(body, function(value, key) {
    // @ts-ignore
    return params.append(key, value);
  });
  // @ts-ignore
  return request('/api/v2/create-all-score', {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

export async function activityByCategory(body: { category: string }, options?: { [key: string]: any }) {
  let params = new FormData();
  _.forIn(body, function(value, key) {
    // @ts-ignore
    return params.append(key, value);
  });
  // @ts-ignore
  return request<API.activityByCategoryRes>('/api/v2/activity-category', {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

export async function exportActivityDetail(body: API.exportActivityDetailParam, options?: { [key: string]: any }) {
  let params = new FormData();
  _.forIn(body, function(value, key) {
    // @ts-ignore
    return params.append(key, value);
  });
  // @ts-ignore
  return request<API.commonRes>('/api/v2/export-activity-detail', {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}






