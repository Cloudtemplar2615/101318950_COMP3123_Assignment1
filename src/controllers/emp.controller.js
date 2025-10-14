import Employee from '../models/Employee.js';

export const listEmployees = async (_req, res) => {
  const docs = await Employee.find().lean();
  const formatted = docs.map(d => ({
    employee_id: String(d._id),
    first_name: d.first_name,
    last_name: d.last_name,
    email: d.email,
    position: d.position,
    salary: d.salary,
    date_of_joining: d.date_of_joining,
    department: d.department
  }));
  return res.status(200).json(formatted);
};

export const createEmployee = async (req, res) => {
  const emp = await Employee.create(req.body);
  return res.status(201).json({
    message: 'Employee created successfully.',
    employee_id: String(emp._id)
  });
};

export const getEmployeeById = async (req, res) => {
  const { eid } = req.params;
  const emp = await Employee.findById(eid).lean();
  if (!emp) return res.status(404).json({ status: false, message: 'Employee not found' });
  return res.status(200).json({
    employee_id: String(emp._id),
    first_name: emp.first_name,
    last_name: emp.last_name,
    email: emp.email,
    position: emp.position,
    salary: emp.salary,
    date_of_joining: emp.date_of_joining,
    department: emp.department
  });
};

export const updateEmployee = async (req, res) => {
  const { eid } = req.params;
  const emp = await Employee.findByIdAndUpdate(eid, req.body, { new: true });
  if (!emp) return res.status(404).json({ status: false, message: 'Employee not found' });
  return res.status(200).json({ message: 'Employee details updated successfully.' });
};

export const deleteEmployee = async (req, res) => {
  const { eid } = req.query;
  const emp = await Employee.findByIdAndDelete(eid);
  if (!emp) return res.status(404).json({ status: false, message: 'Employee not found' });
  return res.sendStatus(204);
};
