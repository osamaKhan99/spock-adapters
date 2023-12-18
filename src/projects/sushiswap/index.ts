import { sumBalancesUSD } from "../../utils/sumBalances";
import { MintEventObject, BurnEventObject } from "./types/Pool";
import { BURN, Label, MINT, PoolInterface, pairAddresses, sushiswapPool } from "./utils";
import { constants, types, utils } from "@spockanalytics/base";

export async function mintEvent(event: types.Event<MintEventObject>) {
  const pool = await sushiswapPool.getPool(event.address, event.chain);

  if (pool) {
    const [block, transaction] = await Promise.all([event.block, event.transaction]);
    const totalSum = await sumBalancesUSD(
      [
        { token: pool.token0, balance: event.params.amount0 },
        { token: pool.token1, balance: event.params.amount1 },
      ],
      event.chain,
      block.timestamp,
    );
    return utils.ProtocolValue.contribution({
      label: Label.DEPOSIT,
      value: parseFloat(totalSum.toString()),
      user: transaction.from,
    });
  }
}

export async function burnEvent(event: types.Event<BurnEventObject>) {
  const pool = await sushiswapPool.getPool(event.address, event.chain);

  if (pool) {
    const [block, transaction] = await Promise.all([event.block, event.transaction]);
    const totalSum = await sumBalancesUSD(
      [
        { token: pool.token0, balance: event.params.amount0 },
        { token: pool.token1, balance: event.params.amount1 },
      ],
      event.chain,
      block.timestamp,
    );
    return utils.ProtocolValue.extraction({
      label: Label.WIDTHDRAW,
      value: parseFloat(totalSum.toString()),
      user: transaction.from,
    });
  }
}

const sushiswapAdapter: types.Adapter = {
  appKey: "",
  transformers: {
    [constants.Chain.ETHEREUM]: [
      {
        contract: PoolInterface,
        getAddresses: pairAddresses,
        eventHandlers: {
          [MINT]: mintEvent,
          [BURN]: burnEvent,
        },
        startBlock: 11962334,
      },
    ],
  },
};

export default sushiswapAdapter;
