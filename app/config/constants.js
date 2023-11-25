export const USERS = {
  levels: {
    admin: 0,
    user: 1,
  },
  is_confirm_account: {
    true: 0,
    false: 1,
  },
  gender: {
    male: 0,
    female: 1,
  },
};

export const PRODUCT = {
  type: {
    images: 0,
    video: 1,
  }
};

export const ORDER_STATUS = {
  pay: 0,
  ship: 1,
  receive: 2,
  completed: 3,
  cancelled: 4,
  refund: 5
};

export const NUMBER_VERIFY_CODE = 6;

export const VERIFY_CODE_TIME_MILLISECONDS = 10 * 60 * 1000;
