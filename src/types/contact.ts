import type { phoneSchema, rcsSenderSchema, smsSenderSchema } from '@schemas';
import type { z } from 'zod';

export type PhoneContact = z.infer<typeof phoneSchema>;

export type SMSSenderContact = z.infer<typeof smsSenderSchema>;
export type RCSSenderContact = z.infer<typeof rcsSenderSchema>;
export type SenderContact = SMSSenderContact | RCSSenderContact;
export type ReceiverContact = PhoneContact;
