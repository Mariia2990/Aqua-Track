import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import sprite from '/img/sprite.svg';
import styles from './SignUpForm.module.css';
import { Loader } from '../Loader/Loader';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords do not match')
    .required('Repeat password is required'),
});

export function SignUpForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleRepeatPasswordVisibility = () =>
    setShowRepeatPassword(!showRepeatPassword);

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    const toastId = toast.loading('Registering...');

    try {
      await dispatch(
        register({ email: data.email, password: data.password }),
      ).unwrap();
      toast.success('Registration successful!', { id: toastId });
      navigate('/tracker');
      reset();
    } catch (error) {
      toast.error(error.message || 'Registration failed', { id: toastId });
    } finally {
      setIsLoading(false);
      toast.dismiss(toastId);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h1 className={styles.title}>Sign Up</h1>

      <div className={styles.boxInput}>
        <label className={styles.label} htmlFor="email">
          Email
        </label>
        <input
          {...formRegister('email')}
          type="email"
          id="email"
          placeholder="Enter your email"
          autoComplete="on"
          className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
        />
        {errors.email && (
          <div className={styles.error}>{errors.email.message}</div>
        )}
      </div>

      <div className={styles.boxInput}>
        <label className={styles.label} htmlFor="password">
          Password
        </label>
        <div className={styles.passwordWrapper}>
          <input
            {...formRegister('password')}
            type={showPassword ? 'text' : 'password'}
            id="password"
            placeholder="Enter your password"
            autoComplete="on"
            className={`${styles.input} ${
              errors.password ? styles.inputError : ''
            }`}
          />
          <button
            type="button"
            className={styles.eyeButton}
            onClick={togglePasswordVisibility}
          >
            <svg className={styles.eyeIcon}>
              <use
                xlinkHref={`${sprite}#${
                  showPassword ? 'icon-eye' : 'icon-eye-off'
                }`}
              />
            </svg>
          </button>
        </div>
        {errors.password && (
          <div className={styles.error}>{errors.password.message}</div>
        )}
      </div>

      <div className={styles.boxInput}>
        <label className={styles.label} htmlFor="repeatPassword">
          Repeat Password
        </label>
        <div className={styles.passwordWrapper}>
          <input
            {...formRegister('repeatPassword')}
            type={showRepeatPassword ? 'text' : 'password'}
            id="repeatPassword"
            placeholder="Repeat password"
            className={`${styles.input} ${
              errors.repeatPassword ? styles.inputError : ''
            }`}
          />
          <button
            type="button"
            className={styles.eyeButton}
            onClick={toggleRepeatPasswordVisibility}
          >
            <svg className={styles.eyeIcon}>
              <use
                xlinkHref={`${sprite}#${
                  showRepeatPassword ? 'icon-eye' : 'icon-eye-off'
                }`}
              />
            </svg>
          </button>
        </div>
        {errors.repeatPassword && (
          <div className={styles.error}>{errors.repeatPassword.message}</div>
        )}
      </div>

      <button type="submit" className={styles.button} disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader absolute={true} />
            <span>Registering...</span>
          </>
        ) : (
          'Sign Up'
        )}
      </button>
    </form>
  );
}
