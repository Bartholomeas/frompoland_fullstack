'use server';

import { revalidateTag } from 'next/cache';

export const revalidateSpecifiedTag = (tag: string) => {
  revalidateTag(tag);
};
