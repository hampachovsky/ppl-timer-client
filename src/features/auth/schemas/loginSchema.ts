import * as yup from 'yup';

export const loginSchema = yup
  .object()
  .shape({
    email: yup
      .string()
      .required(`Будь ласка, введіть пошту`)
      .email(`Введіть валідну електронну пошту`),
    password: yup.string().required('Будь ласка, введіть пароль'),
  })
  .required();
