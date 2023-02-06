import * as THREE from 'three'
import sources from '../../Sources'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import EventEmitter from '../EventEmitter'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

let intance = null

export default class Resources extends EventEmitter {
    constructor() {
        super()

        if (intance) {
            return intance
        }
        intance = this

        this.sources = sources
        this.loaded = 0
        this.items = []
        this.setLoaders()
        this.startLoading()
    }

    setLoaders() {
        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader()
        this.loaders.textureLoader = new THREE.TextureLoader()
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader()
        this.loaders.dracoLoader = new DRACOLoader()
    }

    startLoading() {
        for (const source of this.sources) {
            this.loaders[source.loader].load(
                source.path,
                (file) => {
                    this.sourceLoaded(source, file)
                }
            )
        }
    }

    sourceLoaded(source, file) {
        this.loaded++
        this.items[source.name] = file
        if (this.loaded === this.sources.length) {
            this.trigger('ready')
        }
    }
}