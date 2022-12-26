export function restUrl(chainId: string) {
  const URLS: Record<string, string> = {
    '1': 'https://aptos-mainnet.pontem.network/v1',
    '2': 'https://aptos-testnet.pontem.network/v1',
    // 4: 'https://testnet-node.devops.mom/v1',
    '33': 'https://fullnode.devnet.aptoslabs.com/v1',
  };
  if (!Object.keys(URLS).includes(chainId)) {
    throw new Error('Unknown network id');
  }
  return URLS[chainId];
}