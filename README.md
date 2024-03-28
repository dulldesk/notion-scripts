# notion-scripts

Notion scripts for setting up a database calendar for my courses.

- [`index.js`](./index.js) : creates pages from a json
- [`copy.js`](./copy.js) : duplicates pages from one database to another, with an optional filter
	- `DATABASE_ID` source database
	- `DATABASE_ID_COPY` destination database

.env file:
- `NOTION_TOKEN` notion api token ([docs](https://developers.notion.com/docs/authorization))
- `DATABASE_ID` the id of the database being worked with
	- go to a database, copy link; `https://www.notion.so/<username>/<database_id>?v=<view_id..?>`
- `DATABASE_ID_COPY`
*(see [.env.example](./.env.example))*
