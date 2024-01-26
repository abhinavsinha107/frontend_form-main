import { useForm } from "react-hook-form";
import styles from "./auth.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRegisterUserMutation } from "../../services/authApi";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface IFormInput {
  name: string;
  email: string;
  password: string;
}

const schema = yup.object().shape({
  name: yup.string().required("Name is a required field"),
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

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(schema) });

  const [registerUser, { data, isSuccess, isError, error }] =
    useRegisterUserMutation();
  const navigate = useNavigate();

  const onSubmit = async (formData: IFormInput) => {
    if (formData) {
      await registerUser(formData);
    } else {
      console.log("Error occured while registering user");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      console.log("User registered successfully...");
      navigate("/login");
    }
  }, [isSuccess]);

  return (
    <div className={styles.register}>
    <h2>Registration Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Name</label>
        <input {...register("name")} />
        {errors.name && <p>{errors.name.message}</p>}

        <label>Email</label>
        <input {...register("email")} type="email" />
        {errors.email && <p>{errors.email.message}</p>}

        <label>Password</label>
        <input {...register("password")} type="password" />
        {errors.password && <p>{errors.password.message}</p>}

        <input type="submit" value="Register" />
      </form>
    </div>
  );
}
