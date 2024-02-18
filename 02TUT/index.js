const fs = require('fs')
const path = require('path')

// it's better to use path.jpin -  cross-platform compatibility by properly joining the components. 
// fs.readFile('./files/starter.txt', 'utf8', (err, data) => {
fs.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
})

// first input, because readFile is async
console.log('Hello');

fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), 'Nice to meet you', (err) => {
  if (err) throw err;
  console.log('Write is completed');

  fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), '\nYes', (err) => {
    if (err) throw err;
    console.log('Append is completed');

    fs.rename(path.join(__dirname, 'files', 'reply.txt'), path.join(__dirname, 'files', 'newreply.txt'), (err) => {
      if (err) throw err;
      console.log('Rename is completed');
    })
  })
})

// ⬆️ Callback hell
// The fs/promises API provides asynchronous file system methods that return promises.
const fsPromises = require('fs').promises
const fileOps = async () => {
  try {
    console.log('Start async op')
    const data = await fsPromises.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf-8');
    console.log(data);
    await fsPromises.writeFile(path.join(__dirname, 'files', 'promise.txt'), data);
    await fsPromises.appendFile(path.join(__dirname, 'files', 'promise.txt'), '\nNice to meet you');
    await fsPromises.rename(path.join(__dirname, 'files', 'promise.txt'), path.join(__dirname, 'files', 'promiseCompleted.txt'));
    // unlink() - delete file
  } catch (err) {
    console.error(err);
  }
}

fileOps();

process.on('uncaughtException', err => {
  console.error(`There was uncaught error: ${err}`);
  process.exit(1)
})