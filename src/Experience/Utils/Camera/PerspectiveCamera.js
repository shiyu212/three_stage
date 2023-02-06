import * as THREE from 'three'
import Experience from "../../Experience";
import gsap from 'gsap'

export default class PerspectiveCamera {
    constructor() {
        const experience = new Experience()
        this.scene = experience.sence
        this.sizes = experience.sizes
        this.scene = experience.scene
        this.debug = experience.debug
        this.setInstance()
        this.setLookAt()
        // this.openMouseMove()
    }

    setInstance() {
        this.fov = 70
        this._position = {
            x: 0,
            y: 0,
            z: 500
        }
        this.instance = new THREE.PerspectiveCamera(
            70,
            this.sizes.width / this.sizes.height,
            1,
            1000
        )
        this.instance.position.set(this._position.x, this._position.y, this._position.z)
        this.scene.add(this.instance)

        // const helper = new THREE.CameraHelper(this.instance);
        // this.scene.add(helper);

        const updateCamera = () => {
            this.updateCamera()
        }
        if (this.debug.active) {
            this.debugFolder = this.debug.gui.addFolder('PerspectiveCamera')
            this.debug.setDebugFolder(this.debugFolder, this, 'fov', 0, 100, 0.01, 'fov')
            this.debug.setDebugFolder(this.debugFolder, this._position, 'x', -500, 2000, 1, 'positionX', updateCamera)
            this.debug.setDebugFolder(this.debugFolder, this._position, 'y', -500, 2000, 1, 'positionY', updateCamera)
            this.debug.setDebugFolder(this.debugFolder, this._position, 'z', -500, 2000, 1, 'positionZ', updateCamera)
        }
    }

    // 设置相机指向位置
    setLookAt() {
        this._lookAt = {
            x: 0,
            y: 0,
            z: 0
        }
        const updateCamera = () => {
            this.updateCamera()
        }
        this.debug.setDebugFolder(this.debugFolder, this._lookAt, 'x', -500, 500, 1, 'lookAtX', updateCamera)
        this.debug.setDebugFolder(this.debugFolder, this._lookAt, 'y', -500, 500, 1, 'lookAtY', updateCamera)
        this.debug.setDebugFolder(this.debugFolder, this._lookAt, 'z', -500, 500, 1, 'lookAtZ', updateCamera)
    }

    openMouseMove() {
        this.mouseX = 0
        this.mouseY = 0
        this.windowHalfX = this.sizes.width / 2
        this.windowHalfY = this.sizes.height / 2
        // 开启视角移动改变
        document.addEventListener('mousemove', (event) => {
            this.onDocumentMouseMove(event)
        }, false);
    }

    onDocumentMouseMove(event) {
        this.mouseX = (event.clientX - this.windowHalfX) * 1
        this.mouseY = (event.clientY - this.windowHalfY) * 1
        const camera = this.instance
        camera.position.x += (this.mouseX - camera.position.x) * .05;
        camera.position.y += (- this.mouseY - camera.position.y) * .05;
    }

    move() {
        this.bindKey(this.instance, 'position', { 'x': 'y', 'z': 'z' })
        this.gsapTo(this.instance, 'position', { x: 0, y: 150, z: 1000 }, new THREE.Vector3(0, 10, 0))
        this.gsapTo(this.instance, 'rotation', { x: 0, y: 0, z: 0 }, new THREE.Vector3(0, 10, 0))
        // this.gsapTo(this.instance, { x: 0, y: 0, z: 1000 }, new THREE.Vector3(0, 10, 0))
    }

    bindKey(camera, key, obj) {
        window.onkeydown = (e) => {
            Object.keys(obj).map(i => {
                if (e.key === i) {
                    camera[key][obj[i]] += 10
                    // camera.lookAt(new THREE.Vector3(0, 0, 0))
                }
            })
        }
    }

    gsapTo(camera, key, obj) {
        gsap.to(camera[key], {
            duration: 3, x: obj.x, y: obj.y, z: obj.z, delay: 1, onUpdate: () => {
                camera.lookAt(new THREE.Vector3(0, 0, 0))
            }
        })
    }

    updateCamera() {
        this.instance.position.set(this._position.x, this._position.y, this._position.z)
        // this.gsapTo(this.instance, 'position', , new THREE.Vector3(0, 0, 0))
        // this.instance.lookAt(this._lookAt)
        // console.log(this.instance, this._lookAt);
    }

    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }
}