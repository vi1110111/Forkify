import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  const fetchPRO = uploadData
    ? fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(uploadData),
      })
    : fetch(url);

  try {
    //  1. Get data in async way
    const res = await Promise.race([fetchPRO, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    // 2. Guard class
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (error) {
    throw error;
  }
};

// export const getJSON = async function (url) {};

// export const sendJSON = async function (url, uploadData) {
//   try {
//     //  1. Get data in async way
//     const res = await Promise.race([
//       fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(uploadData),
//       }),
//       timeout(TIMEOUT_SEC),
//     ]);
//     const data = await res.json();

//     // 2. Guard class
//     if (!res.ok) throw new Error(`${data.message} (${res.status})`);
//     return data;
//   } catch (error) {
//     throw error;
//   }
// };
