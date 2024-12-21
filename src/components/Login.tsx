'use client';

import { useState } from 'react';

interface FormData {
  name?: string;
  surname?: string;
  email: string;
  password: string;
}

const TEST_CREDENTIALS = {
  email: 'test@example.com',
  password: 'password123'
};

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login = ({ onLoginSuccess }: LoginProps) => {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const resetForm = () => {
    setFormData({
      name: '',
      surname: '',
      email: '',
      password: '',
    });
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Partial<FormData> = {};

    
    Object.entries(formData).forEach(([key, value]) => {
      if (!value && (key === 'email' || key === 'password' || 
         (activeTab === 'signup' && (key === 'name' || key === 'surname')))) {
        newErrors[key as keyof FormData] = 'This field is required';
      }
    });

    
    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (formData.password && !validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (activeTab === 'signin') {
      
      if (formData.email === TEST_CREDENTIALS.email && 
          formData.password === TEST_CREDENTIALS.password) {
        console.log('Login successful');
        onLoginSuccess();
      } else {
        setErrors({ email: 'Invalid email or password' });
        return;
      }
    } else {
      
      console.log('Signup successful');
      console.log('Test credentials:', TEST_CREDENTIALS);
      onLoginSuccess();
    }

    resetForm();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <div className="flex mb-6">
          <button
            className={`flex-1 py-2 text-center ${
              activeTab === 'signin'
                ? 'text-primary-500 border-b-2 border-primary-500'
                : 'text-gray-500'
            }`}
            onClick={() => {
              setActiveTab('signin');
              resetForm();
            }}
          >
            Sign In
          </button>
          <button
            className={`flex-1 py-2 text-center ${
              activeTab === 'signup'
                ? 'text-primary-500 border-b-2 border-primary-500'
                : 'text-gray-500'
            }`}
            onClick={() => {
              setActiveTab('signup');
              resetForm();
            }}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {activeTab === 'signup' && (
            <>
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary-500 text-black placeholder-gray-500"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Surname"
                  value={formData.surname}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary-500 text-black placeholder-gray-500"
                  onChange={(e) =>
                    setFormData({ ...formData, surname: e.target.value })
                  }
                />
                {errors.surname && (
                  <p className="text-red-500 text-sm mt-1">{errors.surname}</p>
                )}
              </div>
            </>
          )}
          <div>
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary-500 text-black placeholder-gray-500"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary-500 text-black placeholder-gray-500"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-600 transition-colors"
          >
            {activeTab === 'signin' ? 'Sign In' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login; 