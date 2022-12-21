import React from 'react';
import { usePageContext } from '../../renderer/usePageContext';

const Avatar = (props: { size: string }) => {
  const pageContext = usePageContext();
  const { currentUser } = pageContext;

  let avatarSize;
  if (props.size === 'large') {
    avatarSize = avatarSize = 'h-13 w-13';
  } else if (props.size === 'small') {
    avatarSize = avatarSize = 'h-9 w-9';
  } else {
    avatarSize = 'h-8 w-8';
  }

  let snippet;

  // if currentUser.asset
  if (currentUser?.asset) {
    // return the users avatar
    snippet = <img src={currentUser?.asset} className={`${avatarSize} rounded-full`} />;
  } else {
    // return the initals
    try {
      if (currentUser?.firstName && currentUser?.lastName) {
        const userInitials =
          currentUser?.firstName.split('')[0] + currentUser?.lastName.split('')[0];
        snippet = (
          <div className={`${avatarSize} bg-slate-50 rounded-full text-sm flex justify-center items-center border `}>
            <div className="">{userInitials}</div>
          </div>
        );
      }
    } catch (err) {
      snippet = err;
    }
  }
  return <>{snippet}</>;
};

export default Avatar;
