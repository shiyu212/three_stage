import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Experience from '../../Experience'

let instance = null

export default class OribitControl {
    constructor() {
        if (instance) {
            return instance
        }
        instance = this
        const experience = new Experience()
        this.camera = experience.camera.instance
        this.canvas = experience.canvas
        this.controls = {}
    }

    use() {
        this.controls = new OrbitControls(this.camera, this.canvas)
        this.controls.saveState()
        this.controls.enableDamping = true
    }

    update() {
        this.controls.update()
    }
}