import { createSmsContentSchema, languageCodeSchema } from '@schemas';
import { calendarSchema } from '@schemas/calendar';
import { senderSchema } from '@schemas/contact';
import type { demoReminderPayloadSchema } from '@schemas/reminder';
import { DateTime as DT } from 'luxon';
import { z } from 'zod';
import type {
  BusinessAddress,
  BusinessName,
  DateTime,
  InterpolatedTemplate,
  TemplateCaId,
  TemplateEnId,
  TemplateEsId
} from './common';
import type { Template, TemplateMap } from './template';

// Spanish
const formalEs01: Template = {
  id: 'formal-es-01',
  interpolate: (businessName: BusinessName, businessAddress: BusinessAddress, localDateTime: DT) => {
    const formattedDate = localDateTime.toFormat('dd/MM/yyyy');
    const formattedTime = localDateTime.toFormat('HH:mm');
    return `Estimado/a cliente, tiene una cita en ${businessName} el ${formattedDate} a las ${formattedTime}, ubicado en ${businessAddress}. Si no puede asistir, por favor notifiquenos con antelacion.`;
  },
  language: 'es'
};
const neutralEs01: Template = {
  id: 'neutral-es-01',
  interpolate: (businessName: BusinessName, businessAddress: BusinessAddress, localDateTime: DT) => {
    const formattedDate = localDateTime.toFormat('dd/MM/yyyy');
    const formattedTime = localDateTime.toFormat('HH:mm');
    return `Hola, recuerda tu cita en ${businessName} el ${formattedDate} a las ${formattedTime}, en ${businessAddress}. Avisanos si no puedes asistir.`;
  },
  language: 'es'
};
const informalEs01: Template = {
  id: 'informal-es-01',
  interpolate: (businessName: BusinessName, businessAddress: BusinessAddress, localDateTime: DT) => {
    const formattedDate = localDateTime.toFormat('dd/MM/yyyy');
    const formattedTime = localDateTime.toFormat('HH:mm');
    return `¡No olvides tu cita en ${businessName}! ${formattedDate} a las ${formattedTime} en ${businessAddress}. Si no puedes venir, avisanos.`;
  },
  language: 'es'
};

// English
const formalEn01: Template = {
  id: 'formal-en-01',
  interpolate: (businessName: BusinessName, businessAddress: BusinessAddress, localDateTime: DT) => {
    const formattedDate = localDateTime.toFormat('dd/MM/yyyy');
    const formattedTime = localDateTime.toFormat('HH:mm');
    return `Dear customer, you have an appointment at ${businessName} on ${formattedDate} at ${formattedTime}, located at ${businessAddress}. If you cannot attend, please notify us in advance.`;
  },
  language: 'en'
};
const neutralEn01: Template = {
  id: 'neutral-en-01',
  interpolate: (businessName: BusinessName, businessAddress: BusinessAddress, localDateTime: DT) => {
    const formattedDate = localDateTime.toFormat('dd/MM/yyyy');
    const formattedTime = localDateTime.toFormat('HH:mm');
    return `Hello, remember your appointment at ${businessName} on ${formattedDate} at ${formattedTime}, at ${businessAddress}. Let us know if you can't make it.`;
  },
  language: 'en'
};
const informalEn01: Template = {
  id: 'informal-en-01',
  interpolate: (businessName: BusinessName, businessAddress: BusinessAddress, localDateTime: DT) => {
    const formattedDate = localDateTime.toFormat('dd/MM/yyyy');
    const formattedTime = localDateTime.toFormat('HH:mm');
    return `Don't forget your appointment at ${businessName}! On ${formattedDate} at ${formattedTime} at ${businessAddress}. If you can't make it, let us know.`;
  },
  language: 'en'
};

// Catalan
const formalCa01: Template = {
  id: 'formal-ca-01',
  interpolate: (businessName: BusinessName, businessAddress: BusinessAddress, localDateTime: DT) => {
    const formattedDate = localDateTime.toFormat('dd/MM/yyyy');
    const formattedTime = localDateTime.toFormat('HH:mm');
    return `Benvolgut/da client/a, té una cita a ${businessName} el ${formattedDate} a les ${formattedTime}, situat a ${businessAddress}. Si no pot assistir, si us plau notifiqui'ns amb antelació.`;
  },
  language: 'ca'
};
const neutralCa01: Template = {
  id: 'neutral-ca-01',
  interpolate: (businessName: BusinessName, businessAddress: BusinessAddress, localDateTime: DT) => {
    const formattedDate = localDateTime.toFormat('dd/MM/yyyy');
    const formattedTime = localDateTime.toFormat('HH:mm');
    return `Hola, recordi la seva cita a ${businessName} el ${formattedDate} a les ${formattedTime}, a ${businessAddress}. Avisi'ns si no pot venir.`;
  },
  language: 'ca'
};
const informalCa01: Template = {
  id: 'informal-ca-01',
  interpolate: (businessName: BusinessName, businessAddress: BusinessAddress, localDateTime: DT) => {
    const formattedDate = localDateTime.toFormat('dd/MM/yyyy');
    const formattedTime = localDateTime.toFormat('HH:mm');
    return `No oblidis la teva cita a ${businessName}! El ${formattedDate} a les ${formattedTime} a ${businessAddress}. Si no pots venir, avisa'ns.`;
  },
  language: 'ca'
};
export const templateEsMap: Record<TemplateEsId, Template> = {
  'formal-es-01': formalEs01,
  'neutral-es-01': neutralEs01,
  'informal-es-01': informalEs01
};
export const templateEnMap: Record<TemplateEnId, Template> = {
  'formal-en-01': formalEn01,
  'neutral-en-01': neutralEn01,
  'informal-en-01': informalEn01
};
export const templateCaMap: Record<TemplateCaId, Template> = {
  'formal-ca-01': formalCa01,
  'neutral-ca-01': neutralCa01,
  'informal-ca-01': informalCa01
};
export const templateMap: TemplateMap = {
  // Spanish
  ...templateEsMap,
  //English
  ...templateEnMap,
  //Catalan
  ...templateCaMap
};

const templateList = Object.values(templateMap).map((t) =>
  z.object({
    id: z.literal(t.id),
    language: z.literal(t.language)
  })
);

export const templateSelectionSchema = z.union([templateList[0]!, templateList[1]!, ...templateList.slice(2)]);

export const templateSchema = createSmsContentSchema()
  .max(160)
  .transform((data) => data as InterpolatedTemplate);

export const reminderConfigSchema = z.object({
  calendars: z.array(calendarSchema.extend({ template: templateSelectionSchema })).min(1),
  business: z.object({
    name: createSmsContentSchema()
      .min(1)
      .max(128)
      .transform((data) => data as BusinessName),
    address: createSmsContentSchema()
      .min(1)
      .max(128)
      .transform((data) => data as BusinessAddress),
    senderContact: senderSchema,
    language: languageCodeSchema,
    companyIndustry: z.object({
      category: z.string().max(128),
      subcategory: z.string().max(128),
      customIndustry: z.string().max(128).optional()
    }),
    companySize: z.string().max(10)
  }),
  confirmation: z
    .object({
      termsAccepted: z.literal(true),
      privacyAccepted: z.literal(true),
      marketingOptInAccepted: z.boolean()
    })
    .transform((data) => {
      const now = DT.now().toUTC().toISO() as DateTime;
      return {
        termsAccepted: now,
        privacyAccepted: now,
        marketingOptInAccepted: data.marketingOptInAccepted ? now : undefined
      };
    })
});

export type DemoReminderPayload = z.infer<typeof demoReminderPayloadSchema>;
