import { vehicleZodSchema } from './IVehicle'

// export interface ICar extends IVehicle {

// }

import { z } from 'zod';

const carZodSchema = vehicleZodSchema.extend({
  doorsQty: z.number().min(2).max(4),
  seatsQty: z.number().min(2).max(7),
});

export type ICar = z.infer<typeof carZodSchema>;