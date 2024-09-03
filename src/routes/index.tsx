import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Alert, Box, FormControl, TextField, Typography } from '@mui/material';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { LoginSchema } from '../features/Login/schemas';
import { useAuthUser } from '../features/Login/services';
import {
  boxStyles,
  formControlStyles,
  loginButtonStyles,
} from '../features/Login/styles';
import { UserValidation } from '../features/Login/types';
import { useAuth } from '../hooks/useAuth';

export function Login() {
  const authUser = useAuthUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser.isSuccess) navigate({ to: '/dashboard' });
  }, [authUser.isSuccess]);

  const login = (userData: UserValidation) => {
    authUser.mutate(userData);
  };

  const {
    handleSubmit,
    control,
    formState: {},
  } = useForm<UserValidation>({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<UserValidation> = (data) => {
    login(data);
  };

  return (
    <Box sx={boxStyles}>
      <Typography variant="h1">Login</Typography>
      <FormControl
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={formControlStyles}
      >
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              type="email"
              label="Email"
              id="email"
              placeholder="Digite seu email"
              InputLabelProps={{
                shrink: !!field.value,
              }}
              {...field}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              type="password"
              id="password"
              label="Senha"
              placeholder="Digite sua senha"
              InputLabelProps={{
                shrink: !!field.value,
              }}
              {...field}
            />
          )}
        />

        <LoadingButton
          aria-label="login-button"
          type="submit"
          role="button"
          loading={authUser.isPending}
          id="login-button"
          variant="contained"
          sx={loginButtonStyles}
        >
          acessar
        </LoadingButton>
        {authUser.error && (
          <Alert variant="filled" severity="error">
            Email ou senha inválidos!
          </Alert>
        )}
      </FormControl>
    </Box>
  );
}

export const Route = createFileRoute('/')({
  beforeLoad: (s) => {
    const { isAuthenticated } = useAuth();
    if (isAuthenticated()) s.navigate({ to: '/dashboard' });
  },
  component: Login,
});
