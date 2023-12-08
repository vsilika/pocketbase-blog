export const accountSlice = (set: any) => ({
  accountDataAll: (accountData: any) =>
    set((_state: any) => ({
      accountData,
    })),
});