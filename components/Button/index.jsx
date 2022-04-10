import styles from "./Button.module.scss";

const Button = ({ children = "Button", ...props }) => {
  return (
    <button
      tabIndex={0}
      {...props}
      className={`${styles.button} ${props.className || ""}`}
      aria-label={children}
    >
      {children}
    </button>
  );
};

export default Button;
