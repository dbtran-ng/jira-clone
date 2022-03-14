import React from 'react';
import ContentMain from './Main/ContentMain';
import HeaderMain from './Main/HeaderMain';
import InfoMain from './Main/InfoMain';

export default function indexCyberBugs() {
  return (
    <div className="main">
      <HeaderMain />

      <InfoMain />

      <ContentMain />
    </div>
  );
}
