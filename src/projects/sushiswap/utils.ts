import { AddressMappingResult, factoryAddressMapping } from "../../utils/addressMapping";
import { Pool, uniswapV2_Pair } from "../../utils/pool";
import { Pool__factory, SushiFactory, SushiFactory__factory, Pool as sushiswapPoolType } from "./types";
import { constants } from "@spockanalytics/base";

export const SUSHI_FACTORY = "0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac";
export const SUSHIPOOL_CONTRACT = "0x577959C519c24eE6ADd28AD96D3531bC6878BA34";

// pool interface
export const PoolInterface = Pool__factory.createInterface();
export const SushiFactoryInterface = SushiFactory__factory.createInterface();

// events
export const MINT = PoolInterface.getEventTopic(PoolInterface.getEvent("Mint"));
export const BURN = PoolInterface.getEventTopic(PoolInterface.getEvent("Burn"));

export enum Label {
  DEPOSIT = "Deposit",
  WIDTHDRAW = "Widthdraw",
}

export const sushiswapPool = new Pool(uniswapV2_Pair<sushiswapPoolType>(PoolInterface));

export async function pairAddresses(chain: constants.Chain, blockNumber?: number): AddressMappingResult {
  return await factoryAddressMapping<SushiFactory>({
    address: SUSHI_FACTORY ?? "",
    chain,
    contractInterface: SushiFactoryInterface,
    lengthFragment: "allPairsLength",
    addressFragment: "allPairs",
    blockNumber,
  });
}
