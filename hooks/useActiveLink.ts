import { usePathname } from "next/navigation";

const useActiveLink = (href: string) => {
    const pathname = usePathname();
    return pathname === href;
};

export default useActiveLink;
