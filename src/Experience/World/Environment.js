import * as THREE from 'three'
import Experience from "../Experience";
import SpotLight from '../Utils/Light/SpotLight'
import DirectionalLight from '../Utils/Light/DirectionalLight'

export default class Environment {
    constructor() {
        this.exprience = new Experience()
        this.scene = this.exprience.scene
        this.resources = this.exprience.resources
        this.debug = this.exprience.debug

        // if (this.debug.active) {
        //     this.debugFolder = this.debug.addFolder('environment')
        // }

        this.directionalLight = new DirectionalLight()
        // this.spotLight = new SpotLight()
        // this.setAmbientLight()
    }

    // 产生太阳光
    setSunLight() {
        const _directionalLight = new THREE.DirectionalLight('#FFFFFF', 4)
        // _directionalLight.castShadow = true
        // _directionalLight.shadow.camera.far = 15
        // _directionalLight.shadow.mapSize.set(1024, 1024)
        // _directionalLight.shadow.normalBias = 0.05
        _directionalLight.position.set(3.5, 2, -1.25)
        this.directionalLight = _directionalLight
        this.scene.add(this.directionalLight)

        if (this.debug.active) {
            this.debug.setDebugFolder(this.debugFolder, this.directionalLight.position, 'x', -10, 10, 0.01, 'LightPositionX')
            this.debug.setDebugFolder(this.debugFolder, this.directionalLight.position, 'y', -10, 10, 0.01, 'LightPositionY')
            this.debug.setDebugFolder(this.debugFolder, this.directionalLight.position, 'z', -10, 10, 0.01, 'LightPositionZ')
        }
    }

    // 产生环境光
    setAmbientLight() {
        const _AmbientLight = new THREE.AmbientLight(0x505050)
        this.ambientLight = _AmbientLight
        this.scene.add(this.ambientLight);
    }
}