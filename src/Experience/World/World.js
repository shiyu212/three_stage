import * as THREE from 'three'
import Experience from "../Experience"
import EventEmitter from "../Utils/EventEmitter"
import Resources from "../Utils/Resources/Resources"
import Environment from "./Environment"
import Model from './Model'
import Script from '../Script'


export default class World extends EventEmitter {
    constructor() {
        super()

        this.experience = new Experience()
        this.scene = this.experience.scene
        this.scene.background = new THREE.Color(0xf0f0f0);
        this.resources = new Resources()
        this.resources.on('ready', () => {
            this.ready()
        })
        this.environment = new Environment()
    }

    ready() {
        this.model = new Model()
        this.script = new Script()
        // const geometry = new THREE.SphereGeometry(100, 32, 16);
        // const material = new THREE.MeshStandardMaterial()
        // const sphere = new THREE.Mesh(geometry, material);
        // this.experience.scene.add(sphere);
    }
}