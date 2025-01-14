import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const responseMessage = async (response: any) => {

    const token = response.credential;
    const decoded: any = jwtDecode(token);

    const userData = {
      email: decoded.email,
      name: decoded.name,
      picture: decoded.picture,
    };

    document.cookie = `user=${JSON.stringify(userData)}; path=/; expires=${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString()}`;

    try {
      const res = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(userData),
      });

      const data = await res.json();  // Parse the JSON response

      if (res.ok) {
        // Successful user creation
        console.log(data.message || 'User data stored successfully');
      } else {
        // If the server returns an error message, log it
        console.error(data.message || 'Error storing user data');
      }
    } catch (error) {
      console.error('Error sending user data to the server:', error);
    }

    window.location.href = '/';
  };

  const errorMessage = () => {
    console.log('An error occurred');
  };

  // Handle email/password login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check for empty email or password
    if (!email || !password) {
      setLoginError('Please fill out both fields');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Assuming the server sends a token or user info
        const userData = {
          email: data.email,
          name: data.name,
          picture: data.picture,
        };
        document.cookie = `user=${JSON.stringify(userData)}; path=/; expires=${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString()}`;

        console.log('Login successful:', data);

        window.location.href = '/';
      } else {
        setLoginError(data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Error during email/password login:', error);
      setLoginError('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <h1>Login</h1>

      {/* Google Login */}
      <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />

      <hr />

      {/* Email and Password Login Form */}
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
        <button type="submit">Login with Email</button>
      </form>
    </div>
  );
};

export default Login;
