const rootPath = '<rootDir>/__tests__';
const mockPath = '<rootDir>/__mocks__';

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    roots: [
      rootPath
    ],
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
    testPathIgnorePatterns: [
      '<rootDir>/.next/',
      '<rootDir>/node_modules/',
      '<rootDir>/functions/'
    ],
    // snapshotSerializers: ['enzyme-to-json/serializer'],
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
      "^.+\\.(jpg|jpeg|png|gif)$": "jest-url-loader"
    },
    moduleNameMapper: {
      "^@/(.+)": "<rootDir>/src/$1"
    },
    moduleFileExtensions: [
      'ts',
      'tsx',
      'js',
      'jsx',
    ],
    setupFiles: [
      'dotenv/config'
    ],
    // https://github.com/zeit/next.js/issues/8663#issue-490553899
    globals: {
      // we must specify a custom tsconfig for tests because we need the typescript transform
      // to transform jsx into js rather than leaving it jsx such as the next build requires. you
      // can see this setting in tsconfig.jest.json -> "jsx": "react"
      // 'ts-jest': {
      //   tsConfig: `${rootPath}/tsconfig.jest.json`
      // },
      "GATSBY_LIVE_PLAN_API_URL": "https://woeuet6so4.execute-api.ap-northeast-1.amazonaws.com/dev/livePlan"
    }
};
