const { v4: uuidv4 } = require('uuid');
const { checkPermission } = require('../../../middlewares/checkPermission');

async function adminCreateOrg(req, res) {
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

async function adminGetOrg(req, res) {
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

async function adminGetOrgs(req, res) {
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

async function adminEditOrg(req, res) {
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
  adminCreateOrg,
  adminGetOrg,
  adminGetOrgs,
  adminEditOrg,
};
