# spritesheet-factory

The `spritesheet-factory` package is a CLI tool that allows generating a spritesheet from a folder of images

**Note 1:** This is not yet stable, you may use it for production at your own risk!  
**Note 2:** Currently it only generates simple 1920X3642 spritesheets for pixi.js.  
**Note 3:** Currently only supports png.

## Installing the package
```js
npm i spritesheet-factory -g
```

## Usage
```js
spritesheet-factory .\source\path .\output\folder\path -m *.png -e
```
The source path would include all the images to be added to the spritesheet in png format.

## Options
```
|option|Alias|Description|Default Value|
|---|---|---|---|
|--match|-m|Specifies what files to match from the input directory|*.png|
|--embed|-e|Specifies whether to embed the image as base64 in the JSON file|false|
```