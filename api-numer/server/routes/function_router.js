const express = require('express')

const Ctrl = require('../controllers/function-controllers')

const router = express.Router()

router.post('/function', Ctrl.createfx)
router.put('/function/:id', Ctrl.updatefx)
router.delete('/function/:id', Ctrl.deletefx)
router.get('/function/:name', Ctrl.getfxByname)
router.get('/functions', Ctrl.getfxs)

module.exports = router