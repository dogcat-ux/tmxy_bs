import moment from 'moment';

export const activeState = (accord: API.ActivityRes) => {
  if (moment(Date.parse(new Date().toString())).isBefore(moment(accord?.sign_up_start_time))) {
    return '未开启报名';
  } else if (moment(Date.parse(new Date().toString())).isBefore(moment(accord?.sign_up_end_time))) {
    return '报名中';
  } else if (moment(Date.parse(new Date().toString())).isBefore(moment(accord?.activity_start_time))) {
    return '报名截止';
  } else if (moment(Date.parse(new Date().toString())).isBefore(moment(accord?.activity_end_time))) {
    return '活动进行中';
  } else {
    return '活动截止';
  }
};

export const checkState = (accord: API.ActivityRes) => {
  if (accord.status === 0) {
    return "审核中";
  } else if (accord.status === 1) {
    return "审核通过";
  } else if (accord.status === 2) {
    return "审核失败";
  } else {
    return "审核中";
  }
};
