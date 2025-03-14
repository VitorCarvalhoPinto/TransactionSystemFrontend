export const parseDate = (dateString) => {
    const date = new Date(dateString);
  
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
  
    return new Intl.DateTimeFormat('pt-BR', options).format(date);
  };
  