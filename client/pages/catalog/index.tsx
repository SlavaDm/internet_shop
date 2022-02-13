import React from 'react';

import { useRouter } from 'next/router';

const Catalog = () => {
  const router = useRouter();

  React.useEffect(() => {
    router.push('/');
  }, [router]);

  return <></>;
};

export default React.memo(Catalog);
