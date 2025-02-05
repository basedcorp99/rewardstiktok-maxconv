import { wrapReq } from '../lib/wrapper.js'

import { userMap } from '../config/userMap.js'
import { handlerMap } from '../config/handlerMap.js'


export async function onRequest(context) {
    if (context.params.catchall.length !== 6) {
        return new Response('Invalid URL', { status: 400 });
    }

    const catchall = context.params.catchall;
    const lp = catchall[0];
    let cb = handlerMap[lp];

    // slice 1 = remove LP
    return wrapReq(catchall.slice(1), context, cb);
}