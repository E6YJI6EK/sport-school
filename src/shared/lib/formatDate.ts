export const formatDate = (dateString: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    // @ts-ignore
    const formattedDate = date.toLocaleDateString('ru-RU', options);
    return formattedDate;
  }
  

  