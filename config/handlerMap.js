import { handleQuizLP } from '../lib/handleQuizLP.js'
import { handleDynLP } from '../lib/handleDynLP.js'
import { handleAppLP } from '../lib/handleAppLP.js'
import { handleImageLP } from '../lib/handleImageLP.js'

export const handlerMap =
{
    'quiz': handleQuizLP,
    'dynlan': handleDynLP,
    'app': handleAppLP,
    'img': handleImageLP,
}