import * as yup from 'yup';

export const loginSchema = yup
  .object()
  .shape({
    username: yup.string().required(`Будь ласка, введіть ім'я користувача`),
    password: yup.string().required('Будь ласка, введіть пароль'),
  })
  .required();
