import { toast } from 'react-toastify';

export const notifyDefault = (str: string) => toast(str, { type: 'default' });
export const notifyError = (str: string) => toast(str, { type: 'error' });
