const mergeImages = require('merge-images');
const { Canvas, Image } = require('canvas');
const path = require('path');
const fs = require('fs');
const glob = require("glob");
const sizeOf = require('image-size');

const MAX_WIDTH = 1920;
const MAX_HEIGHT = 3642;

export function generateSpritesheet(options) {
   const directoryPath = options.inputFolder;
   const destinationPath = options.outputFolder;
   const match = options.match;

   var images = [];
   var curX = 0;
   var curY = 0;
   var heightHeight = 0;
   
   var spritesheetJson = {
      frames: {
      },
      animations: {
      },
      meta: {
         "image": "",
         "format": "RGBA8888",
         "size": { "w": 0, "h": 0 },
         "scale": "1",
      }
   };
   
   glob(path.join(directoryPath, match), {}, (err, files)=>{
      if (err) {
         return console.log('Unable to scan directory: ' + err);
      }

      console.log(files);
   
      files.forEach(function (file) {
         var filePath = path.join(directoryPath, file);
         var dimensions = sizeOf(filePath);
         var fileName = file.replace(/\.[^/.]+$/, "");
         images.push({ src: filePath, x: 0, y: 0, dimensions, file });
      });
   
   
      images.sort((a, b) => { return a.dimensions.height - b.dimensions.height });
   
   
      images.map(image => {
         if (curX + image.dimensions.width > MAX_WIDTH) {
            curX = 0;
            curY = curY + heightHeight;
            heightHeight = image.dimensions.height;
         } else {
            if (image.dimensions.height > heightHeight)
               heightHeight = image.dimensions.height;
         }
   
         image.x = curX;
         image.y = curY;
   
         spritesheetJson.frames[image.file] = {
            frame: { x: curX, y: curY, w: image.dimensions.width, h: image.dimensions.height },
            rotated: false,
            trimmed: false,
            spriteSourceSize: { x: curX, y: curY, w: image.dimensions.width, h: image.dimensions.height },
            sourceSize: { w: image.dimensions.width, h: image.dimensions.height }
         }
   
         curX += image.dimensions.width;
      });
   
      mergeImages(images, {
         Canvas: Canvas,
         Image: Image,
         width: MAX_WIDTH,
         height: MAX_HEIGHT,
      })
         .then(b64 => {
            spritesheetJson.meta.image = b64;
   
            var jsonContent = JSON.stringify(spritesheetJson);
            fs.writeFile(path.join(destinationPath, "spritesheet.json"), jsonContent, 'utf8', function (err) {
               if (err) {
                  console.log("An error occured while writing JSON Object to File.");
                  return console.log(err);
               }
   
               console.log("spritesheet was generated successfully");
            });
   
            var base64Data = b64.replace(/^data:image\/png;base64,/, "");
            fs.writeFile(path.join(destinationPath, "spritesheet.png"), base64Data, 'base64', function (err) {
               if (err)
                  console.log(err);
            });
         });
   });
}