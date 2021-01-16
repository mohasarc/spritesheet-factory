import arg from 'arg';
import { generateSpritesheet } from '.';
function parseArgumentsIntoOptions(rawArgs){
    const ARGS = arg(
        {
            '--src': String,
            '--target': String,
            '--match': String,
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
        match: ARGS['--match'] || '*.*',
    };
}

async function promptForMissingOptions(options){

}

export function cli (args){
    let options = parseArgumentsIntoOptions(args);
    generateSpritesheet(options);
    // console.log(options);
}