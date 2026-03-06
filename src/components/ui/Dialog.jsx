import React from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

const Dialog = ({ open, onOpenChange, children }) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="fixed inset-0" onClick={() => onOpenChange(false)} />
            {children}
        </div>
    );
};

const DialogContent = ({ children, className }) => {
    return (
        <div className={cn("relative z-50 w-full max-w-lg rounded-lg bg-white p-6 shadow-lg animate-in fade-in-0 zoom-in-95", className)}>
            {children}
        </div>
    );
};

const DialogHeader = ({ children, className }) => {
    return (
        <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left mb-4", className)}>
            {children}
        </div>
    );
};

const DialogTitle = ({ children, className }) => {
    return (
        <h2 className={cn("text-lg font-semibold leading-none tracking-tight", className)}>
            {children}
        </h2>
    );
};

const DialogFooter = ({ children, className }) => {
    return (
        <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6", className)}>
            {children}
        </div>
    );
};

const DialogClose = ({ onClick, className }) => {
    return (
        <button
            onClick={onClick}
            className={cn("absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-slate-100 data-[state=open]:text-slate-500", className)}
        >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
        </button>
    )
}

export { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose };
