import React, { useEffect, useState } from 'react';
import { FloatingPanelState, floatingPanelState } from './State';
import { autorun } from 'mobx';
import FloatingPanel from './FloatingPanel';
import styled from 'styled-components';

const StyledPanelsCanvas = styled.div`
  //position: relative;
  z-index: 50;
  width: 100%;
  height: 100%;
  position: fixed;
  pointer-events: none;
`

const FloatingPanelsCanvas = () => {

  const [canvasPanels, setCanvasPanels] = useState({})

  useEffect(() => {
    autorun(() => {
      setCanvasPanels({...floatingPanelState.currentFloatingPanels})
    })
  }, [])


  return (
    <StyledPanelsCanvas>
      {

        Object.keys(canvasPanels).map((value, index) => {
          const panelInfo = FloatingPanelState.FloatingPanels[value]

          return <FloatingPanel key={value} id={value} title={panelInfo.title} body={panelInfo.body} />
        })
      }
    </StyledPanelsCanvas>
  )
}

export default FloatingPanelsCanvas