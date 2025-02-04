import { wrapReq } from '../lib/wrapper.js'

import { userMap } from '../config/userMap.js'
import { handlerMap } from '../config/handlerMap.js'


export async function onRequest(context) {
    const lp = context.params.catchall[0];
    const user = context.params.catchall[1];

    let usermappings = userMap[user];
    let cb = handlerMap[lp];

    return wrapReq(context, usermappings, cb);
}