const bcrypt = require('bcrypt');

async function hashPassword(password: any) {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log("Hashed Password:", hashedPassword);
    } catch (error) {
        console.error("Error hashing password:", error);
    }
}

// Example usage:
hashPassword("fresh123");
