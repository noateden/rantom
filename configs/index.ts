// The version value tracks known actions and transfers of a release version
// If a transaction is found in database with the same version, Rantom will not parse that transaction
// Otherwise, Rantom will get transaction from blockchain, parse and save into database
// If there is any updates or integrations, we need to increase this version value
export const ParserVersion = '1.0.0';
