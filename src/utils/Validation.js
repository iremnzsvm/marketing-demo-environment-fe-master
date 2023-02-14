/*
import valid from 'card-validator';

export const validateCardNumber = (value) => {
  if (/[^0-9-\s]+/.test(value)) {
    return false;
  }

  const { isValid } = valid.number(value.replace(/\D/g, ''));

  return isValid;
};

export const validateCardExpiry = (value) => {
  const { isValid } = valid.expirationDate(value);

  return isValid;
};

export const validateCardCVV = (value, length) => {
  const { isValid } = valid.cvv(value, length);

  return isValid;
};
*/
