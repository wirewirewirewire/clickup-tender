# clickup-tender

Create custom react websites out of ClickUp Information using the official API and the internal API (to get formatted content). We are using it internally to create pdfs for tenders directly from ClickUp.

## Warning: Do not use in production!

### Install the local servers dependencies

`cd server && npm install`

### Add API key

Create a .env file inside the server directory.

```
CLICKUP_TOKEN=pk_YOUR_TOKEN
CLICKUP_COOKIE=YOUR_COOKIE_COPY_FROM_CHROME
```

### Run the local server

Make sure you run this command in the main directory.

`npm run start:server`

### Install the next.js dependencies

`npm install`

### Run next.js

`npm run dev`

### Endpoints

http://localhost:3000/ All stations
http://localhost:3000/devices All related devices
