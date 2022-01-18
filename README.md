# Web-Monikers

Web Monikers is a full-stack react/express/sql multiplayer card game based on the game monikers, which is similar to charades. It has video, a user database/login/authentication, and customizable monikers cards so you tailor the game to your friend group.

# Installation

After downloading the repo, you must run

```
npm install
```

in both the frontend and backend folders

# Google Oauth

you must set up your own google Oauth api using the google cloud developer portal. Then you must create a .env file in the backend directory, with two lines...

```js
GOOGLE_CONSUMER_KEY=(your consumer key here)
GOOGLE_CONSUMER_SECRET(your consumer secret here)
```

# Running Locally

open two terminals. Navigate to the frontend folder and type 

```
npm start
```

and do the same in the backend folder with the second terminal