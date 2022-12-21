import React from 'react';
import { usePageContext } from '../../renderer/usePageContext';
import CurrentUserNavBar from './CurrentUserNavBar';
import UserLoginNavBar from './UserLoginNavBar';

const NavBar = () => {
  const pageContext = usePageContext();
  const { currentUser } = pageContext;

  let navbar;
  if (currentUser) {
    // signed in
    navbar = (
      <>
      <div className="bg-white">
        <header className="border-b">
            <CurrentUserNavBar />
        </header>
      </div>  
      </>
    );
  } else {
    // signed out
    navbar = <UserLoginNavBar />;
  }
  return navbar;
};

export default NavBar;
