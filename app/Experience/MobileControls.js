import nipplejs from 'nipplejs';
import Player from './World/Player/Player';

function addStyle(styleString) {
    const style = document.createElement('style');
    style.textContent = styleString;
    document.head.append(style);
}

function createJoystick(size) {
    addStyle(`
        :root {
         --button-size: ${size}
        }
        `);

    const joystick_container = document.querySelector('#joystick-container');

    const joystick = nipplejs.create({
        zone: joystick_container,
        mode: 'static',
        dynamicPage: true,
        position: { left: '50px', bottom: '50px'},
        color: 'rgb(200,200,200)',
        restOpacity: 1,
        size:  size
    });
    return joystick;
}

function createGamePadArea() {
    const gamepadOverlay = document.createElement('div');
    gamepadOverlay.classList.add('gamepad-overlay', 'overlay');
    gamepadOverlay.id = 'gamepad-overlay';

    const joystickContainer = document.createElement('div');
    joystickContainer.classList.add('joystick-container', 'overlay');
    joystickContainer.id = 'joystick-container';

    gamepadOverlay.appendChild(joystickContainer);



    document.body.appendChild(gamepadOverlay);
}

export default function displayMobileControls() {

    const DEFAULT_BUTTON_SIZE = 120;
    createGamePadArea(); 
    const joystick = createJoystick(DEFAULT_BUTTON_SIZE);

    const gamepad = document.querySelector('#gamepad-overlay');
    joystick.on('move', onTouch);
    joystick.on('end', onEnd);
    
    gamepad.style.display = 'block';
}

function onTouch(e, data) {
    const player = new Player(); 
    const x = data.vector.x;
    const z = -data.vector.y; //the y-axis is up for some reason //negative for some reason
    player.controllerDirection.set(x, 0, z);
}

function onEnd(e, data) {
    const player = new Player();
    player.controllerDirection.set(0,0,0)
}
