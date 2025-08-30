import { handleQuizLP } from '../lib/page-handlers/handleQuizLP.js'
import { handleDynLP } from '../lib/page-handlers/handleDynLP.js'
import { handleAppLP } from '../lib/page-handlers/handleAppLP.js'
import { handleAppLPv2 } from '../lib/page-handlers/handleAppLPv2.js'
import { handleImageLP } from '../lib/page-handlers/handleImageLP.js'
import { handleQuiz2LP } from '../lib/page-handlers/handleQuiz2LP.js'
import { handleDCLP } from '../lib/page-handlers/handleDCLP'
import { handleCPI } from '../lib/page-handlers/handleCPI.js'

export const handlerMap =
{
    'quiz': handleQuizLP,
    'dynlan': handleDynLP,
    'app': handleAppLP,
    'appv2': handleAppLPv2,
    'img': handleImageLP,
    'quiz2': handleQuiz2LP,
    'dc': handleDCLP,
    'cpi': handleCPI
}
