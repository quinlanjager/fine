document.addEventListener("click", (e) => {
  const button = e.target.closest(".copyButton");
  if (!button) return;

  const text = button.dataset.copy;
  navigator.clipboard.writeText(text).then(() => {
    const copyIcon = button.querySelector(".copy-icon");
    const checkIcon = button.querySelector(".check-icon");
    copyIcon.classList.add("hidden");
    checkIcon.classList.remove("hidden");
    setTimeout(() => {
      copyIcon.classList.remove("hidden");
      checkIcon.classList.add("hidden");
    }, 2000);
  });
});
