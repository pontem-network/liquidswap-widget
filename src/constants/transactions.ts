export const SWAP_WIDGET_FEE_CONTRACT_ADDRESS = '0x57d91c5fbebfdc3d0f42490db87e317c700e1248db8d46f1a8c7e735e835ba0b';
export const SWAP_WIDGET_FEE_SCRIPT = 'fee_on';
export const SWAP_WIDGET_FEE_SWAP_FUNCTION_V0 = 'wallet_swap_exact_coin_for_coin_v0';
export const SWAP_WIDGET_FEE_SWAP_FUNCTION_V05 = 'wallet_swap_exact_coin_for_coin_v05';
export const SWAP_WIDGET_FEE_SWAP_INTO_FUNCTION_V0 = 'wallet_swap_coin_for_exact_coin_v0';
export const SWAP_WIDGET_FEE_SWAP_INTO_FUNCTION_V05 = 'wallet_swap_coin_for_exact_coin_v05';
export const SWAP_WIDGET_CONTRACT = `${SWAP_WIDGET_FEE_CONTRACT_ADDRESS}::${SWAP_WIDGET_FEE_SCRIPT}`;
export const SWAP_WIDGET_DECIMAL = 2;
export const SWAP_FEE_STRUCT = new Map([
  ['scripts::swap', `${SWAP_WIDGET_CONTRACT}::${SWAP_WIDGET_FEE_SWAP_FUNCTION_V05}`],
  ['scripts_v2::swap', `${SWAP_WIDGET_CONTRACT}::${SWAP_WIDGET_FEE_SWAP_FUNCTION_V0}`],
  ['scripts::swap_into', `${SWAP_WIDGET_CONTRACT}::${SWAP_WIDGET_FEE_SWAP_INTO_FUNCTION_V05}`],
  ['scripts_v2::swap_into', `${SWAP_WIDGET_CONTRACT}::${SWAP_WIDGET_FEE_SWAP_INTO_FUNCTION_V0}`]
]);
