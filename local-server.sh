#!/bin/bash

SCRIPT_DIR=$(cd $(dirname $0); pwd)
pushd ./public
python -m http.server 8000
popd
