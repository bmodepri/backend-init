import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

// SoC: Separation of concerns, each route, or part of the code must be concerned about only one thing.
// DTO - Data transfer object - to transfer data from one object to another is much easier to use a DTO.
// Route: receive the request, call a file to handle the request and return the result to the caller.

appointmentsRouter.get('/', async (request, response) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointments = await appointmentsRepository.find();

    return response.json(appointments);
});


appointmentsRouter.post('/', async (request, response) => {
    
    try {
        const { provider_id, date } = request.body;

        const parsedDate = parseISO(date);
        
        const createAppointment = new CreateAppointmentService();

        const appointment = await createAppointment.execute({date: parsedDate, provider_id});

        return response.json(appointment);
    } catch (err) {
        return response.status(400).json({ error: err.message })
    }
});

export default appointmentsRouter;