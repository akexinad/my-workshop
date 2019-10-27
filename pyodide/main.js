const scr = "print('hello world')";
const numpy = 'numpy';
const matplotlib = 'matplotlib';

const pythonScript = [
    `import ${numpy}`,
    `import ${matplotlib}`,
    '',
    `print(${numpy})`,
    `print(${matplotlib})`,
    '',
    'def sum(x, y):',
    '   z = x + y',
    '   print(z)',
    '',
    'sum(45, 55)',
    '',
    "print('the above number was calculated via a sum function.')"
].join('\n');



// ORIGINAL EXAMPLE CODE

// languagePluginLoader.then(() => {
//     pyodide.loadPackage('numpy').then(() => {
//         pyodide.runPython(
//             pythonScript
//         );
//     });
// });

async function getPyodide(script, packages = null) {
    await languagePluginLoader;

    if (!packages) {
        return pyodide.runPython(script);
    }
    
    await pyodide.loadPackage(packages)

    return pyodide.runPython(script);
};

const py = getPyodide(pythonScript, [numpy, matplotlib]);

console.log(py);