'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { 
  Home, 
  Edit3, 
  Calendar, 
  BarChart3, 
  Target, 
  Settings, 
  LogOut,
  Menu,
  X,
  Twitter
} from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const navigationItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Compose', href: '/compose', icon: Edit3 },
  { label: 'Schedule', href: '/schedule', icon: Calendar },
  { label: 'Analytics', href: '/analytics', icon: BarChart3 },
  { label: 'Optimizer', href: '/optimizer', icon: Target },
  { label: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const handleSignOut = () => {
    signOut({ callbackUrl: '/login' });
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white hover:bg-white/10"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-full w-64 bg-black border-r border-border z-50 transform transition-transform duration-300
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:relative lg:w-64
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 px-6 py-6 border-b border-border">
            <Twitter className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-white">Social Manager</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-4">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link 
                  key={item.href} 
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`nav-item ${isActive ? 'active bg-white/5' : ''}`}
                >
                  <Icon size={24} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          {session?.user && (
            <div className="border-t border-border p-4">
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={session.user.image || ''} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {session.user.name?.charAt(0) || session.user.email?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {session.user.name || session.user.email}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    @{session.user.twitterUsername || 'username'}
                  </p>
                </div>
              </div>
              
              <Button
                variant="ghost"
                onClick={handleSignOut}
                className="w-full justify-start text-white hover:bg-white/10"
              >
                <LogOut size={20} className="mr-3" />
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}