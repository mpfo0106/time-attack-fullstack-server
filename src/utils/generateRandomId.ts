import { customAlphabet } from 'nanoid';

const RANDOM_ID_BASE = 'PrspeSjvywNCojiVw3hB71_eUeeQjzMqeO5QHuGvNIrrd8k4K8kO';
const generateRandomId = customAlphabet(RANDOM_ID_BASE, 20);

export default generateRandomId;
