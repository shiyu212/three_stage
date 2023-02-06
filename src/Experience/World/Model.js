import Experience from "../Experience";
import * as THREE from 'three'
import Time from "../Utils/Time";

export default class Fox {
    constructor() {
        this.exprience = new Experience()
        this.time = new Time()
        this.scene = this.exprience.scene
        this.resource = this.exprience.resources.items.foxModel
        this.debug = this.exprience.debug
        if (this.debug.active) {
            this.debugFolder = this.debug.gui.addFolder('Model')
        }
        this.setModel()
    }

    setModel() {
        this.scale = 250
        // 将模型加入场景
        this.instance = this.resource.scene
        this.scene.add(this.instance)
        this.setScale()
        this.setModelToCenter()

        this.instance.traverse(child => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true
            }
        })
        // this.setAnimation()
    }

    // 设置模型比例 可调试
    setScale() {
        // 通过 Box3 获取模型的 大小 数据
        const box3 = new THREE.Box3().setFromObject(this.instance)
        const size = box3.getSize(new THREE.Vector3());
        const maxAxis = Math.max(size.x, size.y, size.z);
        const setModelScale = () => {
            this.instance.scale.set(1, 1, 1).multiplyScalar(this.scale / maxAxis);
        }
        this.debug.setDebugFolder(this.debugFolder, this, 'scale', 1, 500, 0.01, 'scale', setModelScale)
        setModelScale()
    }

    // 将模型移动到中心
    setModelToCenter() {
        // 通过 Box3 获取模型的 中心点 数据
        const box3 = new THREE.Box3().setFromObject(this.instance)
        const center = box3.getCenter(new THREE.Vector3());
        this.instance.position.set(-center.x, -center.y, -center.z)
    }

    setAnimation() {
        this.animation = {}
        console.log('setAnimation', this.instance);
        this.animation.mixer = new THREE.AnimationMixer(this.instance)

        this.animation.actions = {}
        this.animation.actions.idle = this.animation.mixer.clipAction(this.resource.animations[0])
        this.animation.actions.walking = this.animation.mixer.clipAction(this.resource.animations[1])
        this.animation.actions.running = this.animation.mixer.clipAction(this.resource.animations[2])
        this.animation.actions.currnet = this.animation.actions.idle
        this.animation.actions.currnet.play()

        this.animation.play = (name) => {
            const oldAction = this.animation.actions.currnet
            const newAction = this.animation.actions[name]

            newAction.reset()
            newAction.play()
            newAction.crossFadeFrom(oldAction)
            this.animation.actions.currnet = newAction
        }

        if (this.debug.active) {
            const debugObject = {
                playIdle: () => { this.animation.play('idle') },
                playWalking: () => { this.animation.play('walking') },
                playRunning: () => { this.animation.play('running') }
            }
            this.debugFolder.add(debugObject, 'playIdle')
            this.debugFolder.add(debugObject, 'playWalking')
            this.debugFolder.add(debugObject, 'playRunning')
        }
    }

    update() {
        this.animation.mixer.update(this.time.delta * 0.001)
    }
}