import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const onPlay = function (e) {
  localStorage.setItem('videoplayer-current-time', e.seconds);
  console.log('onPlay  seconds', e.seconds);
};

player.on('timeupdate', throttle(onPlay, 1000));

player
  .setCurrentTime(localStorage.getItem('videoplayer-current-time') || 0)
  .catch(function (error) {
    console.error(error);
  });
