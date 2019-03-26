var { Router } = require('express');
var router = new Router();

router.get('/', (_req, res) => res.render('index'));

module.exports = router;
