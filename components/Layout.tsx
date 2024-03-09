import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react'
import Footer from './Footer';
import Navbar from './Navbar'

type LayoutProps = {
  children : React.ReactNode;
}

const Layout: React.FC<LayoutProps> =  ({children}) => { 

  const router = useRouter();

  const ordinoxBackground = useMemo(() => {
    if(router?.pathname === '/'){
      return "bg-paper"
    }

    if(router?.pathname === '/leaderboard'){
      return "bg-black"
    }

    return "bg-ordinox";
  }, [router?.pathname]);

  return (
    <article className="relative flex flex-col items-center w-screen h-screen font-spacemono bg-black text-secondryText">
      <div className={`flex flex-col items-center w-full h-full min-h-screen bg-fixed bg-cover ${ordinoxBackground}`}>
      <div className='flex flex-col w-full h-full z-20'>
        <header>
          <Navbar />
        </header>
        <section className='h-full w-full'>
          {children}
        </section>
      <div className='flex justify-center items-center mb-20'>
        {router.pathname!=="/leaderboard" && <Footer />}
      </div>
      </div>
      <div className="absolute inset-0 bg-gradient-radial bg-blend-overlay"></div>
      </div>
    </article>
  )
}

export default React.memo(Layout);