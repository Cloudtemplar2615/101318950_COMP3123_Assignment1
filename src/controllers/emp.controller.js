import Employee from '../models/Employee.js';


export const listEmployees = async (_req, res) => {
  try {
    const docs = await Employee.find().lean();
    const formatted = docs.map((d) => ({
      employee_id: String(d._id),
      first_name: d.first_name,
      last_name: d.last_name,
      email: d.email,
      position: d.position,
      salary: d.salary,
      date_of_joining: d.date_of_joining,
      department: d.department,
      profilePicUrl: d.profilePicUrl || '',
    }));
    return res.status(200).json(formatted);
  } catch (err) {
    console.error('Error listing employees:', err);
    return res.status(500).json({ status: false, message: 'Server error' });
  }
};


export const createEmployee = async (req, res) => {
  try {
    const empData = {
      ...req.body,
    };


    if (req.file) {
      empData.profilePicUrl = `/uploads/${req.file.filename}`;
    }

    const emp = await Employee.create(empData);

    return res.status(201).json({
      message: 'Employee created successfully.',
      employee_id: String(emp._id),
    });
  } catch (err) {
    console.error('Error creating employee:', err);
    return res.status(500).json({ status: false, message: 'Server error' });
  }
};


export const getEmployeeById = async (req, res) => {
  try {
    const { eid } = req.params;
    const emp = await Employee.findById(eid).lean();
    if (!emp) {
      return res
        .status(404)
        .json({ status: false, message: 'Employee not found' });
    }

    return res.status(200).json({
      employee_id: String(emp._id),
      first_name: emp.first_name,
      last_name: emp.last_name,
      email: emp.email,
      position: emp.position,
      salary: emp.salary,
      date_of_joining: emp.date_of_joining,
      department: emp.department,
      profilePicUrl: emp.profilePicUrl || '',
    });
  } catch (err) {
    console.error('Error getting employee:', err);
    return res.status(500).json({ status: false, message: 'Server error' });
  }
};


export const updateEmployee = async (req, res) => {
  try {
    const { eid } = req.params;

    const updateData = {
      ...req.body,
    };

    if (req.file) {
      updateData.profilePicUrl = `/uploads/${req.file.filename}`;
    }

    const emp = await Employee.findByIdAndUpdate(eid, updateData, {
      new: true,
    });

    if (!emp) {
      return res
        .status(404)
        .json({ status: false, message: 'Employee not found' });
    }

    return res
      .status(200)
      .json({ message: 'Employee details updated successfully.' });
  } catch (err) {
    console.error('Error updating employee:', err);
    return res.status(500).json({ status: false, message: 'Server error' });
  }
};


export const deleteEmployee = async (req, res) => {
  try {
    const { eid } = req.query;
    const emp = await Employee.findByIdAndDelete(eid);
    if (!emp) {
      return res
        .status(404)
        .json({ status: false, message: 'Employee not found' });
    }
    return res.sendStatus(204);
  } catch (err) {
    console.error('Error deleting employee:', err);
    return res.status(500).json({ status: false, message: 'Server error' });
  }
};
