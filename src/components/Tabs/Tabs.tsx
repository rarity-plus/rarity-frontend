import React, { ReactElement, useState } from "react"
import TabTitle from "./TabTitle"
import styled from 'styled-components';

const StyledTabBody = styled.div`
  padding: 0.5em 0.5em;
`

const StyledTabsWrapper = styled.div`
  padding-top: 0.2em;
`

type Props = {
  children: ReactElement[]
}

const Tabs: React.FC<Props> = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState(0)

  return (
    <StyledTabsWrapper>
      <ul className={'flex'}>
        {children.map((item, index) => (
          <TabTitle
            key={index}
            title={item.props.title}
            index={index}
            setSelectedTab={setSelectedTab}
          />
        ))}
      </ul>
      <StyledTabBody className={'panel'}>
        {children[selectedTab]}
      </StyledTabBody>
    </StyledTabsWrapper>
  )
}

export default Tabs