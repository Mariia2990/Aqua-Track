import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  avatar: yup.mixed(),
  name: yup.string().max(20, 'Name must be at most 20 characters'),
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  weight: yup
    .number()
    .min(0, 'Weight must be greater than or equal to 0')
    .max(250, 'Weight must be less than or equal to 250')
    .transform((value, originalValue) => {
      if (originalValue === '') return null;
      return value;
    })
    .nullable()
    .test(
      'is-not-null',
      'Weight must be greater than or equal to 0',
      (value) => {
        return value !== null;
      },
    ),
  dailySportTime: yup
    .number()
    .min(0, 'Time must be greater than or equal to 0')
    .max(24, 'Time must be less than or equal to 24')
    .transform((value, originalValue) => {
      if (originalValue === '') return null;
      return value;
    })
    .nullable()
    .test('is-not-null', 'Time must be greater than or equal to 0', (value) => {
      return value !== null;
    }),
  dailyNorm: yup
    .number()
    .min(0.5, 'Daily norm must be greater than or equal to 0.5L')
    .max(15, 'Daily norm must be less than or equal to 15L')
    .required('Daily norm is required')
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
