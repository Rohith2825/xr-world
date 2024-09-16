import * as THREE from "three";
import Experience from "../../../Experience.js";

export default class Environment {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        this.init();
        this.setMaterials();
    }

    init() {
        this.skyBoxTexturen = this.resources.items.whiterun.skyBoxTexturen;
        this.skyBoxTexturen.encoding = THREE.sRGBEncoding;
        this.scene.background = this.skyBoxTexturen;
    }


}
