"use client"

import { ArrowLongDownIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";

export default function ButtonBotom() {
    const [ isVisible, setIsVisible] = useState(false)
    
    const handleClick = () => {
        console.log("llamo funcion");
        const orderSumarry = document.getElementById('summary');
        if (orderSumarry) {
            console.log("hay order");
            orderSumarry.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const target = document.getElementById('summary');
        if (!target) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            {
                threshold: 0.4, 
            }
        );

        observer.observe(target);

        return () => {
            observer.unobserve(target);
        };
    }, []);

    return (
        <button
            className={`fixed bottom-8 flex right-8 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition duration-150 cursor-pointer lg:hidden ${isVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            onClick={handleClick}
        >
            <ArrowLongDownIcon width={20} />
            Pedido
        </button>
    );
}