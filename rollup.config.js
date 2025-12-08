import pkg from './package.json';

function pgl(plugins = []) {
  return [
    ...plugins
  ];
}

export default [
  {
    input: pkg.source,
    output: [
      { file: pkg.main, format: 'es' }
    ],
    plugins: pgl()
  }
];