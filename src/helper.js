export const REFRESH_RATE = 6000;
export const ALERT_DELAY = 6000;
export const CONTRACT_ADDRESS = '0xc5a422571d21EeCe071Ac2f61dc6c9FcC61137A6';
export const delay = async() => (
    // return await for better async stack trace support in case of errors.
    await new Promise(resolve => setTimeout(resolve, REFRESH_RATE))
)