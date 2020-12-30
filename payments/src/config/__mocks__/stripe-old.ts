export const stripe = {
  charges: {
    create: jest.fn().mockResolvedValue({}), // Returns a promise
  },
};
