import { handleQuizLP } from '../lib/page-handlers/handleQuizLP.js'
import { handleDynLP } from '../lib/page-handlers/handleDynLP.js'
import { handleAppLP } from '../lib/page-handlers/handleAppLP.js'
import { handleImageLP } from '../lib/page-handlers/handleImageLP.js'

export const handlerMap =
{
    'quiz': handleQuizLP,
    'dynlan': handleDynLP,
    'app': handleAppLP,
    'img': handleImageLP,
}