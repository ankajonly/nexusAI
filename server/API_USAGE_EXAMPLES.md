# API Usage Examples

## Frontend Integration Examples

### 1. Signup User

```javascript
// src/services/api.js or similar
const API_URL = 'http://localhost:5000/api';

export const signupUser = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Signup failed');
        }

        // Store token in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        return data;
    } catch (error) {
        console.error('Signup error:', error);
        throw error;
    }
};
```

**Usage:**
```javascript
try {
    const result = await signupUser({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123'
    });
    console.log('User created:', result.user);
} catch (error) {
    console.error('Error:', error.message);
}
```

### 2. Login User

```javascript
export const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }

        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        return data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};
```

### 3. Get Current User

```javascript
export const getCurrentUser = async () => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            return null;
        }

        const response = await fetch(`${API_URL}/auth/me`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (!response.ok) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            throw new Error('Failed to fetch user');
        }

        return data;
    } catch (error) {
        console.error('Get user error:', error);
        return null;
    }
};
```

### 4. Update Profile

```javascript
export const updateProfile = async (userData) => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('No token found');
        }

        const response = await fetch(`${API_URL}/user/profile`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Update failed');
        }

        // Update stored user data
        localStorage.setItem('user', JSON.stringify(data.user));

        return data;
    } catch (error) {
        console.error('Update profile error:', error);
        throw error;
    }
};
```

### 5. Change Password

```javascript
export const changePassword = async (currentPassword, newPassword) => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('No token found');
        }

        const response = await fetch(`${API_URL}/user/change-password`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                currentPassword,
                newPassword,
                confirmPassword: newPassword
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Password change failed');
        }

        return data;
    } catch (error) {
        console.error('Change password error:', error);
        throw error;
    }
};
```

### 6. Logout

```javascript
export const logout = async () => {
    try {
        const token = localStorage.getItem('token');

        if (token) {
            await fetch(`${API_URL}/auth/logout`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
        }

        localStorage.removeItem('token');
        localStorage.removeItem('user');

        return true;
    } catch (error) {
        console.error('Logout error:', error);
        // Still remove token even if request fails
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return true;
    }
};
```

### 7. Delete Account

```javascript
export const deleteAccount = async (password) => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('No token found');
        }

        const response = await fetch(`${API_URL}/user/account`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Account deletion failed');
        }

        localStorage.removeItem('token');
        localStorage.removeItem('user');

        return data;
    } catch (error) {
        console.error('Delete account error:', error);
        throw error;
    }
};
```

## Using in React Components

### Example: Login Component

```javascript
import { useState } from 'react';
import { loginUser } from '../services/api';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const result = await loginUser(email, password);
            // Navigate to dashboard
            window.location.href = '/dashboard';
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
            </button>
        </form>
    );
}

export default Login;
```

### Example: Protected Route

```javascript
import { useEffect, useState } from 'react';
import { getCurrentUser } from '../services/api';

function Dashboard() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await getCurrentUser();
            if (!userData) {
                window.location.href = '/login';
            } else {
                setUser(userData);
            }
            setLoading(false);
        };

        fetchUser();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (!user) return <div>Redirecting...</div>;

    return (
        <div>
            <h1>Welcome, {user.firstName}!</h1>
            <p>Email: {user.email}</p>
        </div>
    );
}

export default Dashboard;
```

## cURL Examples

### Signup
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get Current User
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Update Profile
```bash
curl -X PUT http://localhost:5000/api/user/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Jane",
    "phone": "+1234567890"
  }'
```

### Change Password
```bash
curl -X POST http://localhost:5000/api/user/change-password \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "currentPassword": "password123",
    "newPassword": "newpassword123",
    "confirmPassword": "newpassword123"
  }'
```
