import app from './app.js';

const root = document.getElementById('root');

if (root) {
    root.innerHTML = app();
}
