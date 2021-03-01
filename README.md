# clickup-tender

Warning: Do not use in production!

### Install the local servers dependencies

`cd server && npm install`

### Add API key

Create a .env file inside the server directory.

```
CLICKUP_TOKEN=pk_YOUR_TOKEN
CLICKUP_COOKIE=YOUR_COOKIE_COPY_FROM_CHROME
```

### Run the local server

`npm run start:server`

### Install the next.js dependencies

`npm install`

### Run next.js

`npm run dev`

### Endpoints

http://localhost:3000/ All stations
http://localhost:3000/devices All related devices
