require('dotenv').config()
const { Client } = require("@notionhq/client")

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const LINE_UP = '\x1b[1A'
const LINE_CLEAR = '\x1b[2K'

// duplicate pages to a different database
async function duplicatePages() {
	const currentDate = new Date().toISOString().split('T')[0];
  const pages = await notion.databases.query({ database_id: process.env.DATABASE_ID,
  	filter: {
	    property: "Date",
	    date: {
	      on_or_after: currentDate
	    }
	  }
	});
	// Filter: https://developers.notion.com/reference/post-database-query-filter

  for (const page of pages.results) {
  	console.log(page.properties.Name.title[0].plain_text + " - " + page.properties.Tags.select.name);

    const props = {...page,
    	parent: {
    		type: "database_id",
    		database_id: process.env.DATABASE_ID_COPY
    	}
    };
    delete props.properties.Tags.select.id;

    await notion.pages.create(props);
    // break; // debug
  }
  console.log('done');
}

duplicatePages();
