'use client';

import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';

import useSystemEvents from '../../hooks/useSystemEvents';

interface RegisterFormProps {
  setNotification: (notification: {
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }) => void;
}

export default function RegisterForm({ setNotification }: RegisterFormProps) {
  const router = useRouter(); // Initialize the router
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { register, loading } = useSystemEvents();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic form validation
    if (!email || !username || !password) {
      setNotification({
        open: true,
        message: 'All fields are required',
        severity: 'error',
      });
      return;
    }

    if (password !== confirmPassword) {
      setNotification({
        open: true,
        message: 'Passwords do not match!',
        severity: 'error',
      });
      return;
    }

    // Call register function from hook
    const result = await register({ email, username, password });

    if (result.success) {
      setNotification({
        open: true,
        message: 'Registration successful! Redirecting to login...',
        severity: 'success',
      });

      // Redirect to login page after successful registration
      setTimeout(() => {
        router.push('/login');
      }, 1500);
    } else {
      setNotification({
        open: true,
        message: result.message || 'Registration failed',
        severity: 'error',
      });
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        bgcolor: '#FFFFFF',
        p: 3,
        borderRadius: 6,
        boxShadow: 6,
        width: 400,
        fontSize: '1.25rem',
      }}
    >
      <Typography variant="h5" sx={{ color: '#000000', fontWeight: 'bold', mb: 2 }}>
        Register
      </Typography>
      <form style={{ width: '100%' }} onSubmit={handleRegister}>
        <TextField
          fullWidth
          type="email"
          label="Email"
          variant="filled"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ bgcolor: '#D9D9D9', borderRadius: 1, input: { color: '#000000' }, mb: 2 }}
          InputLabelProps={{ style: { color: '#262626' } }}
          required
        />
        <TextField
          fullWidth
          label="Username"
          variant="filled"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ bgcolor: '#D9D9D9', borderRadius: 1, input: { color: '#000000' }, mb: 2 }}
          InputLabelProps={{ style: { color: '#262626' } }}
          required
        />
        <TextField
          fullWidth
          type="password"
          label="Password"
          variant="filled"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ bgcolor: '#D9D9D9', borderRadius: 1, input: { color: '#000000' }, mb: 2 }}
          InputLabelProps={{ style: { color: '#262626' } }}
          required
        />
        <TextField
          fullWidth
          type="password"
          label="Confirm Password"
          variant="filled"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{ bgcolor: '#D9D9D9', borderRadius: 1, input: { color: '#000000' }, mb: 2 }}
          InputLabelProps={{ style: { color: '#262626' } }}
          required
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{
            bgcolor: '#262626',
            color: '#B3B3B3',
            '&:hover': { bgcolor: '#1E1E1E', color: 'white' },
            py: 1.5,
            fontWeight: 'bold',
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
        </Button>
      </form>
      <Link href={{ pathname: '/login' }}>
        <Button sx={{ mt: 2, fontSize: '0.875rem', color: 'blue', textTransform: 'none' }}>
          Already have an account? Login
        </Button>
      </Link>
    </Box>
  );
}
