#!/usr/bin/env node
"use strict";
/// <reference path='context.d.ts'/>
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var fs = require("fs");
function copyFileSync(source, target) {
    var targetFile = target;
    //if target is a directory a new file with the same name will be created
    if (fs.existsSync(target)) {
        if (fs.lstatSync(target).isDirectory()) {
            targetFile = path.join(target, path.basename(source));
        }
    }
    fs.writeFileSync(targetFile, fs.readFileSync(source));
}
module.exports = function (context) {
    var APP_NAME = 'MyApp'; // see in config.xml
    //console.dir( context, {depth:4} );
    //console.log( 'root', context.opts.projectRoot);
    var plugins = context.opts.cordova.plugins.filter(function (p) { return p === 'cordova-plugin-broadcaster'; });
    if (plugins.length === 0)
        return;
    var platforms = context.opts.cordova.platforms.filter(function (p) { return p === 'ios'; });
    if (platforms.length === 0)
        return;
    var rel = 'Classes';
    var source = path.join(context.opts.projectRoot, 'ios-assets', rel, 'MainViewController.m');
    var plt_target = path.join(context.opts.projectRoot, 'platforms', platforms[0]);
    {
        var src_target = path.join(plt_target, APP_NAME);
        var target = path.join(src_target, rel);
        console.log('copy\n', source, '\nto\n', target);
        copyFileSync(source, target);
    }
};
