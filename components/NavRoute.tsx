import Link from 'next/link';
import React from 'react'
type DefaultLinkProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

type NavRouteProps = {
  children: React.ReactNode;
  route: string;
} & DefaultLinkProps;
const NavRoute: React.FC<NavRouteProps> = ({ children, route , className, ...anchorProps }) => {
  return (
    <Link href={route} {...anchorProps} className={`text-gray-100 uppercase ${className}`}>{children}</Link>
  )
}

export default NavRoute;