import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Container,
  Paper,
  Stack,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import useAuth from "../assets/Favorite";
import { toast } from "react-toastify";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { InputAdornment, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router";
import styled from "styled-components";

const SIGNUP_MUTATION = gql`
    mutation Register($email: String!, $name: String!, $password: String!) {
      register(email: $email, name: $name, password: $password) {
        accessToken
        user {
          id
          email
        }
      }
    }
  `;


function SignUp() {
  const { setAccessToken, setUser } = useAuth();
  const [register, { data, loading }] = useMutation(SIGNUP_MUTATION);
  const [showPassword, setShowPassword] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const navigate = useNavigate()
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleRegisterCompleted = (data) => {
    toast.success("Registered successfully!");
    setAccessToken(data?.register?.accessToken);
    setUser(data.register.user);

    setIsNavigating(true)


    setTimeout(() => {
      navigate("/")
    }, 2000)
  };

  const onSubmit = (data) => {
    console.log(data);

    register({ variables: data, onCompleted: handleRegisterCompleted });
    reset();
  };




  if (isNavigating) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "15px",
      }}>
        <h1 style={{
          margin: 0,
          fontSize: "40px",
        }}>Aibnb</h1>
        <CircularProgress size={35} />
        <p style={{ margin: 0 }}>Loading...</p>
      </div>
    )
  }

  return (
    <>
      <Container maxWidth="md" style={{ marginTop: "200px" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
            <Stack spacing={3}>
              <Typography variant="h5" align="center" fontWeight="bold">
                Welcome to the Airbnb
              </Typography>

              <Controller
                name="name"
                control={control}
                rules={{
                  required: "Iltimos Name To'ldiring!",
                  minLength: { value: 3, message: "3 tadan ko'p belgi" },
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    label="Name"
                    {...field}
                    variant="outlined"
                    fullWidth
                    size="small"
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />

              <Controller
                name="email"
                control={control}
                rules={{ required: "Iltimos Email To'ldiring!" }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    label="Email"
                    {...field}
                    variant="outlined"
                    fullWidth
                    size="small"
                    type="email"
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Parolni kirgazish juda muhim!",
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    label="Password"
                    {...field}
                    variant="outlined"
                    fullWidth
                    size="small"
                    type={showPassword ? "text" : "password"}
                    error={!!error}
                    helperText={error?.message}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                )}
              />

           

              <Button
                loading={loading}
                size="large"
                type="submit"
                variant="contained"
                sx={{ mt: 1, py: 1.2, fontWeight: "bold" }}
              >
                Sign-up
              </Button>
            </Stack>
          </Paper>
        </form>
      </Container>
    </>
  );
}

export default SignUp;
