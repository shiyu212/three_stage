import * as THREE from 'three'
import Experience from "../../Experience"

export default class SpotLight {
    constructor() {
        this.experience = new Experience()
        this.debug = this.experience.debug
        this.setSpotLight()
    }

    // 产生直射光
    setSpotLight() {
        const spotLight = new THREE.SpotLight(0xffffff, 0.5, 600, Math.PI * 0.1, 0, 0)
        spotLight.position.set(300, 300, 300)
        this.spotLight = spotLight
        this.experience.scene.add(this.spotLight);

        const spotLightHelper = new THREE.SpotLightHelper(this.spotLight);
        this.experience.scene.add(spotLightHelper);

        if (this.debug.active) {
            this.debugFolder = this.debug.gui.addFolder('spotLight')
            this.debug.setDebugFolder(this.debugFolder, this.spotLight.position, 'x', -3000, 3000, 1, 'SpotLightPositionX')
            this.debug.setDebugFolder(this.debugFolder, this.spotLight.position, 'y', -3000, 3000, 1, 'SpotLightPositionY')
            this.debug.setDebugFolder(this.debugFolder, this.spotLight.position, 'z', -3000, 3000, 1, 'SpotLightPositionZ')
        }
    }
}