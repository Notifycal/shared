import { type CookieConsentConfig, acceptedService } from 'vanilla-cookieconsent';

declare global {
  interface Window {
    dataLayer: Array<unknown>;
    gtag: ((...args: Array<unknown>) => void) | undefined;
  }
}

export const CAT_NECESSARY = 'necessary';
export const CAT_ANALYTICS = 'analytics';
export const CAT_ADVERTISEMENT = 'advertisement';
export const CAT_FUNCTIONALITY = 'functionality';
export const CAT_SECURITY = 'security';

export const SERVICE_AD_STORAGE = 'ad_storage';
export const SERVICE_AD_USER_DATA = 'ad_user_data';
export const SERVICE_AD_PERSONALIZATION = 'ad_personalization';
export const SERVICE_ANALYTICS_STORAGE = 'analytics_storage';
export const SERVICE_FUNCTIONALITY_STORAGE = 'functionality_storage';
export const SERVICE_PERSONALIZATION_STORAGE = 'personalization_storage';
export const SERVICE_SECURITY_STORAGE = 'security_storage';

export function denyAllGtag(): void {
  if (window && window.gtag) {
    // Set default consent to 'denied' (this should happen before changing any other dataLayer)
    window.gtag('consent', 'default', {
      [SERVICE_AD_STORAGE]: 'denied',
      [SERVICE_AD_USER_DATA]: 'denied',
      [SERVICE_AD_PERSONALIZATION]: 'denied',
      [SERVICE_ANALYTICS_STORAGE]: 'denied',
      [SERVICE_FUNCTIONALITY_STORAGE]: 'denied',
      [SERVICE_PERSONALIZATION_STORAGE]: 'denied',
      [SERVICE_SECURITY_STORAGE]: 'denied'
    });
  }
}

export function updateAllGtagConsent(): void {
  if (window && window.gtag) {
    const consentObject = {
      [SERVICE_ANALYTICS_STORAGE]: acceptedService(SERVICE_ANALYTICS_STORAGE, CAT_ANALYTICS) ? 'granted' : 'denied',
      [SERVICE_AD_STORAGE]: acceptedService(SERVICE_AD_STORAGE, CAT_ADVERTISEMENT) ? 'granted' : 'denied',
      [SERVICE_AD_USER_DATA]: acceptedService(SERVICE_AD_USER_DATA, CAT_ADVERTISEMENT) ? 'granted' : 'denied',
      [SERVICE_AD_PERSONALIZATION]: acceptedService(SERVICE_AD_PERSONALIZATION, CAT_ADVERTISEMENT)
        ? 'granted'
        : 'denied',
      [SERVICE_FUNCTIONALITY_STORAGE]: acceptedService(SERVICE_FUNCTIONALITY_STORAGE, CAT_FUNCTIONALITY)
        ? 'granted'
        : 'denied',
      [SERVICE_PERSONALIZATION_STORAGE]: acceptedService(SERVICE_PERSONALIZATION_STORAGE, CAT_FUNCTIONALITY)
        ? 'granted'
        : 'denied',
      [SERVICE_SECURITY_STORAGE]: acceptedService(SERVICE_SECURITY_STORAGE, CAT_SECURITY) ? 'granted' : 'denied'
    };

    window.gtag('consent', 'update', consentObject);
    window.dataLayer.push({
      event: 'cookie_consent_updated'
    });
  }
}

// See: https://cookieconsent.orestbida.com/advanced/google-consent-mode.html
// and https://cookieconsent.orestbida.com/reference/configuration-reference.html#guioptions
export function gtagConsentConfig(languageCode: string, updateConsent: () => void): CookieConsentConfig {
  return {
    onConsent: updateConsent,
    onChange: updateConsent,
    categories: {
      [CAT_NECESSARY]: {
        enabled: true,
        readOnly: true
      },
      [CAT_ANALYTICS]: {
        autoClear: {
          cookies: [
            // Google Analytics
            {
              name: /^_ga/
            },
            {
              name: '_gid'
            },
            // Microsoft Clarity
            {
              name: '_clck'
            },
            {
              name: '_clck'
            },
            {
              name: '_clsk'
            },
            {
              name: 'CLID'
            },
            {
              name: 'MUID'
            },
            {
              name: 'ANONCHK'
            },
            {
              name: 'MR'
            },
            {
              name: 'SM'
            }
          ]
        },
        services: {
          [SERVICE_ANALYTICS_STORAGE]: {
            label: 'Enables storage (such as cookies) related to analytics e.g. visit duration.'
          }
        }
      },
      [CAT_ADVERTISEMENT]: {
        services: {
          [SERVICE_AD_STORAGE]: {
            label: 'Enables storage (such as cookies) related to advertising.'
          },
          [SERVICE_AD_USER_DATA]: {
            label: 'Sets consent for sending user data related to advertising to Google.'
          },
          [SERVICE_AD_PERSONALIZATION]: {
            label: 'Sets consent for personalized advertising.'
          }
        }
      },
      [CAT_FUNCTIONALITY]: {
        services: {
          [SERVICE_FUNCTIONALITY_STORAGE]: {
            label: 'Enables storage that supports the functionality of the website or app e.g. language settings.'
          },
          [SERVICE_PERSONALIZATION_STORAGE]: {
            label: 'Enables storage related to personalization e.g. video recommendations.'
          }
        }
      },
      [CAT_SECURITY]: {
        services: {
          [SERVICE_SECURITY_STORAGE]: {
            label:
              'Enables storage related to security such as authentication functionality, fraud prevention, and other user protection.'
          }
        }
      }
    },

    language: {
      default: languageCode,
      translations: {
        en: {
          // See: https://support.google.com/tagmanager/answer/10718549?hl=en
          consentModal: {
            title: 'We use cookies',
            description:
              'This website uses essential cookies to ensure its proper operation and tracking cookies to understand how you interact with it. The latter will be set only after consent.',
            acceptAllBtn: 'Accept all',
            acceptNecessaryBtn: 'Reject all',
            showPreferencesBtn: 'Manage Individual preferences'
          },
          preferencesModal: {
            title: 'Manage cookie preferences',
            acceptAllBtn: 'Accept all',
            acceptNecessaryBtn: 'Reject all',
            savePreferencesBtn: 'Accept current selection',
            closeIconLabel: 'Close modal',
            sections: [
              {
                title: 'Cookie usage',
                description:
                  'We use cookies to ensure the basic functionalities of the website and to enhance your online experience.'
              },
              {
                title: 'Strictly necessary cookies',
                description:
                  'These cookies are essential for the proper functioning of the website, for example for user authentication.',
                linkedCategory: CAT_NECESSARY
              },
              {
                title: 'Analytics',
                description:
                  'We use analytics cookies to understand how users interact with our website through services like Google Analytics and Microsoft Clarity. These tools help us improve our content and user experience. Microsoft Clarity may record anonymous user sessions to help us identify usability issues.',
                linkedCategory: CAT_ANALYTICS,
                cookieTable: {
                  headers: {
                    name: 'Name',
                    domain: 'Service',
                    description: 'Description',
                    expiration: 'Expiration'
                  },
                  body: [
                    {
                      name: '_ga',
                      domain: 'Google Analytics',
                      description:
                        'Cookie set by <a href="https://business.safety.google/adscookies/">Google Analytics</a>',
                      expiration: 'Expires after 12 days'
                    },
                    {
                      name: '_gid',
                      domain: 'Google Analytics',
                      description:
                        'Cookie set by <a href="https://business.safety.google/adscookies/">Google Analytics</a>',
                      expiration: 'Session'
                    },
                    {
                      name: '_clck',
                      domain: 'Microsoft Clarity',
                      description:
                        'Cookie set by <a href="https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-cookies">Microsoft Clarity</a>. Persists user ID and preferences for session recording.',
                      expiration: 'Expires after 1 year'
                    },
                    {
                      name: '_clsk',
                      domain: 'Microsoft Clarity',
                      description:
                        'Cookie set by <a href="https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-cookies">Microsoft Clarity</a>. Connects multiple page views into a single session.',
                      expiration: 'Session'
                    },
                    {
                      name: 'CLID',
                      domain: 'Microsoft Clarity',
                      description:
                        'Third-party cookie set by <a href="https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-cookies">Microsoft Clarity</a>. Identifies the first-time Clarity saw this user on any site.',
                      expiration: 'Expires after 1 year'
                    },
                    {
                      name: 'MUID',
                      domain: 'Microsoft',
                      description:
                        'Third-party cookie set by <a href="https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-cookies">Microsoft</a>. Identifies unique web browsers visiting Microsoft sites.',
                      expiration: 'Expires after 1 year'
                    },
                    {
                      name: 'ANONCHK',
                      domain: 'Microsoft',
                      description:
                        'Third-party cookie set by <a href="https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-cookies">Microsoft</a>. Indicates whether MUID is transferred to ANID.',
                      expiration: 'Session'
                    },
                    {
                      name: 'MR',
                      domain: 'Microsoft',
                      description:
                        'Third-party cookie set by <a href="https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-cookies">Microsoft</a>. Indicates whether to refresh MUID.',
                      expiration: 'Expires after 7 days'
                    },
                    {
                      name: 'SM',
                      domain: 'Microsoft',
                      description:
                        'Third-party cookie set by <a href="https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-cookies">Microsoft</a>. Used in synchronizing MUID across Microsoft domains.',
                      expiration: 'Session'
                    }
                  ]
                }
              },
              {
                title: 'Advertising',
                description: `Google uses cookies for advertising, including serving and rendering ads, personalizing ads (depending on your ad settings at <a href="https://g.co/adsettings">g.co/adsettings</a>), limiting the number of times an ad is shown to a user, muting ads you have chosen to stop seeing, and measuring the effectiveness of ads.`,
                linkedCategory: CAT_ADVERTISEMENT
              },
              {
                title: 'Functionality',
                description:
                  "Cookies used for functionality allow users to interact with a service or site to access features that are fundamental to that service. Things considered fundamental to the service include preferences like the user's choice of language, product optimizations that help maintain and improve a service, and maintaining information relating to a user's session, such as the content of a shopping cart.",
                linkedCategory: CAT_FUNCTIONALITY
              },
              {
                title: 'Security',
                description:
                  'Cookies used for security authenticate users, prevent fraud, and protect users as they interact with a service.',
                linkedCategory: CAT_SECURITY
              },
              {
                title: 'Further information',
                description: `For any queries in relation to the policy on cookies and your choices, please refer to <a href="https://private.notifycal.com/#/privacy-policy">privacy policy</a>.`
              }
            ]
          }
        },
        es: {
          consentModal: {
            title: 'Usamos cookies',
            description:
              'Este sitio web utiliza cookies esenciales para garantizar su correcto funcionamiento y cookies de seguimiento para entender cómo interactúas con él. Estas últimas solo se establecerán tras el consentimiento.',
            acceptAllBtn: 'Aceptar todo',
            acceptNecessaryBtn: 'Rechazar todo',
            showPreferencesBtn: 'Gestionar preferencias individuales'
          },
          preferencesModal: {
            title: 'Gestionar preferencias de cookies',
            acceptAllBtn: 'Aceptar todo',
            acceptNecessaryBtn: 'Rechazar todo',
            savePreferencesBtn: 'Aceptar selección actual',
            closeIconLabel: 'Cerrar modal',
            sections: [
              {
                title: 'Uso de cookies',
                description:
                  'Utilizamos cookies para garantizar las funcionalidades básicas del sitio web y mejorar tu experiencia en línea.'
              },
              {
                title: 'Cookies estrictamente necesarias',
                description:
                  'Estas cookies son esenciales para el correcto funcionamiento del sitio web, por ejemplo para la autenticación de usuarios.',
                linkedCategory: CAT_NECESSARY
              },
              {
                title: 'Analytics',
                description:
                  'Utilizamos cookies de análisis para entender cómo los usuarios interactúan con nuestro sitio web a través de servicios como Google Analytics y Microsoft Clarity. Estas herramientas nos ayudan a mejorar nuestro contenido y experiencia de usuario. Microsoft Clarity puede grabar sesiones anónimas de usuarios para ayudarnos a identificar problemas de usabilidad.',
                linkedCategory: CAT_ANALYTICS,
                cookieTable: {
                  headers: {
                    name: 'Nombre',
                    domain: 'Servicio',
                    description: 'Descripción',
                    expiration: 'Expiración'
                  },
                  body: [
                    {
                      name: '_ga',
                      domain: 'Google Analytics',
                      description:
                        'Cookie establecida por <a href="https://business.safety.google/adscookies/">Google Analytics</a>',
                      expiration: 'Expira después de 12 días'
                    },
                    {
                      name: '_gid',
                      domain: 'Google Analytics',
                      description:
                        'Cookie establecida por <a href="https://business.safety.google/adscookies/">Google Analytics</a>',
                      expiration: 'Sesión'
                    },
                    {
                      name: '_clck',
                      domain: 'Microsoft Clarity',
                      description:
                        'Cookie establecida por <a href="https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-cookies">Microsoft Clarity</a>. Mantiene el ID de usuario y las preferencias para la grabación de sesiones.',
                      expiration: 'Expira después de 1 año'
                    },
                    {
                      name: '_clsk',
                      domain: 'Microsoft Clarity',
                      description:
                        'Cookie establecida por <a href="https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-cookies">Microsoft Clarity</a>. Conecta múltiples vistas de página en una sola sesión.',
                      expiration: 'Sesión'
                    },
                    {
                      name: 'CLID',
                      domain: 'Microsoft Clarity',
                      description:
                        'Cookie de terceros establecida por <a href="https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-cookies">Microsoft Clarity</a>. Identifica la primera vez que Clarity vio a este usuario en cualquier sitio.',
                      expiration: 'Expira después de 1 año'
                    },
                    {
                      name: 'MUID',
                      domain: 'Microsoft',
                      description:
                        'Cookie de terceros establecida por <a href="https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-cookies">Microsoft</a>. Identifica navegadores web únicos que visitan sitios de Microsoft.',
                      expiration: 'Expira después de 1 año'
                    },
                    {
                      name: 'ANONCHK',
                      domain: 'Microsoft',
                      description:
                        'Cookie de terceros establecida por <a href="https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-cookies">Microsoft</a>. Indica si MUID se transfiere a ANID.',
                      expiration: 'Sesión'
                    },
                    {
                      name: 'MR',
                      domain: 'Microsoft',
                      description:
                        'Cookie de terceros establecida por <a href="https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-cookies">Microsoft</a>. Indica si se debe actualizar MUID.',
                      expiration: 'Expira después de 7 días'
                    },
                    {
                      name: 'SM',
                      domain: 'Microsoft',
                      description:
                        'Cookie de terceros establecida por <a href="https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-cookies">Microsoft</a>. Se utiliza para sincronizar MUID entre dominios de Microsoft.',
                      expiration: 'Sesión'
                    }
                  ]
                }
              },
              {
                title: 'Publicidad',
                description: `Google utiliza cookies para la publicidad, incluyendo servir y renderizar anuncios, personalizar anuncios (dependiendo de tu configuración de anuncios en <a href="https://g.co/adsettings">g.co/adsettings</a>), limitar el número de veces que se muestra un anuncio a un usuario, silenciar anuncios que has elegido dejar de ver, y medir la efectividad de los anuncios.`,
                linkedCategory: CAT_ADVERTISEMENT
              },
              {
                title: 'Funcionalidad',
                description:
                  'Las cookies utilizadas para la funcionalidad permiten a los usuarios interactuar con un servicio o sitio para acceder a características que son fundamentales para ese servicio. Las cosas consideradas fundamentales para el servicio incluyen preferencias como la elección de idioma del usuario, optimizaciones del producto que ayudan a mantener y mejorar un servicio, y mantener información relacionada con la sesión del usuario, como el contenido de un carrito de compras.',
                linkedCategory: CAT_FUNCTIONALITY
              },
              {
                title: 'Seguridad',
                description:
                  'Las cookies utilizadas para la seguridad autentican usuarios, previenen fraude y protegen a los usuarios mientras interactúan con un servicio.',
                linkedCategory: CAT_SECURITY
              },
              {
                title: 'Más información',
                description: `Para cualquier consulta en relación con la política de cookies y tus opciones, por favor consulta la <a href="https://private.notifycal.com/#/privacy-policy">política de privacidad</a>.`
              }
            ]
          }
        },
        ca: {
          consentModal: {
            title: 'Utilitzem cookies',
            description:
              'Aquest lloc web utilitza cookies essencials per garantir el seu correcte funcionament i cookies de seguiment per entendre com hi interactues. Aquestes últimes només es configuraran després del consentiment.',
            acceptAllBtn: 'Acceptar tot',
            acceptNecessaryBtn: 'Rebutjar tot',
            showPreferencesBtn: 'Gestionar preferències individuals'
          },
          preferencesModal: {
            title: 'Gestionar preferències de cookies',
            acceptAllBtn: 'Acceptar tot',
            acceptNecessaryBtn: 'Rebutjar tot',
            savePreferencesBtn: 'Acceptar selecció actual',
            closeIconLabel: 'Tancar modal',
            sections: [
              {
                title: 'Ús de cookies',
                description:
                  'Utilitzem cookies per garantir les funcionalitats bàsiques del lloc web i millorar la vostra experiència en línia.'
              },
              {
                title: 'Cookies estrictament necessàries',
                description:
                  "Aquestes cookies són essencials per al correcte funcionament del lloc web, per exemple per a l'autenticació d'usuaris.",
                linkedCategory: CAT_NECESSARY
              },
              {
                title: 'Analítiques',
                description:
                  "Utilitzem cookies d'anàlisi per entendre com els usuaris interactuen amb el nostre lloc web a través de serveis com Google Analytics i Microsoft Clarity. Aquestes eines ens ajuden a millorar el nostre contingut i experiència d'usuari. Microsoft Clarity pot gravar sessions anònimes d'usuaris per ajudar-nos a identificar problemes d'usabilitat.",
                linkedCategory: CAT_ANALYTICS,
                cookieTable: {
                  headers: {
                    name: 'Nom',
                    domain: 'Servei',
                    description: 'Descripció',
                    expiration: 'Expiració'
                  },
                  body: [
                    {
                      name: '_ga',
                      domain: 'Google Analytics',
                      description:
                        'Cookie establerta per <a href="https://business.safety.google/adscookies/">Google Analytics</a>',
                      expiration: 'Expira després de 12 dies'
                    },
                    {
                      name: '_gid',
                      domain: 'Google Analytics',
                      description:
                        'Cookie establerta per <a href="https://business.safety.google/adscookies/">Google Analytics</a>',
                      expiration: 'Sessió'
                    },
                    {
                      name: '_clck',
                      domain: 'Microsoft Clarity',
                      description:
                        'Cookie establerta per <a href="https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-cookies">Microsoft Clarity</a>. Manté l\'ID d\'usuari i les preferències per al gravat de sessions.',
                      expiration: "Expira després d'1 any"
                    },
                    {
                      name: '_clsk',
                      domain: 'Microsoft Clarity',
                      description:
                        'Cookie establerta per <a href="https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-cookies">Microsoft Clarity</a>. Connecta múltiples vistes de pàgina en una sola sessió.',
                      expiration: 'Sessió'
                    },
                    {
                      name: 'CLID',
                      domain: 'Microsoft Clarity',
                      description:
                        'Cookie de tercers establerta per <a href="https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-cookies">Microsoft Clarity</a>. Identifica la primera vegada que Clarity va veure aquest usuari en qualsevol lloc.',
                      expiration: "Expira després d'1 any"
                    },
                    {
                      name: 'MUID',
                      domain: 'Microsoft',
                      description:
                        'Cookie de tercers establerta per <a href="https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-cookies">Microsoft</a>. Identifica navegadors web únics que visiten llocs de Microsoft.',
                      expiration: "Expira després d'1 any"
                    },
                    {
                      name: 'ANONCHK',
                      domain: 'Microsoft',
                      description:
                        'Cookie de tercers establerta per <a href="https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-cookies">Microsoft</a>. Indica si MUID es transfereix a ANID.',
                      expiration: 'Sessió'
                    },
                    {
                      name: 'MR',
                      domain: 'Microsoft',
                      description:
                        'Cookie de tercers establerta per <a href="https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-cookies">Microsoft</a>. Indica si s\'ha d\'actualitzar MUID.',
                      expiration: 'Expira després de 7 dies'
                    },
                    {
                      name: 'SM',
                      domain: 'Microsoft',
                      description:
                        'Cookie de tercers establerta per <a href="https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-cookies">Microsoft</a>. S\'utilitza per sincronitzar MUID entre dominis de Microsoft.',
                      expiration: 'Sessió'
                    }
                  ]
                }
              },
              {
                title: 'Publicitat',
                description: `Google utilitza cookies per a la publicitat, incloent servir i renderitzar anuncis, personalitzar anuncis (depenent de la teva configuració d'anuncis a <a href="https://g.co/adsettings">g.co/adsettings</a>), limitar el nombre de vegades que es mostra un anunci a un usuari, silenciar anuncis que has triat deixar de veure, i mesurar l'efectivitat dels anuncis.`,
                linkedCategory: CAT_ADVERTISEMENT
              },
              {
                title: 'Funcionalitat',
                description:
                  "Les cookies utilitzades per a la funcionalitat permeten als usuaris interactuar amb un servei o lloc per accedir a característiques que són fonamentals per a aquest servei. Les coses considerades fonamentals per al servei inclouen preferències com l'elecció d'idioma de l'usuari, optimitzacions del producte que ajuden a mantenir i millorar un servei, i mantenir informació relacionada amb la sessió de l'usuari, com el contingut d'una cistella de compra.",
                linkedCategory: CAT_FUNCTIONALITY
              },
              {
                title: 'Seguretat',
                description:
                  'Les cookies utilitzades per a la seguretat autentiquen usuaris, prevenen frau i protegeixen els usuaris mentre interactuen amb un servei.',
                linkedCategory: CAT_SECURITY
              },
              {
                title: 'Més informació',
                description: `Per a qualsevol consulta en relació amb la política de cookies i les vostres opcions, si us plau consulteu la <a href="https://private.notifycal.com/#/privacy-policy">política de privadesa</a>.`
              }
            ]
          }
        }
      }
    }
  };
}
