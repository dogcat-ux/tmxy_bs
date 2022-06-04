// @ts-ignore
/* eslint-disable */
declare namespace API {
  type gpaPostItem = {
    gpaid: number,
    grade: string,
    stu_number: string,
    user_name: string,
    all_gpa: number,
    all_gpa_rank: number,
    year: string
  }
  type scorePostItem = {
    score_id: number,
    stu_number: string,
    user_name: string,
    course_name: string,
    credit: number,
    score: number,
    gpa: number,
    grade: string
  }
  type gpaPost = {
    status: number,
    data: {
      item: gpaPostItem[],
      total: number
    }
    msg: string,
    error: string
  }
  type scorePost = {
    status: number,
    data: {
      item: scorePostItem[],
      total: number
    }
    msg: string,
    error: string
  }
  type gpaDelete = {
    status: number,
    data: string,
    msg: string,
    error: string
  }
}
