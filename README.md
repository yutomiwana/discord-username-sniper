<<<<<<< HEAD
# Discord Username Sniper

A high-performance Discord username sniper designed to monitor and claim usernames the moment they become available.

## Optimizations
- **Parallel Monitoring:** Checks all usernames simultaneously using `Promise.all`.
- **CycleTLS Engine:** Uses a high-speed Go-powered TLS engine with browser-like JA3 fingerprinting to bypass anti-bot detection.
- **Graceful Shutdown:** Cleans up background processes automatically on exit.

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-friend-repo/discord-username-sniper.git
   cd discord-username-sniper
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

1. Edit `tokens.txt` (Format: `TOKEN:PASSWORD` per line).
2. Add target username(s) to `usernames.txt` (one per line).
3. Ensure `config.json` contains your API URLs and telemetry metadata.
=======
# Discord Username Claimer

Monitor and claim a Discord username the moment it becomes available.

## Features 

- supports multiple usernames
- multi token
- ultra fast
- spoof and bypass discords anti-bot detection with JA3 fingerprints 
- safe to use on main tokens
- uses UDP/QUIC3 for claiming and checking ( bypasses ratelimit and insanely faster than TCP/HTTPS )


## Setup

```bash
git clone https://github.com/yutomiwana/discord-username-sniper.git
cd discord-username-sniper
npm install
```

## Configuration

1. Edit `tokens.txt` and set your token and password:
   ```txt
   TOKEN:PASSWORD 
   TOKEN2:PASSWORD2
   ```

2. Add target username(s) to `usernames.txt` (one per line)

> Token count must match username count — each token is paired with the username on the same line.
>>>>>>> upstream/main

## Usage

```bash
<<<<<<< HEAD
npm start
```

node index.js
```

## File Structure

```
index.js        — entry point
config.json     — password and API config
tokens.txt      — Discord tokens (one per line)
usernames.txt   — target usernames (one per line)
check.js        — checks username availability using discord internal UDP underlayed api 
claim.js        — claims the username
```

## Notes

- Use Discord's ToS at your own risk
>>>>>>> upstream/main
