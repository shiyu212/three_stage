import Experience from './Experience'
import * as THREE from 'three'
import gsap from 'gsap'

let instance = null

export default class Script {
    constructor() {
        // 单例模式
        if (instance) {
            return instance
        }
        this.experience = new Experience()
        this.world = this.experience.world
        this.model = this.world.model.instance
        this.directionalLight = this.world.environment.directionalLight.instance

        this.experience.camera._position.z = 350
        this.experience.camera.updateCamera()
        this.experience.scene.background = new THREE.Color(0x000000)

        this.ease = 'power2'
        this.script1()
    }



    async script1() {
        // 脚本 灯光自右往左平扫
        await gsap.to(this.directionalLight.position, { duration: 5, x: -3.5, y: 30, z: 10, ease: this.ease })

        // 脚本 灯光自正下方往上平扫
        this.directionalLight.position.set(0, -90, 10)
        await gsap.to(this.directionalLight.position, { duration: 4, x: -3.5, y: 2, z: -1.25, ease: this.ease })

        // 脚本 正面展示物体 并 左移展示标题
        setTimeout(() => {
            // 出现展示板
            document.querySelector('.ad_board').classList.add('toMove')
        }, 5500)

        // 物体初始化 渐移
        this.model.rotation.set(0, -0.15, 0)
        gsap.to(this.model.rotation, { duration: 5, x: 0, y: 0, z: 0, ease: this.ease })

        // 灯光初始化 渐移
        this.directionalLight.position.set(19, 0, 3)
        gsap.to(this.directionalLight.position, { duration: 5, x: 19, y: 0, z: 20, ease: this.ease })

        // 物体左移 出现展示板
        await gsap.to(this.model.position, { duration: 4, x: -200, y: 0, z: 0, delay: 5, ease: this.ease })
    }
}
