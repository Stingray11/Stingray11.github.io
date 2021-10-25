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
    let renderer = new THREE.WebGLRenderer({alpha:true, antialias:true});
    renderer.setSize(wid, ht);
    renderer.shadowMap.enabled = true;
    renderer.setClearColor(0xffffff,0);
    let controls = new OrbitControls(main_camera,renderer.domElement);
    document.getElementById("museum_area").appendChild(renderer.domElement);

    setupBasicScene();



    let geometry5 = new THREE.Geometry();
    //let material5 = new THREE.MeshPhongMaterial({ color: "blue", shininess: 15, specular: "#00ff00" });
    let material5 = new THREE.MeshPhongMaterial({ color: "blue", shininess: 15, specular: "#00ff00" });
    
    let box = new THREE.Mesh(geometry5,material5);
    let loader = new OBJLoader();
    // loader.load("/assets/grip_ver1.obj", function(model){
    //     model.position.set(0,0,0);
    //     model.scale.set(0.05,0.05,0.05);
    //     box.add(model);
    // });

    loader.load("/assets/grip_ver1.obj", function(model){
            model.traverse(child=>{
                //if(child.material) child.material = new THREE.MeshPhongMaterial({ color: "blue", shininess: 15, specular: "#00ff00" });
                if (child.isMesh){
                    child.material = new THREE.MeshPhongMaterial({ color: "gray", shininess: 15, specular: "#ffffff" });
                    //child.material.wireframe = true;
                }
            });

        model.position.set(0,0,0);
        model.scale.set(0.05,0.05,0.05);

        box.add(model);
    });


    // let geo = new THREE.EdgesGeometry(geometry5);
    // let mat = new THREE.LineBasicMaterial({color:"blue", linewidth:2});
    // let wireframe = new THREE.LineSegments(geo,mat);


    let spotlight_4 = new THREE.SpotLight(0xaaaaff, 0.5);
    spotlight_4.angle = Math.PI / 8;;
    spotlight_4.position.set(-0, 20, 0);
    spotlight_4.target = box;
    spotlight_4.castShadow = true;
    scene.add(spotlight_4);

    let spotlight_5 = new THREE.SpotLight(0xaaaaff, 0.5);
    spotlight_5.angle = Math.PI / 8;;
    spotlight_5.position.set(-0, -20, 0);
    spotlight_5.target = box;
    spotlight_5.castShadow = true;
    scene.add(spotlight_5);
  


    scene.add(box);
    
    // finally, draw the scene. Also, add animation.

    renderer.render(scene, main_camera);

    function animate() {

        // let t = Math.PI *2 * (performance.now() % 2000)/2000;
        // let y = 0.2 * Math.cos(t)+0.5;
        // let y2 = 0.2 * Math.cos(t+1)+0.5;
        // let y3 = 0.2 * Math.cos(t+2)+0.5;
        // let y4 = 0.2 * Math.cos(t+3)+0.5;
        // cube.position.set(2, 1.35+y, 2);
        // coneMesh.position.set(2, 1.5+y4, -2);
        // cylinderMesh.position.set(-2, 1.5 +y3, 2);
        // cube2.position.set(-2, 1.5 +y2, -2);
        // cube.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), 0.005);
        // coneMesh.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), 0.005);
        // cylinderMesh.rotateOnWorldAxis(new THREE.Vector3(1, 1, 0), 0.005);
        // cube2.rotateOnWorldAxis(new THREE.Vector3(1, 1, 0), 0.005);


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
        //scene.add(ground);

  


        /**@type{THREE.AmbientLight} */
        let amb_light = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(amb_light);
    }



};