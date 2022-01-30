export default interface scoreDetailRes {
  status?: number
  data?: IData
  msg?: string
  error?: string
}
export default interface scoreDetailParam {
  type?: number
  category?: string
  page_size?: number
  page_num?: number
  stu_number?: string
  year_start_time_stamp?: number
  year_end_time_stamp?: number
  semester_start_time_stamp?: number
  semester_end_time_stamp?: number
}

interface IData {
  item?: scoreDetailResItem[]
  total?: number
}

export interface scoreDetailResItem {
  scoreTitle?: string
  scoreSource?: string
  scoreCategory?: string
  score?: number
  addDate?: number
}

