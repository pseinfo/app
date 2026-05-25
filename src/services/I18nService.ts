import { i18nextConfig, resourceLoaders, type AppLanguage, type AppNamespace } from '@pseinfo/i18n/config/app';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';


export async function ensureNamespace(
  lng: AppLanguage,
  ns: AppNamespace
) {
  const existing = i18n.getResourceBundle(lng, ns);

  if (existing) {
    return existing;
  }

  const loader = resourceLoaders[lng][ns];

  const res = await loader();

  i18n.addResourceBundle(
    lng,
    ns,
    res,
    true,
    true
  );

  i18n.emit('loaded', {
    [lng]: [ns]
  });

  return res;
}

void await i18n
  .use( initReactI18next )
  .init( i18nextConfig );

export default i18n;
