const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
    console.log(`Request received: ${req.method} ${req.url}`);

    res.setHeader('Content-Type', 'text/html; charset = utf-8');

    // Common HTML template
    const getPage = (title, content) => `
    <!DOCTYPE html>
    <html>
    <head>
        <title>${title}</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background: linear-gradient(to right, #74ebd5, #acb6e5);
                margin: 0;
                padding: 0;
                text-align: center;
            }
            nav {
                background: #333;
                padding: 10px;
            }
            nav a {
                color: white;
                margin: 0 15px;
                text-decoration: none;
                font-weight: bold;
            }
            nav a:hover {
                color: yellow;
            }
            .container {
                margin-top: 50px;
            }
            .card {
                background: white;
                padding: 20px;
                margin: auto;
                width: 50%;
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            }
            footer {
                margin-top: 50px;
                padding: 10px;
                background: #333;
                color: white;
            }
        </style>
    </head>
    <body>

        <nav>
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
        </nav>

        <div class="container">
            <div class="card">
                <h1>${title}</h1>
                ${content}
                <p><b>Current Time:</b> ${new Date().toLocaleString()}</p>
            </div>
        </div>

        <footer>
            <p>Node.js Lab Server | Created by Samika</p>
        </footer>

    </body>
    </html>
    `;

    // Routing
    if (req.url === '/') {
        res.write(getPage("Welcome", `
            <p>This is your Node.js Web Server.</p>
            <p>Use the navigation bar to explore pages.</p>
        `));
    } 
    else if (req.url === '/about') {
        res.write(getPage("About 📘", `
            <p>This server is built using Node.js HTTP module.</p>
            <p>No external frameworks were used.</p>
        `));
    } 
    else if (req.url === '/contact') {
        res.write(getPage("Contact 📞", `
            <p>Email: samika@example.com</p>
            <p>Phone: 123-456-7890</p>
        `));
    } 
    else {
        res.write(getPage("404 ❌", `
            <p>Page not found.</p>
        `));
    }

    res.end();
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});