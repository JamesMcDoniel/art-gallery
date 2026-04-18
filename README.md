# Environment(-ish) Variable

You'll need to configure the backend server's URL before the API can be reached.

Instead of using a `.env` file, I chose to include a `config.js` file in the `/public` folder that doesn't require building and re-building to change the values.

After the project is built, in the `/dist` folder that contains the static files to host, you'll find a `config.example.js` file.

Edit the value of the `API_URL:` property to the URL of the hosted Backend server, and save changes.

Next, rename the file from `config.example.js` to `config.js`.

Now the project is ready to be uploaded where ever it gets hosted.
