module.exports = {
  ...require('@familyjs/swiftlint-config'),
  included: ['${PWD}/ios', '${PWD}/ios-template'],
  excluded: ['${PWD}/ios/Jigra/JigraTests', '${PWD}/ios/Jigra/TestsHostApp', '${PWD}/ios/Frameworks'],
};
