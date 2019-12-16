let add;

function loadWasm(filename) {
  return fetch(filename)
    .then(response => response.arrayBuffer())
    .then(bits => WebAssembly.compile(bits))
    .then(module => new WebAssembly.Instance(module))
}

loadWasm('test.wasm')
  .then(instance => {
    add = instance.exports._Z3addii;
  })
  .then(instance => {
    giveMeAString = instance.exports._Z13giveMeAStringc;
  })