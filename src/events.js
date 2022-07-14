const express = require('express');

function createRouter(db) {
  const router = express.Router();
  const owner = '';

  // the routes are defined here
  router.get('/challenges/:date', (req, res, next) => {
	  db.query(
		'SELECT challenge_id, challenge_date, letters, words, max_points FROM challenges WHERE challenge_date=? ORDER BY challenge_date LIMIT 10 OFFSET ?',
		[req.params.date, 10*(req.params.page || 0)],
		(error, results) => {
			if (error) {
				console.log(error);
				res.status(500).json({status: 'error'});
			} else {
				res.status(200).json(results);
			}
		});
  });

  return router;
}

module.exports = createRouter;