import React from 'react';

import { useRouter } from 'next/router';

import { CatalogTypes } from '../../../enums/catalog';

const Goods = () => {
  const router = useRouter();

  const goods = router.query.goods;

  React.useEffect(() => {
    if (
      typeof goods === 'string' &&
      Object.values(CatalogTypes).includes(goods as CatalogTypes)
    ) {
      router.push(`/catalog/${router.query.goods}/1`);
    } else {
      router.push('/');
    }
  }, [goods, router]);

  return <>Wrong route</>;
};

export default React.memo(Goods);
