import { Request, Response } from 'express';

// const waitTime = (time: number = 100) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(true);
//     }, time);
//   });
// };

export default {
  'GET /api/currentUser': (req: Request, res: Response) => {
    // res.send({
    //   data: {},
    // });
    res.send({
      success: true,
      data: {
        email: 'antdesign@alipay.com',
      },
    });
  },
  'POST /api/login/account': async (req: Request, res: Response) => {
    const { password, username } = req.body;
    // await waitTime(2000);
    console.log(password, username );
    res.send({
      status: 'ok',
      code:0,
    });
    // if (username === '1@qq.com' && password === '1') {
    //   res.send({
    //     status: 'ok',
    //   });
    // }
  },
  'POST /api/login/outLogin': (req: Request, res: Response) => {
    res.send({ data: {}, success: true });
  },
};
