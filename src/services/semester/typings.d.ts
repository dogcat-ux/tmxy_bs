// @ts-ignore
/* eslint-disable */
declare namespace API {
  type semesterRes = {
    status?: number
    data?: {
      item?: semesterResItem[],
      total?: number
    }
    error?: string
    msg?: string
  }
  type creatSemesterRes = {
    status?: number
    data?: semesterResItem
    error?: string
    msg?: string
  }
  type deleteSemesterRes = {
    status?: number
    data?: string
    error?: string
    msg?: string
  }
  type semesterResItem = {
    activity_semester_id?: number,
    year?: number,
    semester?: number,
    start_time?: number,
    end_time?: number
  }
}
