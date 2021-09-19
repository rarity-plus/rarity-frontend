import React, { useEffect, useState } from 'react';
import { floatingPanelState } from './State';
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

  const [canvasPanels, setCanvasPanels] = useState([])

  useEffect(() => {
    autorun(() => {
      setCanvasPanels([...floatingPanelState.currentFloatingPanels])
    })
    // autorun(() => {
    //     Object.keys(floatingPanelState.currentFloatingPanels).forEach((val, index) => {
    //       setCanvasPanels([...canvasPanels, { id: floatingPanelState.currentFloatingPanels[val].id, panelObj: floatingPanelState.currentFloatingPanels[val]['obj'] }])
    //     })
    // })

  }, [])


  return (
    <StyledPanelsCanvas>
      {
        canvasPanels.map((value, index) => {
          console.log(value)
            return <FloatingPanel key={index} id={value.id} title={value.obj.title} body={value.obj.body()} />
        })
      }
    </StyledPanelsCanvas>
  )
}

export default FloatingPanelsCanvas