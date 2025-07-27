const { z } = require('zod');

const addressSchema = z.object({
    label: z.enum(['Home', 'Work', 'Other']),
    location: z.object({
        latitude: z.number(),
        longitude: z.number(),
    }),
});

const registerUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    phone: z.string().regex(/^[0-9]{10}$/),
    addresses: z.array(addressSchema).optional(),
});

const loginUserSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

const updateUserSchema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
    phone: z.string().regex(/^[0-9]{10}$/).optional(),
    addresses: z.array(addressSchema).optional(),
    age: z.string().optional(),
    married: z.enum(['Yes', 'No']).optional(),
    working: z.enum(['Yes', 'No']).optional(),
});

const addAddressSchema = addressSchema;

const beneficiarySchema = z.object({
    beneficiaryId: z.string(),
});

module.exports = {
    registerUserSchema,
    loginUserSchema,
    updateUserSchema,
    addAddressSchema,
    beneficiarySchema,
};
