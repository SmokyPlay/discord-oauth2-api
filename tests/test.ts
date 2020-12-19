//typescript testing
import Client from "../index";

const client = new Client({
  clientID: "id",
  clientSecret: "secret",
  redirectURI: "uri",
  scopes: ["scopes"],
});
