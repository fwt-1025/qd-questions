/**
 * 参考 https://github.com/leefinder/blogs/tree/master/js-think/promise
 */
class Promise {
    constructor (fn) {
        this.status = 'PENDING'
        this.resolveArr = []
        this.rejectedArr = []
        this.arg = null
        if (!fn || typeof fn !== 'function') {
            throw new Error('fn should be a function!')
        }
        const resolve = (arg) => {
            const run = () => {
                if (this.status == 'PENDING') {
                    this.status = 'FULLFILLED'
                    this.arg = arg
                    let cb
                    while(cb = this.resolveArr.shift()) {
                        cb(this.arg)
                    }
                }
            }
            setTimeout(_ => run(), 0)
        }
        const rejectd = (arg) => {
            const run = () => {
                if (this.status == 'PENDING') {
                    this.status = 'REJECTED'
                    this.arg = arg
                    let cb
                    while(cb = this.rejectedArr.shift()) {
                        cb(this.arg)
                    }
                }
            }
            setTimeout(_ => run(), 0)
        }
        fn(resolve, rejectd)
    }
    then (successFn, rejectFn) {
        const { status } = this
        
        return new Promiser((resolve, rejectd) => {
            const onFullFilled = (value) => {
                if (!successFn || typeof successFn !== 'function') {
                    resolve(value)
                } else {
                    const res = successFn(value)
                    if (res instanceof Promiser) {
                        res.then(resolve, rejectd)
                    } else {
                        resolve(value)
                    }
                }
            }
            const onRejected = (value) => {
                console.log(value)
                if (!rejectFn || typeof rejectFn !== 'function') {
                    rejectd(value)
                } else {
                    const res = rejectFn(value)
                    if (res instanceof Promiser) {
                        res.then(resolve, rejectd)
                    } else {
                        rejectd()
                    }
                }
            }
            if (status === 'FULLFILLED') {
                onFullFilled()
            } else if (status === 'REJECTED') {
                onRejected()
            } else {
                this.resolveArr.push(onFullFilled)
                this.rejectedArr.push(onRejected)
            }
        })
    }
}