"use client"
import { useState, useEffect } from 'react';

interface ClockProps {
    format?: '12' | '24';
    showSeconds?: boolean;
    showDate?: boolean;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'digital' | 'minimal' | 'card';
}

export default function Clock({ format, showSeconds, showDate, className, size, variant}: ClockProps) {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (date: Date) => {
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');

        if (format === '12') {
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12; // 0 should be 12
            const timeString = showSeconds
                ? `${hours}:${minutes}:${seconds} ${ampm}`
                : `${hours}:${minutes} ${ampm}`;
            return timeString;
        } else {
            const hoursStr = hours.toString().padStart(2, '0');
            return showSeconds ? `${hoursStr}:${minutes}:${seconds}` : `${hoursStr}:${minutes}`;
        }
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getSizeClasses = () => {
        switch (size) {
            case 'sm':
                return 'text-lg';
            case 'lg':
                return 'text-4xl md:text-5xl';
            default:
                return 'text-2xl md:text-3xl';
        }
    };

    if (variant === 'minimal') {
        return (
            <div className={`font-mono ${getSizeClasses()} ${className}`}>
                {formatTime(time)}
            </div>
        );
    }

    if (variant === 'card') {
        return (
            <div className={`bg-gray-900 text-green-400 p-4 rounded-lg shadow-lg ${className}`}>
                <div className={`font-mono ${getSizeClasses()} text-center`}>
                    {formatTime(time)}
                </div>
                {showDate && (
                    <div className="text-sm text-gray-300 text-center mt-2">
                        {formatDate(time)}
                    </div>
                )}
            </div>
        );
    }

    // Variant 'digital' - default
    return (
        <div className={`bg-black text-green-400 px-4 py-2 rounded border-2 border-gray-700 font-mono ${className}`}>
            <div className={`${getSizeClasses()} text-center leading-none`}>
                {formatTime(time)}
            </div>
            {showDate && (
                <div className="text-xs text-gray-400 text-center mt-1">
                    {formatDate(time).toUpperCase()}
                </div>
            )}
        </div>
    );
}