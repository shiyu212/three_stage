import * as dat from 'dat.gui'

let instance = null

export default class Debug {
    constructor() {
        if (instance) {
            return instance
        }
        instance = this
        // this.active = window.location.hash === '#debug'
        this.active = true
        if (this.active) {
            this.gui = new dat.GUI({ width: 400 })
        }
    }

    addFolder(name) {
        if (this.gui) {
            return this.gui.addFolder(name)
        }
    }

    setDebugFolder(debugFolder, obj, key, min, max, step, name, change) {
        if (debugFolder) {
            debugFolder.add(obj, key)
                .min(min)
                .max(max)
                .step(step)
                .name(name)
                .onChange(change)
        }
    }
}