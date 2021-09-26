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
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  & > span {
    pointer-events: none;
  }
`

const StyledFloatingPanelBody = styled.div`
  padding: 2px 2px;
`

const StyledCloseButton = styled.button`
  margin-left: 10px;
  padding: 1px 1px;
  height: 10px;
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
    <StyledFloatingPanel className={'panel black'} ref={panelRef}>
      <StyledFloatingPanelHeader ref={dragHandle} className={'panel black'}>
        <span>{title}</span>

        <StyledCloseButton className={'btn'} onClick={closePanel}>X</StyledCloseButton>
      </StyledFloatingPanelHeader>
      <StyledFloatingPanelBody>
        {body}
      </StyledFloatingPanelBody>
    </StyledFloatingPanel>
  )
}

export default FloatingPanel