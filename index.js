require('dotenv').config()
const { Client } = require("@notionhq/client")
const { DATA, TAG_COLORS } = require('./data')

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const LINE_UP = '\x1b[1A'
const LINE_CLEAR = '\x1b[2K'

const ICONS = {
	'Midterm': '📑',
	'Exam': '📑',
	'default': '📝',
	'Read': '📖',
	'Test': '✏️',
	'Quiz': '✏️',
}
function getIcon(n) {
	n = n.toLowerCase();
	if (n.includes("exam")) return ICONS.Exam;
	if (n.startsWith("tt") || n.startsWith("test")) return ICONS.Test;
	if (/q(uiz)?\s*\d*/.test(n)) return ICONS.Quiz;
	if (n.startsWith("read")) return ICONS.Read;
	if (n.endsWith("work")) return ICONS.Read;

	return ICONS.default;
}

async function create(title, start, course, end) {
	const date = { start, }
	if (end) date.end = end
	const response = await notion.pages.create({
		// "cover": {
		//     "type": "external",
		//     "external": {
		//         "url": "https://upload.wikimedia.org/wikipedia/commons/a/ad/Anas_platyrhynchos_juvenile_JdP_2013-06-14_n01_retusche.jpg"
		//     }
		// },
		"icon": {
			"type": "emoji",
			"emoji": ICONS[title.replace(/\s+\d+/, '')] || getIcon(title),
		},
		"parent": {
			"type": "database_id",
			"database_id": process.env.DATABASE_ID,
		},
		"properties": {
			"Name": {
				"title": [
					{
						"text": {
							"content": title
						}
					}
				]
			},
			"Date": {
				date
			},
			'Tags': {
				'select': {
					'color': TAG_COLORS[course],
					'name': course
				}
			},
			"Complete?": {
				"checkbox": false
			}
		},
		/*"children": [
			{
				"object": "block",
				"heading_2": {
					"rich_text": [
						{
							"text": {
								"content": "Lacinato kale"
							}
						}
					]
				}
			},
			{
				"object": "block",
				"paragraph": {
					"rich_text": [
						{
							"text": {
								"content": "Lacinato kale...",
								"link": {
									"url": "https://en.wikipedia.org/wiki/Lacinato_kale"
								}
							},
							"href": "https://en.wikipedia.org/wiki/Lacinato_kale"
						}
					],
					"color": "default"
				}
			}
		]*/
	});
	process.stdout.clearLine();
	process.stdout.cursorTo(0);
	process.stdout.write(`${course} ${title}`);
	if (!response.object || response.object === 'error') {
		console.error(response);
		return
	}
}

async function main() {
	// iterate
	for (let course of Object.keys(DATA)) {
		for (let d of DATA[course]) {
			await create(d[0], d[1], course, d[2])
		}
	}
	process.stdout.clearLine();
	process.stdout.cursorTo(0);
	console.log('done')
}
main()
