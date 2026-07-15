const ffmpegPath = require('ffmpeg-static');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

if (!ffmpegPath) {
  console.error('ffmpeg-static not found');
  process.exit(1);
}

ffmpeg.setFfmpegPath(ffmpegPath);

const input = path.resolve(__dirname, '../public/video/video-about.mp4');
const output = path.resolve(__dirname, '../public/video/video-about-005.jpg');

console.log('Using ffmpeg:', ffmpegPath);
console.log('Reading:', input);

ffmpeg(input)
  .screenshots({
    timestamps: ['5'],
    filename: path.basename(output),
    folder: path.dirname(output),
    size: '1280x?',
  })
  .on('end', () => {
    console.log('Thumbnail created at', output);
  })
  .on('error', (err) => {
    console.error('Error creating thumbnail:', err.message);
    process.exit(1);
  });
