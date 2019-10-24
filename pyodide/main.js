console.log('hello');

const pyScript = [
    'def hello():',
    '   x = 2',
    '   y = 2',
    '   z = x + y',
    '   print(z)',
    '',
].join('\n');


console.log(pyScript);


languagePluginLoader.then(() => {
    pyodide.loadPackage('numpy').then(() => {
        pyodide.runPython(
            pyScript
        );
    })
});