import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import Logo from './Logo';
import NavRoute from './NavRoute';

type NavLinkType = {
    id: number;
    text: string;
    route: string;
    isPrivateRoute: boolean;
}


const navLinks: NavLinkType[] = [
  {id: 1, text: "score", route: '/score', isPrivateRoute: true},
  {id: 2, text: "leaderboard", route: '/leaderboard', isPrivateRoute: false},
  {id: 3, text: "discord", route: '/discord', isPrivateRoute: false},
  {id: 4, text: 'profile', route: '/profile', isPrivateRoute: true}
]

const Navbar = () => {
  const [activeLink, setActiveLink] = useState(0);
  const router = useRouter();
  const isUserLoggedIn = false;

  const handleLogoClick = useCallback(() => {
    setActiveLink(0);
    router.push('/')
  },[]);

  return (
    <nav className='px-20 py-10'>
      <div className='flex flex-row justify-between items-center bg-transparent'>
        <div onClick={handleLogoClick}>
          <Logo size='lg'/>
        </div>
        <div className='flex flex-row gap-12'>
           {navLinks.map(link => {
            return <NavRoute 
                key={link.id} 
                route={link.route} 
                className={`text-sm ${activeLink === link.id ? "border-b-2 border-white" :""} ${link.isPrivateRoute ? (isUserLoggedIn ? "visible" : "invisible") : "visible"}`} 
                onClick={() => setActiveLink(link.id)}>
                  {link.text}
                </NavRoute>
            
           })}

        </div>
      </div>
    </nav>
  )
}

export default React.memo(Navbar);