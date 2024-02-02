import * as yup from 'yup';

export const registerActionSchema = yup
  .object()
  .shape({
    username: yup.string().required(),
    password: yup.string().required(),
    email: yup.string().required().email(),
  })
  .required();
