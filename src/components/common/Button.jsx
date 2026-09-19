import { classNames } from '../../utils/helpers.js';

const VARIANTS = {
  primary: 'btn-primary',
  gold: 'btn-gold',
  outline: 'btn-outline',
  ghost: 'btn-ghost',
  danger: 'btn-danger',
};

export default function Button({
  children,
  variant = 'primary',
  size,
  block = false,
  type = 'button',
  disabled = false,
  loading = false,
  onClick,
  className,
  ...rest
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={classNames(
        'btn',
        VARIANTS[variant] || VARIANTS.primary,
        size === 'sm' && 'btn-sm',
        block && 'btn-block',
        className
      )}
      {...rest}
    >
      {loading ? 'Please wait…' : children}
    </button>
  );
}
