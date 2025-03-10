import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  avatar: yup.mixed(),
  name: yup
    .string()
    .matches(/^[a-zA-Z]+$/, 'Please enter a valid name using Latin characters'),
  email: yup.string().email('Please enter a valid email address'),
  weight: yup
    .number()
    .nullable()
    .min(20, 'Weight must be greater than or equal to 20')
    .max(300, 'Weight must be less than or equal to 600')
    .transform((value, originalValue) => {
      if (originalValue === '') return null;
      return value;
    }),
  time: yup
    .number()
    .nullable()
    .min(0)
    .max(12, 'Time must be less than or equal to 12')
    .transform((value, originalValue) => {
      if (originalValue === '') return null;
      return value;
    }),
  water: yup
    .number()
    .nullable()
    .transform((value, originalValue) => {
      if (originalValue === '') return null;
      return value;
    })
    .test('is-decimal', 'Please enter a valid number', (value) => {
      if (value === undefined || value === null || value === '') return true;
      return !isNaN(parseFloat(value)) && isFinite(value);
    })
    .test(
      'min-value',
      'Value must be greater than or equal to 0.1',
      (value) => {
        if (value === undefined || value === null || value === '') return true;
        return parseFloat(value) >= 0.1;
      },
    )
    .test('max-value', 'Value must be less than or equal to 31.2', (value) => {
      if (value === undefined || value === null || value === '') return true;
      return parseFloat(value) <= 31.2;
    }),
});
