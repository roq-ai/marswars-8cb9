import * as yup from 'yup';

export const commentValidationSchema = yup.object().shape({
  content: yup.string().required(),
  video_id: yup.string().nullable(),
  debater_id: yup.string().nullable(),
});
