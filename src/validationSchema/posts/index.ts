import * as yup from 'yup';

export const postValidationSchema = yup.object().shape({
  content: yup.string().required(),
  debater_id: yup.string().nullable(),
});
