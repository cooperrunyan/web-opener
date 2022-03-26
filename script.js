#!/usr/bin/env node

const opn = require('opn');
const searchQuery = process.argv.slice(2);
opn(searchQuery[0] ? `https://google.com/search?q=${searchQuery.join('+')}` : `https://google.com`);
