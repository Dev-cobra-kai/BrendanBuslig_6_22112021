// Importer le package HTTP de node.js
const http = require("http");

// Importer l'application app.js
const app = require("./app");

// Paramètrage du port avec la méthode set de Express
app.set("port", process.env.PORT || 3000);

// Methode qui retourne une nouvelle instance de http.server
const server = http.createServer(app);

// Demarre le serveur HTTP et écoute les connexions
server.listen(process.env.PORT || 3000);

