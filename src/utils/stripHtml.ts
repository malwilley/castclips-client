const stripHtml = (str: string) => str.replace(/<[^>]*>/gi, '');

export default stripHtml;
