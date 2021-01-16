# spritesheet-factory

The `spritesheet-factory` package is a CLI tool that allows generating a spritesheet from a folder of images.

**Note 1:** This is not yet stable, you may use it for production at your own risk!  
**Note 2:** Currently it only generates simple `1920X3642` spritesheets for `pixi.js`.  
**Note 3:** Currently only supports png.

## Installing the package
```js
npm i spritesheet-factory -g
```

## Usage
```shell
spritesheet-factory
```
This will read all *.png images in the current directory, generate and store a spritesheet in the same diesctory.

## Options
|option|Alias|Description|Default Value|
|---|---|---|---|
|--match|-m|Specifies what files to match from the input directory|*.png|
|--embed|-e|Specifies whether to embed the image as base64 in the JSON file|`false`|
|--src|-i|The folder containing the input images|`.\`|
|--target|-o|The folder that will contain the generated spritesheet|`.\`|

### Options Usage
```shell
spritesheet-factory -i .\assets -o .\spritesheets -m *.jpeg -e
```
This will read all *.jpeg images in `.\assets`, generate and store a spritesheet in `.\spritesheets` diesctory. The image for the spritesheet is embedded in the JSON file this time.