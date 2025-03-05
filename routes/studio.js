const express = require('express');
const router = express.Router();
const studioController = require("../controllers/studioController");
const {uploadIcon, uploadTable, uploadEquipment} = require('../config/multer');


router.get('/rooms', studioController.rooms);
router.post('/add-room', uploadIcon.single('icon'), studioController.addRoom);
router.post('/tables', studioController.tables);
router.post('/add-table', studioController.addTable);
router.post('/edit-table-positions', studioController.editTablePositions);
router.get('/types-tables', studioController.typesTables);
router.post('/add-type-table',uploadTable.single('img') ,studioController.addTypeTable)
router.post('/equipment', studioController.equipment);
router.post('/add-equipment', studioController.addEquipment);
router.post('/edit-equipment-positions', studioController.editEquipmentPositions);
router.post('/edit-equipment-value', studioController.editEquipmentValue);
router.post('/edit-equipment-settings', studioController.editEquipmentSettings);
router.get('/types-equipment', studioController.typesEquipment);
router.post('/add-type-equipment',uploadEquipment.single('img') ,studioController.addTypeEquipment)
router.post('/delete-element', studioController.deleteElement);


module.exports = router;