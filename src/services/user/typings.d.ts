// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    user_name?: string;
  };

  type LoginResult = {
    status?: number,
    data?: {
      user?: {
        id?: number,
        user_name?: string,
        avatar?: string,
        created_at?: number
      },
      token?: string
    },
    msg?: string,
    error?: string
  };

  type LoginParams = {
    user_name: string;
    password: string;
  };
}
