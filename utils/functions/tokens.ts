import { selectedNetwork } from "@/config/network";
import BigNumber from "bignumber.js";

export const formatTokenI = (tokenIdentifier: string): string => {
  if (!tokenIdentifier) {
    return "";
  }

  return tokenIdentifier.split("-")[0];
};

// slipapge is % number like 1% or 5%
export const calculateSlipageAmount = (
  slipapge: number,
  aproxAmount: string | number | BigNumber
): BigNumber => {
  const amountWithSlipage = new BigNumber(aproxAmount)
    .multipliedBy(slipapge)
    .dividedBy(100);

  const finalAmount = new BigNumber(aproxAmount).minus(amountWithSlipage);

  return finalAmount;
};

export const buildExplorerHashUrl = (txHash: string) => {
  return `${selectedNetwork.network.explorerAddress}/transactions/${txHash}`;
};
