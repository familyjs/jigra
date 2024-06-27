#!/bin/bash

XCBEAUTIFY_COMMAND=$(which xcbeautify)
XCODEBUILD_COMMAND=$(which xcodebuild)
SCHEME="Jigra"
WORKSPACE="Jigra.xcworkspace"
BUILD_DIR="./build"
SIMULATOR_BUILD_DIR="${BUILD_DIR}/iOS-Simulator"
DEVICE_BUILD_DIR="${BUILD_DIR}/iOS-Device"
SIMULATOR_PLATFORM="generic/platform=iOS Simulator"
DEVICE_PLATFORM="generic/platform=iOS"
LOG_FILE="jigra-build.log"
XCFRAMEWORK_DIR="../Frameworks"

if [ -x $XCBEAUTIFY_COMMAND ]; then
  echo "Found xcbeautify at $XCBEAUTIFY_COMMAND"
else
  echo "Could not find xcbeautify, using cat..."
  XCBEAUTIFY_COMMAND='cat'
fi

archive_jigra() {
    PLATFORM=$1
    ARCHIVE_PATH=$2

    ${XCODEBUILD_COMMAND} archive \
    -scheme "${SCHEME}" \
    -workspace "${WORKSPACE}" \
    -destination "${PLATFORM}" \
    -archivePath "${ARCHIVE_PATH}" \
    SKIP_INSTALL=NO \
    SWIFT_SERIALIZE_DEBUGGING_OPTIONS=NO \
    DEBUG_INFORMATION_FORMAT="dwarf-with-dsym" \
    BUILD_LIBRARY_FOR_DISTRIBUTION=YES
}

create_xcframework() {
    PRODUCT=$1

    ${XCODEBUILD_COMMAND} -create-xcframework \
    -framework "${SIMULATOR_BUILD_DIR}.xcarchive/Products/Library/Frameworks/${PRODUCT}.framework" \
    -debug-symbols "${PWD}/${SIMULATOR_BUILD_DIR}.xcarchive/dSYMs/${PRODUCT}.framework.dSYM" \
    -framework "${DEVICE_BUILD_DIR}.xcarchive/Products/Library/Frameworks/${PRODUCT}.framework" \
    -debug-symbols "${PWD}/${DEVICE_BUILD_DIR}.xcarchive/dSYMs/${PRODUCT}.framework.dSYM" \
    -output "${XCFRAMEWORK_DIR}/${PRODUCT}.xcframework" | tee -a ${LOG_FILE} | ${XCBEAUTIFY_COMMAND}
}

build_jigra() {
  case $1 in
    simulator)
    echo "+++ Build and Archive ${SIMULATOR_PLATFORM}, ${SIMULATOR_BUILD_DIR} +++" | tee -a ${LOG_FILE}
    archive_jigra "${SIMULATOR_PLATFORM}" "${SIMULATOR_BUILD_DIR}" | tee -a ${LOG_FILE} | ${XCBEAUTIFY_COMMAND}
    ;;
    device)
    echo "+++ Build and Archive ${DEVICE_PLATFORM}, ${DEVICE_BUILD_DIR} +++" | tee -a ${LOG_FILE}
    archive_jigra "${DEVICE_PLATFORM}" "${DEVICE_BUILD_DIR}" | tee -a ${LOG_FILE} | ${XCBEAUTIFY_COMMAND}
    ;;
    *)
    echo -n "Unknown Build Type"
    exit 1
    ;;
  esac
}

case $1 in
  xcframework)
  cd "Jigra"
  date >> "${LOG_FILE}"
  build_jigra "simulator"
  build_jigra "device"
  create_xcframework "Jigra"
  create_xcframework "Cordova"
  ;;
  clean)
  cd "Jigra"
  rm -rf ${LOG_FILE}
  rm -rf ${BUILD_DIR}
  ;;
esac

