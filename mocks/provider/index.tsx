'use client';

import { useEffect, useState } from 'react';
import initMocksServer from '..';

export const MswMockProvider = () => {
  const [isWorkerReady, setIsWorkerReady] = useState(false);

  useEffect(() => {
    initMocksServer().then(() => setIsWorkerReady(true));
  }, []);

  if (!isWorkerReady) {
    return null;
  }

  return null;
};
