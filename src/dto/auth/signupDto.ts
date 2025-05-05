import { Role, Status } from '@prisma/client';
import { z } from 'zod';
const signupDto = z.object({
    username: z.string().min(3).max(50),
    password: z.string().min(8).max(50),
    status: z.nativeEnum(Status),
    role: z.nativeEnum(Role),
});

export default signupDto;
