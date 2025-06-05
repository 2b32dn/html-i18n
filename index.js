const express = require("express");
const { Pool } = require("pg");

const app = express();
const port = 3000;
const cors = require("cors");

app.use(cors());

// Set up the PostgreSQL pool
const pool = new Pool({
	user: "postgres",
	host: "localhost",
	database: "restauranttest",
	password: "1234",
	port: 5432, // default PostgreSQL port
});

// Test DB connection
pool
	.connect()
	.then(() => console.log("Connected to PostgreSQL"))
	.catch((err) => console.error("Connection error", err.stack));

// Define a route to get menu items
app.get("/menu", async (req, res) => {
	try {
		const result = await pool.query(
			"select * from menu_categories mc right join menu_items mi on mc.id = mi.category_id "
		);
		res.json(result.rows);
	} catch (err) {
		console.error(err);
		res.status(500).send("Error fetching menu items");
	}
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
