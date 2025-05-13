module.exports = {
  test: async () => {
    console.time('findAllUsers');
    const users = await User.find({ limit: 9999 });
    console.timeEnd('findAllUsers');
    return users;
  }
};
