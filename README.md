# Pip-Boy 200 Round
A Fallout Pip Boy app for Pebble Round

## Installation

### OSX

1.  Install homebrew: `ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

2.  Install the Pebble SDK v3.6 that supports Pebble Round: `brew install https://raw.githubusercontent.com/youtux/homebrew-pebble-sdk/cadf266b005bdd77219358a6ad428ad533dd54cf/pebble-sdk.rb`

3.  Install `nodejs` 4.x from https://nodejs.org/en/

4.  Run `npm install` in the `online` folder to install all dependencies for the watchface configuration page.

### Run in Pebble simulator

1.  Customise `scripts/build-simulator.command` to set the project path to the correct location on your computer.

2.  Run `build-simulator.command`

### Run config page in browser with livereload

1.  Run `gulp watch` from the `online` folder.

2.  Open the following URL in the browser: http://localhost:9000

## Developers

1.  Run `jspm install PACKAGE_NAME` to install `jspm` packages