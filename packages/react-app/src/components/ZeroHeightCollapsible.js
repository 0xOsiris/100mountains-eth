import styled from 'styled-components';
import React, { useState } from 'react';
import Collapsible from 'react-collapsible'

const Wrap = styled.div`
  margin: 30px 0;
  /**
   * Overwrite the contentInner padding + border
   * to ensure zero height.
   */
  .Collapsible__contentInner {
    padding: 0;
    border: 0;
  }
`;

const Title = styled.p`
  color: white;
  margin-bottom: 15px;
`;

const ZeroHeightCollapsible = () => {
  const [open, setOpen] = useState(false);

  const handleTriggerClick = () => {
    setOpen(!open);
  };

  return (
    <Wrap>
      <Title>Empty or Zero Height collapsible</Title>
      <Collapsible
        trigger={'open: ' + open}
        {...{ open, handleTriggerClick }}
      />
    </Wrap>
  );
};

export default ZeroHeightCollapsible;