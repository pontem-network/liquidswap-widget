export function composeType(address: string, generics: string[]): string;

export function composeType(
  address: string,
  struct: string,
  generics?: string[],
): string;

export function composeType(
  address: string,
  module: string,
  struct: string,
  generics?: string[],
): string;

export function composeType(address: string, ...args: unknown[]): string {
  const generics: string[] = Array.isArray(args[args.length - 1])
    ? (args.pop() as string[])
    : [];
  const chains = [address, ...args].filter(Boolean);

  let result: string = chains.join('::');

  if (generics && generics.length) {
    result += `<${generics.join(',')}>`;
  }

  return result;
}

export function extractAddressFromType(type: string) {
  return type.split('::')[0];
}