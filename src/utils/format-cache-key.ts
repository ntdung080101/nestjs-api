export const formatLoginCache = (code: string) => {
  return `_login_by_account_${code}`;
};
export const formatRegisterCache = (gmail: string) => {
  return `_register_by_gmail_${gmail}`;
};
