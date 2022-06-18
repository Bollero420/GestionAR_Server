import { Document } from 'mongoose';

interface IForm extends Document {
  form_name: string;
}

export default IForm;
