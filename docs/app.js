const demo = new GDemo('#animation');

const code = `
function greet(){
  console.log("Hello World!");
}

greet();
`

demo
  .openApp('editor', {minHeight: '350px', windowTitle: 'demo.js'})
  .write(code, {onCompleteDelay: 1500})
  .openApp('terminal', {minHeight: '350px', promptString: '$'})
  .command('node ./demo', {onCompleteDelay: 500})
  .respond('Hello World!')
  .command('')
  .end();