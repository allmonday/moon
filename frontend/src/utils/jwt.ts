export function verifyExp(exp: number) {
  return Date.now() < exp * 1000;
}
