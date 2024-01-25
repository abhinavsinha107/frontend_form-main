import { useForm } from "react-hook-form";
import styles from "./auth.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLoginUserMutation } from "../../services/authApi";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/store";
import { setUser } from "../../store/reducers/authSlice";

interface IFormInput {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is a required field")
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      "Invalid email format"
    ),
  password: yup
    .string()
    .required("Password is a required field")
    .matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/,
      "Please enter valid password"
    ),
});

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(schema) });

  const [loginUser, {data, isSuccess, isError, error}] = useLoginUserMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = async (formData: IFormInput) => {
    if (formData) {
      await loginUser(formData);
    } else {
      console.log("Error occured while logging in");
    }
  };

  useEffect(() => {
    if(isSuccess) {
      console.log("User logged in successfully...");
      dispatch(setUser({ name: data.user.name, token: data.token }));
      navigate("/dashboard");
    }
  }, [isSuccess])

  return (
    <div className={styles.register}>
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>

        <label>Email</label>
        <input {...register("email")} type="email"/>
        {errors.email && <p>{errors.email.message}</p>}

        <label>Password</label>
        <input {...register("password")} type="password" />
        {errors.password && <p>{errors.password.message}</p>}

        <input type="submit" value="Login" />
      </form>
    </div>
  );
}
