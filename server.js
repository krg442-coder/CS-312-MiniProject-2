const express = require("express");
const axios = require("axios");

const app = express();
// Make file inside public available
app.use(express.static("public"));

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

// Send to index.ejs 
app.get("/", (req, res) => {
    res.render("index", { joke: null });
});

// Sends info to /get-joke
app.post("/get-joke", async (req, res) => {
    const name = req.body.name;

    let joke;

    try {
        const response = await axios.get(
            `https://v2.jokeapi.dev/joke/Any?contains=${encodeURIComponent(name)}&safe-mode`
        );


if (response.data.error) {
    joke = "Sorry, I couldn't find a joke for that word!";
}
else if (response.data.type === "single") {
    joke = response.data.joke;
}
else {
    joke = response.data.setup + " " + response.data.delivery;
}

    }
    catch (error) {
    joke = "The Eorzia messengers couldn't find a matching joke!";
}

    res.render("index", { name: name, joke: joke });
});

const PORT = 3001;

// Start server towards 3001 port
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${3001}`);
});