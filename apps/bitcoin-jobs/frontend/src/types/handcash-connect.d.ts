declare module '@handcash/handcash-connect' {
  export class HandCashConnect {
    constructor(config: { appId: string; appSecret?: string });
    getAccountFromAuthToken(authToken: string): any;
  }
}