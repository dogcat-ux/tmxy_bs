export interface extraAddListRes {
  status?: number
  data?: extraAdd
  msg?: string
  error?: string
}

export interface extraAddListParam {
  page_size?: number
  page_num?: number
  time_stamp?: number
}

interface extraAdd {
  item?: extraAddListResItem[]
  total?: number
}

export interface extraAddListResItem {
  extra_add_id?: number
  add_score_category?: string
  add_score_content?: string
  created_at?: number
}

export interface extraAddRes {
  status?: number
  data?: IData1
  msg?: string
  error?: string
}

export interface extraDeleteRes {
  status?: number
  data?: string
  msg?: string
  error?: string
}

export interface extraAddParam {
  add_score_category?: string
  add_score_content?: string
}

interface IData1 {
  extraAddId?: number
  addScoreCategory?: string
  addScoreContent?: string
  createdAt?: number
}

export interface extraAddDetailListRes {
  status?: number
  data?: IData2
  msg?: string
  error?: string
}

export interface commonRes {
  status?: number
  data?: string
  msg?: string
  error?: string
}

export interface extraAddDetailListParam {
  extra_add_id?: number
  page_size?: number
  page_num?: number
  info?: number
}

interface IData2 {
  item?: extraAddDetailListItem[]
  total?: number
}

export interface extraAddDetailListItem {
  extra_add_detail_id?: number
  extra_add_id?: number
  stu_number?: string
  user_name?: string
  phone?: string
  add_score_result?: string
  score?: number
  created_at?: number
}

export interface extraAddDetailAddRes {
  status?: number
  data?: IData5
  msg?: string
  error?: string
}

export interface extraAddDetailAddParam {
  extra_add_id?: number
  stu_number?: string
  add_score_result?: string
  score?: number
}

interface IData5 {
  extraAddDetailId?: number
  extraAddId?: number
  stuNumber?: string
  userName?: string
  phone?: string
  addScoreResult?: string
  score?: number
  createdAt?: number
}

