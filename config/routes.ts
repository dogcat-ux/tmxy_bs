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
    path: '/upload',
    name:'上传',
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
    ],
  },
  {
    component: './404',
  },
];
