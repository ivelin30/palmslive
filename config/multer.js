const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create multer storage
const iconStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/icons/';
    fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Only .jpg and .png files are allowed'), false);
    }
  }
});

const tableStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/tables/';
    fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Only.jpg and.png files are allowed'), false);
    }
  }
});

const equipmentStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/equipment/';
    fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Only.jpg and.png files are allowed'), false);
    }
  }
});

const documentsStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/documents/';
    fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only.pdf files are allowed'), false);
    }
  }
});

// Create multer upload
const uploadIcon = multer({ 
  storage: iconStorage, 
  limits: { fileSize: 5 * 1024 * 1024 }
});

const uploadTable = multer({ 
  storage: tableStorage, 
  limits: { fileSize: 5 * 1024 * 1024 }
});

const uploadEquipment = multer({ 
  storage: equipmentStorage, 
  limits: { fileSize: 5 * 1024 * 1024 }
});

const uploadDocuments = multer({ 
  storage: documentsStorage, 
  limits: { fileSize: 50 * 1024 * 1024 }
});

module.exports = { uploadIcon, uploadTable, uploadEquipment, uploadDocuments };
