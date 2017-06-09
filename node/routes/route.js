var express = require('express');
var router = express.Router();
module.exports = router;

var Controller = require('../controller/items')

router.route('/app/post_item')
  .post(Controller.postItem);
router.route('/app/verification')
  .post(Controller.postItem2)
router.route('/app/postsubuser')
.post(Controller.postsubuser);

router.route('/app/get_items/')
  .post(Controller.check);

  router.route('/app/post_series')
    .post(Controller.postSeries);
  router.route('/app/post_season')
    .post(Controller.postSeason);
  router.route('/app/post_comic')
    .post(Controller.postComic);

  router.route('/app/get_users')
    .get(Controller.getUsers);
  router.route('/app/get_series')
    .get(Controller.getSeries);
  router.route('/app/get_seasons/:seriesId')
    .get(Controller.getSeasons);
  router.route('/app/get_comics/:seriesId/:seasonId')
    .get(Controller.getComics);

  router.route('/app/update_user/:userId')
    .put(Controller.updateUser);
  router.route('/app/update_series/:seriesId')
    .put(Controller.updateSeries);
  router.route('/app/update_season/:seasonId')
    .put(Controller.updateSeason);
  router.route('/app/update_comic/:comicId')
    .put(Controller.updateComic);

  router.route('/app/delete_user/:userId')
    .delete(Controller.deleteUser);
  router.route('/app/delete_series/:seriesId')
    .delete(Controller.deleteSeries);
  router.route('/app/delete_season/:seasonId')
    .delete(Controller.deleteSeason);
  router.route('/app/delete_comic/:comicId')
    .delete(Controller.deleteComic);
