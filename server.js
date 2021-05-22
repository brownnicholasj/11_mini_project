// Dependencies

const express = require('express');
const path = require('path');

// Sets up the Express App

const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const tables = [
	{
		routeName: 'tables',
		id: 'guest1',
		name: 'Yoda',
		email: 'masterofjedi@jedimaster.com',
		phone: '913-111-1111',
	},
	{
		routeName: 'darthmaul',
		id: 'guest2',
		name: 'Darth Maul',
		email: 'sithlord@darkside.com',
		phone: '816-123-4567',
	},
	{
		routeName: 'obiwankenobi',
		id: 'guest3',
		name: 'Obi Wan Kenobi',
		email: 'obiwan@jedimaster.com',
		phone: '785-999-9999',
	},
];

const waitlist = [
	{
		routeName: 'tables',
		id: '10',
		name: 'Name3',
		email: '3@jedimaster.com',
		phone: '913-111-1111',
	},
	{
		routeName: 'darthmaul',
		id: '11',
		name: 'name4',
		email: '4@darkside.com',
		phone: '816-123-4567',
	},
	{
		routeName: 'obiwankenobi',
		id: '12',
		name: 'name5',
		email: '5@jedimaster.com',
		phone: '785-999-9999',
	},
];

// Routes

const router = express.Router();

// Basic route that sends the user first to the AJAX Page
router.get('/', (req, res) =>
	res.sendFile(path.join(__dirname, '/public/home.html'))
);

router.get('/reserve', (req, res) =>
	res.sendFile(path.join(__dirname, '/public/add.html'))
);

router.get('/tables', (req, res) =>
	res.sendFile(path.join(__dirname, '/public/view.html'))
);

// Displays all characters
router.get('/api/tables', (req, res) => res.json(tables));
router.get('/api/waitlist', (req, res) => res.json(waitlist));

// Displays a single character, or returns false
router.get('/api/tables/:tables', (req, res) => {
	const chosen = req.params.tables;

	console.log(chosen);

	/* Check each character routeName and see if the same as "chosen"
   If the statement is true, send the character back as JSON,
   otherwise tell the user no character was found */

	for (let i = 0; i < tables.length; i++) {
		if (chosen === tables[i].routeName) {
			return res.json(tables[i]);
		}
	}

	return res.json(false);
});

// Create New Characters - takes in JSON input
router.post('/api/tables', (req, res) => {
	// req.body hosts is equal to the JSON post sent from the user
	// This works because of our body parsing middleware
	const newReservation = req.body;

	// Using a RegEx Pattern to remove spaces from newCharacter
	// You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
	newReservation.routeName = newReservation.name
		.replace(/\s+/g, '')
		.toLowerCase();
	console.log(newReservation);

	tables.push(newReservation);
	res.json(newReservation);
});

router.post('/api/waitlist', (req, res) => {
	// req.body hosts is equal to the JSON post sent from the user
	// This works because of our body parsing middleware
	const newReservation = req.body;

	// Using a RegEx Pattern to remove spaces from newCharacter
	// You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
	newReservation.routeName = newReservation.name
		.replace(/\s+/g, '')
		.toLowerCase();
	console.log(newReservation);

	waitlist.push(newReservation);
	res.json(newReservation);
});

router.post('/api/clear', (req, res) => {
	waitlist.splice(0, waitlist.length);
	tables.splice(0, tables.length);
	res.end();
});

app.use(router);
// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
