import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    Calendar,
    Inbox,
    Search,
    Menu,
    LogOut,
    Bell,
    Settings
} from 'lucide-react';
import { cn } from '../lib/utils';

const Layout = ({ children }) => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const topModules = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
        { icon: Calendar, label: 'Schedule', path: '/appointments' },
        { icon: Users, label: 'Patient List', path: '/patients' },
        { icon: Inbox, label: 'In Basket', path: '/messages' }, // Placeholder path
    ];

    // Determine active tab based on path
    const getActiveTab = () => {
        if (location.pathname === '/') return 'Dashboard';
        if (location.pathname.startsWith('/patients')) return 'Patient Chart';
        if (location.pathname.startsWith('/appointments')) return 'Schedule';
        return 'Unknown';
    };

    const activeTab = getActiveTab();

    return (
        <div className="min-h-screen flex flex-col bg-[var(--epic-gray-bg)] font-sans text-sm">
            {/* Hyperspace Top Toolbar */}
            <header className="hyperspace-toolbar text-white shadow-md z-50">
                {/* Top Row: Branding, Global Search, User */}
                <div className="flex items-center justify-between px-2 h-10 border-b border-gray-600/50">
                    <div className="flex items-center space-x-2">
                        <div className="bg-red-600 p-1 rounded text-white font-bold text-xs tracking-wider">
                            EPIC
                        </div>
                        <span className="font-semibold tracking-tight text-gray-100">Hyperspace</span>
                        <span className="text-gray-400 text-xs">| Production</span>
                    </div>

                    <div className="flex-1 max-w-xl mx-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Global Search (Name, MRN, etc.)"
                                className="w-full bg-gray-700/50 border border-gray-600 rounded px-8 py-1 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-gray-700"
                            />
                            <Search className="absolute left-2 top-1.5 h-3 w-3 text-gray-400" />
                        </div>
                    </div>

                    <div className="flex items-center space-x-3 text-xs">
                        <div className="flex items-center space-x-1 hover:bg-white/10 px-2 py-1 rounded cursor-pointer">
                            <Bell className="h-4 w-4" />
                            <span>Alerts</span>
                        </div>
                        <Link to="/profile" className="flex items-center space-x-1 hover:bg-white/10 px-2 py-1 rounded cursor-pointer">
                            <div className="h-5 w-5 bg-blue-500 rounded-full flex items-center justify-center font-bold">
                                DR
                            </div>
                            <span>Dr. Smith</span>
                        </Link>
                        <LogOut className="h-4 w-4 hover:text-red-300 cursor-pointer" />
                    </div>
                </div>

                {/* Bottom Row: Module Navigation */}
                <div className="flex items-center px-1 h-12 space-x-1 overflow-x-auto">
                    <div className="relative">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={cn(
                                "flex flex-col items-center justify-center px-3 py-1 rounded transition-colors",
                                isMenuOpen ? "bg-blue-700 text-white" : "text-gray-300 hover:text-white hover:bg-white/10"
                            )}
                        >
                            <Menu className="h-5 w-5 mb-0.5" />
                            <span className="text-[10px]">Epic</span>
                        </button>

                        {isMenuOpen && (
                            <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-md shadow-lg border border-gray-200 z-50 text-gray-800 py-1">
                                <div className="px-4 py-2 border-b border-gray-100 bg-gray-50">
                                    <p className="font-bold text-sm">Epic Menu</p>
                                </div>
                                <div className="py-1">
                                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-700 flex items-center">
                                        <Users className="h-4 w-4 mr-2" /> Patient Station
                                    </button>
                                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-700 flex items-center">
                                        <Calendar className="h-4 w-4 mr-2" /> Schedule
                                    </button>
                                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-700 flex items-center">
                                        <Inbox className="h-4 w-4 mr-2" /> Message Center
                                    </button>
                                </div>
                                <div className="border-t border-gray-100 py-1">
                                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-700 flex items-center">
                                        <Settings className="h-4 w-4 mr-2" /> User Settings
                                    </button>
                                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-red-50 hover:text-red-700 flex items-center">
                                        <LogOut className="h-4 w-4 mr-2" /> Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="h-8 w-px bg-gray-600 mx-1" />

                    {topModules.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={cn(
                                    "flex flex-col items-center justify-center px-4 py-1 rounded transition-colors min-w-[70px]",
                                    isActive
                                        ? "bg-blue-600 text-white shadow-inner"
                                        : "text-gray-200 hover:bg-white/10"
                                )}
                            >
                                <Icon className="h-5 w-5 mb-0.5" />
                                <span className="text-[10px] font-medium whitespace-nowrap">{item.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </header>

            {/* Workspace Tabs */}
            <div className="bg-gray-200 border-b border-gray-300 flex items-end px-2 pt-2 space-x-1 h-9">
                <div className={cn("hyperspace-tab rounded-t-md", activeTab === 'Dashboard' && "active")}>
                    Dashboard
                </div>
                {activeTab !== 'Dashboard' && (
                    <div className={cn("hyperspace-tab rounded-t-md", "active")}>
                        {activeTab}
                    </div>
                )}
                <div className="hyperspace-tab rounded-t-md opacity-50 hover:opacity-100">
                    +
                </div>
            </div>

            {/* Main Workspace Area */}
            <main className="flex-1 overflow-hidden flex flex-col relative">
                <div className="absolute inset-0 p-2 overflow-auto">
                    <div className="bg-white border border-gray-300 shadow-sm min-h-full rounded-sm p-4">
                        {children}
                    </div>
                </div>
            </main>

            {/* Status Bar */}
            <footer className="bg-gray-100 border-t border-gray-300 px-4 py-1 text-[10px] text-gray-500 flex justify-between items-center h-6">
                <div>
                    <span>Department: </span>
                    <span className="font-bold text-gray-700">General Practice</span>
                </div>
                <div>
                    <span>Server: </span>
                    <span className="font-bold text-gray-700">PRD-01</span>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
