// src/components/SignUpForm/SignUpForm.jsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import styles from "./SignUpForm.module.css";
import { useId } from "react";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords do not match")
    .required("Repeat password is required"),
});

export function SignUpForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleRepeatPasswordVisibility = () => setShowRepeatPassword(!showRepeatPassword);

  const emailFieldId = useId();
  const passwordFieldId = useId();
  const repeatPasswordFieldId = useId();

  const handleSubmit = (values, { resetForm }) => {
    dispatch(register({ email: values.email, password: values.password }))
      .unwrap()
      .then(() => {
        toast.success("Successfully registered!");
        navigate("/tracker");
      })
      .catch((error) => {
        toast.error("Registration error: " + error);
      });

    resetForm();
  };

  return (
    <Formik
      initialValues={{ email: "", password: "", repeatPassword: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={styles.form}>
          <h2 className={styles.title}>Sign Up</h2>

          <div className={styles.boxInput}>
            <label className={styles.label} htmlFor={emailFieldId}>
              Email
            </label>
            <Field name="email">
              {({ field, meta }) => (
                <div>
                  <input
                    {...field}
                    type="email"
                    id={emailFieldId}
                    placeholder="Enter your email"
                    className={`${styles.input} ${meta.touched && meta.error ? styles.inputError : ""}`}
                  />
                  {meta.touched && meta.error && <div className={styles.error}>{meta.error}</div>}
                </div>
              )}
            </Field>
          </div>

          <div className={styles.boxInput}>
            <label className={styles.label} htmlFor={passwordFieldId}>
              Password
            </label>
            <Field name="password">
              {({ field, meta }) => (
                <div className={styles.passwordWrapper}>
                  <input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    id={passwordFieldId}
                    placeholder="Enter your password"
                    className={`${styles.input} ${meta.touched && meta.error ? styles.inputError : ""}`}
                  />
                  <button type="button" onClick={togglePasswordVisibility} className={styles.eyeButton}>
                    <svg className={styles.eyeIcon}>
                      <use href={`/src/img/sprite.svg#${showPassword ? "icon-eye" : "icon-eye-off"}`} />
                    </svg>
                  </button>
                  {meta.touched && meta.error && <div className={styles.error}>{meta.error}</div>}
                </div>
              )}
            </Field>
          </div>

          <div className={styles.boxInput}>
            <label className={styles.label} htmlFor={repeatPasswordFieldId}>
              Repeat Password
            </label>
            <Field name="repeatPassword">
              {({ field, meta }) => (
                <div className={styles.passwordWrapper}>
                  <input
                    {...field}
                    type={showRepeatPassword ? "text" : "password"}
                    id={repeatPasswordFieldId}
                    placeholder="Repeat password"
                    className={`${styles.input} ${meta.touched && meta.error ? styles.inputError : ""}`}
                  />
                  <button type="button" onClick={toggleRepeatPasswordVisibility} className={styles.eyeButton}>
                    <svg className={styles.eyeIcon}>
                      <use href={`/src/img/sprite.svg#${showRepeatPassword ? "icon-eye" : "icon-eye-off"}`} />
                    </svg>
                  </button>
                  {meta.touched && meta.error && <div className={styles.error}>{meta.error}</div>}
                </div>
              )}
            </Field>
          </div>

          <button type="submit" className={styles.button} disabled={isSubmitting}>
            {isSubmitting ? "Registering..." : "Sign Up"}
          </button>

          <p className={styles.text}>
            Already have an account? <Link to="/signin" className={styles.link}>Sign In</Link>
          </p>
        </Form>
      )}
    </Formik>
  );
}




