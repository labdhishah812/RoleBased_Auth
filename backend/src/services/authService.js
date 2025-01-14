const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwtUtils = require("../utils/jwtUtils");

class AuthService {
    async login(email, password, requestedRole) {
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("Invalid credentials");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          throw new Error("Invalid credentials");
        }
        if (requestedRole === 'admin' && user.role !== 'admin') {
          throw new Error("You don't have permission to access the admin panel");
        }
        const token = jwtUtils.generateToken(user._id, user.role);
    
        return {
          token,
          user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
          },
        };
    }
  async register(userData, role) {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error("User already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const user = await User.create({
      ...userData,
      password: hashedPassword,
      role,
    });

    return {
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    };
  }
}

module.exports = new AuthService();
