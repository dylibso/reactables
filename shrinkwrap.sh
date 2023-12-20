#!/bin/bash
#
# This is a pretty hacky script to automatically wrap up
# a third party component library into a reactable

if [ "$#" -ne 3 ]; then
    echo "Usage: $0 <npm-package> <prelude-file> <output-file>"
    exit 1
fi

npm_package=$1
prelude_file=$2
output_file=$3

cd /tmp

git clone git@github.com:dylibso/reactables.git my-reactable
cd my-reactable/

# do any npm installs you need for your library (might be a better way to assume this in something like a gh action)
npm install $npm_package -E

cp $prelude_file src/prelude.js

# build it like normal
npm run build

cp dist/plugin.wasm $output_file
cd ..
rm -rf my-reactable
