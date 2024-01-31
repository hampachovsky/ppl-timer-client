import * as yup from 'yup';

export const registerSchema = yup
  .object()
  .shape({
    username: yup
      .string()
      .min(4, `Ім'я користувача повинно містити більше 3 символів`)
      .max(128, `Ім'я користувача повинно містити менше 129 символів`)
      .required(`Будь ласка, введіть ім'я користувача`),
    password: yup
      .string()
      .min(5, 'Пароль повинен містити більше 4 символів')
      .max(64, 'Пароль повинен містити менше 65 символів')
      .required('Будь ласка, введіть пароль'),
    email: yup
      .string()
      .required(`Будь ласка, введіть пошту`)
      .email(`Введіть валідну електронну пошту`),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Паролі повинні співпадати')
      .required('Будь ласка, підтвердіть пароль'),
  })
  .required();
