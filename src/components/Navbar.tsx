import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <svg width="32" height="32" viewBox="0 0 242 206" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
            <path d="M0 97H80V163H20C8.95431 163 0 154.046 0 143V97Z" fill="#E1EAFF"/>
            <circle cx="219.5" cy="121.5" r="22.5" fill="#1845DE"/>
            <circle cx="196.5" cy="17.5" r="17.5" fill="#2C7DF6"/>
            <path d="M0 97H80V163H20C8.95431 163 0 154.046 0 143V97Z" fill="#279AFF" fillOpacity="0.8"/>
            <path d="M0 97H80V163H20C8.95431 163 0 154.046 0 143V97Z" fill="#279AFF" fillOpacity="0.8"/>
            <path d="M80 97H114V163H80V97Z" fill="#1A55EA"/>
            <path d="M52 163H114V186C114 197.046 105.046 206 94 206H52V163Z" fill="#093296"/>
            <path d="M114 68C114 59.7157 120.716 53 129 53H176C184.284 53 191 59.7157 191 68V97H114V68Z" fill="#E1EAFF"/>
            <path d="M114 97H175V143C175 154.046 166.046 163 155 163H114V97Z" fill="#E1EAFF"/>
            <path d="M52 39C52 30.7157 58.7157 24 67 24H155C166.046 24 175 32.9543 175 44V97H52V39Z" fill="#073197" fillOpacity="0.8"/>
            <path d="M113 68C113 59.7157 119.716 53 128 53H175V97H113V68Z" fill="#279AFF" fillOpacity="0.6"/>
          </svg>

          <div className="flex items-center gap-4">
            <button
              className="px-4 py-1.5 text-sm rounded-lg glass-panel hover:bg-white/10 transition-all"
            >
              Sign In
            </button>
            <button
              className="px-4 py-1.5 text-sm rounded-lg bg-blue-600 hover:bg-blue-500 transition-all text-white"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;