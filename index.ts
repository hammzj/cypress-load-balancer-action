// const core = require('@actions/core');
// const github = require('@actions/github');
//
// const FILE_PATHS_DELIMITER = ','
//
// try {
//     //const command = core.getInput('command');
//     const command = 'balance'
//
//     switch (command.toLowerCase()) {
//         case('initialize'):
//             throw Error('TODO: this function has not been exported in this current version.')
//             break;
//         case('balance'):
//             const runners = core.getInput('runners');
//             const testingType = core.getInput('testing-type')
//             const format = core.getInput('format')
//             let filePaths = []
//
//             const coreFilePaths = core.getInput('file-paths')
//             if (coreFilePaths != null) filePaths = [coreFilePaths.split(FILE_PATHS_DELIMITER)]
//
//             argv.parse()
//             break;
//         case('merge'):
//             break
//         case('save'):
//             break
//         default:
//             throw Error('Command not known: ' + command);
//     }
//
//     // core.setOutput("time", time);
//     // Get the JSON webhook payload for the event that triggered the workflow
//     // const payload = JSON.stringify(github.context.payload, undefined, 2)
//     // console.log(`The event payload: ${payload}`);
//
//
// } catch (error: Error) {
//     core.setFailed(error.message);
// }
