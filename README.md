# chrome-extension-creator

## Now with webpack support

Quickly start your chrome extension project with a working example from google.


### Basic Usage

Usage:

    npm i -g chrome-extension-creator

Then run one of the following commands in a directory you want a project folder in:
Project name in this example: 'my-body-is-chrome'

    cec my-body-is-chrome

or

    cce my-body-is-chrome

or

    create-chrome-extension my-body-is-chrome

or

    chrome-extension-creator my-body-is-chrome

if a folder doesn't exist with the name 'my-body-is-chrome', it will create google's base example in a directory with the name 'my-body-is-chrome' and you will get this message:

    DONE!
        run:
        cd my-body-is-chrome

        have fun!
      

### Create A Webpack Starter Project

    cec my-body-is-chrome --webpack

All commands from basic usage will work, just use the flag `--webpack` to initialize the project with webpack.

You will get the following output:

    DONE!
        run:
        cd my-body-is-chrome
        npm i
        npm run build

        The basic chrome extension will compile to the 'build' directory by default.
        Source files are in the 'src' directory
      
        have fun!

You'll load your extension from the build directory. 