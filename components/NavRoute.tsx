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
const NavRoute: React.FC<NavRouteProps> = ({ children, route, className, ...anchorProps }) => {
  return (
    <Link href={route} {...anchorProps} className={`uppercase ${className} select-none`}>{children}</Link>
  )
}

export default NavRoute;