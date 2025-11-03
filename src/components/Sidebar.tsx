'use client';

import { MessageSquare, LayoutDashboard, BarChart3, FileText, Settings, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Reports', href: '/reports', icon: FileText },
  { name: 'Assistant', href: '/chat', icon: MessageSquare },
];

const bottomNavigation = [
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Help', href: '/help', icon: HelpCircle },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 flex-col border-r border-border bg-card">
      <div className="flex flex-col justify-between flex-1 p-4">
        <div className="flex flex-col gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3 px-2">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full size-10 flex items-center justify-center text-white font-bold text-lg">
              💰
            </div>
            <div className="flex flex-col">
              <h1 className="text-base font-bold">Price Coach</h1>
              <p className="text-sm font-normal text-muted-foreground">Premium Plan</p>
            </div>
          </div>

          {/* Main Navigation */}
          <nav className="flex flex-col gap-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-accent'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Navigation */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1 border-t border-border pt-4">
            {bottomNavigation.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2 text-sm font-medium transition-colors rounded-lg text-muted-foreground hover:bg-accent"
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}
