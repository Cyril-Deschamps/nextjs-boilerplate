import { string } from "yup";

export const phoneNumberRegex = /(\+33|0)[1-9](\d\d){4}/;

export const phoneSchema = string().matches(phoneNumberRegex, {
  key: "user.phoneNumber.matches",
});
