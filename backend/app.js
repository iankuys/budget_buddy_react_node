const express = require('express');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 8080;
const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET;
const PLAID_ENV = process.env.PLAID_ENV || 'sandbox';

function getGreeting(req, res){
    const greeting = "Hello World!"
    res.send(greeting);
}

app.post("/post", (req, res) => {
    console.log("Connected to React");
    res.redirect("/");
  });

  
// Create a link token with configs which we can then use to initialize Plaid Link client-side.
// See https://plaid.com/docs/#create-link-token
app.post('/api/create_link_token', function (request, response, next) {
    Promise.resolve()
      .then(async function () {
        const configs = {
          user: {
            // This should correspond to a unique id for the current user.
            client_user_id: 'user-id',
          },
          client_name: 'Plaid Quickstart',
          products: PLAID_PRODUCTS,
          country_codes: PLAID_COUNTRY_CODES,
          language: 'en',
        };
  
        if (PLAID_REDIRECT_URI !== '') {
          configs.redirect_uri = PLAID_REDIRECT_URI;
        }
  
        if (PLAID_ANDROID_PACKAGE_NAME !== '') {
          configs.android_package_name = PLAID_ANDROID_PACKAGE_NAME;
        }
        console.log('Step 2: Request a link token from the Plaid service.')
        const createTokenResponse = await client.linkTokenCreate(configs);
        prettyPrintResponse(createTokenResponse);
        // send it back to the client
        response.json(createTokenResponse.data);
      })
      .catch(next);
  });

// Exchange token flow - exchange a Link public_token for
// an API access_token
// https://plaid.com/docs/#exchange-token-flow
app.post('/api/set_access_token', function (request, response, next) {
    PUBLIC_TOKEN = request.body.public_token;
    Promise.resolve()
      .then(async function () {
        console.log(`Step 6a: Server exchanges public token for an access token`);
        const tokenResponse = await client.itemPublicTokenExchange({
          public_token: PUBLIC_TOKEN,
        });
        prettyPrintResponse(tokenResponse);

        // TODO: You would want to save this in a DB (maybe like AWS)
        ACCESS_TOKEN = tokenResponse.data.access_token;
        ITEM_ID = tokenResponse.data.item_id;
        response.json({
          // the 'access_token' is a private token, DO NOT pass this token to the frontend in your production environment
          access_token: ACCESS_TOKEN,
          item_id: ITEM_ID,
          error: null,
        });
      })
      .catch(next);
  });

  
// Retrieve Transactions for an Item
// https://plaid.com/docs/#transactions
app.get('/api/transactions', function (request, response, next) {
    Promise.resolve()
      .then(async function () {
        // Set cursor to empty to receive all historical updates
        let cursor = null;
  
        // New transaction updates since "cursor"
        let added = [];
        let modified = [];
        // Removed transaction ids
        let removed = [];
        let hasMore = true;
        // Iterate through each page of new transaction updates for item
        while (hasMore) {
          const request = {
            access_token: ACCESS_TOKEN,
            cursor: cursor,
          };
          const response = await client.transactionsSync(request)
          const data = response.data;
          // Add this page of results
          added = added.concat(data.added);
          modified = modified.concat(data.modified);
          removed = removed.concat(data.removed);
          hasMore = data.has_more;
          // Update cursor to the next cursor
          cursor = data.next_cursor;
          prettyPrintResponse(response);
        }
  
        const compareTxnsByDateAscending = (a, b) => (a.date > b.date) - (a.date < b.date);
        // Return the 8 most recent transactions
        const recently_added = [...added].sort(compareTxnsByDateAscending).slice(-8);
        response.json({latest_transactions: recently_added});
      })
      .catch(next);
  });
  
// Define the "greetUser" endpoint
app.get('/greet', getGreeting);

app.listen(PORT, console.log(`Server started on port ${PORT}`));
