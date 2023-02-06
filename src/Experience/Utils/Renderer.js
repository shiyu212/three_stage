import Experience from "../Experience";
import * as THREE from 'three'

export default class Renderer {
    constructor() {
        const experience = new Experience()
        this.canvas = experience.canvas
        this.sizes = experience.sizes
        this.pixelRatio = experience.pixelRatio
        this.scene = experience.scene
        this.camera = experience.camera

        this.setInstance()
    }

    setInstance() {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        })
        this.instance.physicallyCorrectLights = true
        this.instance.outputEncoding = THREE.sRGBEncoding
        // 色调映射Tone mapping旨在将超高的动态范围HDR转换到我们日常显示的屏幕上的低动态范围LDR的过程
        // 适配不同屏幕亮度
        this.instance.toneMapping = THREE.ACESFilmicToneMapping
        this.instance.toneMappingExposure = 1.75
        // 允许使用阴影贴图
        this.instance.shadowMap.enabled = true
        this.instance.shadowMap.type = THREE.PCFSoftShadowMap
        this.instance.setClearColor('#211d20')
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
    }

    resize() {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
    }

    update() {
        this.instance.render(this.scene, this.camera.instance)
    }
}