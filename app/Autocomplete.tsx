'use strict';
import { autocomplete } from '@algolia/autocomplete-js';
import React, { createElement, Fragment, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

const Autocomplete = (props: any) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRootRef = useRef<any>(null);
  const rootRef = useRef<Element | null>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const search = autocomplete({
      container: containerRef.current,
      renderer: { createElement, Fragment, render: () => {} },
      render({ children }: { children: React.ReactNode }, root: Element) {
        if (!panelRootRef.current || rootRef.current !== root) {
          rootRef.current = root;

          panelRootRef.current?.unmount();
          panelRootRef.current = createRoot(root);
        }

        panelRootRef.current.render(children);
      },
      ...props,
    });

    return () => {
      search.destroy();
    };
  }, [props]);

  return <div style={{width: '350px'}} ref={containerRef} />;
};

export default Autocomplete;
