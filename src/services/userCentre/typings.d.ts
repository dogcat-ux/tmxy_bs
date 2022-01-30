// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    user_name?: string;
  };
  type personCenterParam = {
    grade?: string
    year_start_time_stamp?: number
    year_end_time_stamp?: number
    semester_start_time_stamp?: number
    semester_end_time_stamp?: number
    info?: number
  };
  type personCenterResItem = {
    user_name?: string
    phone_number?: string
    stu_number?: string
    extra_add_score?: number
    activity_score?: number
    all_score?: number
    extra_deduction_score?: number
    created_at?: number
  }
  type personCenterRes = {
    status?: number
    msg?: string
    data?: {
      item: personCenterResItem[],
      total: number
    }
    error?: string
  }
  type allScoreDetailRes = {
    status?: number
    msg?: string
    data?: {
      item: allScoreDetailResItem[],
      total: number
    }
    error?: string
  }
  type allScoreDetailParam = {
    year_start_time_stamp?: number
    year_end_time_stamp?: number
    semester_start_time_stamp?: number
    semester_end_time_stamp?: number
    info?: string
    page_size?: number
    page_num?: number
    stu_number?: string
  }
  type allScoreDetailResItem = {
    score_title?: string
    score_source?: string
    score_category?: string
    score?: number
    add_date?: number
  }

  type SemesterListParam = {
    // year: number; //学年
    year: string; //学年
  };
  type SemesterListResItem = {
    semester?: number,
    semester_start_time?: number,
    semester_end_time?: number
  };
  type SemesterListRes = {
    status?: number;
    data?: {
      item?: SemesterListResItem[];
      total?: number;
    };
    msg?: string;
    error?: string;
  };
  type YearListResItem = {
    'year': number,
    'year_start_time': number,
    'year_end_time': number
  };
  type YearListRes = {
    status?: number;
    data?: {
      item?: Array<YearListResItem>;
      total?: number;
    };
    msg?: string;
    error?: string;
  };
  type GradeListRes = {
    status?: number;
    data?: {
      item?: string[];
      total?: number;
    };
    msg?: string;
    error?: string;
  };

  type TypeRes = {
    status?: number;
    data?: {
      item?: TypeResItem[];
      total?: number;
    };
    msg?: string;
    error?: string;
  };
  type TypeResItem = {
    id?: number,
    category?: string
  };

  type CreateAllScoreParam = {
    type?: number
    stu_number?: number
    score_category?: number
    score_result?: string
    score?: number
  };

  type activityByCategoryRes = {
    status?: number;
    data?: {
      item?: activityByCategoryResItem[];
      total?: number;
    };
    msg?: string;
    error?: string;
  };
  type activityByCategoryResItem = {
    activity_id?: number,
    activity_name?: string
  };
}
