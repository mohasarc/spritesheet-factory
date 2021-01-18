import arg from 'arg';
import { execute } from '.';
import { SUPPORTED_JSON_FORMATS } from './spritesheet-formatter';
import path from 'path';
const fs = require('fs');
const glob = require("glob");
const sizeOf = require('image-size');

/**
 * @param {String} rawArgs User's input
 */
function parseArgumentsIntoOptions(rawArgs){
    const ARGS = arg(
        {
            '--src': String,
            '--target': String,
            '--match': String,
            '--embed': Boolean,
            '--format': String,
            '--tname': String,
            // Aliases
            '-i': '--src',
            '-o': '--target',
            '-m': '--match',
            '-e': '--e',
            '-f': '--format',
            '-t' : '--tname',
        },
        {
            argv: rawArgs.slice(2),
        }
    );

    return {
        inputFolder: ARGS['--src'] || ARGS._[0] || './',
        outputFolder: ARGS['--target'] || ARGS._[1] || './',
        outputFileName: ARGS['--tname'] || 'spritesheet',
        match: ARGS['--match'] || '*.png',
        format: {
            type: ARGS['--format'] || SUPPORTED_JSON_FORMATS.PIXI,
            embedBase64: ARGS['--embed'] || false,
        },
    };
}

async function promptForMissingOptions(options){

}

/**
 * @param {Array} args User input (arguments arrays)
 */
export async function cli (args){
    let options = parseArgumentsIntoOptions(args);

    var images = await readImages(options.inputFolder, options.match);

    var {spritesheetIMAGE, spritehseetJSON} = await execute(images, options);

    // Store the data
    var outJSONFileName = await store(spritehseetJSON, 'utf8', options.outputFolder, options.outputFileName, '.json');
    var outIMGFileName = await store(spritesheetIMAGE, 'base64', options.outputFolder, options.outputFileName, '.png');
}

/**
 * @param {String} directoryPath 
 * @param {RegExp} match
 * @returns {Array} an array of { src: '', x: 0, y: 0, dimensions: {width: 0, height: 0}, fileName: '' } 
 */
async function readImages(directoryPath, match){
    var images = [];
 
    return new Promise((resolve, reject) => {
       glob(path.join(directoryPath, match), {}, (err, files) => {
          if (err) {
             reject(err);
          }
    
          files.forEach(function (file) {
             var filePath = path.join(directoryPath, file);
             var dimensions = sizeOf(filePath);
             var baseFileName = file.replace(/\.[^/.]+$/, "");
 
             images.push({ src: filePath, x: 0, y: 0, dimensions, fileName: file });
          });
 
          resolve(images);
       });
    });
 }

/**
 * @param {Object} data 
 * @param {String} filePath 
 */
async function store(data, encoding, dirPath, fileName, ext){
    fileName += ext;
    var filePath = path.join(dirPath, fileName);
 
    return new Promise((resolve, reject) => {
       fs.writeFile(filePath, data, encoding, function (err) {
          if (err) {
             reject(err);
          }
    
          resolve(filePath);
       });
    });
 }