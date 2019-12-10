const scr = "print('hello world')";
const numpy = 'numpy';
const matplotlib = 'matplotlib';
const scipy = 'scipy';
const pandas = 'pandas';

// ORIGINAL EXAMPLE CODE

// languagePluginLoader.then(() => {
//     pyodide.loadPackage('numpy').then(() => {
//         pyodide.runPython(
//             pythonScript
//         );
//     });
// });

const pythonScript = [
    `import ${numpy}`,
    `import ${matplotlib}`,
    '',
    `print(${numpy})`,
    `print(${matplotlib})`,
    '',
    'x = 45',
    'y = 55',
    'def sum(x, y):',
    '   z = x + y',
    "   print('sum is ' + str(z))",
    '',
    'sum(x, y)',
    '',
    "print('the above number was calculated by adding ' + str(x) + ' to ' + str(y) + ' in a sum function.')"
].join('\n');

console.log("pythonScript: ", pythonScript);

async function getPyodide(script, packages = null) {
    await languagePluginLoader;

    if (!packages) {
        return pyodide.runPython(script);
    }
    
    await pyodide.loadPackage(packages)

    const result = pyodide.runPython(script);

    console.log(result);
};

const packages = [numpy, matplotlib, pandas, scipy];

getPyodide(pythonScript, packages);
