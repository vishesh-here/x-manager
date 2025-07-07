'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Twitter, LogIn, Mail, Lock } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner';

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showCredentials, setShowCredentials] = useState(false);
  const router = useRouter();

  const handleTwitterSignIn = async () => {
    setIsLoading(true);
    try {
      const result = await signIn('twitter', { 
        callbackUrl: '/',
        redirect: false 
      });
      
      if (result?.error) {
        toast.error('Twitter authentication failed. Please try again.');
      } else if (result?.url) {
        router.push(result.url);
      }
    } catch (error) {
      toast.error('An error occurred during authentication.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error('Invalid credentials. Use john@doe.com / johndoe123 for demo.');
      } else {
        toast.success('Welcome! Redirecting to dashboard...');
        router.push('/');
      }
    } catch (error) {
      toast.error('An error occurred during sign in.');
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    setEmail('john@doe.com');
    setPassword('johndoe123');
  };

  return (
    <div className="w-full max-w-md space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-primary/20 rounded-full">
            <Twitter className="w-12 h-12 text-primary" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-white">Social Media Manager</h1>
        <p className="mt-2 text-muted-foreground">
          Your AI-powered co-pilot for X/Twitter
        </p>
      </div>

      <div className="space-y-6">
        {/* Twitter OAuth Button */}
        <Button
          onClick={handleTwitterSignIn}
          disabled={isLoading}
          className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-semibold"
        >
          <Twitter className="w-5 h-5 mr-3" />
          {isLoading ? 'Connecting...' : 'Sign in with X/Twitter'}
        </Button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-black text-muted-foreground">or</span>
          </div>
        </div>

        {/* Demo Credentials Toggle */}
        <Button
          type="button"
          variant="outline"
          onClick={() => setShowCredentials(!showCredentials)}
          className="w-full"
        >
          <LogIn className="w-4 h-4 mr-2" />
          {showCredentials ? 'Hide' : 'Use'} Demo Account
        </Button>

        {/* Credentials Form */}
        {showCredentials && (
          <form onSubmit={handleCredentialsSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-card border-border text-white"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-card border-border text-white"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={fillDemoCredentials}
                className="flex-1"
              >
                Fill Demo
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </div>
          </form>
        )}

        {/* Info Card */}
        <div className="tweet-card">
          <h3 className="font-semibold text-white mb-2">Getting Started</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Connect your X/Twitter account for full functionality</li>
            <li>• Use demo account (john@doe.com / johndoe123) to explore</li>
            <li>• Add your API keys in Settings after signing in</li>
          </ul>
        </div>
      </div>
    </div>
  );
}