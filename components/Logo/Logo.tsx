import React from 'react';
import defaultLogo from '../Assets/logoImage';
import { usePageContext } from '../../renderer/usePageContext';

const Logo = (props: { size: string }) => {
  const { appearance } = usePageContext();

  const companyLogo = appearance?.logoAsset ? appearance?.logoAsset : defaultLogo;

  let logoElement;
  if (props.size === 'large') {
    logoElement = (
      <a href="/" className="flex w-12 h-auto">
        <img src={companyLogo} className="w-12 h-auto" />
      </a>
    );
  } else if (props.size === 'small') {
    logoElement = (
      <a href="/" className="flex w-12 h-auto">
        <img src={companyLogo} className="w-12 h-auto" />
      </a>
    );
  } else {
    logoElement = (
      <a href="/" className="flex w-12 h-auto">
        <img src={companyLogo} className="w-12 h-auto" />
      </a>
    );
  }

  return <>{logoElement}</>;
};

export default Logo;
