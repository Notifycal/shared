import type { phoneSchema, rcsSenderSchema } from '@schemas';
import type { z } from 'zod';

export type PhoneContact = z.infer<typeof phoneSchema>;
export type RCSSenderContact = z.infer<typeof rcsSenderSchema>;
export type SenderContact = PhoneContact | RCSSenderContact;
export type ReceiverContact = PhoneContact;
