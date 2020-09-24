import Appointment from '../models/Appointment';
import { isEqual } from 'date-fns';


interface CreateAppointmentDTO {
    provider: string;
    date: Date;
}

class AppointmentRepository {
    private appointments: Appointment[];

    constructor() {
        this.appointments = [];
    };

    /**
     * Return all appointments in the database
     */
    public all(): Appointment[] {
        return this.appointments;
    };

    /**
     * Find appoitment by date
     * @param date : appointment date
     */
    public findByDate(date: Date): Appointment | null {

        const findAppointment = this.appointments.find(appointment => 
            isEqual(date, appointment.date)
        );
            
        return findAppointment || null;
    };

    /**
     * create a new appointment
     */
    public create({ provider, date }: CreateAppointmentDTO): Appointment {
        const appointment = new Appointment({provider, date});

        this.appointments.push(appointment);

        return appointment;
    }
};

export default AppointmentRepository;