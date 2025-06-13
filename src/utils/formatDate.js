

/**
 * 
 * @param {string} dateString 
 * @returns {string} 
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.warn('Invalid date string provided to formatDate:', dateString);
      return '';
    }
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true 
    });
  } catch (e) {
    console.error('Error formatting date:', e, 'for string:', dateString);
    return '';
  }
};
