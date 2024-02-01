import PostalMime from 'postal-mime';
import moment from 'moment-timezone';

async function streamToArrayBuffer(stream, streamSize) {
    let result = new Uint8Array(streamSize);
    let bytesRead = 0;
    const reader = stream.getReader();
    while (true) {
        const { done, value } = await reader.read();
        if (done) {
            break;
        }
        result.set(value, bytesRead);
        bytesRead += value.length;
    }
    return result;
}

export default {
    async email(message, env, ctx) {
        if (env.WHITELIST["address"].some(email => message.from === email) ||
            env.WHITELIST["domain"].some(domain => message.from.endsWith("@" + domain))) {
            const rawEmail = await streamToArrayBuffer(message.raw, message.rawSize);
            const parser = new PostalMime();
            const parsedEmail = await parser.parse(rawEmail);
            var dateStr = moment(parsedEmail.date).tz(env.TZ).format('YYYY-MM-DD HH:mm:ss ZZ')
            var fromStr = parsedEmail.from.address;
            if (parsedEmail.from.name) {
                fromStr = parsedEmail.from.name.trim() + ` <${fromStr}>`;
            }
            await fetch(env.NTFY_ENDPOINT, {
                method: "POST",
                body: `${parsedEmail.text.trim()}\n\nFrom: ${fromStr}\nDate: ${dateStr}`,
                headers: {
                    "Authorization": `Bearer ${env.NTFY_TOKEN}`,
                    "Title": parsedEmail.subject,
                    "Tags": "email",
                },
            });
        } else {
            await message.forward(env.FORWARD_TO);
        }
    }
}
