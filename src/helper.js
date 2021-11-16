export const REFRESH_RATE = 10000;
export const ALERT_DELAY = 6000;
export const CONTRACT_ADDRESS = '0x384D0D5eD8A094511b804dcde855f6AAe3416476';
export const delay = async() => (
    // return await for better async stack trace support in case of errors.
    await new Promise(resolve => setTimeout(resolve, REFRESH_RATE))
)