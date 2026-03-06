import React, { useState } from 'react';
import { Activity, Lock } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate network delay
        setTimeout(() => {
            onLogin();
            setIsLoading(false);
        }, 800);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200 relative overflow-hidden">
            {/* Background Abstract Shapes */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-2xl w-full max-w-md z-10 border border-white/50">
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-blue-600 p-3 rounded-full shadow-lg mb-4">
                        <Activity className="h-8 w-8 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Hyperspace 2023</h1>
                    <p className="text-sm text-gray-500 mt-1">Secure Health System Access</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Username</label>
                        <Input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="bg-white/50 border-gray-300 focus:ring-blue-500"
                            placeholder="Enter your ID"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Password</label>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-white/50 border-gray-300 focus:ring-blue-500"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Department</label>
                        <select className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <option>Family Medicine - Main</option>
                            <option>Pediatrics - North Wing</option>
                            <option>Urgent Care</option>
                        </select>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 shadow-md transition-all duration-200"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Authenticating...' : 'Log In'}
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                        <Lock className="h-3 w-3" />
                        <span>Authorized Use Only. All activity is monitored.</span>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-4 text-xs text-gray-500">
                v2023.11.0.1 | Server: PRD-01
            </div>
        </div>
    );
};

export default Login;
