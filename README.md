# mail2ntfy

A Cloudflare Email Worker to transform mails into ntfy notifications.

## Usage

1. Rename `wrangler.example.toml` to `wrangler.toml`.
2. Set worker name and environment vars in `wrangler.toml`.
3. Set `NTFY_TOKEN` secret environment variable on Cloudflare Dashboard.
4. Run `npm install` to install dependencies.
5. Run `npx wrangler deploy` to deploy the worker.
6. Test and enjoy! :tada:

## Environment Variables

|     Name      | Usage                                                                                                                                                               |
| :-----------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|  FORWARD_TO   | A Catch-all address. Mail received from non-whitelisted senders will be forwarded to this address.                                                                  |
| NTFY_ENDPOINT | Ntfy Endpoint URL.                                                                                                                                                  |
|  NTFY_TOKEN   | Ntfy Token. Highly recommended to be configured as Secret / Encrypted                                                                                               |
|   WHITELIST   | A JSON object containing two lists.<br>The `address` list contains several email addresses.<br>The `domain` list contains several domains (without the "@" prefix). |
|      TZ       | Timezone                                                                                                                                                            |

## Credits

- [edevil/email_worker_parser](https://github.com/edevil/email_worker_parser)
- [postal-mime](https://github.com/postalsys/postal-mime)
- [moment](https://momentjs.com/)
