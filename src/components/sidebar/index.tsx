import { useEffect, useState } from "react";
import { LinkType, links } from "./links";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
    const pathName = usePathname();
    const index = links.findIndex((l) => l.link === pathName);

    const [currentIndex, setCurrentIndex] = useState(index);
    const isBrowser = typeof window !== 'undefined'

    const styles = {
        top: (isBrowser && window.innerWidth >= 640 ? (window.innerWidth >= 768 ? 52 : 48) : 0) * currentIndex,
        left: (isBrowser && window.innerWidth <= 640 ? currentIndex : 0) * 100 / 6 + '%',
        height: (isBrowser && window.innerWidth >= 768 ? '52px' : '48px')
    }

    useEffect(() => {
        setCurrentIndex(index);
    }, [index]);

    return (
        <aside className="fixed bg-background bottom-0 flex w-full justify-around sm:relative sm:h-full sm:w-14 sm:flex-col sm:justify-start md:mr-5  md:w-[250px]">
            <div
                className="absolute top-0 h-[52px] w-[17%] bg-primary !transition-all duration-500 sm:w-full rounded-full sm:rounded-none sm:rounded-l-full md:rounded-l-none md:rounded-r-full"
                style={styles}
            />
            {links.map((l: LinkType, index: number) => (
                <Link href={l.link} key={l.link}>
                    <div
                        className={`px-5 sm:px-0 w-full relative mx-auto flex h-12 sm:w-max cursor-pointer items-center gap-2 py-3 sm:gap-4 md:h-[52px] md:w-full md:px-5 md:text-lg ${currentIndex === index && "text-white"}`}
                    >
                        {l.icon}
                        <p className="hidden md:flex">{l.name}</p>
                    </div>
                </Link>
            ))}
        </aside>
    );
};
