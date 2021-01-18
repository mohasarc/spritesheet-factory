export const SUPPORTED_JSON_FORMATS = {"PIXI":"pixi",};

/**
 * @param {Array} images
 * @param {Object} meta
 * @param {Object} formatOptions 
 */
export function format(images, meta, formatOptions){
    switch (formatOptions.type) {
        case SUPPORTED_JSON_FORMATS.PIXI: return format_PIXI(images, meta, formatOptions);
    }
}

/**
 * @param {Array} images
 * @param {Object} meta
 * @param {Object} formatOptions 
 */
function format_PIXI(images, meta, formatOptions){
    // Create the frames
    var frames = {};
    images.map((image) => {
        frames[image.fileName] = {
            "frame": {"x":image.x,"y":image.y,"w":image.dimensions.width,"h":image.dimensions.height},
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": {"x":image.x,"y":image.y,"w":image.dimensions.width,"h":image.dimensions.height},
            "sourceSize": {"w":image.dimensions.width,"h":image.dimensions.height},
        }
    });

    // Add the sprite image
    if (formatOptions.embedBase64)
        meta.image = meta.imageBase64;
    else
        meta.image = meta.imageName;
    
    // Delete unnecessary props
    delete meta.imageBase64;
    delete meta.imageName;

    // Add everything tohether
    var pixiFormat = {
        frames,
        animations: {},
        meta: {
            ...meta,
           "format": "RGBA8888",
        }
    };
    
    return pixiFormat;
}