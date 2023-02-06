import EventEmitter from './EventEmitter'

export default class Time extends EventEmitter {
    constructor() {
        // 在当前作用域下调用父类构造函数
        super()

        this.start = Date.now()
        this.current = this.start
        // v. （时间）消逝，过去
        // 程序运行时间
        this.elapsed = 0
        // ？？？
        this.delta = 0
        this.tick()
    }

    // 每次更新执行
    tick() {
        const currentTime = Date.now()
        this.delta = currentTime - this.current
        this.current = currentTime
        this.elapsed = this.current - this.start

        // 通知主函数需要更新
        this.trigger('tick')

        // 控制更新
        window.requestAnimationFrame(() => {
            this.tick()
        })
    }
}