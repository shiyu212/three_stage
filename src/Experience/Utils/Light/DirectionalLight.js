import * as THREE from 'three'
import Experience from "../../Experience"

export default class DirectionalLight {
    constructor() {
        this.experience = new Experience()
        this.debug = this.experience.debug
        this.setDirectionalLight()
    }

    // 产生直射光
    setDirectionalLight() {
        const _directionalLight = new THREE.DirectionalLight('#FFFFFF', 4)
        // _directionalLight.castShadow = true
        // _directionalLight.shadow.camera.far = 15
        // _directionalLight.shadow.mapSize.set(1024, 1024)
        // _directionalLight.shadow.normalBias = 0.05
        _directionalLight.position.set(3.5, 2, -1.25)
        this.instance = _directionalLight
        this.experience.scene.add(this.instance)
        
        // const helper = new THREE.DirectionalLightHelper(this.instance);
        // this.experience.scene.add(helper);

        if (this.debug.active) {
            this.debugFolder = this.debug.gui.addFolder('DirectionalLight')
            this.debug.setDebugFolder(this.debugFolder, this.instance.position, 'x', -100, 100, 0.01, 'LightPositionX')
            this.debug.setDebugFolder(this.debugFolder, this.instance.position, 'y', -100, 100, 0.01, 'LightPositionY')
            this.debug.setDebugFolder(this.debugFolder, this.instance.position, 'z', -100, 100, 0.01, 'LightPositionZ')
        }
    }
}