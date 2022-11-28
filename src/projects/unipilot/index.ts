import { Chain } from "../../constants/chains";
import { Adapter } from "../../types/adapter";
import { Event } from "../../types/event";
import { Staking__factory, Vault__factory } from "./types";
import { StakeOrUnstakeOrClaimEventObject } from "./types/Staking";
import { DepositEventObject, WithdrawEventObject } from "./types/Vault";

const vault = Vault__factory.createInterface();
const staking = Staking__factory.createInterface();

const DEPOSIT = vault.getEventTopic(vault.getEvent("Deposit"));
const WITHDRAW = vault.getEventTopic(vault.getEvent("Withdraw"));
const STAKE_OR_UNSTAKE_OR_CLAIN = staking.getEventTopic(staking.getEvent("StakeOrUnstakeOrClaim"));

async function depositEvent(event: Event<DepositEventObject>) {
  console.log("unipilot depositEvent => ", event);
}

async function withdrawEvent(event: Event<WithdrawEventObject>) {
  console.log("unipilot withdrawEvent => ", event);
}

async function stakeOrUnsatkeEvent(event: Event<StakeOrUnstakeOrClaimEventObject>) {
  console.log("unipilot stakeOrUnsatkeEvent => ", event);
}

const unipilotAdapter: Adapter = {
  appKey: "08019e5ae0b9b6964c2317c26a4b8666d4ac357b0060c3b6e9fb680b4465f693",
  transformers: {
    [Chain.ETHEREUM]: [
      {
        contract: vault,
        eventHandlers: {
          [DEPOSIT]: depositEvent,
          [WITHDRAW]: withdrawEvent,
        },
        startBlock: 14495907,
      },
      {
        address: "0xc9256e6e85ad7ac18cd9bd665327fc2062703628",
        contract: staking,
        eventHandlers: {
          [STAKE_OR_UNSTAKE_OR_CLAIN]: stakeOrUnsatkeEvent,
        },
        startBlock: 15025220,
      },
    ],
  },
};

export default unipilotAdapter;
