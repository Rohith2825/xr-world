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

    const jumpButton = document.createElement('button');
    jumpButton.classList.add('jump-button', 'overlay');
    jumpButton.id = 'jump-button';
    jumpButton.innerHTML = '⇪';

    gamepadOverlay.appendChild(jumpButton);

    document.body.appendChild(gamepadOverlay);
    return jumpButton
}

export default function displayMobileControls() {

    const DEFAULT_BUTTON_SIZE = 120;
    const jumpButton = createGamePadArea(); 
    const joystick = createJoystick(DEFAULT_BUTTON_SIZE);
    jumpButton.addEventListener('touchstart', handleJumpPress);

    jumpButton.addEventListener('touchend', handleJumpRelease);

    const gamepad = document.querySelector('#gamepad-overlay');
    joystick.on('move', handleTouch);
    joystick.on('end', handleEnd);
    
    gamepad.style.display = 'block';
}

function handleTouch(evt, data) {
    const player = new Player(); 
    const x = -data.vector.x;
    const z = data.vector.y; //the y-axis is up for some reason 
    player.controllerDirection.set(x, 0, z);
}

function handleEnd(evt, data) {
    const player = new Player();
    player.controllerDirection.set(0,0,0)
}

function handleJumpPress(evt) {
    evt.target.style.background = 'rgba(200,200,200,0.8)';
    const player = new Player();
    player.actions.jump = true;
}

function handleJumpRelease(evt) {
    evt.target.style.background = 'rgba(200,200,200,0.5)';
    const player = new Player();
    player.actions.jump = false;
}