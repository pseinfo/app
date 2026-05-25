import { useEffect, useState } from 'react';
import { useTranslation as useI18n } from 'react-i18next';

import { ensureNamespace } from '@/services/I18nService';
import type { AppI18nSchema, AppLanguage, AppNamespace } from '@pseinfo/i18n/config/app';

export function useTranslation<N extends AppNamespace>(ns: N) {
  const { i18n } = useI18n(ns);

  const [ ready, setReady ] = useState(
    !!i18n.getResourceBundle(i18n.language, ns)
  );

  useEffect(() => {
    let mounted = true;

    void ensureNamespace(
      i18n.language as AppLanguage,
      ns
    ).then(() => {
      if (mounted) {
        setReady(true);
      }
    });

    return () => {
      mounted = false;
    };
  }, [ i18n.language, ns ]);

  const t = <R>(
    selector: (ns: AppI18nSchema[N]) => R
  ): R | undefined => {
    if (!ready) {
      return undefined;
    }

    const res = i18n.getResourceBundle(
      i18n.language,
      ns
    );

    if (!res) {
      return undefined;
    }

    return selector(res);
  };

  return {
    t,
    ready
  };
}