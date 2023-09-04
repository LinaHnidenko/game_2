const selectors = {
  startBtn: document.querySelector(".js-start"),
  container: document.querySelector(".js-container"),
};

selectors.startBtn.addEventListener("click", handlerStart);

function handlerStart() {
  const promises = [...selectors.container.children].map((_) =>
    createPromises()
  );

  Promise.allSettled(promises).then((items) => {
    items.forEach((item, index) => {
      selectors.container.children[index].textContent = "";
      setTimeout(() => {
        selectors.container.children[index].textContent =
          item.value || item.reason;

        if (index === items.length - 1) {
          const instance = basicLightbox.create(
            `<h1>${isWinner ? "Winner" : "Loser"}</h1>`
          );
          instance.show();
        }
      }, 1000 * (index + 1));
    });
    const isWinner =
      items.every(({ status }) => status === "fulfilled") ||
      items.every(({ status }) => status === "rejected");
  });
}

function createPromises() {
  return new Promise((resolve, reject) => {
    const random = Math.random();
    if (random > 0.5) {
      resolve("🤑");
    } else {
      reject("😈");
    }
  });
}
