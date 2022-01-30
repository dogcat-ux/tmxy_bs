export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/',
    redirect: '/upload/scoreUpload',
  },
  {
    path: '/activityCentre',
    name: '活动中心',
    routes: [
      {
        name: '活动查看',
        path: '/activityCentre/activityLook',
        component: './activityCentre/activityLook',
      },
      {
        path: '/activityCentre/activityDetail',
        component: './activityCentre/activityLook/activityDetail',
      },
      {
        name: '活动审核',
        path: '/activityCentre/activityCheck',
        component: './activityCentre/activityCheck',
      },
      {
        name: '额外加分',
        path: '/activityCentre/extraAdd',
        component: './activityCentre/extraAdd',
      },
      {
        path: '/activityCentre/extraAddDetail',
        component: './activityCentre/extraAdd/extraAddDetail',
      },
      {
        name: '额外减分',
        path: '/activityCentre/extraDeduction',
        component: './activityCentre/extraDeduction',
      },
      {
        path: '/activityCentre/extraDeductionDetail',
        component: './activityCentre/extraDeduction/extraDeductionDetail',
      },
    ],
  },
  {
    path: '/userCentre',
    name: '用户中心',
    component: './userCentre',
    // routes: [
    //   {
    //     path: '/userCentre/allScore',
    //     component: './userCentre/allScore',
    //   },
    //   {
    //     path: '/userCentre/activityScore',
    //     component: './userCentre/activityScore',
    //   },
    //   {
    //     path: '/userCentre/extraAddScore',
    //     component: './userCentre/extraAddScore',
    //   },
    //   {
    //     path: '/userCentre/extraDeduction',
    //     component: './userCentre/extraDeduction',
    //   },
    // ],
  },
  {
    path: '/userCentre/allScore',
    component: './userCentre/allScore',
  },
  {
    path: '/userCentre/activityScore',
    component: './userCentre/activityScore',
  },
  {
    path: '/userCentre/extraAddScore',
    component: './userCentre/extraAddScore',
  },
  {
    path: '/userCentre/extraDeduction',
    component: './userCentre/extraDeduction',
  },
  {
    path: '/upload',
    name: '上传',
    routes: [
      {
        name: '成绩上传',
        path: '/upload/scoreUpload',
        component: './upload/scoreUpload',
      },
      {
        name: '绩点上传',
        path: '/upload/gpaUpload',
        component: './upload/gpaUpload',
      },
      {
        name: '学生信息导入',
        path: '/upload/studentInfoUpload',
        component: './upload/studentInfoUpload',
      },
      {
        name: '家长信息导入',
        path: '/upload/patriarchUpload',
        component: './upload/patriarchUpload',
      },
    ],
  },
  {
    path: '/other',
    name: '其他',
    routes: [
      {
        name: '轮播图',
        path: '/other/carousel',
        component: './other/carousel',
      },
      {
        name: '活动分类',
        path: '/other/category',
        component: './other/category',
      },
      {
        name: '公告模块',
        path: '/other/notice',
        component: './other/notice',
      },
      {
        name: '学期模块',
        path: '/other/semester',
        component: './other/semester',
      },
    ],
  },
  {
    component: './404',
  },
];
