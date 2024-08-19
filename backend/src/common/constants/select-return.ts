export const USER_SELECT_FIELDS = {
  email: true,
  firstName: true,
  lastName: true,
  id: true,
  roles: true,
  provider: true,
  providerId: true,
  picture: true,
  verifyLink: true,
};

export const USER_ALL_INFO = {
  ...USER_SELECT_FIELDS,
  password: true,
};
