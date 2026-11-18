// ESM-only packages that @hexabot-ai/api requires. Node runs them natively
// (require(esm)), but Jest's CommonJS runtime cannot load them, so ts-jest
// compiles them to CommonJS. Add any other ESM-only dependency your specs
// pull in here.
const esmOnlyPackages = ['chokidar', 'readdirp'];

module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: 'src/.*\\.spec\\.ts$',
  transform: {
    // Specs are type-checked with tsconfig.spec.json, which adds the Jest
    // globals on top of the app tsconfig (Node types only).
    '^.+\\.(t|j)s$': ['ts-jest', { tsconfig: 'tsconfig.spec.json' }],
  },
  transformIgnorePatterns: [
    `/node_modules/(?!(${esmOnlyPackages.join('|')})/)`,
  ],
  testEnvironment: 'node',
};
