import request from '../index';
import _ from 'lodash';

export async function category(body?: any, options?: { [key: string]: any }) {
  // @ts-ignore
  return request<API.categoryRes>(`api/v2/category`, {
    method: 'GET',
    ...(options || {}),
  });
}

export async function creatCategory(body?: { category_name: string }, options?: { [key: string]: any }) {
  let params: FormData = new FormData();
  _.forIn(body, function(value, key) {
    // @ts-ignore
    return params.append(key, value);
  });
  // @ts-ignore
  return request<API.creatCategoryRes>(`api/v2/category`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

export async function deleteCategory(id?: number, body?: any, options?: { [key: string]: any }) {
  // @ts-ignore
  return request<API.commonRes>(`api/v2/category/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}



