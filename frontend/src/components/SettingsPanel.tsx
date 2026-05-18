import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Moon, Bell, Lock, Wifi } from 'lucide-react';

interface SettingItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  defaultVal: boolean;
}

export const SettingsPanel: React.FC = () => {
  const [settings, setSettings] = useState<Record<string, boolean>>({
    darkMode: false,
    notifications: true,
    privateMode: false,
    autoSync: true,
  });

  const [loading, setLoading] = useState(true);

  const items: SettingItem[] = [
    { id: 'darkMode', label: 'Dark Mode', icon: <Moon size={20} />, defaultVal: false },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={20} />, defaultVal: true },
    { id: 'privateMode', label: 'Private Mode', icon: <Lock size={20} />, defaultVal: false },
    { id: 'autoSync', label: 'Auto Sync', icon: <Wifi size={20} />, defaultVal: true },
  ];

  // Fetch from backend
  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.settings) {
          setSettings(prev => ({ ...prev, ...data.settings }));
          // Apply dark mode class if already true
          if (data.settings.darkMode) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Settings fetch error:', err);
        setLoading(false);
      });
  }, []);

  const handleToggle = (id: string) => {
    const newVal = !settings[id];
    setSettings(prev => ({ ...prev, [id]: newVal }));

    // If Dark Mode, toggle HTML class for real theme switching
    if (id === 'darkMode') {
      if (newVal) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }

    // Persist to backend
    fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: id, value: newVal })
    }).catch(err => console.error('Failed to save setting:', err));
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-dark rounded-[2rem] border border-gray-100 dark:border-white/10 p-6 shadow-xl flex flex-col gap-4 animate-pulse">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-16 bg-gray-100 dark:bg-white/5 rounded-2xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-dark rounded-[2rem] border border-gray-100 dark:border-white/10 p-6 shadow-xl flex flex-col gap-4 transition-colors duration-300">
      <div className="mb-2">
        <h3 className="text-xl font-display font-black text-dark dark:text-white uppercase tracking-tight">
          System <span className="text-primary">Preferences</span>
        </h3>
        <p className="text-xs text-gray-400 font-medium mt-1">
          Global toggle configurations synchronized with live database.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {items.map(item => {
          const checked = settings[item.id] ?? item.defaultVal;

          return (
            <div 
              key={item.id}
              onClick={() => handleToggle(item.id)}
              className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 dark:border-white/10 bg-gray-50/50 dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-dark border border-gray-100 dark:border-white/10 flex items-center justify-center text-dark dark:text-white group-hover:text-primary transition-colors shadow-sm">
                  {item.icon}
                </div>
                <span className="font-display font-bold text-sm text-dark dark:text-white tracking-wide">
                  {item.label}
                </span>
              </div>

              {/* Toggle Switch */}
              <div className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${checked ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}>
                <motion.div 
                  layout
                  className="w-4 h-4 rounded-full bg-white shadow-md"
                  animate={{ x: checked ? 24 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SettingsPanel;
