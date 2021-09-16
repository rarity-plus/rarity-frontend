import { ethers } from 'ethers';
import network from '../config/network';
import _ from 'lodash';

const rpcNode = _.sample(network.rpcNodes)

export const jsonRpcProvider = new ethers.providers.JsonRpcProvider(rpcNode)