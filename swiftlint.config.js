module.exports = {
  ...require('@navify/swiftlint-config'),
  included: ['${PWD}/ios', '${PWD}/ios-template'],
  excluded: ['${PWD}/ios/Jigra/JigraTests', '${PWD}/ios/Jigra/TestsHostApp'],
};
