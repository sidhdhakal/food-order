export const signToken = id => {
    return jwt.sign({ id: id }, process.env.SECRET, {
      expiresIn: '7d'
    });
  };