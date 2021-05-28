import useSWR from 'swr';
//import { useEffect, useState } from 'react';

export const fetcher = url => 
  fetch(url).then(async r => {
    const result = await r.json();
    if (r.status !== 200) {
      return Promise.reject(result);
    } else {
      return  result;
    }
  });