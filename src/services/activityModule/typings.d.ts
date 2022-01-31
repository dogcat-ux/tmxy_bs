// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CommonActivityRes = {
    data?: {
      item?: ActivityRes[],
      total?: number
    },
    msg?: string,
    status?: number,
    user_name?: string;
  };
  type ActivityRes = {
    activity_id?: number
    activity_name?: string
    category_name?: string
    activity_unit?: string
    publisher_number?: string
    publisher_name?: string
    content?: string
    image?: string
    sign_up_start_time?: number
    sign_up_end_time?: number
    activity_place?: string
    activity_start_time?: number
    activity_end_time?: number
    recruitment?: number
    basic_score?: number
    code?: string
    sign_in_place?: string
    sign_in_range?: number
    responsible_people?: string
    responsible_people_phone?: string
    status?: number
  };
  type ActivityParam = {
    activity_start_time?: string
    page_num?: number
    page_size?: number
    activity_end_time?: string
    category_name?: string
    status?: number
    // 0 返回审核中和审核失败  1返回审核通过
  };
  type AmendActivityRes = {
    data?: string,
    msg?: string,
    status?: number,
    user_name?: string;
  };
  type AmendActivityParam = {
    activity_name?: string
    category_name?: string
    activity_unit?: string
    content?: string
    sign_up_start_time?: number
    sign_up_end_time?: number
    activity_place?: string
    recruitment?: number
    basic_score?: number
    sign_in_place?: string
    sign_in_range?: number
    responsible_people?: string
    responsible_people_phone?: string
    status?: number
    activity_start_time?: number,
    activity_end_time?: number
  };
}
