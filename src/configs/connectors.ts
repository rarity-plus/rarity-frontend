import { ConnectorsType } from "./types";
import { InjectedConnector } from "@web3-react/injected-connector"

const Connectors: ConnectorsType = {
    "injected": {
        name: "Injected",
        connectorObject: new InjectedConnector({ supportedChainIds: [250] })
    }
}

export default Connectors