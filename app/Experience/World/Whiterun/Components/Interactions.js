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

