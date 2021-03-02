import React, { useMemo } from 'react';
import Router from '@/Router';
import Footer from '@/components/Footer';
import Wrapper from '@/components/Wrapper';
import Main from '@/components/Main';
import Header from '@/components/Header';
import FloatingBtn from './components/FloatingBtn';
import { useLocation } from 'react-router-dom';

const Layout: React.FC = () => {
    const { pathname } = useLocation();
    const isFloatingBtnDisplay = useMemo(() => {
        switch(true) {
            case /\/schedules\/register/.test(pathname):
                return false;
            case /\/schedules\/edit.*/.test(pathname):
                return false;
            default:
                return true;
        }
    }, [pathname])

    return (
        <Wrapper>
            <Header/>
            <Main>
                <Router/>
            </Main>
            {isFloatingBtnDisplay && (
                <FloatingBtn/>
            )}
            <Footer/>
        </Wrapper>
    )
}

export default Layout;