const { Plugin } = require('powercord/entities');
const Timezones = require("./util/timezones.js");

module.exports = class TimeIn extends Plugin {
    startPlugin() {
        powercord.api.commands.registerCommand({
            command: "time-in",
            description: "Shows you the time in a specified timezone",
            usage: "{c} <timezone>",
            executor: (args) => {
                let timezone = Array.from(Timezones).filter(x => x.toLowerCase() === args[0].toLowerCase())[0];
                if (timezone === undefined)
                    return {send: false, result: `${args[0]} is not a valid timezone!`};
                return {send: false, 
                        result: `It is currently ${Date.now().toLocaleString("", {timeZone: timezone})} in ${args[0]}`};
            },
            autocomplete: (args) => {
                if (args[0] == void 0 || args[0] == undefined || args[0] == ""){
                    return {commands: Array.from(Timezones).map(timezone => {return {command: timezone, description: `Timezone ${timezone}`}}),
                            header: "timezones"};
                }
                if (Array.from(Timezones).filter(x => x.toLowerCase() === args[0].toLowerCase())[0] !== undefined)
                    return {commands: false};
                return {commands: Array.from(Timezones).filter(x => x.toLowerCase().includes(args[0].toLowerCase())).map(timezone => {return {command: timezone, description: `Timezone ${timezone}`}}),
                        header: "timezones"};
                
                
            }



        })
    }
    pluginWillUnload() {
        powercord.api.commands.unregisterCommand("time-in");
    }
};