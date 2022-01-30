export interface extraDeductionListRes {
  status?: number
  data?: IData
  msg?: string
  error?: string
}

export interface extraDeductionListParam {
  page_size?: number
  page_num?: number
  time_stamp?: number
}

interface IData {
  item?: extraDeductionListItem[]
  total?: number
}

export interface extraDeductionListItem {
  extraDeductionId?: number
  deductionScoreCategory?: string
  deductionScoreContent?: string
  createdAt?: number
}

export interface extraDeductionRes {
  status?: number
  data?: IData1
  msg?: string
  error?: string
}

export interface extraDeductionParam {
  deduction_score_category?: string
  deduction_score_content?: string
}

interface IData1 {
  extraDeductionId?: number
  deductionScoreCategory?: string
  deductionScoreContent?: string
  createdAt?: number
}

export interface extraDeleteRes {
  status?: number
  data?: string
  msg?: string
  error?: string
}
export interface extraDeductionDetailListRes {
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

export interface extraDeductionDetailListParam {
  extra_deduction_id?: number
  page_size?: number
  page_num?: number
  info?: number
}

interface IData2 {
  item?: extraDeductionDetailListItem[]
  total?: number
}

export interface extraDeductionDetailListItem {
  extra_deduction_detail_id?: number
  extra_deduction_id?: number
  stu_number?: string
  user_name?: string
  phone?: string
  deduction_score_result?: string
  score?: number
  created_at?: number
}

export interface extraDeductionDetailDeductionRes {
  status?: number
  data?: IData5
  msg?: string
  error?: string
}

export interface extraDeductionDetailDeductionParam {
  extra_deduction_id?: number
  stu_number?: string
  deduction_score_result?: string
  score?: number
}

interface IData5 {
  extra_deduction_id?: number
  extra_deduction_detail_id?: number
  stu_number?: string
  user_name?: string
  phone?: string
  deduction_score_result?: string
  score?: number
  created_at?: number
}
