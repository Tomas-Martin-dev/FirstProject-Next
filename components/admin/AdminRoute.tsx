"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

type Prop = {
    link: {
        url: string;
        text: string;
        blank: boolean;
    }
}
export default function AdminRoute({ link }: Prop) {
    const pathname = usePathname();
    const isActive = pathname.startsWith(link.url);
    
    return (
        <Link
            className={`font-medium border-t border-gray-200 p-3 text-lg last-of-type:border-b ${isActive ? "bg-amber-400" : ""}`}
            href={link.url}
            target={link.blank ? "_blank" : ""}
        >{link.text}</Link>
    )
}
