#!/usr/bin/env sh
-set -eo pipefail

case $1 in
     lint)
       pod lib lint ios/JigraCordova.podspec --allow-warnings
       pod lib lint ios/Jigra.podspec --allow-warnings;;

     publish)
       export NATIVE_PUBLISH=true
       pod trunk push ios/JigraCordova.podspec --allow-warnings
       pod trunk push ios/Jigra.podspec --allow-warnings;;

     *) echo "'lint' or 'publish' were not provided. Exiting...";;
esac
