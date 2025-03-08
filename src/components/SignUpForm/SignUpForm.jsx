// src/components/SignUpForm/SignUpForm.jsx
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations"; 
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast"; 
import styles from "./SignUpForm.module.css";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("This field is required"),
  password: yup.string().min(6, "Password must contain at least 6 characters").required("This field is required"),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords do not match")
    .required("This field is required"),
});

export function SignUpForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register: formRegister, 
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await dispatch(register({ email: data.email, password: data.password })).unwrap();
      toast.success("Successfully registered!"); 
      navigate("/tracker");
    } catch (error) {
      toast.error("Registration error: " + error); 
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <label>Email</label>
      <input type="email" {...formRegister("email")} />
      {errors.email && <p className={styles.error}>{errors.email.message}</p>}

      <label>Password</label>
      <input type="password" {...formRegister("password")} />
      {errors.password && <p className={styles.error}>{errors.password.message}</p>}

      <label>Repeat Password</label>
      <input type="password" {...formRegister("repeatPassword")} />
      {errors.repeatPassword && <p className={styles.error}>{errors.repeatPassword.message}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Registering..." : "Sign Up"}
      </button>

      <p className={styles.text}>
        Already have an account? <Link to="/signin" className={styles.link}>Sign In</Link>
      </p>
    </form>
  );
}

