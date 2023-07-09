import fs from 'fs';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';

const sourceFolder = '/path/to/first/folder';
const mixFolder = '/path/to/second/folder';
const outputFolder = '/path/to/output/folder';

// Read files in the mixFolder directory
fs.readdir(mixFolder, (err, files) => {
  if (err) {
    console.error('Error reading mixFolder directory:', err);
    return;
  }

  // Process each file
  files.forEach(file => {
    const mixFilePath = path.join(mixFolder, file);
    const outputFilePath = path.join(outputFolder, file.replace('.mp4', '.mp3'));

    // Check if the output file already exists
    if (fs.existsSync(outputFilePath)) {
      console.log(`File ${outputFilePath} already exists. Skipping.`);
      return;
    }

    // Change the file extension from .mp4 to .mp3
    const audioFileName = file.replace('.mp4', '.mp3');
    const audioFilePath = path.join(sourceFolder, audioFileName);

    // Check if the audio file exists
    if (!fs.existsSync(audioFilePath)) {
      console.log(`Audio file ${audioFilePath} does not exist. Skipping.`);
      return;
    }

    // Mix the video file with the audio
    ffmpeg()
      .input(mixFilePath)
      .input(audioFilePath)
      .output(outputFilePath)
      .on('end', () => {
        console.log(`Created ${outputFilePath}`);
      })
      .on('error', err => {
        console.error('Error mixing files:', err);
      })
      .run();
  });
});