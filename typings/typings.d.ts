export = Client;
declare class Client {
  constructor(...args: any[]);

  getAccessToken(...args: string[]): void;

  getGuilds(...args: any[]): void;

  getUser(...args: string[]): void;

  refreshToken(...args: any[]): void;
}
