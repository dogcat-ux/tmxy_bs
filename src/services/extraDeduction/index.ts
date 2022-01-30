import _ from 'lodash';
import request from '../index';
import {
  extraDeductionDetailDeductionParam, extraDeductionDetailDeductionRes,
  extraDeductionDetailListParam, extraDeductionDetailListRes,
  extraDeductionListParam,
  extraDeductionListRes,
  extraDeductionParam,
  extraDeductionRes, extraDeleteRes,
} from '@/services/extraDeduction/data';
import {
  commonRes,
} from '@/services/extraAdd/data';

export async function extraDeductionList(body?: extraDeductionListParam, options?: { [key: string]: any }) {
  let params = new FormData();
  _.forIn(body, function(value, key) {
    // @ts-ignore
    return params.append(key, value);
  });
  return request<extraDeductionListRes>(`api/v2/extra-deduction-list`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

export async function extraDeduction(body: extraDeductionParam, options?: { [key: string]: any }) {
  let params = new FormData();
  _.forIn(body, function(value, key) {
    // @ts-ignore
    return params.append(key, value);
  });
  return request<extraDeductionRes>(`api/v2/extra-deduction`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}


export async function extraDeductionAmend(id: number, body: extraDeductionParam, options?: { [key: string]: any }) {
  let params = new FormData();
  _.forIn(body, function(value, key) {
    // @ts-ignore
    return params.append(key, value);
  });
  // @ts-ignore▆
  return request<extraDeductionRes>(`api/v2/extra-deduction/${id}`, {
    method: 'PUT',
    data: params,
    ...(options || {}),
  });
}

export async function extraDeductionDelete(id: number, options?: { [key: string]: any }) {
  return request<extraDeleteRes>(`api/v2/extra-deduction/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}


export async function extraDeductionDetailList(body: extraDeductionDetailListParam, options?: { [key: string]: any }) {
  let params: FormData = new FormData();
  _.forIn(body, function(value, key) {
    // @ts-ignore
    return params.append(key, value);
  });
  return request<extraDeductionDetailListRes>(`api/v2/extra-deduction-detail-list`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

export async function extraDeductionDetailDeduction(body: extraDeductionDetailDeductionParam, options?: { [key: string]: any }) {
  let params: FormData = new FormData();
  _.forIn(body, function(value, key) {
    // @ts-ignore
    return params.append(key, value);
  });
  return request<extraDeductionDetailDeductionRes>(`api/v2/extra-deduction-detail`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

export async function extraDeductionDetailImport(body: { file: any, extra_deduction_id: number }, options?: { [key: string]: any }) {
  let params: FormData = new FormData();
  _.forIn(body, function(value, key) {
    // @ts-ignore
    return params.append(key, value);
  });
  return request<commonRes>(`api/v2/extra-deduction-detail-import`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

export async function extraDeductionDetailAmend(id: number, body: { score: number }, options?: { [key: string]: any }) {
  let params: FormData = new FormData();
  _.forIn(body, function(value, key) {
    // @ts-ignore
    return params.append(key, value);
  });
  return request(`api/v2/extra-deduction-detail/${id}`, {
    method: 'PUT',
    data: params,
    ...(options || {}),
  });
}

export async function extraDeductionDetailDelete(id: number,  options?: { [key: string]: any }) {
  return request(`api/v2/extra-deduction-detail/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
