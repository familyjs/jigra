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

printf %"s\n" "Publishing $JIG_VERSION to MavenCentral production..."

$DIR/gradlew clean build publish --max-workers 1 -b $DIR/jigra/build.gradle -Pandroid.useAndroidX=true > $LOG_OUTPUT 2>&1

echo $RESULT

if grep --quiet "BUILD SUCCESSFUL" $LOG_OUTPUT; then
    printf %"s\n" "Success: Jigra Android Library published to MavenCentral."
else
    printf %"s\n" "Error publishing, check $LOG_OUTPUT for more info!"
    cat $LOG_OUTPUT
    exit 1
fi
