import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

export function hashing(text: string): Promise<string> {
  return bcrypt.hash(text, saltOrRounds);
}

export function checkHashing(text: string, hash: string): Promise<boolean> {
  return bcrypt.compare(text, hash);
}
