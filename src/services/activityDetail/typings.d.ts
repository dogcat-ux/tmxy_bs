// @ts-ignore
/* eslint-disable */

declare namespace API {
  type ActivityListCommon = {
    data?: {
      item?: ActivityDetailListRes[],
      total?: number
    }
    status?: number,
    msg?: string
    error?: string
  }
  type CommonRes = {
    data?: string
    status?: number,
    msg?: string
    error?: string
  }

  type ActivityDetailListRes = {
    activity_detail_id?: number
    activity_id?: number
    stu_number?: string
    user_name?: string
    activity_score?: number
    add_date?: number
    phone?: string
    activity_status?: number
  }

  type ActivityDetailListParam = {
    info?: string;
    page_size?: number;
    page_num?: number;
  }

  type ActivityDetailRes = {
    msg?: string
    status?: number
    error?: string
    data?: string
  }

  type ActivityDetailParam = {
    activity_id?: number
    file?: any
  }
}
