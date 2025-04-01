function skillsMember() {
  return {
    name: 'skills',
    description: 'Get skills of a member',
    options: [
      {
        name: 'member',
        description: 'Member to get skills of',
        type: 6,
        required: true,
      },
    ],
  };
}