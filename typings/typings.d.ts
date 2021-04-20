export = Client;
declare class Client {
  constructor(...args: any[]);

  getAccessToken(...args: string[]): Promise<any>;

  getGuilds(...args: any[]): Promise<any>;

  getUser(...args: string[]): Promise<any>;

  refreshToken(...args: any[]): Promise<any>;
}
