'use strict';
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const sharp = require('sharp');
const {spawnSync} = require('child_process');

const extImageOut = '.avif';
const extVideoOut = '.webm';

const extDict = {
    // IMAGES
    '.jpg': {
        type: 'image',
        regex: /\.jpg$/gi,
    },
    '.jpeg': {
        type: 'image',
        regex: /\.jpeg$/gi,
    },
    '.png': {
        type: 'image',
        regex: /\.png$/gi,
    },
    '.webp': {
        type: 'image',
        regex: /\.webp$/gi,
    },
    '.gif': {
        type: 'image',
        regex: /\.gif$/gi,
    },
    // VIDEO
    '.avi': {
        type: 'video',
        regex: /\.avi$/gi,
    },
    '.mp4': {
        type: 'video',
        regex: /\.mp4$/gi,
    },
    '.ogg': {
        type: 'video',
        regex: /\.ogg$/gi,
    },
    '.3gp': {
        type: 'video',
        regex: /\.3gp$/gi,
    },
    '.mov': {
        type: 'video',
        regex: /\.mov$/gi,
    }
};

const convertionExt = (ext) => extDict[ext].type === 'image' ? extImageOut : extVideoOut;
const publicDirFiles = glob.sync(path.join(__dirname, "/public/**/*")).filter(filePathName => fs.lstatSync(filePathName).isFile());
const filesToCleanup = publicDirFiles.filter(filePathName => (
    [extImageOut, extVideoOut].includes(path.extname(filePathName)) && // has converted extension
    Object.entries(extDict).some(([ext, {regex}]) => regex.test(filePathName)) // original file exists, not original file with better extension
));
const filesToConvert = publicDirFiles.filter(filePathName => (
    !filePathName.includes('favicon') && // not "favicon(s)" folder and favicon.ico
    Object.values(extDict).map(val => val.regex).some(regex => !!filePathName.match(regex))) // image or video from dict
);

filesToCleanup.forEach(filePathName => fs.unlinkSync(filePathName));
filesToConvert.forEach(async (filePathName) => {
    const ext = path.extname(filePathName);
    const type = extDict[ext].type;
    const extRegex = extDict[ext].regex;
    const targetExt = convertionExt(ext);
    const targetPath = filePathName.replace(extRegex, targetExt);
    let newFileContent = null;
    switch (type) {
        case 'image':
            try {
                newFileContent = await sharp(filePathName).toBuffer();
            } catch (e) {
                console.error(e);
            }
            break;
        case 'video':
            try {
                spawnSync('./bin/ffmpeg/7.1_4/bin/ffmpeg', [
                    '-y',                                           // Overwrite output files
                    '-i', filePathName,                             // Input file
                    '-c:v', 'libvpx',                               // Video codec for WebM
                    // '-b:v', '1M',                                   // Video bitrate for compression
                    '-crf', '18',                                   // Constant Rate Factor
                    '-c:a', 'libvorbis',                            // Audio codec for WebM
                    '-b:a', '128k',                                 // Audio bitrate
                    '-f', 'webm',                                   // Output format
                    targetPath                                      // Output file
                ], {stdio: ['inherit', 'pipe', 'inherit'], cwd: __dirname});
            } catch (e) {
                console.error(e);
            }
        default:
            break;
    }
    if (newFileContent) {
        fs.writeFileSync(targetPath, newFileContent);
    }
});

module.exports = {
    extDict,
    extImageOut,
    extVideoOut
};
