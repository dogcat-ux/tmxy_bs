// @ts-ignore
/* eslint-disable */
declare namespace API {
  type noticeRes = {
    status?: number
    data?: {
      item?: noticeResItem[],
      total?: number
    }
    error?: string
    msg?: string
  }
  type creatNoticeRes = {
    status?: number
    data?: noticeResItem
    error?: string
    msg?: string
  }
  type deleteCarouselsRes = {
    status?: number
    data?: string
    error?: string
    msg?: string
  }
  type noticeResItem = {
    id?: number
    title?: string
    content?: string
    created_at?: number
  }
}
