import { UserValidations } from "../../utils/users.validations.js";

export default UserValidations.validationsForFields(
  "email",
  "password",
  "photo",
  "role"
);
