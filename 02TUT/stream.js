const fs = require('fs')

const rs = fs.createReadStream('./files/lorem.txt', {encoding:'utf-8'});
const ws = fs.createWriteStream('./files/new-lorem.txt');

// rs.on('data', (chunck => {
//   ws.write(chunck);
// }))

// the same as code above 
rs.pipe(ws);