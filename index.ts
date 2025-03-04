const core = require('@actions/core');
const github = require('@actions/github');
const cypressLoadBalancer = require('cypress-load-balancer')
try {
    const command = core.getInput('command');
    switch (command.toLowerCase()) {
        case('initialize'):
            break;
        case('balance'):
            break;
        case('merge'):
            break
        case('save'):
            break
        default:
            throw Error('Command not known: ' + command);
    }

    // core.setOutput("time", time);
    // Get the JSON webhook payload for the event that triggered the workflow
    // const payload = JSON.stringify(github.context.payload, undefined, 2)
    // console.log(`The event payload: ${payload}`);


} catch (error: Error) {
    core.setFailed(error.message);
}
