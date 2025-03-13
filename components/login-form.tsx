"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Github } from 'lucide-react';
import AuthCode from 'react-auth-code-input';
import toast, { Toaster } from 'react-hot-toast';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const loadingToast = toast.loading('Sending verification code...', {
      position: 'top-right',
    });

    try {
      const res = await fetch('/api/auth/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setUserId(data.userId);
        toast.success('Verification code sent successfully!', {
          id: loadingToast,
          duration: 3000,
          position: 'top-right',
        });
      } else {
        toast.error(data.error || 'Failed to send verification code', {
          id: loadingToast,
          position: 'top-right',
        });
      }
    } catch (error) {
      toast.error('An error occurred', {
        id: loadingToast,
        position: 'top-right',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.error('Please enter all six digits', {
        position: 'top-right',
      });
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading('Verifying...', {
      position: 'top-right',
    });

    try {
      const result = await signIn('credentials', {
        email,
        otp,
        userId,
        redirect: false,
      });

      if (result?.error) {
        toast.error('Invalid verification code', {
          id: loadingToast,
          position: 'top-right',
        });
      } else {
        toast.success('Login successful! Redirecting...', {
          id: loadingToast,
          duration: 2000,
          position: 'top-right',
        });
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1000);
      }
    } catch (error) {
      toast.error('An error occurred', {
        id: loadingToast,
        position: 'top-right',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSignIn = (provider: 'google' | 'github') => {
    signIn(provider, { callbackUrl: '/dashboard' });
  };

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#363636',
            color: '#fff',
            padding: '16px',
            borderRadius: '8px',
          },
          success: {
            duration: 3000,
            style: {
              background: '#059669',
            },
          },
          error: {
            duration: 3000,
            style: {
              background: '#DC2626',
            },
          },
          loading: {
            style: {
              background: '#363636',
            },
          },
        }}
      />

      <div className="min-h-screen flex">
        <div className="flex-1 bg-gradient-to-br from-blue-600 to-purple-600 hidden md:flex items-center justify-center">
          <div className="text-white text-center p-16">
            <h1 className="text-5xl font-bold mb-6">Welcome to Aganitha</h1>
            <p className="text-xl opacity-90">
              Access your secure dashboard and collaborate with your team.
            </p>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-8 py-16">
          <Card className="w-full max-w-lg bg-white dark:bg-gray-800 shadow-xl rounded-2xl">
            <CardContent className="p-10 space-y-8">
              <div className="text-center">
                <img
                  src="https://www.aganitha.ai/wp-content/uploads/2023/05/aganitha-logo.png"
                  alt="Aganitha Logo"
                  className="h-16 w-auto mx-auto mb-6"
                />
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Welcome</h1>
                <p className="text-md text-gray-600 dark:text-gray-300">Sign in to your account</p>
              </div>

              {!userId ? (
                <div className="space-y-6">
                  <form onSubmit={handleEmailSubmit} className="space-y-4">
                    <Input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-lg"
                    />
                    <Button
                      type="submit"
                      className="w-full h-12 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg"
                      disabled={loading}
                    >
                      {loading ? 'Sending...' : 'Send Code'}
                    </Button>
                  </form>

                  <div className="relative flex items-center justify-center">
                    <div className="absolute w-full border-t border-gray-200 dark:border-gray-700"></div>
                    <span className="relative px-4 bg-white dark:bg-gray-800 text-sm text-gray-500 dark:text-gray-400">
                      or continue with
                    </span>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={() => handleOAuthSignIn('google')}
                      className="w-full h-12 flex items-center justify-center gap-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <img 
                        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                        alt="Google" 
                        className="w-5 h-5"
                      />
                      Google
                    </button>

                    <button
                      onClick={() => handleOAuthSignIn('github')}
                      className="w-full h-12 flex items-center justify-center gap-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Github className="h-5 w-5" />
                      GitHub
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleOtpSubmit} className="space-y-6">
                  <div className="text-center mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Enter the verification code sent to your email
                    </p>
                  </div>
                  <AuthCode
                    allowedCharacters="numeric"
                    onChange={(value) => setOtp(value)}
                    containerClassName="flex justify-center space-x-3"
                    inputClassName="w-12 h-12 border border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-lg text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Button
                    type="submit"
                    className="w-full h-12 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg"
                    disabled={loading}
                  >
                    {loading ? 'Verifying...' : 'Verify Code'}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full h-12 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    onClick={() => setUserId(null)}
                  >
                    Back to Sign In
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}