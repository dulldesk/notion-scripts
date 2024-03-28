require('dotenv').config()
const { Client } = require("@notionhq/client")

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const LINE_UP = '\x1b[1A'
const LINE_CLEAR = '\x1b[2K'

const TAG_COLORS = {
	cs251: "red"
}
// blue
// brown
// default
// gray
// green
// orange
// pink
// purple
// red
// yellow

// gen.py to generate
const DATA = {
	cs251: [
		// ['A1', '2024-01-19'],
		// ['A2', '2024-02-02'],
		// ['A3', '2024-02-09'],
		// ['A4', '2024-03-01'],
		// ['A5', '2024-03-15'],
		// ['A6', '2024-03-29'],
		// ['A7', '2024-04-05'],
		//
		// ['T1', '2024-01-10'],
		// ['T2', '2024-01-17'],
		// ['T3', '2024-01-24'],
		// ['T4', '2024-01-31'],
		// ['T5', '2024-02-07'],
		// ['T6', '2024-02-14'],
		// ['T7', '2024-02-28'],
		// ['T8', '2024-03-06'],
		// ['T9', '2024-03-13'],
		// ['T10', '2024-03-20'],
		// ['T11', '2024-03-27'],
		// ['T12', '2024-04-03'],
		// ['Midterm', '2024-02-15T16:30:00-05:00','2024-02-15T18:20:00-05:00'],
		// ['Exam', '2024-04-23T09:00:00-04:00','2024-04-23T11:30:00-04:00'],
	],
}

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
	if (n.startsWith("TT") || n.startsWith("Test") || n.includes("Exam")) return ICONS.Test;
	if (n.startsWith("Quiz") || (n[0] === 'Q' && !isNaN(n[1]))) return ICONS.Quiz;
	if (n.startsWith("read")) return ICONS.Read;

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
			"emoji": ICONS[title] || getIcon(title),
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
