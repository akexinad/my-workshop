const pyScript = [
    'def sum(x, y):',
    '   z = x + y',
    '   print(z)',
    '',
    'sum(45, 55)',
    "print('the above was calculated via a sum function.')"
].join('\n');

const scr = "print('hello world')";

// languagePluginLoader.then(() => {
//     pyodide.loadPackage('numpy').then(() => {
//         pyodide.runPython(
//             pyScript
//         );
//     });
// });

const jython = async function getPyodide(script) {
    await languagePluginLoader;
    return pyodide.runPython(script);
};

const py = jython(pyScript);

console.log(py);