import { customAlphabet } from 'nanoid';

export function makeShortId(len: number = 10): string {
  const nanoid = customAlphabet('abcdefghijklmnopqrstuvxyz1234567890', len);

  return nanoid(len);
}
