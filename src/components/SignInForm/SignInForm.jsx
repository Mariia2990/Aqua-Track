import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import sprite from '../../img/sprite.svg';
import s from './SignInForm.module.css';

export const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const schema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        'https://aquatrack-1v64.onrender.com/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const result = await response.json();
      localStorage.setItem('token', result.token);
      navigate('/tracker');
    } catch (error) {
      alert(error.message);
    }

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <div className={s.boxInputEmail}>
        <label className={s.label} htmlFor="email">
          Email
        </label>
        <input
          className={s.input}
          type="email"
          id="email"
          placeholder="alex2939@mail.com"
          {...register('email')}
        />
        {errors.email && <div className={s.error}>{errors.email.message}</div>}
      </div>

      <div className={s.boxInputPassword}>
        <label className={s.label} htmlFor="password">
          Password
        </label>
        <div className={s.passwordWrapper}>
          <input
            className={s.input}
            type={showPassword ? 'text' : 'password'}
            id="password"
            placeholder="Enter your password"
            {...register('password')}
          />
          <button
            type="button"
            className={s.eyeButton}
            onClick={togglePasswordVisibility}
          >
            <svg className={s.eyeIcon}>
              <use
                xlinkHref={`${sprite}#${
                  showPassword ? 'icon-eye' : 'icon-eye-off'
                }`}
              />
            </svg>
          </button>
        </div>
        {errors.password && (
          <div className={s.error}>{errors.password.message}</div>
        )}
      </div>

      <button type="submit" className={s.button} disabled={isSubmitting}>
        {isSubmitting ? 'Logging in...' : 'Log In'}
      </button>
    </form>
  );
};
