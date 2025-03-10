import { useState } from 'react';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useId } from 'react';
import s from './SignInForm.module.css';

export const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

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
      onSubmit={(values, { resetForm }) => {
        console.log('Submitted:', values);
        resetForm();
      }}
    >
      {({ isSubmitting }) => (
        <Form className={s.form}>
          <div className={s.boxInputEmail}>
            <label className={s.label} htmlFor="email">
              Email
            </label>
            <Field
              className={s.input}
              type="email"
              name="email"
              placeholder="alex2939@mail.com"
            />
            <ErrorMessage name="email" component="div" className={s.error} />
          </div>

          <div className={s.boxInputPassword}>
            <label className={s.label} htmlFor={passwordFieldId}>
              Password
            </label>
            <div className={s.passwordWrapper}>
              <Field
                className={s.input}
                type={showPassword ? 'text' : 'password'}
                name="password"
                id={passwordFieldId}
                placeholder="Enter your password"
              />
              <button
                type="button"
                className={s.eyeButton}
                onClick={togglePasswordVisibility}
              >
                <svg className={s.eyeIcon}>
                  <use
                    href={`/img/sprite.svg#${
                      showPassword ? 'icon-eye' : 'icon-eye-off'
                    }`}
                  />
                </svg>
              </button>
            </div>
            <ErrorMessage name="password" component="div" className={s.error} />
          </div>

          <button type="submit" className={s.button} disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Log In'}
          </button>
        </Form>
      )}
    </Formik>
  );
};
