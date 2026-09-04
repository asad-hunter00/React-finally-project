import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import {
  Container,
  Paper,
  Stack,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components";

import useAuth from "../assets/Favorite";

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      user {
        id
        email
        name
      }
    }
  }
`;

const LoginContainer = styled(Container)`
  margin-top: 150px;
`;

const LoginPaper = styled(Paper)`
  padding: 30px;
`;

const LoginTitle = styled(Typography)`
  text-align: center;
`;

function Login() {
  const navigate = useNavigate();
  const { setAccessToken, setUser } = useAuth();

  const [login, { loading }] = useMutation(LOGIN_MUTATION);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (formData) => {
    login({
      variables: formData,

      onCompleted: (data) => {
        setAccessToken(data.login.accessToken);
        setUser(data.login.user);

        toast.success("Login successful!");

        navigate("/");
      },

      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <LoginContainer maxWidth="sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <LoginPaper elevation={3}>
          <Stack spacing={3}>

            <LoginTitle variant="h5">
              Login
            </LoginTitle>

            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email kiriting",
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Email"
                  type="email"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              rules={{
                required: "Parol kiriting",
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Password"
                  type="password"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />

            <Button
              type="submit"
              variant="contained"
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </Button>

          </Stack>
        </LoginPaper>
      </form>
    </LoginContainer>
  );
}

export default Login;