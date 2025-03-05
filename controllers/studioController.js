const util = require('util');
const db = require('../config/db');

const query = util.promisify(db.query).bind(db);

const rooms = async (req, res) => {
  try {
    const results = await query('SELECT * FROM rooms');
    return res.status(200).json(results);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const addRoom = async (req, res) => {
  const { roomName, path } = req.body;
  const icon = req.file;  
  
  if (!roomName || !icon || !path) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    await query('INSERT INTO rooms (room_name, icon, path) VALUES (?, ?, ?)', [roomName, icon.originalname, path]);
    return res.status(201).json({ message: "Room added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const tables = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ error: "Missing room ID" });
  }

  try {
    const results = await query('SELECT * FROM room_tables WHERE room_id =?', [id]);
    return res.status(200).json(results);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const typesTables = async (req, res) => {
  try {
    const results = await query('SELECT * FROM types_tables');
    return res.status(200).json(results);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const addTypeTable = async (req, res) => {
  const { tableName, w, h} = req.body;
  const img = req.file;

  if (!tableName ||!w ||!h ||!img) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    await query('INSERT INTO types_tables (game, w, h, img) VALUES (?,?,?,?)', [tableName, w, h, img.originalname]);
    return res.status(201).json({ message: "Type table added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
}

const addTable = async (req, res) => {
  const { tableName, w, h, img, roomId } = req.body;
  if (!tableName || !w || !h || !img || !roomId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    await query('INSERT INTO room_tables (table_name, w, h, img, room_id) VALUES (?, ?, ?, ?, ?)', [tableName, w, h, img, roomId]);
    return res.status(201).json({ message: "Table added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const editTablePositions = async (req, res) => {
  const { tables } = req.body;
  if (!Array.isArray(tables) || tables.length === 0) {
    return res.status(400).json({ error: "Invalid tables array" });
  }

  try {
    await Promise.all(
      tables.map(({ id, x, y, rotate }) =>
        query('UPDATE room_tables SET x = ?, y = ?, rotate = ? WHERE id = ?', [x, y, rotate, id])
      )
    );

    return res.status(200).json({ message: "Tables positions updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const typesEquipment = async (req, res) => {
  try {
    const results = await query('SELECT * FROM types_equipment');
    return res.status(200).json(results);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const addTypeEquipment = async (req, res) => {
  const { model, w, h } = req.body;
  const img = req.file;
  if (!model || !w || !h || !img) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    await query('INSERT INTO types_equipment (model, w, h, img) VALUES (?,?,?,?)', [model, w, h, img.originalname]);
    return res.status(201).json({ message: "Type equipment added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const equipment = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ error: "Missing table ID" });
  }

  try {
    const results = await query('SELECT * FROM table_equipment WHERE table_id = ?', [id]);
    return res.status(200).json(results);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const addEquipment = async (req, res) => {
  const { model, settings, value, w, h, img, tableId } = req.body;
  if (!model || !settings || !value || !w || !h || !img || !tableId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    await query('INSERT INTO table_equipment (model, settings, value, w, h, img, table_id) VALUES (?, ?, ?, ?, ?, ?, ?)', [model, settings, value, w, h, img, tableId]);
    return res.status(201).json({ message: "Equipment added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const editEquipmentPositions = async (req, res) => {
  const { equipment } = req.body;
  if (!Array.isArray(equipment) || equipment.length === 0) {
    return res.status(400).json({ error: "Invalid equipment array" });
  }

  try {
    await Promise.all(
      equipment.map(({ id, x, y, rotate }) =>
        query('UPDATE table_equipment SET x = ?, y = ?, rotate = ? WHERE id = ?', [x, y, rotate, id])
      )
    );

    return res.status(200).json({ message: "Equipment positions updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const editEquipmentValue = async (req, res) => {
  const {equipment} = req.body;

  if (!Array.isArray(equipment) || equipment.length === 0) {
    return res.status(400).json({ error: "Invalid equipment array" });
  }
  try {
    await Promise.all(
      equipment.map(({ id, value }) =>
        query('UPDATE table_equipment SET value =? WHERE id =?', [JSON.stringify(value), id])
      )
    );

    return res.status(200).json({ message: "Equipment values updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
    

};

const editEquipmentSettings = async (req, res) => {
  const { id, settings, value } = req.body;
  
  if (!id || !settings || !value) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try{
    await query('UPDATE types_equipment SET settings =?, value =? WHERE id =?', [JSON.stringify(settings), JSON.stringify(value), id]);
    
    return res.status(200).json({ message: "Equipment settings updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const deleteElement = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try{  
    if(id < 200){
      await query('DELETE FROM table_equipment WHERE table_id =?', [id]);
      await query('DELETE FROM room_tables WHERE id =?', [id]);
    }else{
      await query('DELETE FROM table_equipment WHERE id =?', [id]);
    }

    return res.status(200).json({ message: "Element deleted successfully" });
  }catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};
module.exports = { 
  rooms, 
  addRoom, 
  tables, 
  addTable, 
  editTablePositions, 
  typesTables, 
  addTypeTable,
  equipment, 
  addEquipment, 
  editEquipmentPositions,
  editEquipmentValue,
  editEquipmentSettings, 
  typesEquipment,
  addTypeEquipment,
  deleteElement, 
};
