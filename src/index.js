import { pack, PACKING_ALGORITHMS } from './packer';
import { format } from './spritesheet-formatter';

const mergeImages = require('merge-images');
const { Canvas, Image } = require('canvas');

const MAX_WIDTH = 1920;
const MAX_HEIGHT = 3642;

/**
 * @param {Object} options Options used for generating the spritesheet
 */
export async function execute(images, options) {
   var meta = {imageName:'', imageBase64:'', format: '', size: { w: MAX_WIDTH, h: MAX_HEIGHT }, scale: 1 };
   
   
   images = pack(images, PACKING_ALGORITHMS.SIMPLE);
   var spritesheetbase64 = await generateSpritesheetImage(images, {size: {width: MAX_WIDTH, height: MAX_HEIGHT}});

   meta.imageBase64 = spritesheetbase64;
   meta.imageName = options.outputFileName;
   var spritesheetJson = format(images, meta, options.format);
   
   // Generate the data
   var jsonContent = JSON.stringify(spritesheetJson);
   var base64Data = spritesheetbase64.replace(/^data:image\/png;base64,/, "");

   return {spritesheetIMAGE: base64Data, spritehseetJSON: jsonContent};
}

/**
 * @param {Array} images 
 * @param {Object} options
 * @param {Object.size} 
 */
async function generateSpritesheetImage(images, options){
   return mergeImages(images, {
      Canvas: Canvas,
      Image: Image,
      width: options.size.width,
      height: options.size.height,
   });
}