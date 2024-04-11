import bellSound from '../assest/sounds/mixkit-happy-bells-notification-937.wav'; 

const playBellSound = () => {
    const audio = new Audio(bellSound);
    audio.play();
  };

export default playBellSound