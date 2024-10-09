import { handleCloakingScript } from '../../lib/handleCloakingScript.js'

export async function onRequest(context) {
  return handleCloakingScript(context);
}