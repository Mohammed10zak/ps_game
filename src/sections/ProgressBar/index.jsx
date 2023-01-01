import './style.css'
export default function ProgressBar(props) {
  const password = props.password;
  let width = 0;

  if (password.length >= 8) {
    width += 25;
  }
  if (password.match(/[0-9]/)) {
    width += 25;
  }
  if (password.match(/[!@#$%^&*]/)) {
    width += 25;
  }
  if (password.match(/[a-z]/) && password.match(/[A-Z]/)) {
    width += 25;
  }

  return (
    <div className="password-strength-bar">
      <div style={{ width: `${width}%` }}></div>
    </div>
  );
}
