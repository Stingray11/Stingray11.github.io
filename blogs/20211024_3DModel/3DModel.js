/*jshint esversion: 6 */
// @ts-check

import * as THREE from "../../assets/THREE/src/Three.js";
import { OrbitControls } from "../../assets/THREE/examples/jsm/controls/OrbitControls.js";

import { OBJLoader } from "../../assets/THREE/examples/jsm/loaders/OBJLoader.js";

window.onload = function () {
    /** @type{THREE.Scene} */
    let scene = new THREE.Scene();
    /** @type{number} */
    let wid = 700; // window.innerWidth;
    /** @type{number} */
    let ht = 500; // window.innerHeight;
    /** @type{THREE.PerspectiveCamera} */
    let main_camera = new THREE.PerspectiveCamera(60, wid / ht, 1, 100);
    main_camera.position.set(0, 4, 6);
    main_camera.rotation.set(-0.5, 0, 0);
    let active_camera = main_camera;
    /** @type{THREE.WebGLRenderer} */
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(wid, ht);
    renderer.shadowMap.enabled = true;

    document.getElementById("museum_area").appendChild(renderer.domElement);
    setupButtons();
    setupBasicScene();

    // Here, we add a basic, simple first object to the museum.
    /**@type{THREE.Material} */
    let material = new THREE.MeshPhongMaterial({ color: "#00aa00", shininess: 15, specular: "#00ff00" });
    /**@type{THREE.Geometry} */
    let geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    /**@type{THREE.Mesh} */
    let cube = new THREE.Mesh(geometry, material);
    cube.position.set(2, 1.35, 2);
    cube.rotation.set(Math.PI / 4, 0, Math.PI / 4);
    cube.castShadow = true;


    // add a cone
    let material2 = new THREE.MeshPhongMaterial({ color: "red", shininess: 15, specular: "#00ff00" });
    let cone = new THREE.ConeGeometry(0.3, 0.5, 30);
    let coneMesh = new THREE.Mesh(cone, material2);
    coneMesh.position.set(2, 1.5, -2);
    coneMesh.castShadow = true;

    // add a sphere
    let material3 = new THREE.MeshPhongMaterial({ color: "blue", shininess: 15, specular: "#00ff00" });
    let geometry2 = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    let cube2 = new THREE.Mesh(geometry2, material3);
    cube2.position.set(-2, 1.5, -2);
    cube2.castShadow = true;

    // add a cylinder
    let material4 = new THREE.MeshPhongMaterial({ color: "yellow", shininess: 15, specular: "#00ff00" });
    let cylinder = new THREE.CylinderGeometry(0.3, 0.3, 0.5, 20, 20);
    let cylinderMesh = new THREE.Mesh(cylinder, material4);
    cylinderMesh.position.set(-2, 1.5, 2);
    cylinderMesh.castShadow = true;


    /**@type{THREE.SpotLight} */
    let spotlight_1 = new THREE.SpotLight(0xaaaaff, 0.5);
    spotlight_1.angle = Math.PI / 16;
    spotlight_1.position.set(2, 5, 2);
    spotlight_1.target = cube;
    spotlight_1.castShadow = true;
    scene.add(spotlight_1);

    // TODO: You need to place the lights.
    let spotlight_2 = new THREE.SpotLight(0xaaaaff, 0.5);
    spotlight_2.angle = Math.PI / 16;
    spotlight_2.position.set(2, 5, -2);
    spotlight_2.target = coneMesh;
    spotlight_2.castShadow = true;
    scene.add(spotlight_2);

    spotlight_2.castShadow = true;
    let spotlight_3 = new THREE.SpotLight(0xaaaaff, 0.5);
    spotlight_3.angle = Math.PI / 16;
    spotlight_3.position.set(-2, 5, -2);
    spotlight_3.target = cube2;
    spotlight_3.castShadow = true;
    scene.add(spotlight_3);

    let spotlight_4 = new THREE.SpotLight(0xaaaaff, 0.5);
    spotlight_4.angle = Math.PI / 16;;
    spotlight_4.position.set(-2, 5, 2);
    spotlight_4.target = cylinderMesh;
    spotlight_4.castShadow = true;
    scene.add(spotlight_4);

    // TODO: You need to place these cameras.
    let camera_1 = new THREE.PerspectiveCamera(60, wid / ht, 1, 100);
    camera_1.position.set(0,2,0);
    camera_1.lookAt(cube.position);

    let camera_2 = new THREE.PerspectiveCamera(60, wid / ht, 1, 100);
    camera_2.position.set(0,2,0);
    camera_2.lookAt(coneMesh.position);

    let camera_3 = new THREE.PerspectiveCamera(60, wid / ht, 1, 100);
    camera_3.position.set(0,2,0);
    camera_3.lookAt(cylinderMesh.position);

    let camera_4 = new THREE.PerspectiveCamera(60, wid / ht, 1, 100);
    camera_4.position.set(0,2,0);
    camera_4.lookAt(cube2.position);

    scene.add(cube);
    scene.add(coneMesh);
    scene.add(cylinderMesh);
    scene.add(cube2);

    // finally, draw the scene. Also, add animation.

    renderer.render(scene, main_camera);

    function animate() {

        let t = Math.PI *2 * (performance.now() % 2000)/2000;
        let y = 0.2 * Math.cos(t)+0.5;
        let y2 = 0.2 * Math.cos(t+1)+0.5;
        let y3 = 0.2 * Math.cos(t+2)+0.5;
        let y4 = 0.2 * Math.cos(t+3)+0.5;
        cube.position.set(2, 1.35+y, 2);
        coneMesh.position.set(2, 1.5+y4, -2);
        cylinderMesh.position.set(-2, 1.5 +y3, 2);
        cube2.position.set(-2, 1.5 +y2, -2);
        cube.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), 0.005);
        coneMesh.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), 0.005);
        cylinderMesh.rotateOnWorldAxis(new THREE.Vector3(1, 1, 0), 0.005);
        cube2.rotateOnWorldAxis(new THREE.Vector3(1, 1, 0), 0.005);


        renderer.render(scene, active_camera);

        requestAnimationFrame(animate);
    }
    animate();

    // Simple wrapper function for code to set up the basic scene
    // Specifically, sets up the stuff students don't need to use directly.
    function setupBasicScene() {
        // make a ground plane.
        let geometry1 = new THREE.BoxGeometry(10, 0.1, 10);
        let material1 = new THREE.MeshStandardMaterial({ color: "#dddddd", metalness: 0.2, roughness: 0.8 });
        /**@type{THREE.Mesh} */
        let ground = new THREE.Mesh(geometry1, material1);
        ground.position.set(0, -1, 0);
        scene.add(ground);

        let locs = [-2, 2];
        /**@type{THREE.Geometry} */
        let geometry2 = new THREE.CylinderGeometry(0.5, 0.75, 2, 16, 8);
        /**@type{THREE.Material} */
        let material2 = new THREE.MeshPhongMaterial({ color: "#888888", shininess: 50 });
        locs.forEach(function (x_loc) {
            locs.forEach(function (z_loc) {
                /**@type{THREE.Mesh} */
                let object = new THREE.Mesh(geometry2, material2);
                object.position.x = x_loc;
                object.position.z = z_loc;
                object.position.y = 0;
                object.receiveShadow = true;

                scene.add(object);
            });
        });

        /**@type{THREE.AmbientLight} */
        let amb_light = new THREE.AmbientLight(0xffffff, 0.2);
        scene.add(amb_light);
    }

    function setupButtons() {
        document.getElementById("main_cam").onclick = function () {
            active_camera = main_camera;
            renderer.render(scene, active_camera);
        };
        document.getElementById("cam_1").onclick = function () {
            active_camera = camera_1;
            renderer.render(scene, active_camera);
        };
        document.getElementById("cam_2").onclick = function () {
            active_camera = camera_2;
            renderer.render(scene, active_camera);
        };
        document.getElementById("cam_3").onclick = function () {
            active_camera = camera_3;
            renderer.render(scene, active_camera);
        };
        document.getElementById("cam_4").onclick = function () {
            active_camera = camera_4;
            renderer.render(scene, active_camera);
        };
    }

};