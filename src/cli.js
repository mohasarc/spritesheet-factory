import arg from 'arg';
import { generateSpritesheet } from '.';

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
            // Aliases
            '-i': '--src',
            '-o': '--target',
            '-m': '--match',
        },
        {
            argv: rawArgs.slice(2),
        }
    );

    return {
        inputFolder: ARGS['--src'] || ARGS._[0] || './',
        outputFolder: ARGS['--target'] || ARGS._[1] || './',
        match: ARGS['--match'] || '*.png',
        embedBase64: ARGS['--embed'] || false,
    };
}

async function promptForMissingOptions(options){

}

/**
 * 
 * @param {Array} args User input (arguments arrays)
 */
export function cli (args){
    let options = parseArgumentsIntoOptions(args);
    generateSpritesheet(options);
}