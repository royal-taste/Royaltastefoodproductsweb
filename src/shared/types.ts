import z from "zod";

// Contact form validation schema with enhanced sanitization
export const ContactFormSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  email: z.string()
    .email("Please enter a valid email address")
    .max(100, "Email must be less than 100 characters"),
  phone: z.string()
    .optional()
    .refine((val) => !val || /^[\d\s\-\+\(\)]+$/.test(val), "Phone number can only contain digits, spaces, hyphens, and parentheses")
    .refine((val) => !val || val.length <= 20, "Phone number must be less than 20 characters"),
  subject: z.string()
    .min(1, "Please select a subject")
    .max(100, "Subject must be less than 100 characters"),
  message: z.string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters")
    .regex(/^[a-zA-Z0-9\s\.,!?\-_@#$%&*()]+$/, "Message contains invalid characters")
});

export type ContactFormType = z.infer<typeof ContactFormSchema>;

// API response types
export const ApiResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.any().optional()
});

export type ApiResponseType = z.infer<typeof ApiResponseSchema>;
