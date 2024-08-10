import Doctor from '../database/models/doctor.js';

export const getAllDoctors = async (req, res) => {
	try {
		const doctors = await Doctor.findAll();
		res.status(200).json({
			ok: true,
			status: 200,
			data: doctors
		});
	} catch (errror) {
		res.status(500).json({
			ok: false,
			message: 'Error get doctors',
			error: error.message
		});
	}
};

export const getDoctoById = async (req, res) => {
	try {
		const { id } = req.params;
		const doctor = Doctor.FindByPk(id);
		if (!doctor) {
			res.status(404).json({
				ok: false,
				status: 404,
				message: 'Doctor not found'
			});
		}

		res.status(200).json({
			ok: true,
			status: 200,
			data: doctor
		});
	} catch (error) {}
};
