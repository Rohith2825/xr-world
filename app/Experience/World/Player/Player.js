import * as THREE from "three";
import Experience from "../../Experience.js";

import { Capsule } from "three/examples/jsm/math/Capsule";

let instance = null;
export default class Player {

    constructor() {
        if (instance) {
            return instance;
        }

        instance = this;

        this.experience = new Experience();
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.octree = this.experience.world.octree;

        this.initPlayer(); this.initControls();

        this.addEventListeners();
    }

    initPlayer() {
        this.player = {};
        this.player.body = this.camera.perspectiveCamera;

        this.player.onFloor = false;
        this.player.gravity = 60;
        this.controllerDirection = new THREE.Vector3(); this.upVector = new THREE.Vector3(0, 0, 1);
        this.player.spawn = {
            position: new THREE.Vector3(),
            rotation: new THREE.Euler(),
            velocity: new THREE.Vector3(),
        };

        this.player.raycaster = new THREE.Raycaster();

        this.player.height = 1.7;
        this.player.position = new THREE.Vector3();
        this.player.rotation = new THREE.Euler();
        this.player.rotation.order = "YXZ";

        this.player.velocity = new THREE.Vector3();
        this.player.direction = new THREE.Vector3();

        this.player.speedMultiplier = 0.8;

        this.isSwiping = false;
        this.firstTouch = true;
        this.startX = 0;
        this.startY = 0;
        this.delta = 1.5


        this.player.collider = new Capsule(
            new THREE.Vector3(),
            new THREE.Vector3(),
            0.35
        );
        this.update = (window.mobileAndTabletCheck() ? this.updateMobile : this.updateKeyboard);
        this.lastRaycast = this.time.current;
    }


    initControls() {
        this.actions = {};
    }

    onDesktopPointerMove = (e) => { if (document.pointerLockElement !== document.querySelector('.experience-canvas')) return;
        this.player.body.rotation.order = this.player.rotation.order;
        this.player.body.rotation.x -= e.movementY / 500;
        this.player.body.rotation.y -= e.movementX / 500;
        
        this.player.body.rotation.x = THREE.MathUtils.clamp(
            this.player.body.rotation.x,
            -Math.PI / 2, Math.PI / 2
        );
    };


    onMobileDeviceMove(e) {
        if (e.target.closest('#joystick-container')) return; 

        if (this.firstTouch) {
            this.startX = e.pageX;
            this.startY = e.pageY;
            this.firstTouch = false;
        } else {
            const diffX = e.pageX - this.startX;
            const diffY = e.pageY - this.startY;

            this.player.body.rotation.order = this.player.rotation.order;
            this.player.body.rotation.y -= diffX / 200;  
            this.player.body.rotation.x -= diffY / 200;  

            this.player.body.rotation.x = THREE.MathUtils.clamp(
                this.player.body.rotation.x,
                -Math.PI / 2, Math.PI / 2
            );

            this.startX = e.pageX;
            this.startY = e.pageY;

            this.isSwiping = true;  
        }
    }

    onKeyDown = (e) => {
        if (document.pointerLockElement !== document.querySelector('.experience-canvas')) return;

        if (e.code === "KeyW") {
            this.actions.forward = true;
        }
        if (e.code === "KeyS") {
            this.actions.backward = true;
        }
        if (e.code === "KeyA") {
            this.actions.left = true;
        }
        if (e.code === "KeyD") {
            this.actions.right = true;
        }

        if (e.code === "ShiftLeft") {
            this.actions.run = true;
        }

        if (e.code === "Space") {
            this.actions.jump = true;
        }
    };

    onKeyUp = (e) => {
        if (document.pointerLockElement !== document.querySelector('.experience-canvas')) return;

        if (e.code === "KeyW") {
            this.actions.forward = false;
        }
        if (e.code === "KeyS") {
            this.actions.backward = false;
        } if (e.code === "KeyA") {
            this.actions.left = false;
        }
        if (e.code === "KeyD") {
            this.actions.right = false;
        }

        if (e.code === "ShiftLeft") {
            this.actions.run = false;
        }

        if (e.code === "Space") {
            this.actions.jump = false;
        }
    };

    // onPointerDown = (e) => {
    //     if (e.pointerType === "mouse") {
    //         document.querySelector('.experience-canvas').requestPointerLock();
    //         return;
    //     }
    // };


    onPointerDown = (e) => {
        const timeElapsed = (this.time.current - this.lastRaycast)
        const RAYCAST_COOLDOWN = 1000;
        if (e.pointerType === "mouse") {
            document.querySelector('.experience-canvas').requestPointerLock();
            if (timeElapsed > RAYCAST_COOLDOWN){
                this.current = this.lastRaycast;
                this.raycast(); }
            return;
        }
        if (e.pointerType === "touch") {
            if (timeElapsed > RAYCAST_COOLDOWN){
                this.current = this.lastRaycast;
                this.raycast();
            }
        }
    };
    


    raycast() {
        // Set raycaster from the camera
        this.player.raycaster.setFromCamera({ x: 0, y: 0 }, this.camera.perspectiveCamera);
    
        // Check for intersections with objects in the scene
        const intersects = this.player.raycaster.intersectObjects(this.experience.scene.children, true);
    
        // UUID and name to match
        const targetObjects = [
            { uuid: '47676f83-ba31-4804-8b94-89e1512e32cc', name: 'Dress_F2_0' },
            { uuid: 'f700d2b0-54bb-4006-9ea3-387911127477', name: 'Pattern2D_15970001_D1_0' },
            { uuid: 'ed238f4e-d667-4385-a492-c4d9346c1646', name: 'D1_MD1_0' }
        ];
    
        // Iterate through the intersected objects
        for (let i = 0; i < intersects.length; i++) {
            const object = intersects[i].object;
    
            // Check if the object's UUID and name match any of the target objects
            const isTargetObject = targetObjects.some(target => 
                object.name === target.name
            );
    
            if (isTargetObject) {
                console.log("Intersected target object:", object);
                // Handle interaction with the object
                window.showModal();
                break; // Exit loop after first match
            }
        }
    }
    
    

    playerCollisions() {
        const result = this.octree.capsuleIntersect(this.player.collider);
        this.player.onFloor = false;

        if (result) {
            this.player.onFloor = result.normal.y > 0;

            this.player.collider.translate(
                result.normal.multiplyScalar(result.depth)
            );
        }
    }

    getForwardVector() {
        this.camera.perspectiveCamera.getWorldDirection(this.player.direction);
        this.player.direction.y = 0;
        this.player.direction.normalize();

        return this.player.direction;
    }

    getSideVector() {
        this.camera.perspectiveCamera.getWorldDirection(this.player.direction);
        this.player.direction.y = 0;
        this.player.direction.normalize();
        this.player.direction.cross(this.camera.perspectiveCamera.up);

        return this.player.direction;
    }
    addEventListeners() {
        document.addEventListener("keydown", this.onKeyDown);
        document.addEventListener("keyup", this.onKeyUp);
        const canvas = document.querySelector('.experience-canvas');
        if(canvas)
        canvas.addEventListener("pointermove", (e) => {
            if(e.pointerType === "touch"){
                this.onMobileDeviceMove(e);
            } else {
                this.onDesktopPointerMove(e)
            }
        });
        else console.log('No canvas?');
        canvas.addEventListener("pointerdown", this.onPointerDown);
        canvas.addEventListener('pointerdown', (e) => {
            if (e.target.closest('#joystick-container')) return;
            if (e.pointerType === 'touch') {
                this.firstTouch = true;  
                this.startX = e.pageX;
                this.startY = e.pageY;
                this.isSwiping = false;
            } });

        canvas.addEventListener('pointerup', (e) => {
            if (e.pointerType === 'touch') {
                this.isSwiping = false;
                this.firstTouch = true;  
            }
        });
    }

    resize() { }

    spawnPlayerOutOfBounds() {
        const spawnPos = new THREE.Vector3(12.64, 1.7 + 10, 64.0198);
        this.player.velocity = this.player.spawn.velocity;
        this.player.body.position.copy(spawnPos);

        this.player.collider.start.copy(spawnPos);
        this.player.collider.end.copy(spawnPos);

        this.player.collider.end.y += this.player.height;
    }

    updateMobile() {
        const speed =
            (this.player.onFloor ? 1.75 : 0.2) *
            this.player.gravity *
            this.player.speedMultiplier;
        //The amount of distance we travel between each frame
        let speedDelta = this.time.delta * speed * 1.6;

        // const angle = this.getForwardVector().angleTo(this.upVector);
        // const rotationAxis = new THREE.Vector3(0, 1, 0);
        // const movementDirection = this.controllerDirection
        //     .clone()
        //     .applyAxisAngle(rotationAxis, angle);

        const yawRotation = this.camera.perspectiveCamera.rotation.y;
        yawRotation
        const movementDirection = this.controllerDirection.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), yawRotation);

        this.player.velocity.add(movementDirection.multiplyScalar(speedDelta));

        if (this.player.onFloor) {
            if (this.actions.jump) {
                this.player.velocity.y = 15;
            }
        }

        let damping = Math.exp(-15 * this.time.delta) - 1;

        if (!this.player.onFloor) {
            this.player.velocity.y -= this.player.gravity * this.time.delta;
            damping *= 0.1;
        }

        this.player.velocity.addScaledVector(this.player.velocity, damping);

        const deltaPosition = this.player.velocity
            .clone()
            .multiplyScalar(this.time.delta);

        this.player.collider.translate(deltaPosition);
        this.playerCollisions();

        this.player.body.position.copy(this.player.collider.end);
        this.player.body.updateMatrixWorld();

        if (this.player.body.position.y < -20) {
            this.spawnPlayerOutOfBounds();
        }

    }

    updateKeyboard() {

        const speed =
            (this.player.onFloor ? 1.75 : 0.2) *
            this.player.gravity *
            this.player.speedMultiplier;

        //The amount of distance we travel between each frame
        let speedDelta = this.time.delta * speed;

        if (this.actions.run) {
            speedDelta *= 1.6; }
        if (this.actions.forward) {
            this.player.velocity.add(
                this.getForwardVector().multiplyScalar(speedDelta)
            );
        }
        if (this.actions.backward) {
            this.player.velocity.add(
                this.getForwardVector().multiplyScalar(-speedDelta * 0.5)
            );
        }
        if (this.actions.left) {
            this.player.velocity.add(
                this.getSideVector().multiplyScalar(-speedDelta * 0.75)
            );
        }
        if (this.actions.right) {
            this.player.velocity.add(
                this.getSideVector().multiplyScalar(speedDelta * 0.75)
            );
        }
if (this.player.onFloor) {
            if (this.actions.jump) {
                this.player.velocity.y = 15;
            }
        }
        let damping = Math.exp(-15 * this.time.delta) - 1;

        if (!this.player.onFloor) {
            this.player.velocity.y -= this.player.gravity * this.time.delta;
            damping *= 0.1;
        }

        this.player.velocity.addScaledVector(this.player.velocity, damping);

        const deltaPosition = this.player.velocity
            .clone()
            .multiplyScalar(this.time.delta);

        this.player.collider.translate(deltaPosition);
        this.playerCollisions();

        this.player.body.position.copy(this.player.collider.end);
        this.player.body.updateMatrixWorld();

        if (this.player.body.position.y < -20) {
            this.spawnPlayerOutOfBounds();
        }
    }
}
