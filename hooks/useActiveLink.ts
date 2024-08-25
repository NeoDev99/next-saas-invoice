import { usePathname } from 'next/navigation';

const useActiveLink = (href: string, activeClassName: string, inactiveClassName: string) => {
    const pathname = usePathname();
    return pathname === href ? activeClassName : inactiveClassName;
};

export default useActiveLink;
