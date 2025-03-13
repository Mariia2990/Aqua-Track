import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/operations.js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import sprite from '/img/sprite.svg';
import s from './SignInForm.module.css';
export const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
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
    const toastId = toast.loading('Logging in...');
    try {
      const response = await dispatch(
        login({ email: data.email, password: data.password }),
      ).unwrap();
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }
      const result = await response.json();
      localStorage.setItem('token', result.token);
      toast.success('Login successful!', { id: toastId });
      navigate('/tracker');
    } catch (error) {
      toast.error(error.message || 'Something went wrong', { id: toastId });
    } finally {
      toast.dismiss(toastId);
      reset();
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <h1 className={s.title}>Sign in</h1>
      <div className={s.boxInputEmail}>
        <label className={s.label} htmlFor="email">
          Email
        </label>
        <input
          className={s.input}
          type="email"
          id="email"
          autoComplete="email"
          placeholder="Enter your email"
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
            autoComplete="password"
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
