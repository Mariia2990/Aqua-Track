import s from './SignInForm.module.css';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/operations.js';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useId } from 'react';

export const SignInForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    dispatch(login(values))
      .unwrap()
      .then(() => {
        console.log('Success');
      })
      .catch((e) => {
        console.log(e.message);
      });
    resetForm();
  };

  const emailFieldId = useId();
  const passwordFieldId = useId();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={s.form}>
          <h2 className={s.title}>Sign In</h2>

          <div className={s.boxInputEmail}>
            <label className={s.label} htmlFor={emailFieldId}>
              Email
            </label>
            <Field name="email">
              {({ field, meta }) => {
                const hasError = meta.touched && meta.error;
                const hasValue = field.value.trim().length > 0;

                return (
                  <div>
                    <input
                      {...field}
                      type="email"
                      id={emailFieldId}
                      placeholder="Enter your email"
                      className={`${s.input} ${
                        hasError ? s.inputError : hasValue ? s.inputFilled : ''
                      }`}
                    />
                    {hasError && <div className={s.error}>{meta.error}</div>}
                  </div>
                );
              }}
            </Field>
          </div>

          <div className={s.boxInputPassword}>
            <label className={s.label} htmlFor={passwordFieldId}>
              Password
            </label>
            <Field name="password">
              {({ field, meta }) => {
                const hasError = meta.touched && meta.error;
                const hasValue = field.value.trim().length > 0;

                return (
                  <div>
                    <input
                      {...field}
                      type="password"
                      id={passwordFieldId}
                      placeholder="Enter your password"
                      className={`${s.input} ${
                        hasError ? s.inputError : hasValue ? s.inputFilled : ''
                      }`}
                    />
                    {hasError && <div className={s.error}>{meta.error}</div>}
                  </div>
                );
              }}
            </Field>
          </div>

          <button type="submit" className={s.button} disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Log In'}
          </button>
        </Form>
      )}
    </Formik>
  );
};
