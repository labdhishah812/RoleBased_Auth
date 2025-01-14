const authService = require('../services/authService');

class AuthController {
    async login(req, res) {
        try {
          const { email, password } = req.body;
          console.log('Login request received:', { email, requestPath: req.path });
          
          const requestedRole = req.path.includes('admin') ? 'admin' : null;
    
          const result = await authService.login(email, password, requestedRole);
    
          res.status(200).json({
            success: true,
            message: 'Login successful',
            ...result
          });
        } catch (error) {
          console.error('Login error:', error);
          res.status(400).json({
            success: false,
            message: error.message || 'Login failed'
          });
        }
    }

  async register(req, res) {
    try {
      const role = req.path.includes('admin') ? 'admin' : 'customer';
      const result = await authService.register(req.body, role);

      res.status(201).json({
        success: true,
        message: 'Registration successful',
        ...result
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = new AuthController();