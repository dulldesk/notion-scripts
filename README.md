# notion-scripts

Notion scripts for setting up a database calendar for my courses.

- [`index.js`](./index.js) : creates pages from a json
- [`copy.js`](./copy.js) : duplicates pages from one database to another, with an optional filter
	- `DATABASE_ID` source database
	- `DATABASE_ID_COPY` destination database

.env file *(see [.env.example](./.env.example))*:
- `NOTION_TOKEN` notion api token ([docs](https://developers.notion.com/docs/authorization))
- `DATABASE_ID` the id of the database being worked with
	- go to a database, copy link; `https://www.notion.so/<username>/<database_id>?v=<view_id..?>`
- `DATABASE_ID_COPY`

## Setup

Create an "internal" Notion integration. [steps](https://www.notion.so/help/create-integrations-with-the-notion-api)

Add the api token to your `.env` file.

Then, for each database that the script will run for,
enable the automation workflow's access to the it via the "Connections" / "Connect to" menu option. [steps](https://www.notion.so/help/add-and-manage-connections-with-the-api)

Script usage: `node index.js`, `node copy.js`.
