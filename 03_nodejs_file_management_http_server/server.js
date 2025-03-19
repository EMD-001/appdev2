const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const EventEmitter = require('events');


const emitter = new EventEmitter();

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;

    
    if (pathname === '/create' && query.filename) {
        const filePath = path.join(__dirname, query.filename);
        fs.writeFile(filePath, '', (err) => {
            if (err) {
                res.setHeader('Content-Type', 'text/plain');
                res.statusCode = 500;
                res.end('Error creating file');
                return;
            }
            emitter.emit('log', `File created: ${query.filename}`);
            res.setHeader('Content-Type', 'text/plain');
            res.statusCode = 200;
            res.end('File created');
        });
    } else if (pathname === '/read' && query.filename) {
        const filePath = path.join(__dirname, query.filename);
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.setHeader('Content-Type', 'text/plain');
                res.statusCode = 500;
                res.end('Error reading file');
                return;
            }
            res.setHeader('Content-Type', 'text/plain');
            res.statusCode = 200;
            res.end(data);
        });
    } else if (pathname === '/update' && query.filename && query.content) {
        const filePath = path.join(__dirname, query.filename);
        fs.appendFile(filePath, query.content, (err) => {
            if (err) {
                res.setHeader('Content-Type', 'text/plain');
                res.statusCode = 500;
                res.end('Error updating file');
                return;
            }
            emitter.emit('log', `File updated: ${query.filename}`);
            res.setHeader('Content-Type', 'text/plain');
            res.statusCode = 200;
            res.end('File updated');
        });
    } else if (pathname === '/delete' && query.filename) {
        const filePath = path.join(__dirname, query.filename);
        fs.unlink(filePath, (err) => {
            if (err) {
                res.setHeader('Content-Type', 'text/plain');
                res.statusCode = 500;
                res.end('Error deleting file');
                return;
            }
            emitter.emit('log', `File deleted: ${query.filename}`);
            res.setHeader('Content-Type', 'text/plain');
            res.statusCode = 200;
            res.end('File deleted');
        });
    } else {
        res.setHeader('Content-Type', 'text/plain');
        res.statusCode = 404;
        res.end('Route not found');
    }
});


const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
