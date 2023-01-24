export const getShortWalletString = (wallet: string, length = 6) => {
  return wallet.slice(0, length) + "..." + wallet.slice(-length);
};
