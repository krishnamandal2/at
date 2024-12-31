const Attendance = require('../models/Attendance');
const Student = require('../models/Student');

exports.markAttendance = async (req, res) => {
    const { attendanceData, date } = req.body;

    try {
        for (const [studentId, status] of Object.entries(attendanceData)) {
            // Find or create attendance entry for the given student and date
            await Attendance.findOneAndUpdate(
                { student: studentId, date: new Date(date).toISOString().slice(0, 10) },
                { status },
                { upsert: true, new: true }
            );
        }

        res.status(200).json({ message: 'Attendance marked successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error marking attendance', error });
    }
};

exports.getClasswiseAttendance = async (req, res) => {
    const { className } = req.params;

    try {
        // Find students in the specified class
        const students = await Student.find({ class: className });

        if (!students.length) {
            console.log('No students found for the given class');
            return res.status(404).json({ message: 'No students found' });
        }

        // Get total days for which attendance was marked
        const totalDays = await Attendance.distinct('date').countDocuments();
        if (totalDays === 0) {
            console.log('No attendance found');
            return res.status(404).json({ message: 'No attendance found' });
        }

        // Calculate attendance data for each student
        const attendanceData = await Promise.all(students.map(async (student) => {
            const totalPresentDays = await Attendance.countDocuments({
                student: student._id,
                status: 'present',
            });

            const percentage = (totalPresentDays / totalDays) * 100;
            return {
                studentName: student.name,
                rollNumber: student.rollNumber,
                percentage: percentage.toFixed(2),
            };
        }));

        // Return the attendance data for all students
        res.status(200).json(attendanceData);
    } catch (error) {
        console.log('Failed to get class-wise attendance:', error);
        res.status(500).json({ message: 'Error fetching class-wise attendance', error });
    }
};
