import * as THREE from "three";
import Experience from "../../../Experience.js";

export default class Interactions {
    constructor(
        positions = [
            { x: 5.780301094055176, y: -0.2, z: -20.548160552978516 },
            { x: 7.780301094055176, y: -0.2, z: -20.548160552978516 },
            { x: 9.780301094055176, y: -0.2, z: -20.548160552978516 },
        ],
        scale = { x: 1.5, y: 1.5, z: 1.5 }
    ) {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.positions = positions;
        this.scale = scale;

        this.init();
        this.setMaterials();
        this.setPositions();
        this.setScale();
        this.addLighting(); // Ensure there's lighting in the scene
    }

    init() {
        this.interactions = [
            this.resources.items.whiterun.interactions1.scene,
            this.resources.items.whiterun.interactions2.scene,
            this.resources.items.whiterun.interactions3.scene            
        ];
    }

    setMaterials() {
        this.interactions.forEach((interaction) => {
            this.scene.add(interaction);
        });
    }

    setPositions() {
        this.interactions.forEach((interaction, index) => {
            const position = this.positions[index] || { x: 0, y: 0, z: 0 };
            interaction.position.set(position.x, position.y, position.z);
        });
    }

    setScale() {
        this.interactions.forEach((interaction) => {
            interaction.scale.set(this.scale.x, this.scale.y, this.scale.z);
        });
    }

    addLighting() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 10, 7.5);
        this.scene.add(directionalLight);
    }
}

// import * as THREE from "three";
// import Experience from "../../../Experience.js";

// export default class Interactions {
//     constructor(
//         positions = [
//             { x: 5.780301094055176, y: -0.2, z: -20.548160552978516 },
//             { x: 7.780301094055176, y: -0.2, z: -20.548160552978516 },
//             { x: 9.780301094055176, y: -0.2, z: -20.548160552978516 },
//         ],
//         scale = { x: 1.5, y: 1.5, z: 1.5 }
//     ) {
//         this.experience = new Experience();
//         this.scene = this.experience.scene;
//         this.camera = this.experience.camera.instance;
//         this.resources = this.experience.resources;
//         this.positions = positions;
//         this.scale = scale;
//         this.raycaster = new THREE.Raycaster();
//         this.mouse = new THREE.Vector2();
        
//         this.init();
//         this.setMaterials();
//         this.setPositions();
//         this.setScale();
//         this.addLighting(); // Ensure there's lighting in the scene
//         this.addEventListeners(); // Add event listeners for interaction
//     }

//     init() {
//         this.interactions = [
//             this.resources.items.whiterun.interactions1.scene,
//             this.resources.items.whiterun.interactions2.scene,
//             this.resources.items.whiterun.interactions3.scene,
//             // Add more models as needed
//         ];
//     }

//     setMaterials() {
//         this.interactions.forEach((interaction) => {
//             this.scene.add(interaction);
//         });
//     }

//     setPositions() {
//         this.interactions.forEach((interaction, index) => {
//             const position = this.positions[index] || { x: 0, y: 0, z: 0 };
//             interaction.position.set(position.x, position.y, position.z);
//         });
//     }

//     setScale() {
//         this.interactions.forEach((interaction) => {
//             interaction.scale.set(this.scale.x, this.scale.y, this.scale.z);
//         });
//     }

//     addLighting() {
//         const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
//         this.scene.add(ambientLight);

//         const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//         directionalLight.position.set(5, 10, 7.5);
//         this.scene.add(directionalLight);
//     }

//     addEventListeners() {
//         window.addEventListener('click', this.onClick.bind(this), false);
//     }

//     onClick(event) {
//         // Calculate the center of the screen
//         this.mouse.x = 0;
//         this.mouse.y = 0;

//         // Update the raycaster with the camera and mouse position
//         this.raycaster.setFromCamera(this.mouse, this.camera);

//         // Calculate objects intersecting the ray
//         const intersects = this.raycaster.intersectObjects(this.interactions, true);

//         if (intersects.length > 0) {
//             console.log('Detected object:', intersects[0].object.name);
//             // Add additional logic here to handle detected objects
//         }
//     }
// }
