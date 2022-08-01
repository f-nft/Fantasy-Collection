import { Buffer } from 'buffer';

window.global = window;
global.Buffer = Buffer;
global.process = {
    env: { DEBUG: undefined },
    version: '',
    nextTick: require('next-tick')
};
global.Buffer = global.Buffer || require('buffer').Buffer;