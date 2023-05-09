export default function contactUs() {
  document.querySelectorAll('.js--to_stay_tunned').forEach(element => {
    element.addEventListener('click', () => {
      window.scroll({
        behavior: 'smooth',
        left: 0,
        top: document.querySelector('#js--stay_tunned').offsetTop
      });
    })
  });
}
