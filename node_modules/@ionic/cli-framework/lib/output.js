"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logUpdate = require("log-update");
const colors_1 = require("./colors");
const tasks_1 = require("./tasks");
class StreamOutputStrategy {
    constructor({ stream = process.stdout, colors = colors_1.DEFAULT_COLORS }) {
        this.stream = stream;
        this.colors = colors;
    }
    createTaskChain() {
        const { failure, success } = this.colors;
        const chain = new tasks_1.TaskChain();
        chain.on('next', task => {
            task.on('success', () => {
                this.stream.write(`${success(tasks_1.ICON_SUCCESS)} ${task.msg} - done!`);
            });
            task.on('failure', () => {
                this.stream.write(`${failure(tasks_1.ICON_FAILURE)} ${task.msg} - failed!`);
            });
        });
        return chain;
    }
}
exports.StreamOutputStrategy = StreamOutputStrategy;
class LogUpdateOutputStrategy {
    constructor({ stream = process.stdout, colors = colors_1.DEFAULT_COLORS } = {}) {
        this.stream = stream;
        this.colors = colors;
        this.logUpdate = logUpdate.create(stream);
    }
    redrawLine(msg = '') {
        this.logUpdate(msg);
    }
    createTaskChain() {
        const { failure, strong, success } = this.colors;
        const chain = new tasks_1.TaskChain({ taskOptions: { tickInterval: 50 } });
        chain.on('next', task => {
            task.on('success', () => {
                this.stream.write(`${success(tasks_1.ICON_SUCCESS)} ${task.msg} - done!\n`);
            });
            task.on('failure', () => {
                this.stream.write(`${failure(tasks_1.ICON_FAILURE)} ${task.msg} - failed!\n`);
            });
            const spinner = new tasks_1.Spinner();
            task.on('tick', () => {
                const progress = task.progressRatio ? (task.progressRatio * 100).toFixed(2) : '';
                const frame = spinner.frame();
                this.redrawLine(`${strong(frame)} ${task.msg}${progress ? ' (' + strong(String(progress) + '%') + ')' : ''} `);
            });
            task.on('clear', () => {
                this.logUpdate.clear();
            });
        });
        chain.on('end', () => {
            this.logUpdate.done();
        });
        return chain;
    }
}
exports.LogUpdateOutputStrategy = LogUpdateOutputStrategy;
