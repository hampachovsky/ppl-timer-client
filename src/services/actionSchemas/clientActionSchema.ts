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

export const updateClientSchema = yup
  .object()
  .shape({
    clientName: yup.string().optional().min(1, 'Введіть мінімум 1 букву імені клієнта'),
    clientEmail: yup.string().optional().email('Ви повинні ввести коректно пошту'),
    archived: yup.boolean().optional(),
    id: yup.string().required(),
    clientNote: yup.string().optional(),
  })
  .required();
