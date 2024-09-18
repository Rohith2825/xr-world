import Experience from "./Experience/Experience";
setTimeout(() => {
    const button = document.querySelector('.skybox');
    button.addEventListener('click', changeSkybox);
    console.log('Finished!');
}, 10000);


function changeSkybox() {
    console.log('Pressed!');
    const experience = new Experience();
    const environment = experience.world.whiterun.environment;
    const currentBox = environment.skyBoxTexture;
    environment.skyBoxTexture = environment.otherBox;
    environment.otherBox = currentBox;
    environment.scene.background = environment.skyBoxTexture;
}