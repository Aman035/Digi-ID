export const REFRESH_RATE = 15000;
export const ALERT_DELAY = 6000;
export const CONTRACT_ADDRESS = '0xFbD45EFD350dDC7953F3DbEe9B1E5E233b567845';
export const delay = async() => (
    // return await for better async stack trace support in case of errors.
    await new Promise(resolve => setTimeout(resolve, REFRESH_RATE))
)