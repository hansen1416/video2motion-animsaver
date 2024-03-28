/**
 * @license
 * Copyright 2017 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');


let counter = 0;


(async () => {

    let browser = await puppeteer.launch();

    let page = await browser.newPage();

    const character_names = ['dors.glb'];

    const anim_json_dir = path.join("C:\\", "Users", "105476", 'Documents', 'video2motion-animplayer', 'public', 'anim-json')

    const anim_euler_dir = path.join("C:\\", "Users", "105476", 'Documents', 'video2motion-animplayer', 'public', 'anim-euler-uniform')

    const files = fs.readdirSync(anim_json_dir);

    files.sort();

    console.log(files.length)

    const existed_files = fs.readdirSync(anim_euler_dir);

    existed_files.sort();


    console.log(existed_files.length)

    let start_idx = 0

    // find the first file that does not exist
    for (const i in files) {
        if (!existed_files.includes(files[i])) {

            start_idx = i;
            break;
        }
    }

    // console.log(start_idx)


    // console.log(files.length)

    for (let i = start_idx; i < files.length; i++) {

        const filename = files[i]

        // console.log(filename)

        const url = `http://localhost:5173/${encodeURIComponent(filename)}/euler-saver`;

        console.log(url)

        await page.goto(url);

        await page.waitForSelector('#done', { visible: true });

        // console.log(`${filename} done`);

        // break;

    }

    await browser.close();

    console.log("all done")

})();