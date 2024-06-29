/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod';

const nameRegex = /^[A-Za-zÀ-ÿ' -]{2,}$/;

export const getFormSchema = (t: any) =>
  z.object({
    firstName: z
      .string()
      .min(2, t('contact-section.form.errors.first-name.min'))
      .max(50, t('contact-section.form.errors.first-name.max'))
      .regex(nameRegex, t('contact-section.form.errors.first-name.regex')),
    lastName: z
      .string()
      .min(2, t('contact-section.form.errors.last-name.min'))
      .max(50, t('contact-section.form.errors.last-name.max'))
      .regex(nameRegex, t('contact-section.form.errors.last-name.regex')),
    email: z
      .string()
      .email(t('contact-section.form.errors.email.email'))
      .min(5, t('contact-section.form.errors.email.min'))
      .max(100, t('contact-section.form.errors.email.max')),
    message: z
      .string()
      .min(10, t('contact-section.form.errors.message.min'))
      .max(500, t('contact-section.form.errors.message.max'))
      .refine((value) => !/http|www|href/.test(value), {
        message: t('contact-section.form.errors.message.refine'),
      }),
    honeypot: z.string().optional(),
  });

export type FormValues = z.infer<ReturnType<typeof getFormSchema>>;
