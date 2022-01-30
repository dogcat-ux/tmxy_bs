import _ from 'lodash';
import request from '../index';
import {
  commonRes, extraAddDetailAddParam, extraAddDetailAddRes,
  extraAddDetailListParam, extraAddDetailListRes,
  extraAddListParam,
  extraAddListRes,
  extraAddParam,
  extraAddRes,
  extraDeleteRes,
} from '@/services/extraAdd/data';

export async function extraAddList(body: extraAddListParam, options?: { [key: string]: any }) {
  let params: FormData = new FormData();
  _.forIn(body, function(value, key) {
    // @ts-ignore
    return params.append(key, value);
  });
  return request<extraAddListRes>(`api/v2/extra-add-list`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

export async function extraAdd(body: extraAddParam, options?: { [key: string]: any }) {
  let params = new FormData();
  _.forIn(body, function(value, key) {
    // @ts-ignore
    return params.append(key, value);
  });
  return request<extraAddRes>(`api/v2/extra-add`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

export async function extraAmend(id: number, body: extraAddParam, options?: { [key: string]: any }) {
  let params = new FormData();
  _.forIn(body, function(value, key) {
    // @ts-ignore
    return params.append(key, value);
  });
  return request<extraAddRes>(`api/v2/extra-add/${id}`, {
    method: 'PUT',
    data: params,
    ...(options || {}),
  });
}

export async function extraDelete(id: number, options?: { [key: string]: any }) {
  return request<extraDeleteRes>(`api/v2/extra-add/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

export async function extraAddDetailList(body: extraAddDetailListParam, options?: { [key: string]: any }) {
  let params: FormData = new FormData();
  _.forIn(body, function(value, key) {
    // @ts-ignore
    return params.append(key, value);
  });
  return request<extraAddDetailListRes>(`api/v2/extra-add-detail-list`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

export async function extraAddDetailAdd(body: extraAddDetailAddParam, options?: { [key: string]: any }) {
  let params: FormData = new FormData();
  _.forIn(body, function(value, key) {
    // @ts-ignore
    return params.append(key, value);
  });
  return request<extraAddDetailAddRes>(`api/v2/extra-add-detail`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

export async function extraAddDetailImport(body: { file: any, extra_add_id: number }, options?: { [key: string]: any }) {
  let params: FormData = new FormData();
  _.forIn(body, function(value, key) {
    // @ts-ignore
    return params.append(key, value);
  });
  return request<commonRes>(`api/v2/extra-add-detail-import`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

export async function extraAddDetailAmend(id: number, body: { score: number }, options?: { [key: string]: any }) {
  let params: FormData = new FormData();
  _.forIn(body, function(value, key) {
    // @ts-ignore
    return params.append(key, value);
  });
  return request(`api/v2/extra-add-detail/${id}`, {
    method: 'PUT',
    data: params,
    ...(options || {}),
  });
}

export async function extraAddDetailDelete(id: number,  options?: { [key: string]: any }) {
  return request(`api/v2/extra-add-detail/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

