import fs from 'fs';

const config = JSON.parse(
  fs.readFileSync(new URL('../config.json', import.meta.url))
);

export async function checkUsername(cycleTLS, username, token) {
  try {
    const response = await cycleTLS(config.CHECK_URL, {
      body: JSON.stringify({ username }),
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
        'User-Agent': config.USER_AGENT,
        'X-Super-Properties': config.X_SUPER_PROPERTIES,
        'X-Discord-Locale': 'en-US',
        'Referer': 'https://discord.com/channels/@me',
      },
      ja3: '771,4865-4867-4866-49195-49199-52393-52392-49196-49200-49162-49161-49171-49172-51-57-47-53-10,0-23-65281-10-11-35-16-5-51-43-13-45-28-21,29-23-24-25-256-257,0'
    }, 'post');

    if (response.status === 200 && response.body.taken === false) {
      console.log(`✅ @${username} is available!`);
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
}
