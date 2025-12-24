import Company from "../models/company.model.js";

export const getCompanies = async (req, res) => {
  const data = await Company.find();
  res.json(data);
};
