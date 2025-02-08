export const logOut = () => {
    document.cookie = `foodmateuser=''; path=/; expires=${new Date(
      Date.now() - 1000
    ).toUTCString()}`;
    window.location.reload();
  };