export function addHexPrefix(hex: string): string {
  return !hex.startsWith('0x') ? '0x' + hex : hex;
}

export function shortString(str: string, start = 4, end = 4) {
  const slen = Math.max(start, 1);
  const elen = Math.max(end, 1);

  return str.slice(0, slen + 2) + ' ... ' + str.slice(-elen);
}

export function shortAddress(address: string, start = 4, end = 4) {
  return shortString(addHexPrefix(address), start, end);
}