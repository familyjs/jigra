#!/usr/bin/env bash

DIR=../android
LOG_OUTPUT=./tmp/jigra-android.txt
JIG_VERSION=`grep '"version": ' $DIR/package.json | awk '{print $2}' | tr -d '",'`
echo Attempting to build and publish Jigra native libraries with version $JIG_VERSION

# Make log dir if doesnt exist
mkdir -p ./tmp

# Export ENV variable used by Gradle for Versioning
export JIG_VERSION
export JIG_PUBLISH=true
