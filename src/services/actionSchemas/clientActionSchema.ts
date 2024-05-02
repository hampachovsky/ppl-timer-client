import * as yup from 'yup';

export const createClientSchema = yup
  .object()
  .shape({
    clientName: yup.string().required("Введіть ім'я клієнта"),
    clientEmail: yup
      .string()
      .required('Введіть пошту клієнта')
      .email('Ви повинні ввести коректно пошту'),
  })
  .required();
