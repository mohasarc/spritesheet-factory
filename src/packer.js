export const PACKING_ALGORITHMS = Object.freeze({"SIMPLE":1,});
const MAX_WIDTH = 1920;

/**
 * @param {Array} images 
 * @param {PACKING_ALGORITHMS} algorithm 
 */
export function pack(images, algorithm){
    switch (algorithm) {
        case PACKING_ALGORITHMS.SIMPLE: return simplePack(images);
    }
}

/**
 * @param {Array} images 
 */
function simplePack(images){
    var curX = 0;
    var curY = 0;
    var heightHeight = 0;

    // Sort the images from smallest height to largest height
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
 
       curX += image.dimensions.width;
    });

    return images;
}