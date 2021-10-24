const router = require('express').Router();
const {
  getAllCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/card');
const { createCardValidator, deleteCardValidator } = require('../middlewares/validation');

router.get('/', getAllCards);

router.post('/', createCard, createCardValidator);

router.delete('/:id', deleteCard, deleteCardValidator);

router.put('/:cardId/likes', likeCard);

router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
