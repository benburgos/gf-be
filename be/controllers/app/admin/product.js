const { checkPermission } = require('../../../middlewares/checkPermission');

async function adminGetProuct(req, res) {
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
            .json({ error: 'You are not authorized to access this resource.' });
        }    
        
    } catch (error) {
        
    }
}

async function adminGetProucts(req, res) {
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
            .json({ error: 'You are not authorized to access this resource.' });
        }
        
    } catch (error) {
        
    }}

module.exports = {
  adminGetProuct,
  adminGetProucts,
};
