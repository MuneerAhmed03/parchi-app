export const validateTitle = (title: string): string => {
    if (title.length > 12 ) {
      return "Title should not be longer than 12 characters";
    }else if(!/^[A-Za-z0-9]+$/.test(title)){
      return "Title cant have special charachters."
    }else if(title==""){
        return "Invalid Title"
    }
    return "";
  };
  