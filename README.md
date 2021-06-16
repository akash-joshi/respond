# respond

A frontend framework to use useState and useEffect with template strings.

## Pre-requisites

1. HTML files must have a `div` with id `app` and include your script file.
2. Script file must pass root component to render function of `respond`.

## Usage

`import { useState, useEffect, render } from "respond";`

Your root component can then use useState and useEffect inside of it and pass the generated HTML to `render`.

## Limitations

Currently only allows one component per HTML page. You could add multiple components but they can't share data (unless you use a seperate data-management solution).
