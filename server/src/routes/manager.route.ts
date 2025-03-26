import express from 'express';
import {
  createManager,
  getManager,
  getManagerProperties,
  updateManager,
} from '../controllers/manager.controller';

const router = express.Router();

router.get('/:cognitoId', getManager);
router.put('/coginatoId', updateManager);
router.get('/:cognitoId/properties', getManagerProperties);
router.post('/', createManager);

export default router;
