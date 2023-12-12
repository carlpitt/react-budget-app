import express from "express";
import compression from "compression";
import { createConnection } from "mysql2";
import cors from "cors";
import { sign } from "jsonwebtoken";
import { hash, compare } from "bcrypt";
import { json } from "body-parser";

const port = process.env.port || 5000;
const secret = "hush";

const app = express();

app.use(json());
app.use(cors());
app.use(compression());

const db = createConnection({
    host: "sql5.freemysqlhosting.net", // 127.0.0.1
    user: "sql5669669",
    password: "jNXZxnTfas",
    database: "sql5669669",
});

db.connect((err) => {
    if (err) {
        console.error(`Unable to connect to MySQL: ${err}`);
    } else {
        console.log("Connected to MySQL");
    }
});

app.get("/budget", (req, res) => {
    const id = req.headers.userId;

    db.query("SELECT * FROM budgets WHERE id = ?", [id], (error, results) => {
        if (error) {
            res.status(500).send("Error fetching budget data");
        } else {
            res.json(results);
        }
    });
});

app.post("/createBudget", (req, res) => {
    const { title, budget, expense, color, id } = req.body;
    // console.log(req.body);

    db.query(
        "INSERT INTO budgets (title, budget, expense, color, id) VALUES (?, ?, ?, ?, ?)",
        [title, budget, expense, color, id],
        (error) => {
            if (error) {
                console.error(`Error inserting budget: ${error}`);
                res.status(500).send(
                    `Error creating new budget: ${error.message}`,
                );
                return;
            }
            console.log(`Received form data: ${req.body}`);
            res.send("Budget inserted successfully");
        },
    );
});

app.post("/api/signup", (req, res) => {
    const { username, password } = req.body;
    // console.log("old pass " + password);
    hash(password, 10, (err, hashedPassword) => {
        // console.log("new pass " + hashedPassword);
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Password hash failed" });
        }
        db.query(
            "INSERT INTO users (username, password) VALUES (?, ?)",
            [username, hashedPassword],
            (error) => {
                if (error) {
                    console.error(`Sign up failed: ${error}`);
                    res.status(500).json({ error: "Internal Server Error" });
                    return;
                }

                console.log(`Received data: ${req.body}`);
                res.json({ message: "Signup successful" });
            },
        );
    });
});

app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    db.query(
        "SELECT * FROM users WHERE username = ?",
        [username],
        (error, results) => {
            if (error) {
                console.error(`Login failed: ${error}`);
                res.status(500).json({
                    success: false,
                    token: null,
                    err: "Internal server error",
                });
                return;
            }
            if (results.length === 0) {
                res.status(401).json({
                    success: false,
                    token: null,
                    err: "Invalid credentials",
                });
                return;
            }

            // const user = results[0];
            compare(password, results[0].password, (err, passwordMatch) => {
                if (err) {
                    console.error(`Error comparing passwords: ${err}`);
                    res.status(500).json({
                        success: false,
                        token: null,
                        err: "Internal server error",
                    });
                    return;
                }

                if (passwordMatch) {
                    const userId = results[0].userId;
                    const token = sign({ userId: userId, username }, secret, {
                        expiresIn: "1m",
                    });
                    // test userId
                    console.log("Server response:", {
                        success: true,
                        err: null,
                        token,
                        userId: userId,
                    });
                    res.json({
                        success: true,
                        err: null,
                        token,
                        userId: userId,
                    });
                } else {
                    res.status(401).json({
                        success: false,
                        token: null,
                        err: "Invalid credentials",
                    });
                }
            });
        },
    );
});

// for getting specific entries
app.get("/budget/:userId/:budgetId", (req, res) => {
    const budgetId = req.params.budgetId;

    db.query(
        "SELECT * FROM budgets WHERE id = ?",
        [budgetId],
        (error, results) => {
            if (error) {
                console.error("error fetching budget data", error);
                res.status(500).send("error fetching budgeting data");
            } else {
                res.json(results[0]);
            }
        },
    );
});

app.delete("/delete/:userId/:budgetId", (req, res) => {
    // const userId = req.params.userId;
    const budgetId = req.params.budgetId;

    db.query(
        "DELETE FROM budgets WHERE userId = ? AND budgetId = ?",
        [budgetId], // userId
        (error) => {
            if (error) {
                console.error(`Error deleting data: ${error}`);
                res.status(500).send("Error deleting data");
            } else {
                res.send("Delete successful");
            }
        },
    );
});

// for updating entries
// work on now
app.put("/updateBudget/:userId/:budgetId", async (req, res) => {
    const toUpdate = req.params.budgetId;
    const userId = req.params.userId;

    db.query(
        "UPDATE budgets SET title = ?, budget = ?, expenses = ?, color = ? WHERE userId = ? AND budgetId = ?",
        [
            req.body.title,
            req.body.budget,
            req.body.expense,
            req.body.color,
            userId,
            toUpdate,
        ],
        (error, results) => {
            if (error) {
                console.error("Error updating data:", error);
                res.status(500).send("Error updating data");
            } else {
                res.status(200).send("updating successful");
            }
        },
    );
});

app.listen(port, () => {
    console.log(`API running on port http://localhost:${port}`);
});
