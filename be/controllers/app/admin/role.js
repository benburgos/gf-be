const { v4: uuidv4 } = require('uuid');
const { checkPermission } = require('../../../middlewares/checkPermission');

async function adminCreateRole(req, res) {
    try {
        // Access data from authToken middleware
        const { bid: currentBrandId, ra: permissionLevels } = req;
    
        // Check permission level
        const permissionType = checkPermission({
          prod: 'admin',
          bid: currentBrandId,
          ra: permissionLevels,
        });
        if (permissionType !== 'rw') {
          return res
            .status(403)
            .json({ Error: 'You are not authorized to access this resource.' });
        }
        
    } catch (error) {
        
    }}

async function adminGetRole(req, res) {
    try {
        // Access data from authToken middleware
        const { bid: currentBrandId, ra: permissionLevels } = req;
    
        // Check permission level
        const permissionType = checkPermission({
          prod: 'admin',
          bid: currentBrandId,
          ra: permissionLevels,
        });
        if (permissionType !== 'rw') {
          return res
            .status(403)
            .json({ Error: 'You are not authorized to access this resource.' });
        }
        
    } catch (error) {
        
    }}

async function adminGetRoles(req, res) {
    try {
        // Access data from authToken middleware
        const { bid: currentBrandId, ra: permissionLevels } = req;
    
        // Check permission level
        const permissionType = checkPermission({
          prod: 'admin',
          bid: currentBrandId,
          ra: permissionLevels,
        });
        if (permissionType !== 'rw') {
          return res
            .status(403)
            .json({ Error: 'You are not authorized to access this resource.' });
        }
        
    } catch (error) {
        
    }}

async function adminEditRole(req, res) {
    try {
        // Access data from authToken middleware
        const { bid: currentBrandId, ra: permissionLevels } = req;
    
        // Check permission level
        const permissionType = checkPermission({
          prod: 'admin',
          bid: currentBrandId,
          ra: permissionLevels,
        });
        if (permissionType !== 'rw') {
          return res
            .status(403)
            .json({ Error: 'You are not authorized to access this resource.' });
        }
        
    } catch (error) {
        
    }}

module.exports = {
  adminCreateRole,
  adminGetRole,
  adminGetRoles,
  adminEditRole,
};
