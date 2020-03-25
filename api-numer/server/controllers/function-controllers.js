const functionDB = require('../models/fx-model')

const createfx = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide function',
        })
    }

    const fx = new functionDB(body)

    if (!fx) {
        return res.status(400).json({ success: false, error: 'err' })
    }

    fx
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: fx._id,
                message: 'function created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'function not created!',
            })
        })
}

const updatefx = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    functionDB.findOne({ _id: req.params.id }, (err, fx) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'function not found!',
            })
        }
        fx.name = body.name
        fx.fx = body.fx
        fx.xl = body.xl
        fx.xr = body.xr
        fx
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: fx._id,
                    message: 'function updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'function not updated!',
                })
            })
    })
}

const deletefx = async (req, res) => {
    await functionDB.findOneAndDelete({ _id: req.params.id }, (err, fx) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!fx) {
            return res
                .status(404)
                .json({ success: false, error: `function not found` })
        }

        return res.status(200).json({ success: true, data: fx })
    }).catch(err => console.log(err))
}

const getfxByname = async (req, res) => {
    await functionDB.findOne({ name: req.params.name }, (err, fx) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!fx) {
            return res
                .status(404)
                .json({ success: false, error: req.params.name})
        }
        return res.status(200).json({ success: true, data: fx })
    }).catch(err => console.log(err))
}

const getfxs = async (req, res) => {
    await functionDB.find({}, (err, fx) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!fx.length) {
            return res
                .status(404)
                .json({ success: false, error: `function not found wtf` })
        }
        return res.status(200).json({ success: true, data: fx })
    }).catch(err => console.log(err))
}

module.exports = {
    createfx,
    updatefx,
    deletefx,
    getfxs,
    getfxByname,
}