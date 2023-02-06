import Time from "./Utils/Time"
import perspectiveCamera from './Utils/Camera/PerspectiveCamera'
import Sizes from "./Utils/Sizes"
import Debug from './Utils/Debug'
import World from './World/World'
import Renderer from "./Utils/Renderer"
import Resources from "./Utils/Resources/Resources"
import Controls from './Utils/Controls/Controls'
import * as THREE from 'three'
let instance = null

export default class Experience {
    constructor(canvas) {
        // 单例模式
        if (instance) {
            return instance
        }

        // 将全局对象挂载到window 用于控制台测试
        window.exprience = this
        instance = this

        // 常复用的全局数据挂载到全局对象exprience上
        this.canvas = canvas
        this.scene = new THREE.Scene()
        this.debug = new Debug()


        // 实例化工具类
        this.sizes = new Sizes()
        this.sizes.on('resize', () => {
            this.resize()
        })
        this.time = new Time()
        this.time.on('tick', () => {
            this.update()
        })
        this.camera = new perspectiveCamera()
        this.world = new World()
        this.renderer = new Renderer()
        this.resources = new Resources()
        this.controls = new Controls()
    }

    update() {
        this.renderer.update()
    }

    resize() {
        this.renderer.update()
    }
}