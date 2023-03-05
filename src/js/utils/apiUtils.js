export const getAllCards = async () => {
  return new Promise((resolve) => {
    const cards = fetch("http://127.0.0.1:5000/dominion/cards")
      .then((response) => response.json())
      .then((data) => {
        console.log('UH OHHHH')
        resolve(data);
      });
  });
};
