import { FloatingPanelProps, floatingPanelState } from './State';
import interact from "interactjs";
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const StyledFloatingPanel = styled.div`
  position: fixed;
  z-index: 50;
  pointer-events: all;

  right: 0;
`

const StyledFloatingPanelHeader = styled.div`
  padding: 0.1rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  & > span {
    pointer-events: none;
    font-size: .8rem;
  }
`

const StyledGrow = styled.div`
  width: 10rem;
`

const StyledFloatingPanelBody = styled.div`
  padding: 1rem;
`

const StyledCloseButton = styled.button`
  width: 25%;
`

const FloatingPanel = ({title, id, body}: FloatingPanelProps) => {
  const panelRef = useRef<HTMLDivElement>()
  const dragHandle = useRef<HTMLDivElement>()

  useEffect(() => {
    interact(panelRef.current).draggable({
      allowFrom: dragHandle.current,
      inertia: true,
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: 'parent',
          endOnly: true
        })
      ],
      listeners: {
        move: function(event) {
          var target = event.target
          // keep the dragged position in the data-x/data-y attributes
          var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
          var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

          // translate the element
          target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

          // update the posiion attributes
          target.setAttribute('data-x', x)
          target.setAttribute('data-y', y)
        }
      }
    })
  }, [])

  const closePanel = () => {
    floatingPanelState.destroyFloatingPanel(id)
  }

  return (
    <StyledFloatingPanel className={'panel sm-blur'} ref={panelRef}>
      <StyledFloatingPanelHeader ref={dragHandle} className={'panel title'}>
        <span>{title}</span>
        <StyledGrow></StyledGrow>
        <StyledCloseButton className={'btn danger'} onClick={() => closePanel()}>X</StyledCloseButton>
      </StyledFloatingPanelHeader>

      <StyledFloatingPanelBody>
        {body}
      </StyledFloatingPanelBody>
    </StyledFloatingPanel>
  )
}

export default FloatingPanel