
import { z } from 'zod';

export const SMS_CHARACTER_REGEX = /^[a-zA-Z0-9\s.,!?'"():;\-_]*$/;
export const SMS_CHARACTER_LIMIT = 160;

type SmsValidationMessages = Partial<{
  invalidType: string;
}>;

const zodMessageOrUndefined = (message?: string): { message: string } | undefined => {
  return message ? { message: message } : undefined;
};

export const createSmsContentSchema = (messages: SmsValidationMessages = {}): z.ZodString =>
  z.string(zodMessageOrUndefined(messages.invalidType));
