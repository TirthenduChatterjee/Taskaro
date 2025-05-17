import React, { useMemo } from 'react';
import { LogOut } from "lucide-react";
import { useNavigate, useLocation } from 'react-router-dom';

const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const getContrastColor = (hexColor) => {
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 125 ? '#000000' : '#ffffff';
};

const SideBar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // ✅ Memoize the random color and contrast color
    const avatarColor = useMemo(() => {
        const random = getRandomColor();
        return {
            bg: random,
            text: getContrastColor(random)
        };
    }, []);

    const userName = JSON.parse(localStorage.getItem('user'))?.name || '';

    const isActive = (path) => location.pathname === path;

    const baseStyle = "text-base w-full p-3 rounded-xl cursor-pointer text-left";
    const activeStyle = "bg-muted text-primary";
    const inactiveStyle = "text-foreground hover:text-primary hover:bg-muted";

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        navigate('/', { replace: true });
    };

    return (
        <div className='flex w-full flex-col pt-8 items-center h-full'>
            <div className="flex justify-center items-center gap-6">
                <div
                    className={`rounded-full h-28 w-28 flex items-center justify-center text-5xl tracking-wider font-bold`}
                    style={{ backgroundColor: avatarColor.bg, color: avatarColor.text }}
                >
                    {userName ? userName[0].charAt(0).toUpperCase() : ''}
                    {userName ? userName.split(' ')[1]?.charAt(0).toUpperCase() : ""}
                </div>
            </div>

            <h1 className="text-2xl font-bold text-center mt-4">
                {userName ? userName.split(' ')[0] : ''}
            </h1>

            <div className="flex flex-col items-center mt-8 w-full space-y-3">
                <div
                    className={`${baseStyle} ${isActive('/today') ? activeStyle : inactiveStyle}`}
                    onClick={() => navigate('/today')}
                >
                    Today's Tasks
                </div>
                <div
                    className={`${baseStyle} ${isActive('/allTask') ? activeStyle : inactiveStyle}`}
                    onClick={() => navigate('/allTask')}
                >
                    All Tasks
                </div>
            </div>

            <footer className='mt-auto w-full'>
                <div
                    className="text-lg text-muted-foreground p-3 rounded-xl cursor-pointer text-left flex items-center gap-2.5"
                    onClick={handleLogout}
                >
                    <LogOut />
                    Sign Out
                </div>
            </footer>
        </div>
    );
};

export default React.memo(SideBar);
