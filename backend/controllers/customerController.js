import CustomerService from "../models/customeServiceModel.js";

export const customerCreate = async (req, res) => {
  try {
    const customer = new CustomerService({
      ...req.body,
      user: req.user.id,
    });

    await customer.save();

    res.status(401).json(customer);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const AllCustomers = async (req, res) => {
  const customers = await CustomerService.find();

  res.status(201).json({ count: customers.length, customers });
};
