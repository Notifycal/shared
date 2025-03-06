import type { BusinessAddress, BusinessName, Template, TemplateId, TemplateMap } from '@types';
import type { DateTime } from 'luxon';
import { type ZodLiteral, z } from 'zod';

// Spanish
const formalEs01: Template = {
  id: 'formal-es-01' as TemplateId,
  interpolate: (businessName: BusinessName, businessAddress: BusinessAddress, localDateTime: DateTime) => {
    const formattedDate = localDateTime.toFormat('dd/MM/yyyy');
    const formattedTime = localDateTime.toFormat('HH:mm');
    return `Estimado/a cliente, tiene una cita en ${businessName} el ${formattedDate} a las ${formattedTime}, ubicado en ${businessAddress}. Si no puede asistir, por favor notifíquenos con antelación.  
Enviado con Notifycal®`;
  }
};
const neutralEs01: Template = {
  id: 'neutral-es-01' as TemplateId,
  interpolate: (businessName: BusinessName, businessAddress: BusinessAddress, localDateTime: DateTime) => {
    const formattedDate = localDateTime.toFormat('dd/MM/yyyy');
    const formattedTime = localDateTime.toFormat('HH:mm');
    return `Hola, recuerda tu cita en ${businessName} el ${formattedDate} a las ${formattedTime}, en ${businessAddress}. Avísanos si no puedes asistir.  
Enviado con Notifycal®`;
  }
};
const informalEs01: Template = {
  id: 'informal-es-01' as TemplateId,
  interpolate: (businessName: BusinessName, businessAddress: BusinessAddress, localDateTime: DateTime) => {
    const formattedDate = localDateTime.toFormat('dd/MM/yyyy');
    const formattedTime = localDateTime.toFormat('HH:mm');
    return `¡No olvides tu cita en ${businessName}! ${formattedDate} a las ${formattedTime} en ${businessAddress}. Si no puedes venir, avísanos. Enviado con Notifycal®`;
  }
};

// English
const formalEn01: Template = {
  id: 'formal-en-01' as TemplateId,
  interpolate: (businessName: BusinessName, businessAddress: BusinessAddress, localDateTime: DateTime) => {
    const formattedDate = localDateTime.toFormat('dd/MM/yyyy');
    const formattedTime = localDateTime.toFormat('HH:mm');
    return `Dear customer, you have an appointment at ${businessName} on ${formattedDate} at ${formattedTime}, located at ${businessAddress}. If you cannot attend, please notify us in advance. Sent with Notifycal®`;
  }
};
const neutralEn01: Template = {
  id: 'neutral-en-01' as TemplateId,
  interpolate: (businessName: BusinessName, businessAddress: BusinessAddress, localDateTime: DateTime) => {
    const formattedDate = localDateTime.toFormat('dd/MM/yyyy');
    const formattedTime = localDateTime.toFormat('HH:mm');
    return `Hello, remember your appointment at ${businessName} on ${formattedDate} at ${formattedTime}, at ${businessAddress}. Let us know if you can't make it. Sent with Notifycal®`;
  }
};
const informalEn01: Template = {
  id: 'informal-en-01' as TemplateId,
  interpolate: (businessName: BusinessName, businessAddress: BusinessAddress, localDateTime: DateTime) => {
    const formattedDate = localDateTime.toFormat('dd/MM/yyyy');
    const formattedTime = localDateTime.toFormat('HH:mm');
    return `Don't forget your appointment at ${businessName}! On ${formattedDate} at ${formattedTime} at ${businessAddress}. If you can't make it, let us know. Sent with Notifycal®`;
  }
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

export const templateSchemaIds = Object.values(templateMap).map((t) => z.literal(t.id)) as unknown as Readonly<
  [ZodLiteral<TemplateId>, ZodLiteral<TemplateId>, ...Array<ZodLiteral<TemplateId>>]
>;
