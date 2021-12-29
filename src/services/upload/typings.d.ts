// @ts-ignore
/* eslint-disable */

declare namespace API {

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type ScoreUploadParam = {
    file?: any,
    year?: string,
    semester?: string
  };
  type GpaUploadParam = {
    file?: string,
    year?: string,
    semester?: string
  };
  type studentInfoUploadParam = {
    file?: string,
  };
  type CommonRes = {
    status?: number,
    data?: string,
    msg?: string,
    error?: string
  };
}
