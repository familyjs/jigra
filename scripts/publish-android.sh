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

# Get latest com.jigrajs:core XML version info
JIGRA_PUBLISHED_URL="https://repo1.maven.org/maven2/com/jigrajs/core/maven-metadata.xml"
JIGRA_PUBLISHED_DATA=$(curl -s $JIGRA_PUBLISHED_URL)
JIGRA_PUBLISHED_VERSION="$(perl -ne 'print and last if s/.*<latest>(.*)<\/latest>.*/\1/;' <<< $JIGRA_PUBLISHED_DATA)"

# Check if we need to publish a new native version of the Jigra Android library
if [[ $JIG_VERSION == $JIGRA_PUBLISHED_VERSION ]]; then
    printf %"s\n" "Native Jigra Android library version $JIGRA_PUBLISHED_VERSION is already published on MavenCentral, skipping."
else
    printf %"s\n" "Publishing $JIG_VERSION to MavenCentral production..."

    # Build and publish
    $DIR/gradlew clean build publishReleasePublicationToSonatypeRepository closeAndReleaseSonatypeStagingRepository --max-workers 1 -b $DIR/jigra/build.gradle -Pandroid.useAndroidX=true > $LOG_OUTPUT 2>&1

    echo $RESULT

    if grep --quiet "BUILD SUCCESSFUL" $LOG_OUTPUT; then
        printf %"s\n" "Success: Jigra Android Library published to MavenCentral."
    else
        printf %"s\n" "Error publishing, check $LOG_OUTPUT for more info! Manual publication review may be necessary at the Sonatype Repository Manager https://s01.oss.sonatype.org/"
        cat $LOG_OUTPUT
        exit 1
    fi
fi
