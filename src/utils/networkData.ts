export function restUrl(chainId: string) {
  const URLS: Record<string, string> = {
    '1': 'https://api.mainnet.aptoslabs.com/v1',
    '2': 'https://api.testnet.aptoslabs.com/v1',
    // 4: 'https://testnet-node.devops.mom/v1',
    '33': 'https://fullnode.devnet.aptoslabs.com/v1',
  };
  if (!Object.keys(URLS).includes(chainId)) {
    throw new Error('Unknown network id');
  }
  return URLS[chainId];
}
