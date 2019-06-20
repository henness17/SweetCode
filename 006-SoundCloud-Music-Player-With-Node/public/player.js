const SoundCloudAudio = require('soundcloud-audio');
const player = new SoundCloudAudio('95f22ed54a5c297b1c41f72d713623ef');

window.play = function () {
    player.resolve("https://soundcloud.com/biskwiq/dawntheopus", function (track) {
        player.play();
    });
}

window.pause = function () {
    player.pause();
}

window.setVolume = function (level) {
    level = level / 100;
    player.setVolume(level);
}