import { extractEvent } from "../../utils/extraction";
import { expectContribution, expectExtraction } from "../../utils/testing";
import { mintEvent, burnEvent } from "./index";
import { Label, MINT, BURN, PoolInterface } from "./utils";
import { constants } from "@spockanalytics/base";

describe("sushiswap", () => {
  describe("chain => Ethereum", () => {
    describe("sushiswap", () => {
      it("should return contribution on mint", async () => {
        const protocolValue = await extractEvent({
          chain: constants.Chain.ETHEREUM,
          contractInterface: PoolInterface,
          hanlder: mintEvent,
          hash: "0x4a525a145482ba2b67aa2eb981655de147d5577d29818bd6b36e429b630abaa9",
          signature: MINT,
        });

        expectContribution(protocolValue, Label.DEPOSIT, "0x60dc560215610CF6809eac8517f2ac3e291A5086".toLowerCase());
      });

      it("should return extraction on burn", async () => {
        const protocolValue = await extractEvent({
          chain: constants.Chain.ETHEREUM,
          contractInterface: PoolInterface,
          hanlder: burnEvent,
          hash: "0x81a8d38f41611d5c78982fc7abdc17af3244cd3385084e3914f74ece7edb5765",
          signature: BURN,
        });

        expectExtraction(protocolValue, Label.WIDTHDRAW, "0x06454B31E7A1861765B08d7eD579e603B5b97CAa".toLowerCase());
      });
    });
  });
});
