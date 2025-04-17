import { calendarSchema } from '@schemas/calendar';
import { senderSchema } from '@schemas/contact';
import type { demoReminderPayloadSchema } from '@schemas/reminder';
import type { DateTime } from 'luxon';
import { z } from 'zod';
import type { BusinessAddress, BusinessName, TemplateId } from './common';
import type { Template, TemplateMap } from './template';

// Spanish
const formalEs01: Template = {
  id: 'formal-es-01' as TemplateId,
  interpolate: (businessName: BusinessName, businessAddress: BusinessAddress, localDateTime: DateTime) => {
    const formattedDate = localDateTime.toFormat('dd/MM/yyyy');
    const formattedTime = localDateTime.toFormat('HH:mm');
    return `Estimado/a cliente, tiene una cita en ${businessName} el ${formattedDate} a las ${formattedTime}, ubicado en ${businessAddress}. Si no puede asistir, por favor notifíquenos con antelación.`;
  },
  language: 'es'
};
const neutralEs01: Template = {
  id: 'neutral-es-01' as TemplateId,
  interpolate: (businessName: BusinessName, businessAddress: BusinessAddress, localDateTime: DateTime) => {
    const formattedDate = localDateTime.toFormat('dd/MM/yyyy');
    const formattedTime = localDateTime.toFormat('HH:mm');
    return `Hola, recuerda tu cita en ${businessName} el ${formattedDate} a las ${formattedTime}, en ${businessAddress}. Avísanos si no puedes asistir.`;
  },
  language: 'es'
};
const informalEs01: Template = {
  id: 'informal-es-01' as TemplateId,
  interpolate: (businessName: BusinessName, businessAddress: BusinessAddress, localDateTime: DateTime) => {
    const formattedDate = localDateTime.toFormat('dd/MM/yyyy');
    const formattedTime = localDateTime.toFormat('HH:mm');
    return `¡No olvides tu cita en ${businessName}! ${formattedDate} a las ${formattedTime} en ${businessAddress}. Si no puedes venir, avísanos.`;
  },
  language: 'es'
};

// English
const formalEn01: Template = {
  id: 'formal-en-01' as TemplateId,
  interpolate: (businessName: BusinessName, businessAddress: BusinessAddress, localDateTime: DateTime) => {
    const formattedDate = localDateTime.toFormat('dd/MM/yyyy');
    const formattedTime = localDateTime.toFormat('HH:mm');
    return `Dear customer, you have an appointment at ${businessName} on ${formattedDate} at ${formattedTime}, located at ${businessAddress}. If you cannot attend, please notify us in advance.`;
  },
  language: 'en'
};
const neutralEn01: Template = {
  id: 'neutral-en-01' as TemplateId,
  interpolate: (businessName: BusinessName, businessAddress: BusinessAddress, localDateTime: DateTime) => {
    const formattedDate = localDateTime.toFormat('dd/MM/yyyy');
    const formattedTime = localDateTime.toFormat('HH:mm');
    return `Hello, remember your appointment at ${businessName} on ${formattedDate} at ${formattedTime}, at ${businessAddress}. Let us know if you can't make it.`;
  },
  language: 'en'
};
const informalEn01: Template = {
  id: 'informal-en-01' as TemplateId,
  interpolate: (businessName: BusinessName, businessAddress: BusinessAddress, localDateTime: DateTime) => {
    const formattedDate = localDateTime.toFormat('dd/MM/yyyy');
    const formattedTime = localDateTime.toFormat('HH:mm');
    return `Don't forget your appointment at ${businessName}! On ${formattedDate} at ${formattedTime} at ${businessAddress}. If you can't make it, let us know.`;
  },
  language: 'en'
};
export const templateEsMap = {
  [formalEs01.id]: formalEs01,
  [neutralEs01.id]: neutralEs01,
  [informalEs01.id]: informalEs01
};
export const templateEnMap = {
  [formalEn01.id]: formalEn01,
  [neutralEn01.id]: neutralEn01,
  [informalEn01.id]: informalEn01
};
export const templateMap: TemplateMap = {
  // Spanish
  ...templateEsMap,
  //English
  ...templateEnMap
};

const templateList = Object.values(templateMap).map((t) =>
  z.object({
    id: z.literal(t.id),
    language: z.literal(t.language)
  })
);

export const templateSelectionSchema = z.union([templateList[0]!, templateList[1]!, ...templateList.slice(2)]);

export const templateSchema = z.string().max(160).brand('InterpolatedTemplate');

export const reminderConfigSchema = z.object({
  calendars: z.array(calendarSchema.extend({ template: templateSelectionSchema })).min(1),
  business: z.object({
    name: z.string().min(1).brand('BusinessName'),
    address: z.string().min(1).brand('BusinessAddress'),
    senderContact: senderSchema
  })
});

export type DemoReminderPayload = z.infer<typeof demoReminderPayloadSchema>;