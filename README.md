# Intro

This is a quick nodejs based REST API server I'm setting up to use as a reference for more advanced projects in the future.

## Supported methods

* GET
* POST
* PUT
* DELETE

Examples for curl commands to run each method can be found as a commend above the method code

## Commands

`npm install`

`npm run dev`

`docker build . --tag rest-api`

# TODO:
The Auth token is just embedded into the code, typically this should be generated when user logs in in some way, but there's no login function at the moment so it's just in plain text in the code.